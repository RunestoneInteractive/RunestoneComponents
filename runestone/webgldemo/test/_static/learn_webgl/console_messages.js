/**
 * console_messages.js, By Wayne Brown, Fall 2017
 *
 * A class to track and display messages. Messages are always displayed
 * to the Javascript console window. For webglinteractive directive applications
 * the messages are also displayed to the output div textarea.
 */

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 C. Wayne Brown
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

/**
 * A class for storing information messages for webglinteractive applications.
 *
 * @param id The runestone identifier for the webglinteractive directive
 * @constructor
 */
window.ConsoleMessages = function (id) {

  let self = this;

  let errors_are_visible;     // Boolean: if true, display error messages.
  let warnings_are_visible;   // Boolean: if true, display warning messages.
  let info_are_visible;       // Boolean: if true, display info messages.
  let number_messages;        // Integer: the number of messages stored.
  let error_messages;         // Array of strings
  let warning_messages;       // Array of strings
  let info_messages;          // Array of strings
  let error_messages_order;   // Array of integer indexes
  let warning_messages_order; // Array of integer indexes
  let info_messages_order;    // Array of integer indexes
  let messages;               // All messages in one string

  let console_id;  // The id of the <div> element to display messages.

  //-----------------------------------------------------------------------
  self.showErrors = function (event) {
    errors_are_visible = $("#" + id + "_webgl_displayErrors").is(':checked');
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  self.showWarnings = function (event) {
    warnings_are_visible = $("#" + id + "_webgl_displayWarnings").is(':checked');
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  self.showInfo = function (event) {
    info_are_visible = $("#" + id + "_webgl_displayInfo").is(':checked');
    _updateScreen(self);
  };

  //-----------------------------------------------------------------------
  function _output_div() {
    if (document.getElementById(id + "_webgl_output_div")) {
      console_id = "#" + id + "_webgl_output_div";

      // Register the callbacks for the display check boxes
      $("#" + id + "_webgl_displayInfo").on('click', self.showInfo);
      $("#" + id + "_webgl_displayWarnings").on('click', self.showWarnings);
      $("#" + id + "_webgl_displayErrors").on('click', self.showErrors);
      return true;
    }
    return false;
  }

  //-----------------------------------------------------------------------
  self.displayError = function (error_message) {
    console.log("ERROR: " + error_message);
    error_messages.push(error_message);
    error_messages_order.push(number_messages);
    _addError(error_message);
    number_messages += 1;
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  self.displayWarning = function (warning_message) {
    console.log("WARNING: " + warning_message);
    warning_messages.push(warning_message);
    warning_messages_order.push(number_messages);
    _addWarning(warning_message);
    number_messages += 1;
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  self.displayInfo = function (info_message) {
    console.log(info_message);
    info_messages.push(info_message);
    info_messages_order.push(number_messages);
    _addInfo(info_message);
    number_messages += 1;
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  self.clearMessages = function () {
    number_messages = 0;
    messages = "";
    error_messages = [];
    error_messages_order = [];
    warning_messages = [];
    warning_messages_order = [];
    info_messages = [];
    info_messages_order = [];
    _updateScreen();
  };

  //-----------------------------------------------------------------------
  function _addError(error_message) {
    if (errors_are_visible) {
      messages += '<div class="webgl_errorMessages">' + error_message + '</div>';
    }
  }

  //-----------------------------------------------------------------------
  function _addWarning(warning_message) {
    if (warnings_are_visible) {
      messages += '<div class="webgl_warningMessages">' + warning_message + '</div>';
    }
  }

  //-----------------------------------------------------------------------
  function _addInfo(info_message) {
    if (info_are_visible) {
      messages += '<div class="webgl_infoMessages">' + info_message + '</div>';
    }
  }

  //-----------------------------------------------------------------------
  function _buildDisplay() {
    let n = 0;
    let e = 0;
    let w = 0;
    let i = 0;
    messages = "";
    while (n < number_messages) {
      if (n === error_messages_order[e]) {
        _addError(error_messages[e]);
        e += 1;
      } else if (n === warning_messages_order[w]) {
        _addWarning(warning_messages[w]);
        w += 1;
      } else if (n === info_messages_order[i]) {
        _addInfo(info_messages[i]);
        i += 1;
      }
      n += 1;
    }
  }

  //-----------------------------------------------------------------------
  function _updateScreen() {
    if (_output_div()) {
      _buildDisplay();
      $(console_id).html(messages);
    }
  }

  //-----------------------------------------------------------------------
  // Constructor

  errors_are_visible = true;
  warnings_are_visible = true;
  info_are_visible = true;
  number_messages = 0;
  self.clearMessages();
};

