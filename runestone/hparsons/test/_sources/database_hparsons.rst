More Database Practice
------------------------
.. parsonsprob:: db_create_and_insert_new_hptest
   :adaptive:
   :numbered: left
   :order: 10, 5, 9, 0, 11, 6, 3, 4, 1, 7, 8, 2

   Put the code blocks in order to import the needed module, create the connection, create the cursor, create the table if it does not exist,  insert data into the table if it isn't already there, commit the changes, and then select the data and print it.  Finally close the cursor. 
   -----
   import sqlite3
   =====
   conn = sqlite3.connect('music.sqlite')
   =====
   cur = conn.cursor()
   =====
   # create the table with a key and unique title
   cur.execute('CREATE TABLE IF NOT EXISTS Tracks 
                (id INTEGER PRIMARY KEY, title TEXT UNIQUE, 
                plays INTEGER)')
   =====
   # create the table with a key and unique title
   cur.execute('CREATE TABLE Tracks 
                (id INTEGER PRIMARY KEY, title TEXT UNIQUE, 
                plays INTEGER)') #paired
   =====
   # insert data into the Tracks table
   cur.execute('INSERT OR IGNORE INTO Tracks 
       (title, plays) VALUES (?, ?)',
       ('Thunderstruck', 20))
   cur.execute('INSERT OR IGNORE INTO Tracks 
       (title, plays) VALUES (?, ?)',
       ('My Way', 15))
   =====
   # commit the changes
   conn.commit()
   =====
   print('Tracks:')
   cur.execute('SELECT title, plays FROM Tracks')
   =====
   print('Tracks:')
   conn.execute('SELECT title, plays FROM Tracks') #paired
   =====
   for row in cur:
   =====
       print(row)
   =====
   # close the cursor
   cur.close()


.. fillintheblank:: db_create_table_if_not_exists_hptest
   :casei:

   Fill in the three blanks required to create the table only if it doesn't exist already
    
   .. code-block:: python

       cur.execute('''
          CREATE TABLE [_____][_____][_____] Twitter
          (name TEXT, retrieved INTEGER, friends INTEGER)
       ''')

   - :IF: Correct!
     :.*: Try again! 
   - :NOT: Correct!
     :.*: Try again! 
   - :EXISTS: Correct!
     :.*: Try again! 

.. hparsons:: db_limit_one_hptest
   :language: sql
   :dburl: /_static/hptest.db
   :randomize:

   Arrange the blocks to select names from the table Twitter, and return just one row.
    
   ~~~~
   --blocks--
   SELECT
   name
   FROM
   Twitter
   LIMIT
   1
   WHERE
   2
   --unittest--
   assert 0,0 == Alice
   assert 1,0 == NO_DATA


.. fillintheblank:: db_update_and_set_hptest
   :casei:

   Fill in the two blanks to specify that you want to modify the row where name = acct and want to change the value of retrieved to 1. 
    
   .. code-block:: python

       cur.execute('[_____] Twitter [_____] retrieved=1 WHERE name = ?', (acct, ))

   - :UPDATE: Correct!
     :.*: Try again! 
   - :SET: Correct!
     :.*: Try again! 

.. fillintheblank:: db_insert_into_twitter_fitb_hptest
   :casei:

   Fill in the two blanks to add a new row of data to the Twitter table.

   .. code-block:: python

      cur.execute('''
          [_____] [_____] Twitter (name, retrieved, friends)
          VALUES (?, 0, 1)''', (screenName, ))

   - :INSERT: Correct!
     :.*: Try again! 
   - :INTO: Correct!
     :.*: Try again! 


.. fillintheblank:: db_id_primary_key_fitb_hptest
   :casei:

   Fill in the two blanks to make id a primary key (each row will have a unique value for id).  

   .. code-block:: python

      cur.execute('''
          CREATE TABLE People 
              (id INTEGER [_____] [_____], name TEXT UNIQUE, retrieved INTEGER)
      ''')

   - :PRIMARY: Correct!
     :.*: Try again! 
   - :KEY: Correct!
     :.*: Try again! 


.. fillintheblank:: db_id_insert_or_ignore_hptest
   :casei:

   Fill in the two blanks to only execute the following insert if it does not violate any constraints, such as not allowing duplicate data.

   .. code-block:: python

      cur.execute('''
          INSERT [_____] [_____] INTO People (name, retrieved) 
          VALUES (?, 0)''', (friend, ) )
      ''')

   - :OR: Correct!
     :.*: Try again! 
   - :IGNORE: Correct!
     :.*: Try again! 


.. fillintheblank:: db_unique_tuple_hptest
   :casei:

   Fill in the two blanks to only allow tuples of ``from_id`` and ``to_id`` that are unique.

   .. code-block:: python

      cur.execute('''
          CREATE TABLE IF NOT EXISTS Follows
          (from_id INTEGER, to_id INTEGER, [_____](from_id, [_____]))''')

   - :UNIQUE: Correct!
     :.*: Try again! 
   - :to_id: Correct!
     :.*: Try again! 


.. hparsons:: db_select_retrieved_zero_fitb_hptest
   :language: sql
   :dburl: /_static/hptest.db
   :randomize:

   Arrange the blocks to select ``id`` and ``name`` from the table ``People`` where that person's friends have not been retrieved yet.
   ~~~~
   --blocks--
   SELECT 
   id,name
   FROM
   People   
   WHERE
   retrieved
   = 0
   name
   ON
   --unittest--
   assert 0,0 == 2
   assert 0,1 == Pear
   assert 1,0 == 3
   assert 1,1 == Watermelon