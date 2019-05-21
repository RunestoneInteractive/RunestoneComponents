#Parsons problem

The parsons problem allows for giving students simple programming problems where the code is already there but not indented or in the correct order.  They drag-and-drop lines of code into the proper order.

Each line of code is delimited by `---` and the indentation of the line is the same as the indentation of that line in the markup.

```html
<pre  data-component="parsons" id="example1">
    <span data-question>This is the question</span>
x = 0
---
for i in range(10)
---
  x = x + 1
---
print(x)
</pre>
```



The master repository for the parsons problems code is https://github.com/vkaravir/js-parsons.git

If you want to make customizations ONLY for runestone you should use the RunestoneComponents repository https://github.com/RunestoneInteractive/RunestoneComponents
