### activecode

```html
<pre data-component="activecode" id="example1" data-lang="python">
def main()
    print("hello world")
    
main()
</pre>
```

The body of the ``pre`` tag contains code to be loaded into the editor initially.  The following attributes are options and control what pieces and parts of the component will be visible.

* ``data-component`` attribute identifies this as an activecode component
* ``class``  The usual CSS class options
* ``id`` must be unique in the document
* ``data-lang`` for activecode can be python javascript or html
* ``data-autorun`` run this activecode as soon as the page is loaded
* ``data-hidecode`` make the editor hidden initially
* ``data-include`` list of ids of other activecodes.  The code form each will be prepended to the code to run
* ``data-timelimit`` either False to turn off runtime limit checking or an integer representing the number of milliseconds until timeout.
* ``data-coach``  add a button to display code coach information
* ``data-codelens`` add a button "Run this in Codelens"


For Python to work in the browser you must also obtain and include via a script tag ``skulpt.min.js`` and 
``skulpt-stdlib.js`` along with ``codemirror.js`` and of course ``activecode.js``

Soon, many of these requirements will be incorporated into one handy ``runestone.js`` file.



