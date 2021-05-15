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
// ********************************************
// |docname| - Polyfill for the Permissions API
// ********************************************
// This is primarily for iOS devices that don't provide Permissions, but use another method to allow access to various sensors.

"use strict";

// Only supply this if there's not Permissions and we have tne iOS flavor available. See sample code in https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2 or the `W3C working draft <https://www.w3.org/TR/orientation-event/#deviceorientation>`_.
if (
    !navigator.permissions &&
    (typeof DeviceMotionEvent.requestPermission === "function") &&
    (typeof DeviceOrientationEvent.requestPermission === "function")
) {
    navigator.permissions = {
        query: options => {
            // Ignore everything but the name, since our use case is only for SimpleSensor.
            switch (options.name) {
                case "accelerometer":
                case "gyroscope":
                // The requested permissions doesn't allow us to determine which of the following two permissions we need, so ask for both.
                return new Promise((resolve, reject) => {
                    Promise.all([
                        // The polyfill for the accelerometer, gyro, and related classes needs just this.
                        DeviceMotionEvent.requestPermission(),
                        // The polyfill for the orientation sensors needs just this.
                        DeviceOrientationEvent.requestPermission()
                    ]).then(
                        // We now have an array of strings, the result of the requestPermission calls. If all are "granted", then return {state: "granted"}, else return {state: "denied"}.
                        vals => resolve({state:
                            (vals.every(x => x === "granted") ? "granted" : "denied")
                        })
                    )
                });

                // There's nothing else that needs permission to work.
                default:
                return Promise.resolve({state: "granted"});
            }
        }
    };
}
