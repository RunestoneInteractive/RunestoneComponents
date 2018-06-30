<h2>Datafile</h2>

        <pre id="example1" content-editable="true">
            def main()
                print("hello world")

            main()
        </pre>

Everything inside of the `<pre>` tag, including whitespace, will be the contents of the file accessible to Activecode elements on the page.  The name of the file that should be opened by code running in Activecode is the same as the id of the datafile element.

 <ul>
    <li>`id` Must be unique in the document.</li>
    <li>`content-editable` If true, the user will be able to edit the contents of the datafile.</li>
 </ul>

The size of the `<pre>` block, as well as whether or not is is hidden, can be set via CSS `width`, `height`, and `display` properties (e.g., `style="display: none;"` to hide the datafile but still make it available to Activecode blocks).
