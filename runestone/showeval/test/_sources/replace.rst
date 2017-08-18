===========================
Testing: ShowEval Questions
===========================

ShowEval Replace Mode
---------------------

.. showeval:: showEval_0
   :trace_mode: false

   eggs = ['dogs', 'cats', 'moose']
   ~~~~

   ''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)
   {{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)  ##This is a test Comment.
   {{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)
   'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})
   {{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}
