// .. Copyright (C) 2012-2020 Bryan A. Jones.
//
//  This file is part of the CellBotics system.
//
//  The CellBotics system is free software: you can redistribute it and/or
//  modify it under the terms of the GNU General Public License as
//  published by the Free Software Foundation, either version 3 of the
//  License, or (at your option) any later version.
//
//  The CellBotics system is distributed in the hope that it will be
//  useful, but WITHOUT ANY WARRANTY; without even the implied warranty
//  of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with the CellBotics system.  If not, see
//  <http://www.gnu.org/licenses/>.
//
// *************************************************************
// |docname| - JavaScript code to connect with a CellBot via BLE
// *************************************************************

"use strict";

import { auto_bind } from "./auto-bind.js";

// CellBotBle
// ==========
// This sends and receives data to the CellBot via Bluetooth.
class CellBotBle {
    constructor() {
        auto_bind(this);

        this.clear_connection();
        // If true, the server (BLE device / CellBot) is little-endian; if false, big-endian.
        this.is_little_endian = true;
        // If true, expect verbose returns (the CellBot was compiled with ``VERBOSE_RETURN`` defined).
        this.verbose_return = true;
        // If true, return dummy values instead of talking to the hardware.
        this.is_sim = false;

        // #defines from Arduino headers.
        this.INPUT = 1;
        this.OUTPUT = 2;

        // UUIDs for each characteristic.
        this.uuid = {
            resetHardware: "60cb180e-838d-4f65-aff4-20b609b453f3",
            pinMode: "6ea6d9b6-7b7e-451c-ab45-221298e43562",
            digitalWrite: "d3423cf6-6da7-4dd8-a5ba-3c980c74bd6d",
            digitalRead: "c370bc79-11c1-4530-9f69-ab9d961aa497",
            ledcSetup: "6be57cea-3c46-4687-972b-03429d2acf9b",
            ledcAttachPin: "2cd63861-078f-436f-9ed9-79e57ec8b638",
            ledcDetachPin: "b9b0cabe-25d8-4965-9259-7d3b6330e940",
            ledcWrite: "40698030-a343-448f-a9ea-54b39b03bf81"
        };
    }

    // Clear Bluetooth connection-related objects.
    clear_connection() {
        this.server && this.server.disconnect();
        this.server = undefined;
        this.service = undefined;
        // A dict of name: ``BluetoothRemoteGATTCharacteristic``.
        this.characteristic = {};
    }

    // Return true if BLE is supported by this browser. Even if it is supported, it may not be available.
    is_ble_supported() {
        return Boolean(navigator.bluetooth);
    }

    // Return true is BLE is supported. If so, register the provided event handler.
    async has_ble(on_availability_changed) {
        if (this.is_sim) {
            return true;
        }

        if (this.is_ble_supported() && await navigator.bluetooth.getAvailability()) {
            navigator.bluetooth.addEventListener("availabilitychanged", on_availability_changed);
            return true;
        } else {
            return false;
        }
    }

    // Returns true if the Bluetooth device (server) is connected.
    paired() {
        return this.is_sim || (this.server && this.server.connected);
    }

    // Pair with a CellBot and return the characteristic used to control the device.
    async pair(disconnect_callback)
    {
        if (this.is_sim) {
            return;
        }

        // Skip connecting if we're already connected.
        if (this.paired()) {
            return;
        }

        // Shut down any remnants of a previous connection.
        this.clear_connection();

        // Request a device with service `UUIDs`. See the `Bluetooth API <https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth>`_.
        let cellBot_service = "6c533793-9bd6-47d6-8d3b-c10a704b6b97";
        this.device = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [cellBot_service]
            }]
        });

        // Notify on a disconnect. I can't find any docs on this, but it does work.
        this.device.addEventListener('gattserverdisconnected', disconnect_callback);
        this.device.addEventListener('gattserverdisconnected', this.clear_connection);

        // Connect to its server.
        this.server = await this.device.gatt.connect();

        // Get the service for our server.
        this.service = await this.server.getPrimaryService(cellBot_service);
    }

    // Generic access function for calling a function on the Arduino. It returns (value returned after invoking the function, message).
    async invoke_Arduino(
        // The Bluetooth characteristic to use for this call.
        characteristic,
        // The number of bytes in the return value:
        //
        // -    0: void
        // -    +1/-1: unsigned/signed 8-bit value
        // -    +2/-2: unsigned/signed 16-bit value
        // -    +4/-4: unsigned/signed 32-bit value
        // -    0.4/0.8: 32-bit/64-bit float
        return_bytes,
        // An ArrayBuffer or compatible type of data containing encoded parameters to send.
        param_array
    ) {
        if (this.is_sim) {
            return [0, ""];
        }

        await characteristic.writeValue(param_array);
        // Read the returned data.
        let return_data = await characteristic.readValue();
        // Interpret the return value.
        let return_value;
        switch (return_bytes) {
            case 0:
            return_value = undefined;
            break;

            case 1:
            return_value = return_data.getUint8(0);
            break;

            case -1:
            return_value = return_data.getInt8(0);
            break;

            case 2:
            return_value = return_data.getUint16(0);
            break;

            case -2:
            return_value = return_data.getInt16(0, this.is_little_endian);
            break;

            case 4:
            return_value = return_data.getUint32(0, this.is_little_endian);
            break;

            case -4:
            return_value = return_data.getInt32(0, this.is_little_endian);
            break;

            case 0.4:
            return_value = return_data.getFloat32(0, this.is_little_endian);
            return_bytes = 4;
            break;

            case 0.8:
            return_value = return_data.getFloat64(0, this.is_little_endian);
            return_bytes = 8;
            break;

        }

        let message = return_data.buffer.slice(return_bytes);
        message = String.fromCharCode.apply(null, new Uint8Array(message));
        if (!this.verbose_return) {
            throw `BLE protocol error: ${message}`
        }
        return [return_value, message];
    }

    // Return an existing instance of a ``BluetoothRemoteGATTCharacteristic`` or create a new one.
    async get_characteristic(name) {
        if (this.is_sim) {
            return name;
        }

        if (name in this.characteristic) {
            return this.characteristic[name];
        }
        return this.characteristic[name] = await this.service.getCharacteristic(this.uuid[name]);
    }

    // Reset the hardware on the connected device.
    async resetHardware() {
        // Any write is fine -- just send 1 byte.
        return this.invoke_Arduino(await this.get_characteristic("resetHardware"), 0, new Uint8Array([1]));
    }

    // Invoke `pinMode <https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/>`_ on the Arduino.
    async pinMode(u8_pin, u8_mode) {
        return this.invoke_Arduino(await this.get_characteristic("pinMode"), 0, new Uint8Array([u8_pin, u8_mode]));
    }

    // Invoke `digitalWrite <https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/>`_ on the Arduino.
    async digitalWrite(u8_pin, u8_value) {
        return this.invoke_Arduino(await this.get_characteristic("digitalWrite"), 0, new Uint8Array([u8_pin, u8_value]));
    }

    // Invoke `digitalRead <https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/>`_ on the Arduino.
    async digitalRead(u8_pin) {
        return this.invoke_Arduino(await this.get_characteristic("digitalRead"), 1, new Uint8Array([u8_pin]));
    }

    // Invoke ``ledcSetup`` on the Arduino.
    //
    // Note that the LEDC control on the ESP32 Arduino port isn't documented. Here's my attempts. The best reference is the `LED_PWM chapter of the ESP32 Technical Reference Manual <https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf#page=384>`_. To set up PWM, you need to select:
    //
    // -    A channel (channels 0-7 auto-update new PWM periods, channels 8-15 don't).
    // -    The frequency to do the PWM, in Hz.
    // -    A number of bits used to do the PWM. The maximum possible value is floor(log2(processor clock frequency/PWM frequency)); this cannot exceed 20. The processor clock frequency is either 80 MHz or 1 MHz.
    //
    // The function returns the actual PWM frequency, due to the limitations of the available clock divisor.
    async ledcSetup(u8_channel, d_freq, u8_resolution_bits) {
        let param_array = new ArrayBuffer(11);
        let dv = new DataView(param_array);
        dv.setUint8(0, u8_channel);
        dv.setFloat64(1, d_freq, this.is_little_endian);
        dv.setUint8(10, u8_resolution_bits);
        return this.invoke_Arduino(await this.get_characteristic("ledcSetup"), 0.8, param_array);
    }

    // Invoke ``ledcAttachPin`` on the Arduino.
    //
    // Next, attach this channel to a specific pin on the Arduino.
    async ledcAttachPin(u8_pin, u8_channel) {
        return this.invoke_Arduino(await this.get_characteristic("ledcAttachPin"), 0, new Uint8Array([u8_pin, u8_channel]));
    }

    // Invoke ``ledcWrite`` on the Arduino.
    //
    // Finally, select a duty cycle for that channel, from 2^num_bits to 1.
    async ledcWrite(u8_channel, u32_duty) {
        let param_array = new ArrayBuffer(5);
        let dv = new DataView(param_array);
        dv.setUint8(0, u8_channel);
        dv.setUint32(1, u32_duty, this.is_little_endian);
        return this.invoke_Arduino(await this.get_characteristic("ledcWrite"), 0, param_array);
    }

    // Invoke ``ledcDetachPin`` on the Arduino.
    //
    // Next, attach this channel to a specific pin on the Arduino.
    async ledcDetachPin(u8_pin) {
        return this.invoke_Arduino(await this.get_characteristic("ledcDetachPin"), 0, new Uint8Array([u8_pin]));
    }
}


// CellBotBleGui
// =============
// Provide a simple pair/disconnect GUI for the CellBot Bluetooth connection.
class CellBotBleGui {
    constructor(pair_button_id, pair_status_id) {
        auto_bind(this);

        this.ble_pair_button = document.getElementById(pair_button_id);
        this.ble_pair_status = document.getElementById(pair_status_id);

        // If the GUI isn't available, give up.
        if (!this.ble_pair_button || !this.ble_pair_status) {
            return;
        }

        this.cell_bot_ble = new CellBotBle();
        // Update the pair button based on BLE availability.
        this.cell_bot_ble.has_ble(this.on_availability_changed).then(this.on_ble_available);
        // Respond to button clicks.
        this.ble_pair_button.addEventListener("click", event => {
            this.async_on_pair_clicked();
        })
    }

    async async_on_pair_clicked() {
        if (!this.cell_bot_ble.paired()) {
            this.ble_pair_button.disabled = true;
            this.ble_pair_status.innerHTML = "Pairing...";
            try {
                await this.cell_bot_ble.pair(this.on_disconnect);
                this.ble_pair_status.innerHTML = `Paired to ${this.cell_bot_ble.device.name}.`;
                this.ble_pair_button.innerHTML = "Disconnect";

            } catch (err) {
                this.ble_pair_status.innerHTML = "Unable to pair.";
                throw err;
            } finally {
                this.ble_pair_button.disabled = false;
            }

        } else {
            this.cell_bot_ble.server.disconnect();
        }
    }

    on_availability_changed(event) {
        // TODO: I don't know what the structure of this event is.
        console.log(event);
    }

    on_ble_available(has_ble) {
        this.ble_pair_button.disabled = !has_ble;
        if (has_ble) {
            this.ble_pair_status.innerHTML = "Not connected.";
        } else {
            this.ble_pair_status.innerHTML = "Not available.";
        }
    }

    on_disconnect() {
        this.ble_pair_status.innerHTML = "Disconnected.";
        this.ble_pair_button.innerHTML = "Pair";
    }
}


// An instance of this class.
export let cell_bot_ble_gui;

// Handler
// =======
// This must be invoked when the DOM is ready, before calling any other function in this file.
$(document).ready(function () {
    cell_bot_ble_gui = new CellBotBleGui("ble_pair_button", "ble_pair_status");
});
