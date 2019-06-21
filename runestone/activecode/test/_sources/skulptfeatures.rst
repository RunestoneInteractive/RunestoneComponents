:orphan:

Test Some ActiveCode Features in Skulpt
=======================================

.. activecode:: ac9_13_1

    fileconnection = open("olympics.txt", 'r')
    lines = fileconnection.readlines()
    header = lines[0]
    field_names = header.strip().split(',')
    print(field_names)
    for row in lines[1:]:
        vals = row.strip().split(',')
        if vals[5] != "NA":
            print("{}: {}; {}".format(
                    vals[0],
                    vals[4],
                    vals[5]))


.. datafile:: olympics.txt

    Name,Sex,Age,Team,Event,Medal
    A Dijiang,M,24,China,Basketball,NA
    A Lamusi,M,23,China,Judo,NA
    Gunnar Nielsen Aaby,M,24,Denmark,Football,NA
    Edgar Lindenau Aabye,M,34,Denmark/Sweden,Tug-Of-War,Gold



.. activecode:: alt_kiva_bar1
    :nocodelens:

    import altair

    data = altair.Data(customer=['Alice', 'Bob', 'Claire'], cakes=[5,9,7], flavor=['chocolate', 'vanilla', 'strawberry'])
    chart = altair.Chart(data)
    mark = chart.mark_bar()
    enc = mark.encode(x='customer:N',y='cakes',color='flavor:N')
    enc.display()
    print("mark =", enc.json['mark'])
    print(enc.json['encoding']['x'])


.. raw:: html

    <img src="./_static/LutherBellPic.jpg" id="luther.jpg" alt="image of Luther College bell picture">



.. activecode::  ac14_7_2
    :nocodelens:

    import image
    img = image.Image("luther.jpg")
    win = image.ImageWin(img.getWidth(), img.getHeight())

    print(img.getWidth())
    print(img.getHeight())

    p = img.getPixel(45, 55)
    print(p.getRed(), p.getGreen(), p.getBlue())
    img.draw(win)


