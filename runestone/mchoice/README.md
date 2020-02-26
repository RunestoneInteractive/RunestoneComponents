<h2>Multiple Choice</h2>

		<ul data-component="multiplechoice" data-multipleanswers="true" data-random id="question-1">
			The Question can go right here.

			<li data-component="answer" id="123" >Answer One</li>
			<li data-component="feedback" for="123">Feedback for One</li>

			<li data-component="answer" id="456">Answer Two</li>
			<li data-component="feedback" for="456">Feedback for Two</li>

			<li data-component="answer" id="789" data-correct>Answer Three</li>
			<li data-component="feedback" for="789">Feedback for Three</li>

			<li data-component="answer" id="1011" data-correct>Answer Four</li>
			<li data-component="feedback" for="1011">Feedback for Four</li>

			<li data-component="answer" id="1112" data-correct>Answer Five</li>
			<li data-component="feedback" for="1112">Feedback for Five</li>
		</ul>

Here the <code>ul</code> tag represents the entire component to be rendered.  
Each 2 <code>li</code> answer/feedback pair represents a possible answer to the question and the feedback to be provided if that answer is selected.

<ul>
	<li><code>data-component</code> identifies this as a multiple choice component</li>
	<li><code>class</code> Standard CSS class options </li>
	<li><code>id</code> must be unique in the document</li>
	<li><code>data-multipleanswers</code> REQUIRED Attribute.  Possible values are true and false.  Determines whether the question can take one or more answers on submission (radio vs checkbox).</li>
	<li><code>data-random</code> Randomizes the order that the possible answers are displayed on the page</li>
	<br />
	<p>Attributes of the question tags</p>
	<br />
	<li><code>id</code> must be unique per MC component</li>
	<li><code>for</code> must match the id of the option that the feedback is for</li>
	<li><code>data-correct</code> indicates that this option is a correct answer.  If <code>data-multipleanswers</code> is true, all answers with the attribute will be considered correct, otherwise the first answer with the <code>data-correct></code> attribute will be considered correct.</li>
</ul>

<h2>Fill In the Blank</h2>

		<p data-component="fillintheblank" data-casei="false" id="fill1412" >
	        <span data-blank>Without using the activecode infixToPostfix function, convert the following expression to postfix <code>10 + 3 * 5 / (16 - 4)</code>
				<span data-answer id="blank2_answer">\\b10\\s+3\\s+5\\s*\\*\\s*16\\s+4\\s*-\\s*/\\s*\\+</span>

		        <span data-feedback="regex" id="feedback1">10.*3.*5.*16.*4</span>
		        <span data-feedback="text" for="feedback1">The numbers appear to be in the correct order check your operators</span>

		        <span data-feedback="regex" id="feedback2">.*</span>
		        <span data-feedback="text" for="feedback2">Remember the numbers will be in the same order as the original equation</span>
			</span>
		</p>

Here the <code>p</code> tag represents the entire component.
The <code>data-blank</code><code>span</code>Holds the question text.
The <code>data-answer</code><code>span</code>Holds the correct regular expression.
Each regex,text <code>span</code> pair represents a point of feedback for incorrect answers.

Multiple blanks can also be put into the same FITB question as shown here.

		<p data-component="fillintheblank" data-casei="false" id="fill1412" >

	        <span data-blank>Give me a string that has an 'e' in it. Now.<span data-answer id="blank2_answer">e</span>
		        <span data-feedback="regex" id="feedback1">f</span>
				<span data-feedback="text" for="feedback1">Oops</span>

	        	<span data-feedback="regex" id="feedback2">.*</span>
	        	<span data-feedback="text" for="feedback2">There's no e there!</span>
	        </span>

	        <span data-blank>Gimme an f. Please.<span data-answer id="blank12_answer">f</span>
		        <span data-feedback="regex" id="feedback3">e</span>
		        <span data-feedback="text" for="feedback3">Wrong.</span>

		        <span data-feedback="regex" id="feedback4">.*</span>
		        <span data-feedback="text" for="feedback4">There's no f in that string!</span>
	        </span>

			<span data-blank>Show me 44!<span data-answer id="blank3_answer">44</span>
		        <span data-feedback="regex" id="feedback5">1</span>
		        <span data-feedback="text" for="feedback5">nope</span>

		        <span data-feedback="regex" id="feedback6">4</span>
		        <span data-feedback="text" for="feedback6">close</span>

		        <span data-feedback="regex" id="feedback7">.*</span>
		        <span data-feedback="text" for="feedback7">Sorry bro</span>
			</span>
		</p>

<ul>
	<li><code>data-casei</code> Determines if the answer is case insensitive</li>
	<li><code>id</code> Must be unique in the document</li>

</ul>

<h2>Timed</h2>

		<ul data-component="timedAssessment" data-time id="timed_1">
			<ul data-component="multiplechoice"  data-multipleanswers="true" data-random id="question_1">
				The Question can go right here.
				<li data-component="answer" id="123" >Answer One</li>
				<li data-component="feedback" for="123">Feedback for One</li>

				<li data-component="answer" id="456">Answer Two</li>
				<li data-component="feedback" for="456">Feedback for Two</li>

				<li data-component="answer" id="789" data-correct>Answer Three</li>
				<li data-component="feedback" for="789">Feedback for Three</li>
			</ul>

			<ul data-component="multiplechoice" id="question_2">
				The Question can go right here.
				<li data-component="answer" id="123" >Answer One</li>
				<li data-component="feedback" for="123">Feedback for One</li>

				<li data-component="answer" id="456">Answer Two</li>
				<li data-component="feedback" for="456">Feedback for Two</li>

				<li data-component="answer" id="789" data-correct>Answer Three</li>
				<li data-component="feedback" for="789">Feedback for Three</li>
			</ul>

			<p data-component="fillintheblank" data-casei="false" id="fill1412" >

				<span data-blank>Give me a string that has an 'e' in it. Now.<span data-answer id="blank2_answer">e</span>

				<span data-feedback="regex" id="feedback1">f</span>
				<span data-feedback="text" for="feedback1">Oops</span>

				<span data-feedback="regex" id="feedback2">.*</span>
				<span data-feedback="text" for="feedback2">There's no e there!</span>

				</span>
			</p>
		</ul>

Here the outermost <code>ul</code> tag marks the timed element, and the tags inside represent the questions in the timed assessment.

Currently only 1 timed assessment is allowed per page.

<ul>
	<li><code>data-time</code> Can either be set equal to the time limit for the assessment in minutes or left blank, in which case the assessment will keep track of how long it takes to complete the assessment.</li>
	<li><code>id</code> Must be unique in the document</li>
	<li><code>data-no-result</code> If present, it won't display the score to the user after the assessment is finished</li>
	<li><code>data-no-feedback</code> If present, feedback won't be displayed.</li>

</ul>
