<h2>Drag n Drop</h2>

```html
<ul data-component="dragndrop" id="dd1">
    <span data-component="question">The Question goes here.</span>
	<span data-component="feedback">This is feedback that is displayed when this is answered incorrectly.</span>

    <li data-component="draggable" id="dd1_drag1">Drag to Answer A</li>
    <li data-component="dropzone" for="dd1_drag1">Answer A</li>

    <li data-component="draggable" id="dd1_drag2">Drag to Answer B</li>
    <li data-component="dropzone" for="dd1_drag2">Answer B</li>

    <li data-component="draggable" id="dd1_drag3">Drag to Answer C</li>
    <li data-component="dropzone" for="dd1_drag3">Answer C</li>


</ul>
```

Here the <code>ul</code> tag represents the entire Drag n Drop component to be rendered.
After declaring the data-component, the author has the option to specify a question and feedback for incorrect answers.
Each <code>li</code> pair of "draggable" and "dropzone" components represents a draggable element and its respective area to be dropped in. The order that these
are declared doesn't matter, as the order is randomized on page load--the author just has to be sure the <code>id</code> and <code>for</code> attributes match.

Option spec:

<ul>
    <li><code>data-component="dragndrop"</code> Identifies this as a drag n drop component</li>
    <li><code>id</code> Must be unique in the document</li>
    <li><code>data-component="question"</code> Optional--Identifies a <code>span</code> that contains the question</li>
    <li><code>data-component="feedback"</code> Optional--Identifies a <code>span</code> that contains the feedback for incorrect answers</li>
</ul>

Option spec for the <code>li</code> tags:

<ul>
    <li><code>data-component="draggable"</code> Identifies a draggable element that will be dropped into a dropzone block</li>
    <li><code>id</code> For the draggable elements--must be unique in the component
    <li><code>data-component="dropzone"</code> Identifies a dropzone component that will receive a draggable element</li>
    <li><code>for</code> For the dropzone components--identifies the correct draggable element (via <code>id</code>) that when dropped into this dropzone, will be registered as correct</li>
</ul>
