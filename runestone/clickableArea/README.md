<h2>Clickable Area</h2>

```html
<div data-component="clickablearea" id="clickable1">
<span data-question>Click on all variable assignment statements</span><span data-feedback>Remember, variable assignment statements usually involve the operator '='.</span>
<pre>
def main():
	<span data-incorrect>print("Hello world")</span>
	<span data-correct>x = 4</span>
	for i in range(5):
		<span data-correct>y = i</span>
		print(y)
	<span data-incorrect>return 0</span>
</pre>
</div>
```
```html
<div data-component="clickablearea"><span data-question>This is the question.</span>
	<table border="1" style="width:100%">
	  <tr id=test>
	    <td data-correct>Table Cell 1</td>
	    <td>Table Cell 2</td>
	    <td><img data-incorrect src="http://images/example.jpg"></td>
	  </tr>
	  <tr data-correct>
	    <td>Table Cell 4</td>
	    <td>Table Cell 5</td>
	    <td>Table Cell 6</td>
	  </tr>
	</table>
</div>
```
Here the <code>div</code> tag represents the entire component to be rendered.

Each element that the author would like to be clickable must have either the <code>data-correct</code> or <code>data-incorrect</code> attribute.
After specifying the <code>data-component</code>, <code>data-question</code> and <code>data-feedback</code> (feedback is optional), the author can create any HTML elements he/she wants, and make any of them clickable with the <code>data-correct</code>/data-incorrect</code> tags. If the author would like to make a block of code with specific areas to be clickable, he/she can create a <code>pre</code> element and wrap the clickable parts of the code in <code>span</code> elements with the <code>data-correct</code>/<code>data-incorrect</code> attributes.

Option spec:
<ul>
    <li><code>data-component="clickablearea"</code> identifies this as a clickable area component</li>
    <li><code>id</code> Must be unique in the document</li>
    <li><code>data-question</code> Identifies a <code>span</code> element that contains the question associated with the component</li>
    <li><code>data-feedback</code> Optional--identifies a <code>span</code> that contains the feedback that is displayed when someone answers incorrectly</li>
    <li><code>data-correct</code> Identifies a correct clickable area</li>
    <li><code>data-incorrect</code> Identifies an incorrect clickable area</li>
</ul>
