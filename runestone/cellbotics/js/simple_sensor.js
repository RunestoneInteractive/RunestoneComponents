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
// **********************************
// |docname| - Interface with sensors
// **********************************
// This provides code to access `sensor APIs <https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs>`_.
"use strict";

import "./permissions_polyfill.js";
import "./sensor_polyfill/geolocation-sensor.js";
import "./sensor_polyfill/motion-sensors.js";
import { auto_bind } from "./auto-bind.js";

// SimpleSensor
// ============
// This class wraps a `Sensor <https://developer.mozilla.org/en-US/docs/Web/API/Sensor>`_ with simple ``start``, ``ready``, and ``stop`` functions.
class SimpleSensor {
    constructor() {
        auto_bind(this);

        this.sensor = null;
    }

    // This was initially based on the MDN Sensor API docs.
    async start(
        // The class to use for the sensor to start. It must be based on the Sensor interface.
        sensor_class,
        // An array of strings, giving the name of the API to ask permissions of for this sensor. See https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query.
        sensor_permission,
        // Options to pass to this sensor's constructor.
        sensor_options
    ) {
        if (this.sensor) {
            throw "In use. Stop the sensor before starting another.";
        }
        if (typeof sensor_class !== "function") {
            throw "Not available.";
        }

        // Get permission to use these sensors, if the API is supported.
        if (navigator.permissions) {
            let result = await Promise.all(sensor_permission.map(x => navigator.permissions.query({ name: x })));
            if (!result.every(val => val.state === "granted")) {
                throw `Permission to use the ${sensor_permission} sensor was denied.`;
            }
        }

        // To access a sensor:
        //
        // #.   Create it, then start it, synchronously checking for errors in this process.
        // #.   Await for a response from the sensor: an acceptance indicating the sensor works, or a rejection indicating a failure.
        //
        // Since the event handlers to accept or reject the promise must be set up in the synchronous phase, wrap everything in a promise. All the operations above therefore start when the promise is awaited.
        this.sensor = null;
        let on_error;
        let on_reading;
        let p = new Promise((resolve, reject) => {
            try {
                this.sensor = new sensor_class(sensor_options);

                // Handle callback errors by rejecting the promise.
                let that = this;
                on_error = event => {
                    that.sensor.removeEventListener("error", on_error);
                    // Handle runtime errors.
                    if (event.error.name === 'NotAllowedError') {
                        reject("Access to this sensor is not allowed.");
                    } else if (event.error.name === 'NotReadableError' ) {
                        reject('Cannot connect to the sensor.');
                    }
                    reject(`Unknown error: ${event.error.name}`);

                }
                this.sensor.addEventListener('error', on_error);

                // Wait for the first sensor reading to accept the promise.
                on_reading = event => {

                    that.sensor.removeEventListener("reading", on_reading);
                    resolve();
                }
                this.sensor.addEventListener("reading", on_reading);

                this.sensor.start();
            } catch (error) {
                // Handle construction errors.
                if (error.name === 'SecurityError') {
                    // See the note above about feature policy.
                    reject("Sensor construction was blocked by a feature policy.");
                } else if (error.name === 'ReferenceError') {
                    reject("Sensor is not supported by the User Agent.");
                } else {
                    reject(error);
                }
            }
        });

        // Start the sensor, waiting until it produces a reading or an error.
        try {
            console.log(`Await ${new Date()}`);
            await p;
        } catch (err) {
            this.stop();
            throw err;
        } finally {
            console.log(`Done ${new Date()}`);
            this.sensor.removeEventListener("error", on_error);
            this.sensor.removeEventListener("reading", on_reading);
        }
    }

    // True if the sensor is activated and has a reading.
    get ready() {
        return this.sensor && this.sensor.activated && this.sensor.hasReading;
    }

    // To save device power, be sure to stop the sensor as soon as the readings are no longer needed.
    stop() {
        this.sensor && this.sensor.stop();
        this.sensor = null;
    }
}


// Abstract helper classes
// =======================
// Several sensors return x, y, and z values. Collect the common code here.
class SimpleXYZSensor extends SimpleSensor {
    get x() {
        return this.sensor.x;
    }

    get y() {
        return this.sensor.y;
    }

    get z() {
        return this.sensor.z;
    }
}


// Two sensors return a quaternion or rotation matrix.
class SimpleOrientationSensor extends SimpleSensor {
    get quaternion() {
        return this.sensor.quaternion;
    }

    populateMatrix(targetMatrix) {
        return this.sensor.populateMatrix(targetMatrix);
    }
}


// Concrete classes
// ================
// Note the use of ``window.SensorName`` instead of ``SensorName`` for non-polyfills. This avoids exceptions if the particular sensor isn't defined, producing an ``undefined`` instead. For polyfills, we must use ``SensorName`` instead of ``window.SensorName``.
export class SimpleAmbientLightSensor extends SimpleSensor {
    async start(als_options) {
        return super.start(window.AmbientLightSensor, ["ambient-light-sensor"], als_options);
    }

    get illuminance() {
        return this.sensor.illuminance;
    }
}


// See the `W3C draft spec <https://w3c.github.io/geolocation-sensor/#geolocationsensor-interface>`_.
export class SimpleGeolocationSensor extends SimpleSensor {
    async start(geo_options) {
        return super.start(GeolocationSensor, ["geolocation"], geo_options);
    }

    get latitude() {
        return this.sensor.latitude;
    }

    get longitude() {
        return this.sensor.longitude;
    }

    get altitude() {
        return this.sensor.altitude;
    }

    get accuracy() {
        return this.sensor.accuracy;
    }

    get altitudeAccuracy() {
        return this.sensor.altitudeAccuracy;
    }

    get heading() {
        return this.sensor.heading;
    }

    get speed() {
        return this.sensor.speed;
    }
}


export class SimpleAccelerometer extends SimpleXYZSensor {
    async start(accelerometer_options) {
        return super.start(Accelerometer, ["accelerometer"], accelerometer_options);
    }
}


export class SimpleGyroscope extends SimpleXYZSensor {
    async start(gyro_options) {
        return super.start(Gyroscope, ["gyroscope"], gyro_options);
    }
}


export class SimpleLinearAccelerationSensor extends SimpleXYZSensor {
    async start(accel_options) {
        return super.start(LinearAccelerationSensor, ["accelerometer"], accel_options);
    }
}


export class SimpleGravitySensor extends SimpleXYZSensor {
    async start(grav_options) {
        return super.start(GravitySensor, ["accelerometer"], grav_options);
    }
}


export class SimpleMagnetometer extends SimpleXYZSensor {
    async start(mag_options) {
        return super.start(window.Magnetometer, ["magnetometer"], mag_options);
    }
}


export class SimpleAbsoluteOrientationSensor extends SimpleOrientationSensor {
    async start(orient_options) {
        return super.start(AbsoluteOrientationSensor, ["accelerometer", "gyroscope", "magnetometer"], orient_options);
    }
}


export class SimpleRelativeOrientationSensor extends SimpleOrientationSensor {
    async start(orient_options) {
        return super.start(RelativeOrientationSensor, ["accelerometer", "gyroscope"], orient_options);
    }
}
