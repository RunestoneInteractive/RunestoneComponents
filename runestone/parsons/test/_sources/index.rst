=====================
Parsons Tests
=====================

SECTION 1: Parsons Problem
:::::::::::::::::::::::::::::

* Tests block numbers and labels
* Test display messages
* Test dragging blocks
* Test help functionality

.. parsonsprob:: Test1
   :adaptive:
   :order: 0 1 2 3 4
   
   need some text ?
   -----
   def fib(num):
   =====
      if num == 0:
          return 0:
   =====
      if num == 1:
          return 1:
   =====
      return fib(num - 1) + fib(num - 2)
   =====
      return fib(num - 1) * fib(num - 2) #paired


Section 2: Labeling

* Numbers right
* Numbers left
* No Numbers

.. parsonsprob:: Test2a
   :order: 0 1 2 3 4
   :numbered: right

   need some text ?
   -----
   def fib(num):
   =====
      if num == 0:
          return 0:
   =====
      if num == 1:
          return 1:
   =====
      return fib(num - 1) + fib(num - 2)
   =====
      return fib(num - 1) * fib(num - 2) #paired



.. parsonsprob:: Test2b
   :order: 0 1 2 3 4
   :numbered: left

   need some text ?
   -----
   def fib(num):
   =====
      if num == 0:
          return 0:
   =====
      if num == 1:
          return 1:
   =====
      return fib(num - 1) + fib(num - 2)
   =====
      return fib(num - 1) * fib(num - 2) #paired



.. parsonsprob:: Test2c
   :order: 0 1 2 3 4

   need some text ?
   -----
   def fib(num):
   =====
      if num == 0:
          return 0:
   =====
      if num == 1:
          return 1:
   =====
      return fib(num - 1) + fib(num - 2)
   =====
      return fib(num - 1) * fib(num - 2) #paired