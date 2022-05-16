=====================
Parsons Tests
=====================

SECTION 1: Parsons Problem
:::::::::::::::::::::::::::::

* Tests block numbers and labels
* Test display messages
* Test dragging blocks
* Test help functionality

.. parsonsprob:: test_parsons_1
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

.. parsonsprob:: test_parsons_2
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



.. parsonsprob:: test_parsons_3
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



.. parsonsprob:: test_parsons_4
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


.. parsonsprob:: test_parsons_5

   Make a program that looks like this:

   .. code-block:: python

      sum = 0
      for i in range(10):
          sum = sum + i

      print(sum)

   -----
   sum = 0
   =====
   for i in range(10):
       sum = sum + i
   =====
   print(sum)


============
Proof Blocks
============

.. parsonsprob:: test_parsons_4
   :language: math
   :grader: dag

   .. raw:: html

    <embed>   Drag and drop <strong style="color:red;">all</strong> of the blocks below to create a proof by induction of the following statement.
      Claim: for all natural numbers \(n\),
      $$
      \sum_{j=0}^n 2(-7)^j = \frac{1-(-7)^{n+1}}{4}
      $$
    </embed>

   -----
   Proof by induction on \(n\). #tag:0;depends:;
   =====
   Inductive Predicate:  \(P(n): \sum_{j=0}^n 2(-7)^j = \frac{1-(-7)^{n+1}}{4}\) #tag:1;depends:0;
   =====
   Base case: At \(n=0\), \(\sum_{j=0}^n 2(-7)^j = 2\) and \(\frac{1-(-7)^{n+1}}{4} = \frac{1-(-7)}{4} = 2\), so the base case, \(P(0)\), holds #tag:2;depends:0,1;
   =====
   Inductive Hypothesis: Suppose that \(P(n):\) \(\sum_{j=0}^n 2(-7)^j = \frac{1-(-7)^{n+1}}{4}\) holds for \(n=0,1,...,k\). #tag:3;depends:1;
   =====
   Inductive Step: We need to show that \(P(k+1):\) \(\sum_{j=0}^{k+1} 2(-7)^j = \frac{1-(-7)^{k+2}}{4}\)  holds #tag:4;depends:3;
   =====
   The left hand side is \(\sum_{j=0}^{k+1} 2(-7)^j = \sum_{j=0}^k 2(-7)^j + 2(-7)^{k+1}\) #tag:5;depends:4;
   =====
   By the inductive hypothesis we have \(\sum_{j=0}^k 2(-7)^j = \frac{1-(-7)^{k+1}}{4}\). So then substituting we get \(= \frac{1-(-7)^{k+1}}{4} + 2(-7)^{k+1}\) \(= \frac{1-(-7)^{k+1} + 8(-7)^{k+1}}{4}\) \(= \frac{1+7(-7)^{k+1}}{4}\) which simplifies to \(= \frac{1-(-7)^{k+2}}{4}\) #tag:6;depends:5;
   =====
   So \(\sum_{j=0}^{k+1} 2(-7)^j = \frac{1-(-7)^{k+2}}{4}\), which was what we needed to show. #tag:7;depends:6;


