<h2>ShowEval</h2>

```html
<div data-childcomponent="showeval" class="runestone explainer alert alert-warning">
    <button class="btn btn-success" id="showEval_0_nextStep">Forward</button>
    <button class="btn btn-default" id ="showEval_0_reset">Reset</button>
    <div class="evalCont" style="background-color: #FDFDFD;"> <br /></div>
    <div class="evalCont" id="unique_id_goes_here"></div>
</div>
```

The body of the of div with `id=unique_id_goes_here` is the container for the animated code. The div placed immediately above the animation container contains any lines that should be displayed sequentially before the animated code.

The directive itself can be written in a page's `.rst` file using the templated syntax below.

```
.. showeval:: unique_id_goes_here
   :trace_mode: boolean

   ~~Prerequisite Information~~

   ~~~~

   ~~Steps~~
```

The following option controls how the animation behaves.

* ``trace_mode`` is a required option that can either be `true` or `false` and dictates which of the two animation modes should be used.

**Trace Mode** (`:trace_mode: true`) will print out a new line for each step of the animation, extending the `evalCont` with `id=unique_id_goes_here` mentioned above.

**Replace Mode** (`:trace_mode: false`) will display and animate a single line presented in the `evalCont` with `id=unique_id_goes_here` mentioned above.


Thanks to Al Sweigart for the inspiration and code that got this feature going!

See:  https://github.com/asweigart/showeval