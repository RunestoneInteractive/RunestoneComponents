==============
CodeLens Tests
==============

.. Here is were you specify the content and order of your new book.

.. Each section heading (e.g. "SECTION 1: A Random Section") will be
   a heading in the table of contents. Source files that should be
   generated and included in that section should be placed on individual
   lines, with one line separating the first source filename and the
   :maxdepth: line.

.. Sources can also be included from subfolders of this directory.
   (e.g. "DataStructures/queues.rst").

.. codelens:: test_codelens_1

   a = [1, 2, 3]
   b = [4, 5, 6]
   b[1] = 5
   print (a+b)

You can make a Codelens by providing the raw trace data in the source as an option.

.. codelens:: test_codelens_2
    :language: java
    :tracedata: {"code":"public class Test { public static void main(String[] args)\n { int x=42;\n x+=1;\n x+=1; x+=1;} }","stdin":"","trace":[{"stdout":"","event":"call","line":2,"stack_to_render":[{"func_name":"main:2","encoded_locals":{},"ordered_varnames":[],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"1","frame_id":1}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":2,"stack_to_render":[{"func_name":"main:2","encoded_locals":{},"ordered_varnames":[],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"2","frame_id":2}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":3,"stack_to_render":[{"func_name":"main:3","encoded_locals":{"x":42},"ordered_varnames":["x"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"4","frame_id":4}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":4,"stack_to_render":[{"func_name":"main:4","encoded_locals":{"x":43},"ordered_varnames":["x"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"6","frame_id":6}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":4,"stack_to_render":[{"func_name":"main:4","encoded_locals":{"x":44},"ordered_varnames":["x"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"8","frame_id":8}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"step_line","line":4,"stack_to_render":[{"func_name":"main:4","encoded_locals":{"x":45},"ordered_varnames":["x"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"9","frame_id":9}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}},{"stdout":"","event":"return","line":4,"stack_to_render":[{"func_name":"main:4","encoded_locals":{"x":45,"__return__":["VOID"]},"ordered_varnames":["x","__return__"],"parent_frame_id_list":[],"is_highlighted":true,"is_zombie":false,"is_parent":false,"unique_hash":"10","frame_id":10}],"globals":{},"ordered_globals":[],"func_name":"main","heap":{}}],"userlog":"Debugger VM maxMemory: 444M\n"}


.. activecode:: active1

   print("hello world")


Lets test Java now by providing the source.

.. codelens:: test_codelens_3
    :language: java

    public class Test1
    {
       public static void main(String[] args)
       {
       String start = "Happy Birthday";
       String name = "Jose";
       String result = start + " " + name;  // add together strings
       result += "!"; // add on to the same string
       System.out.println(result);
       }
    }

.. codelens:: test_codelens_4
    :language: c

    #include <stdlib.h>

    typedef struct {
       int account_number;
       double balance;
       unsigned long moneys[5];
    } Account;
    int main() {
      Account my_account;
      my_account.account_number = 42;
      my_account.balance = 3.1415;
      my_account.moneys[1] = 123;
      my_account.moneys[3] = 456;
    }


.. codelens:: test_codelens_5

   a = [1, 2, 3]
   b = [4, 5, 6]
   b[1] = 5
   print (a+b)

.. codelens:: codelens_question
    :question: What is the value of tot after the line with the red arrow executes?
    :breakline: 4
    :feedback: Use the global variables box to look at the current values of tot and i.
    :correct: globals.tot

    tot = 0
    prod = 1
    for i in range(10):
       tot = tot + i
       prod = prod * i


.. codelens:: test_codelens_6
    :language: cpp

    // From the test suite of https://github.com/codespecs/daikon
    //   daikon/tests/kvasir-tests/

    // Adapted for Kvasir regression tests by Philip Guo

    //: C04:Stack.h
    // From Thinking in C++, 2nd Edition
    // Available at http://www.BruceEckel.com
    // (c) Bruce Eckel 2000
    // Copyright notice in Copyright.txt
    // Nested struct in linked list

    #include <stdlib.h>
    #include <string.h>
    #include <iostream>

    using namespace std;

    class Stack {
    public:
    void push(char* dat);
    char* peek();
    char* pop();
    char* getName();
    Stack(char* name);
    static int getNumStacksCreated();
    static int publicNumLinksCreated;
    ~Stack();

    private:
    int numElements;
    char* myName;
    static int numStacksCreated;
    int privateStuff();

    struct Link {
       char* data;
       Link* next;
       void initialize(char* dat, Link* nxt);
    }* head;
    };


    int Stack::numStacksCreated;
    int Stack::publicNumLinksCreated;

    int Stack::getNumStacksCreated() {
    return Stack::numStacksCreated;
    }

    void
    Stack::Link::initialize(char* dat, Link* nxt) {
    data = dat;
    next = nxt;
    }

    Stack::Stack(char* name) {
    myName = strdup(name);
    Stack::numStacksCreated++;
    head = 0;
    numElements = 0;
    }

    Stack::~Stack() {
    free(myName);
    }


    char* Stack::getName() {
    cout << "Private stuff: " << privateStuff() << endl;
    return myName;
    }

    int Stack::privateStuff() {
    return 42;
    }

    void Stack::push(char* dat) {
    Link* newLink = new Link;
    newLink->initialize(dat, head);
    head = newLink;
    numElements++;
    Stack::publicNumLinksCreated++;
    }

    char* Stack::peek() {
    return head->data;
    }

    char* Stack::pop() {
    if(head == 0) return 0;
    char* result = head->data;
    Link* oldHead = head;
    head = head->next;
    delete oldHead;
    numElements--;
    return result;
    }


    int main() {
    Stack first((char*)"My first stack");

    first.push((char*)"First line");
    first.push((char*)"Second line");
    first.push((char*)"Third line");
    first.push((char*)"Fourth line");
    first.push((char*)"Fifth line");

    // Pop the lines from the Stack and print them:
    char* s;

    cout << first.getName() << ":" << endl;

    while((s = first.pop()) != 0) {
       cout << s << endl;
    }

    cout << "numStacksCreated: " << Stack::getNumStacksCreated() << endl;
    cout << "publicNumLinksCreated: " << Stack::publicNumLinksCreated << endl;

    Stack second((char*)"My second stack");

    second.push((char*)"Uno");
    second.push((char*)"Dos");
    second.push((char*)"Tres");
    second.push((char*)"Cuatro");

    cout << endl << second.getName() << ":" << endl;

    // Pop the lines from the Stack and print them:
    while((s = second.pop()) != 0) {
       cout << s << endl;
    }

    cout << "numStacksCreated: " << Stack::getNumStacksCreated() << endl;
    cout << "publicNumLinksCreated: " << Stack::publicNumLinksCreated << endl;
    }


.. codelens:: codelens_question_line
    :question: After the line with the red arrow is executed, which will be next?
    :breakline: 3
    :feedback: Remember that in an if/else statement only one block is executed.
    :correct: line

    x = 2
    y = 0
    if x % 2 == 1:
        print('x is odd')
        y = y + x
    else:
        print('x is even')
        y = y - x