// ***************************************
// |docname| - Geolocation sensor polyfill
// ***************************************
// @ts-check
"use strict";

import "./sensor.js";

//const slot = __sensor__;

class GeolocationSensorSingleton {
  constructor() {
    if (!this.constructor.instance) {
      this.constructor.instance = this;
    }

    this.sensors = new Set();
    this.watchId = null;
    this.accuracy = null;
    this.lastPosition = null;

    return this.constructor.instance;
  }

  async obtainPermission() {
    let state = "prompt"; // Default for geolocation.
    // @ts-ignore
    if (navigator.permissions) {
      // @ts-ignore
      const permission = await navigator.permissions.query({ name:"geolocation"});
      state = permission.state;
    }

    return new Promise(resolve => {
      const successFn = position => {
        this.lastPosition = position;
        resolve("granted");
      }

      const errorFn = err => {
        if (err.code === err.PERMISSION_DENIED) {
          resolve("denied");
        } else {
          resolve(state);
        }
      }

      const options = { maximumAge: Infinity, timeout: 10 };
      navigator.geolocation.getCurrentPosition(successFn, errorFn, options);
    });
  }

  calculateAccuracy() {
    let enableHighAccuracy = false;

    for (const sensor of this.sensors) {
      if (sensor[slot].options.accuracy === "high") {
        enableHighAccuracy = true;
        break;
      }
    }
    return enableHighAccuracy;
  }

  async register(sensor) {
    const permission = await this.obtainPermission();
    if (permission !== "granted") {
      sensor[slot].notifyError("Permission denied.", "NowAllowedError");
      return;
    }

    if (this.lastPosition) {
      const age = performance.now() - this.lastPosition.timeStamp;
      const maxAge = sensor[slot].options.maxAge;
      if (maxAge == null || age <= maxAge) {
        sensor[slot].handleEvent(age, this.lastPosition.coords);
      }
    }

    this.sensors.add(sensor);

    // Check whether we need to reconfigure our navigation.geolocation
    // watch, ie. tear it down and recreate.
    const accuracy = this.calculateAccuracy();
    if (this.watchId && this.accuracy === accuracy) {
      // We don't need to reset, return.
      return;
    }

    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    const handleEvent = position => {
      this.lastPosition = position;

      const timestamp = position.timestamp - performance.timing.navigationStart;
      const coords = position.coords;

      for (const sensor of this.sensors) {
        sensor[slot].handleEvent(timestamp, coords);
      }
    }

    const handleError = error => {
      let type;
      switch(error.code) {
        case error.TIMEOUT:
          type = "TimeoutError";
          break;
        case error.PERMISSION_DENIED:
          type = "NotAllowedError";
          break;
        case error.POSITION_UNAVAILABLE:
          type = "NotReadableError";
          break;
        default:
          type = "UnknownError";
      }
      for (const sensor of this.sensors) {
        sensor[slot].handleError(error.message, type);
      }
    }

    const options = {
      enableHighAccuracy: accuracy,
      maximumAge: 0,
      timeout: Infinity
    }

    this.watchId = navigator.geolocation.watchPosition(
      handleEvent, handleError, options
    );
  }

  deregister(sensor) {
    this.sensors.delete(sensor);
    if (!this.sensors.size && this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}

// @ts-ignore
const GeolocationSensor = window.GeolocationSensor ||
class GeolocationSensor extends Sensor {
  constructor(options = {}) {
    super(options);

    this[slot].options = options;

    const props = {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    }

    const propertyBag = this[slot];
    for (const propName in props) {
      propertyBag[propName] = props[propName];
      Object.defineProperty(this, propName, {
        get: () => propertyBag[propName]
      });
    }

    this[slot].handleEvent = (timestamp, coords) => {
      if (!this[slot].activated) {
        this[slot].notifyActivatedState();
      }

      this[slot].timestamp = timestamp;

      this[slot].accuracy = coords.accuracy;
      this[slot].altitude = coords.altitude;
      this[slot].altitudeAccuracy = coords.altitudeAccuracy;
      this[slot].heading = coords.heading;
      this[slot].latitude = coords.latitude;
      this[slot].longitude = coords.longitude;
      this[slot].speed = coords.speed;

      this[slot].hasReading = true;
      this.dispatchEvent(new Event("reading"));
    }

    this[slot].handleError = (message, type) => {
      this[slot].notifyError(message, type);
    }

    this[slot].activateCallback = () => {
      (new GeolocationSensorSingleton()).register(this);
    }

    this[slot].deactivateCallback = () => {
      (new GeolocationSensorSingleton()).deregister(this);
    }
  }
}