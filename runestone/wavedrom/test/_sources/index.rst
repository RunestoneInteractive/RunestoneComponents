*************
Wavedrom test
*************

.. wavedrom::
    :caption: Two signals, PB1 (the pushbutton) and LED1, change over time.

    signal: [
        {name: 'PB1',  wave: '1.0..1..0..1..', node: '..a..b..c..d', phase: 0.5},
        {name: 'LED1', wave: '0.1.....0....', node: '..f.....g'},
    ], edge: [
     'a~f', 'c~g',
    ],
