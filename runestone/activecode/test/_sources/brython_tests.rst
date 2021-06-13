:orphan:

Brython ActiveCode Test
=======================

.. activecode:: test_activecode_html
   :language: html

   <html>
      <body onload="brython()">
         <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.9.0/brython.min.js"></script>
         <!-- <button id="button_alert">display an alert box</button> -->
         
         <script type="text/python" >
            
            
            from browser import document, alert, html

            def hello(ev):
                  alert("Hello! I'm using Brython with the :language: html directive")

            document <= html.BUTTON("My button", id="button_alert")
            document["button_alert"].bind("click", hello)

         </script>
      </body>
   </html>



.. activecode:: test_activecode_python3
   :language: python3
   :python3_interpreter: brython 
   
   print("Am I using Brython now?")

