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

.. parsonsprob:: test_proof_blocks_1
  :language: math
  :grader: dag

  .. raw:: html

    <embed>
          <p>Drag and drop <font color="red"><strong>ALL</strong></font> of the blocks below to create a proof of the following statement.</p>
        <center><font color="red">If graphs $G$ and $H$ are isomorphic and $G$ is 2-colorable, then $H$ is 2-colorable.</font></center>
    </embed>

  -----
  Assume $G$ and $H$ are isomorphic graphs and $G$ is 2-colorable. #tag:0; depends:;
  =====
  Let $c:V(G) \to \{red, blue\}$ be a 2-coloring of $G$. #tag: 1; depends:0;
  =====
  Let $f$ be an isomorphism $V(H) \to V(G)$ #tag: 2; depends: 0;
  =====
  Define $c':V(H) \to \{red, blue\}$ as $c'(v)=c(f(v))$ #tag:3;depends:1,2;
  =====
  Let $\langle u - v \rangle$ be an edge in $H$. (If instead there are no edges in $H$, then $H$ is trivially 2-colorable and we are done.) #tag:4;depends:0;
  =====
  $\langle f(u) - f(v) \rangle$ is an edge in $G$ #tag:5;depends:4,2;
  =====
  $c(f(u)) \ne c(f(v))$ #tag:6;depends:5,1;
  =====
  $c'(u) \ne c'(v)$ #tag:7;depends:6,3;
  =====
  $c'$ is a 2-coloring of $H$, so $H$ is 2-colorable. (end of proof) #tag:8;depends:7;

============
Code DAG
============

.. parsonsprob:: test_parsons_dag_indent
   :grader: dag

   Test that indentation works with dag

   .. code-block:: python

      def foo:
         if True:
            return 2
      def bar:
         return 40
      print(foo() + bar())

   -----
   def foo(): #tag:foo;depends:;
   =====
      if True: #tag:foo_if; depends:foo;
   =====
         return 2 #tag:f1; depends:foo_if;
   =====
   def bar(): #tag:bar;depends:;
   =====
      return 40 #tag:b1; depends:bar;
   =====
   print(foo() + bar()) #tag:asdf; depends: f1,b1;