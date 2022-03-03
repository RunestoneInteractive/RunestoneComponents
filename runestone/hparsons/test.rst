    .. hparsons:: unqiue_problem_id_here
       :maxdist:
       :order:
       :language:
       :noindent:
       :adaptive:
       :numbered:

       Solve my really cool horizontal Parsons problem...if you can.
       -----
       def findmax(alist):
       =====
          if len(alist) == 0:
             return None
       =====
          curmax = alist[0]
          for item in alist:
       =====
             if item &gt; curmax:
       =====
                curmax = item
       =====
          return curmax
