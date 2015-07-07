<h2>Datafile</h2>

        <pre data-component="datafile" id="example1" data-rows=10 data-cols=50 data-hidden data-edit="true">
            def main()
                print("hello world")

            main()
        </pre>

Everything inside of the `<pre>` tag, including whitespace, will be the contents of the file accessible to Activecode elements on the page.  The name of the file that should be opened by code running in Activecode is the same as the id of the datafile element.

 <ul>
    <li>`id` Must be unique in the document.</li>
    <li>`data-edit` If true, the user will be able to edit the contents of the datafile.</li>
    <li>`data-rows` and `data-cols` If `data-edit` is enabled, these determine the size of the text area that is created to hold the file.</li>
    <li>`data-hidden` If present the file contents won't be displayed on the page.  Not compatible with `data-edit`.</li>
 </ul>
