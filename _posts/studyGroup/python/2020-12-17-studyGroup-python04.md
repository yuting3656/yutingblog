---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 04'
permalink: 'stydeGroup/python-04'
tags: 讀書會 python
---

# Simple Example 

- colors = [11, 34, 98, 43.1, 45, 54.5, 54, 60,103.2, 102]
- Print the values greater than 50 and type is integer

~~~py

colors = [11, 34, 98, 43.1, 45, 54.5, 54, 60,103.2, 102]

print([ i for i in colors if i > 50 and type(i) == int])
~~~

# Loop in dictionary

~~~py
map = {
    "name": "John",
    "age":"20"
}

"""
for val in map.keys()/ map.values():
   stmt
"""
~~~

# While Loop

- while / break

   - 
     ~~~py
        while a > 0:
           stmt 
     ~~~
    
   - 
     ~~~py
        while True/False:
            stmt
            if cond:
                break
     ~~~      
    
# Simple Example

- Ask user to enter his/her favorite language. Keep asking user till he/she enter
"python" and print out "Your favorite language is xxx"

~~~py
while True:
  p = input("What is ypur favorite language ?")
  print("Your favorite language is {}".format(p))
  if p.lower() == "python":
    print("Bye Bye ~~~")
    break
~~~

# Build program

- Write a progra. When execute the code, print "Say something:" on terminal,
which prompt user to input

-  After user press enter, keeping asking the same question and waiting for user
input

-  For every sentence, the first character is capital, and the program adds "," or
"?" depends on the first word of the sentence( 5W1H).

- The program stop prompting whenever user enters `\end`

- Finally print out all user inputs(exclude \end) on the screen. Each input is
separated by one space. 


~~~py
w_list =  ['what', 'how', 'who', 'where', 'when']
final = ''
while True:
  s = input("Say something:")
  t = s.split()
  c = ''
  if s == '\end':
     print(final)
     break
  if t[0].lower()in w_list:
    c = s.capitalize() + '? '
  else:
    c = s.capitalize() + '. '
  final = '' + final + c 
~~~

~~~py
last_word = input('Say something: ')
p_mark = '?' if last_word.startswith(w_list) else '.'
message = f'{message}{last_word.capitalize()}{p_mark}'
~~~


## area coord 

- [HTML <area> coords Attribute](https://www.w3schools.com/tags/att_area_coords.asp)

~~~html
<map name="planetmap">
  <area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun">
  <area shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury">
  <area shape="circle" coords="124,58,8" href="venus.htm" alt="Venus">
</map>
~~~