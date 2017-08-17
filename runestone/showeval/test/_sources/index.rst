===========================
Testing: ShowEval Questions
===========================

ShowEval Trace Mode
-------------------

.. showeval:: showEval_0
   :trace_mode: true

   eggs = ['dogs', 'cats', 'moose']
   ~~~~

   ''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)
   {{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)  ##This is a comment and can be, really any length. if it becomes unruly, then a vertical scrollbar will appear to help out!
   {{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)
   'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})
   {{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}


ShowEval Replace Mode
---------------------

.. showeval:: showEval_1
  :trace_mode: false

  eggs = ['dogs', 'cats', 'moose']
  ~~~~

  ''.join({{eggs}}{{['dogs', 'cats', 'moose']}}).upper().join(eggs)
  {{''.join(['dogs', 'cats', 'moose'])}}{{'dogscatsmoose'}}.upper().join(eggs)  ##What is evaluated next?
  {{'dogscatsmoose'.upper()}}{{'DOGSCATSMOOSE'}}.join(eggs)
  'DOGSCATSMOOSE'.join({{eggs}}{{['dogs', 'cats', 'moose']}})
  {{'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])}}{{'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'}}
