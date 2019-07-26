---
layout: 'post'
title: 'python intro 1'
permalink: 'aiacademy/week1/python-intro-1'
tags: aiacademy python
---

>哈 前面跳過

### 1. 看 AIA serve 怎麼用~
<iframe  src="https://www.youtube.com/embed/Fmo_Ra4W2Ic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   
   - serve 網址: [https://hub.tpe.aiacademy.tw/](https://hub.tpe.aiacademy.tw/){:target="_back"}
      - 選一GPU
      - jupyter notebook: tree / lab 模式
         - Lab: https://hub.tpe.aiacademy.tw/user/__學號__/`lab`
         - tree: https://hub.tpe.aiacademy.tw/user/__學號__/`tree`
   
   - 不使用:
      - Hub -> Control Panel -> __Stop My Server__
      - 左邊 running 關掉 開啟的 running

   - Terminal 使用:
      - 複製 `檔案路徑` 到 `目標路徑`
        ~~~
        cp -r 檔案路徑 目標路徑
        ~~~

      - 刪除 directory __我的最愛:heart:__
        ~~~
        rm -r mydir
        ~~~

###2. Python 程式設計

- Basic Syntax
   
   ~~~python
   # assignment
   a = 1
   b = c = 5

   # assign multiple objects to multple variables.
   a, b, c = 1, 2, "John"
   ~~~

   - Data Type
      ~~~python
      counter = 100 # integer
      miles = 1000.0 # floating
      name = "John" # string
      
      # check type
      print(type(name)) # str
      ~~~
   
   - Arithmetic Operators
      ~~~python
      add = 1 + 1 # 2
      sub = 1 - 1 # 0
      div = 4 / 2 # 2
      mod = 4 % 3 # 1
      mul = 2 * 3 # 6
      f_div = 5 // 2 # 2
      power = 2 ** 3 # 8 
      ~~~
   
   - Comparison Operators
      ~~~python
      a, b = 10, 20

      a == b # False
      a != b # True
      a < b # True
      a > b # False
      a <= # True
      a >= # False
      ~~~
   
   - Built-in Functions 
      ~~~python
      # print() type() int() str()
      
      integer = 123
      string = "456"
   
      s_to_i = int(string) # int now
      i_to_s = str(integer) # str now
      ~~~

- Data Structures
   
   - Numbers
      ~~~python
      # int float complex
      
      print(type(5)) # int
      
      print(type(5.0)) # float
      
      c = 5 + 3j
      print(type(c)) # complex
      ~~~
    
    - Lists
       ~~~python
       # empty list
       my_list = []

       # list of integers
       my_list = [1, 2, 3]

       # list with mixed datatypes
       my_list = [1, "hello", 2.3]

       # nested list
       my_list = ["mouse", [8, 4, 6]]
       ~~~
    
    - List-index 
       ~~~python
       my_list =['h', 'e', 'l', 'l', 'o']

       print(my_list[0]) # h

       print(my_list[1]) # h
       
       # Nested List
       n_list = ["Happy", [2,0,1,9]]
       print(n_list[1][3]) # 9
       ~~~
   
    - List-nefative indexing
       ~~~python
       my_list = ['p', 'r', 'o', 'b', 'e']

       print(my_list[-1]) # e
       print(my_list[-5]) # p
       ~~~

    - List-Slicing
       ~~~python
       my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8]

       print(my_list[2:5]) # 2 3 4

       print(my_list[:-5]) # 0 1 2 3

       print(my_list[5:]) # 5 6 7 8

       print(my_list[:]) # 0 1 2 3 4 5 6 7 8

       print(my_list[::3]) # 0 3 6
       ~~~

    - Built-in List Methos
       ~~~python
       num_list = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8]

       # append()
       num_list.append(9) # [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

       # remove(element) not index!!
       # 只移除掉一個唷~
       num_list.remove(0) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
       num_list.remove(9) # [0, 1, 2, 3, 4, 5, 6, 7, 8]

       # index() method finds the given element in a list and returns its position.
       num_list.index(5) # 5

       # pop() takes a single argument (index) and removes the element present at that inde from the list
       result = num_list.pop(3)
       print(result) # 3

       print(num_list) # [0, 1, 2, 4, 5, 6, 7, 8]
       ~~~
    
    - Tuples: 元素不能被修改
       ~~~python
       my_tuple = ()
       print(my_tuple) # ()
       
       my_tuple = (1, 2, 3)
       print(my_tuple) # (1, 2, 3)
       ~~~
    
    - Strings
      ~~~python
      my_string = "YA"
      my_string2 = 'YA'

      # my_str

      my_str = "Hello World!"
      print(my_str[0]) # H
      print(my_str[-1]) # !

      # slicing 3nd to 5th character
      print(my_str[2:5]) # llo
      ~~~

    - Built-in Strings Methods 
      ~~~python
      my_string = "hello world"

      # find()
      print(my_string.find("he")) # 0
      
      # capitalize()
      print(my_string.capitalize()) # Hello world

      # upper()
      print(my_string.upper()) # HELLO WORLD

      # endswith
      print(my_string.endswith("d")) # True

      # split()
      print(my_string.split(" ") # ['hello', 'world']

      # replace()
      print(my_string.replace("hello", "顆顆顆")) # 顆顆顆 world
      ~~~
    
    - Sets: 無重複、無排序、不可更改
       ~~~python
       # set of integers
       my_set = {1, 2, 3}

       # set of mixed datatypes
       my_set = {1.0, "Hello", (1, 2, 3)}
       print(my_set) # {"Hello", 1.0, (1, 2, 3)}

       # mathematical set operations
       set_1 = set(['s', 'p', 'a', 'm'])
       set_2 = set(['h', 'a', 'm'])

       # union, intersection
       print(set_1 | set_2) # {'h', 'p', 'm', 's', 'a'}
       print(set_1 & set_2) # {'a', 'm'}

       # symmetric difference
       print(set_1 - set_2) # {'s', 'p'}
       ~~~
    
    - Dictionary: 無序的
       ~~~python
       # empty dictionary
       my_dict = {}

       # dictionary with integer keys
       my_dict = {1: 'a', 2: 'b'}

       # dictionary with mixed keys
       my_dict = {'name': 'Tom', 1:23}

       # Another define
       my_dict = dict()

       # add elements
       my_dict['One'] = '1'
       my_dict['OneTwo'] = 12
       print(my_dict) # {'One': '1', 'OneTwo': 12}

       # update value
       my_dict['One'] = 111 # {'One': 111, 'OneTwo': 12}

       # Merge two lists to a dictionary 
       names = ['One', 'Two', 'Three', 'Four', 'Five']
       numbers = [1, 2, 3, 4, 5]
       merged_dict = dict(zip(names, numbers)) # {'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5}
       ~~~
    
    - Dictionary Methods
       ~~~python
       my_dict = {'name': 'Jack', 'age': 16, 'gender': 'man'}

       # remove a particular item 
       print(my_dict.pop('gender')) # man
       print(my_dict) # {'name': 'Jack', 'age': 16}

       # Returns view of dictionsr's (key, value) pair
       print(my_dict.items()) # dict_items([('name', 'Jack'), ('age', 16)])

       # Return a new view ofthe dictionary's keys
       print(my_dict.keys()) # dict_keys(['name', 'age'])

       # remove all items
       my_dict.clear() # {}
       ~~~

   


- Control flow 
    - if
       ~~~python
       num = 3 
       if num > 0:
           print(num, "is a positive number.")
       
       num = -1 
       if num > 0:
           print(num, "is a positive number.")

       ## Output: 3 is a positive number.
       ~~~
    - if ... else
       ~~~python
       num = -1
       if num >= 0:
           print(num, "Positive or Zero")
       else:
           print(num, "is a Negative number")

       ## Output: -1 is a Negative number.
       ~~~

    - if ... elif ... else
       ~~~python
       num = 0
       if num > 0:
           print("Positive number")
       elif num == 0:
           print("Zero")
       else:
           print("Negative number")

       ## Output: Zero
       ~~~

    - Logical - or, and 
       ~~~python
       num = 5

       if num == 0 or num ==1:
           print("Zero or One")
       elif num >= 2 and num <= 10:
           print("From 2 to 10")
       else:
           print("More")

       ## Output: From 2 to 10
       ~~~
    
    - is, not
       ~~~python
       num = 4

       # num == 4
       if num is 4:
           print("num is 4")
       
       # num != 6
       if num is not 6:
           print("num is not 6")
       
       # !(num == 5)
       if not num ==5:
           print("num is not 5")

       # !(num==7)
       if not num is 7:
           print("num is not 7")
       ~~~
    - For loop
       ~~~python
       numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
       sum = 0

       for val in numbers:
          sum = sum + val
       
       print("This sum is", sum) #The sum is 55
       ~~~
    - For loop with range()
       ~~~python
       # range(stop)
       # range(start, stop[, step])

       numbers = [1, 2, 3, 4, 5, 6]

       for i in range(len(numbers)):
           print("numbers ", numbers[i]) 
       
       # Output
       # number 1
       # number 2
       # number 3
       # number 4
       # number 5
       # number 6

       for i in range(0, len(numbers), 2):
           print("2 steps", numbers[i])

        # output
        # 2 steps 1
        # 2 steps 3
        # 2 steps 5
       ~~~

    - For loop with enumerate()
       ~~~python
       pets = ('Dogs', 'Cats', 'Turtles', 'Rabbits')

       for index, pet in enumerate(pets):
           print(index, pet)

       # output
       # 0 Dogs
       # 1 Cats
       # 2 Turtles
       # 3 Rabbits
       ~~~
    
    - While loop
       ~~~python
       n = 10 

       # initialize sum and counter
       sum = 0
       i = 1

       while i <= n:
          sum = sum + i
          i = i + 1     # update counter

       print("The sum is", sum) # The sum is 55
       ~~~
    
    - Nested Loop
       ~~~python
       for i in range(0, 2):
           for j in range(0, 2):
               print("i=", i, "j=", j, ", i*j=", i*j)
       # Output:  
       #  i= 0 j= 0 , i*j= 0 
       #  i= 0 j= 1 , i*j= 0
       #  i= 1 j= 0 , i*j= 0 
       #  i= 1 j= 1 , i*j= 1
       ~~~

    - break, continue and pass
       ~~~python
       numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

       # break
       for val in numbers:
          if val >=4:
             break
          print(val)

       # output 
       # 1
       # 2
       # 3


       # continue
       for val in numbers:
           if val >=3 and val <=8:
               continue
           print(val)
       
       # output
       # 1
       # 2
       # 9
       # 10

       # pass
       for val in numbers:
           pass        
       ~~~

    - List comprehension
       ~~~python
       # make new lists by using iterable 
       squares = []
       for x in range(10):
           squares.appends(x**2)
       print(squares) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

       # equivalently
       squares = [x**2 for x in range(10)]
       print(squares) # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
       
       # with if
       squares = [x**2 for x in range(10) if x % 2 == 0]
       print(squares) # [0, 4, 16, 36, 64]

       # equivalently
       squares=[]
       for x in range(10):
           x % 2 == 0:
               squares.append(x**2)
       print(squares) # [0, 4, 16, 36, 64]
       ~~~