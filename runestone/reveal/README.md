# Reveal

The reveal component allows for hiding a bit of html and then showing when the user clicks a button.  The revealed component can either be displayed inline in the page, or using a bootstrap modal.


```html
<div data-component="reveal" id="reveal_1" data-title="Super cool title" data-showtitle="Reveal Me!" data-hidetitle="Hide Me!">

    <ul data-component="multiplechoice"  data-multipleanswers="true" id="question_1">
        The Question can go right here.
        <li data-component="answer" id="123" >Answer One</li>
	<li data-component="feedback" for="123">Feedback for One</li>

	<li data-component="answer" data-correct id="456">Answer Two</li>
	<li data-component="feedback" for="456">Feedback for Two</li>

	<li data-component="answer" id="789" data-correct>Answer Three</li>
	<li data-component="feedback" for="789">Feedback for Three</li>
    </ul>
</div>
```


<ul>
    <li><code>id</code> Must be unique on the page</li>
    <li><code>data-showtitle</code> Sets the text for the show button</li>
    <li><code>data-hidetitle</code> Sets the text for the hide button</li>
    <li><code>data-modal</code> Causes the revealed content to be shown in a modal rather than inline</li>
    <li><code>data-title</code> Optional, sets the title for the modal popup if modal is being used</li>
</ul>
