ActiveCode Test
===============


.. activecode:: test1

   print("Hello World")


End of test1


.. datafile:: Shape.java
    :hide:
    
    public abstract class Shape {
        String name;
        public Shape(String name) {
            this.name = name;
        }

        public abstract double getArea();

        public String getName() {
            return this.name;
        }
    }

.. activecode:: test2
    :language: java
    :datafile: Shape.java

    public class Square extends Shape {
        double width;
        public Square(String name, double width) {
            super(name);
            this.width = width;
        }

        public double getArea() {
            return width * width;
        }

        public static void main(String args[]) {
            Shape s = new Square("Box", 5);
            System.out.print("Width: " + s.getArea());
        }
    }
