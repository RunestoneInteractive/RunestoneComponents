<h2>Clickable Area</h2>

```html
<pre data-component="clickablearea" id="clickable1">
    <span data-question>Click on all variable assignment statements</span><span data-feedback>Remember, variable assignment statements usually involve the operator '='.</span>def main():
	<span data-incorrect>print("Hello world")</span>
	<span data-correct>x = 4</span>
	for i in range(5):
		<span data-correct>y = i</span>
		print(y)
	<span data-incorrect>return 0</span>
</pre>
```
Here the <code>pre</code> tag represents the entire component to be rendered.
Each area that the author would like to be clickable is wrapped in a <code>span</code> tag that has the <code>data-correct</code> or <code>data-incorrect</code> attribute.
After specifying the data-component, question and feedback (optional), the author can start his/her block of code, indented as he/he would like, using <code>span</code> elements to identify the clickable parts of the code.

Option spec:
<ul>
    <li><code>data-component="clickablearea"</code> identifies this as a clickable area component</li>
    <li><code>id</code> Must be unique in the document</li>
    <li><code>data-question</code> Identifies a <code>span</code> element that contains the question associated with the component</li>
    <li><code>data-feedback</code> Optional--identifies a <code>span</code> that contains the feedback that is displayed when someone answers incorrectly</li>
    <li><code>data-correct</code> Identifies a correct clickable area</li>
    <li><code>data-incorrect</code> Identifies an incorrect clickable area</li>
</ul>
