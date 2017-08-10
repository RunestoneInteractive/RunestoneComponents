/*
ShowEval, a JS module for creating visualizations of expression evaluation. Mainly for programming tutorials.
0.9.1

Al Sweigart
al@inventwithpython.com
https://github.com/asweigart/
*/

var SHOWEVAL = (function () {
  var thisModule = {};

  thisModule.version = '0.9.1';

  thisModule.ShowEval = function(container, steps, showTrace) {
    this.container = container;
    this.container.addClass('showEval');
    this.steps = steps.slice();
    this.currentStep = 0;
    this.createTrace = showTrace; // TODO - reset doesn't work for traces

    // create elements
    this.currentStepDiv = $('<div>').addClass('currentStepDiv');
    this.container.append(this.currentStepDiv);
    this.currentStepDiv.append($('<span>').addClass('pre'));
    this.currentStepDiv.append($('<span>').addClass('eval'));
    this.currentStepDiv.append($('<span>').addClass('post'));

    // parse steps and turn into a 4-string array: ['pre', 'before eval', 'after eval', 'post']
    for (var i = 0 ; i < this.steps.length; i++) {
      var s = this.steps[i];
      this.steps[i] = [s.substring(0, s.indexOf('{{')), // 'pre'
                       s.substring(s.indexOf('{{') + 2, s.indexOf('}}{{')), // 'before eval'
                       s.substring(s.indexOf('}}{{') + 4, s.indexOf('}}', s.indexOf('}}{{') + 4)), // 'after eval'
                       s.substring(s.indexOf('}}', s.indexOf('}}{{') + 4) + 2)];  // 'post'
    }
    this.reset();
  };

  thisModule.ShowEval.prototype.setNextButton = function(nextButtonSelector) {
    var thisObj = this; // uhg, javascript
    $(nextButtonSelector).click(function() { thisObj.evaluateStep(nextButtonSelector); });
  };

  thisModule.ShowEval.prototype.setResetButton = function(resetButtonSelector) {
    var thisObj = this; // uhg, javascript
    $(resetButtonSelector).click(function() { thisObj.reset(0); });
  };

  thisModule.ShowEval.prototype.reset = function() {
    this.container.find('.previousStep').remove();
    this.setStep(0);
  };

  thisModule.ShowEval.prototype.setStep = function(step) {
    this.currentStep = step;
    newWidth = this.getWidth(this.steps[this.currentStep][1]);
    this.currentStepDiv.children('.eval').width(newWidth);
    this.currentStepDiv.children('.pre').html(this.steps[step][0]);
    this.currentStepDiv.children('.eval').html(this.steps[step][1]);
    this.currentStepDiv.children('.post').html(this.steps[step][3]);
  };

  thisModule.ShowEval.prototype.getWidth = function(text) { // TODO - class style must match or else width will be off.
    var newElem = $("<div>").addClass('showEval evalCont').hide().html(text);
    $('body').append(newElem);
    var newWidth = newElem.width() + 1; // +1 is a hack
    newElem.remove();

    return newWidth;
  };

  thisModule.ShowEval.prototype.createPreviousStepDiv = function(step) {
    this.currentStepDiv.before($('<div>').addClass('previousStep').html(this.steps[step][0] + this.steps[step][1] + this.steps[step][3]));
  };

  thisModule.ShowEval.prototype.evaluateStep = function(buttonId, step) {
    $(buttonId).attr("disabled", true);
    if (step === undefined) {
      step = this.currentStep;
    }
    if (this.currentStep >= this.steps.length) {
      //this.currentStep = 0;
      //step = 0;
      $(buttonId).attr("disabled", false);
      return; // do nothing if on last step
    }
    this.setStep(step);

    var fadeInSpeed = 0;
    if (this.createTrace) {
      this.createPreviousStepDiv(step);
      this.currentStepDiv.hide();
      fadeInSpeed = 200;
    }

    newWidth = this.getWidth(this.steps[step][2]);
    var evalElem = this.currentStepDiv.children('.eval');

    var thisShowEval = this;

    evalElem.css('color', 'red');

    this.currentStepDiv.fadeTo(fadeInSpeed, 1, function() {
      window.setTimeout(function() {
        evalElem.fadeTo(400, 0, function() {
          //evalElem.css('overflow', 'hidden');
          evalElem.animate({width: newWidth, duration: 400}, function() {
            evalElem.html(thisShowEval.steps[step][2]);
            evalElem.fadeTo(400, 1, function() {
              window.setTimeout(function() {
                //evalElem.css('overflow', 'visible');
                evalElem.css('color', '#333');
                thisShowEval.currentStep += 1;
                if (thisShowEval.currentStep < thisShowEval.steps.length) {
                  thisShowEval.setStep(thisShowEval.currentStep);
                }
              }, 600);
            });
          });
        });
      }, 600);
    });
    $(buttonId).attr("disabled", false);
  };

  return thisModule;
}());
