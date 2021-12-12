---
layout: "single"
title: 'Study Group: 巾凡哥出品 品質保證 python 03'
permalink: 'stydeGroup/python-03'
tags: 讀書會 python
---

# List(補)

~~~python
list = [ 'a', 'b', 'c', 'd', 'e']
# index range: -5 ~ 4
# -N ~ (N-1)
"""
-5 -4 -3 -2 -1  0  2  3  4  5
 a  b  c  d  e  a  b  c  d  e
"""
~~~

~~~python
list = [1, 2, 3, 4]
list[-100: -2] # [1, 2]
~~~

~~~py
list = [ 'a', 'b', 'c', 'd', 'e']

~~~

- shallow copy

   - list[:] or list[:] => shallow copy
   - 參考位置 而不會建出新的 所以會有修改原本物件的 issues

   ~~~py
      aa = { 'name': 'Tim'}
      list1 = [ 'a', 'b', 'c', 'd', 'e', aa]
      list2 = list1[::]
      
      aa['name'] = 'John'
      print(list1) # ['a', 'b', 'c', 'd', 'e', {'name': 'John'}]
      print(list2) # ['a', 'b', 'c', 'd', 'e', {'name': 'John'}]
   ~~~

~~~py
list = [ 'a', 'b', 'c', 'd', 'e']
a = list[::2]
print(a) # ['a', 'c', 'e']

# reverse list
aa = { 'name': 'Tim'}
list1 = [ 'a', 'b', 'c', 'd', 'e', aa]
print(list1[::-1]) # [{'name': 'Tim'}, 'e', 'd', 'c', 'b', 'a']
~~~



# function

~~~py
def func():
~~~

- javascript 

~~~javascript
a = function() {
   console.log("hello")
}
console.log(a())
// undefined

~~~

# If-Else

~~~py
if cond:
 exec code
else:
 else code

# && => and
# || => or
# if a == b and b == a or c == 1
~~~

~~~py
def myFunc(n):
   if type(e) == str:
      print("Dict")
   else:
      print("Type error") 
~~~

- isinstance

   - [https://www.w3schools.com/python/ref_func_isinstance.asp](https://www.w3schools.com/python/ref_func_isinstance.asp)

- if-elif-else

~~~py
if cond1:
  stmt1
elif cond2:
  stmt2
else:
  stmt3
~~~

- [try-except-else-finally](https://realpython.com/python-exceptions/#:~:text=The%20try%20and%20except%20block%20in%20Python%20is%20used%20to,normal%E2%80%9D%20part%20of%20the%20program.&text=This%20exception%20error%20will%20crash,your%20program%20responds%20to%20exceptions.){:target="_back"}



~~~py
try:
  print(list1[100])
except Exception as e:
  print('excpet', e) # except list index out of range
else:
  print('haha')
~~~

# Input

~~~py
def greater(n1, n2):
    if n1 > n2:
        return 'x is greater than y'
    elif n1 == n2:
        return 'x is equal to y'
    else: 
        return 'x is less than y'
x = input("enter x:")
y = input("enter y:")
print(greater(x, y))
~~~

- What is the result of the following code after user input 10 and 20?
    - x is less than y
- What is the result of the following code after user input 11 and 11a?
    - x is less than y

- The comparison uses lexicographical ordering: first the first two items are
compared, and if they differ this determines the outcome of the comparison; if they
are equal, the next two items are compared, and so on, until either sequence is
exhausted.

   - 字⺟逐⼀轉為 Unicode 比較⼤⼩，如 a > A
   - 在某⼀個字串遍歷完後仍未能決定⼤⼩，則以長度決定
   - 使⽤ `ord` 將字元轉為 unicode
      - ord taks a single parameter

      - [https://stackoverflow.com/questions/4806911/string-comparison-technique-used-by-python](https://stackoverflow.com/questions/4806911/string-comparison-technique-used-by-python)

# String Format

- % format

   * % works at Python 2 & Python 3
   * Similar to % formatting in C
   * %d => int
   * %f / %lf => float / double
   * %c =>character
   * %s =>string

   ~~~py
   name = 'John'
   age = 20
   greeting = "I'm %s and I am %d year-old" %(name, age)
   ~~~


- f-string

   * f string works after __Python 3.6+__
   * Usage: `f"String... {var1} {var2}"`

   ~~~py
   name='John'
   age = 20
   greeting = f"My name is {name} and I am {age} year-old."
   ~~~

- format

   ~~~py
      name = 'John'
      age = 20
      print("My name is {} and I am {} year-old".format(name, age) )
   ~~~

~~~py
print("My name is {name} and I am {age} year-old".format(name="John",
age=20) )

name = "John"
age = 20
print("My name is {1} and I am {0} year-old".format(age, name) )
print("My name is {1.upper()} and I am {0} year-old".format(age, name) )

attrs = ['John', 20]
print("My name is {0[0]} and I am {0[1]} year-old".format(attrs) )

attrs = {"name":"John", "age": 10}
print("My name is {name} and I am {age} year-old".format( **attrs ) )
~~~

- python string template string example

~~~py
from string import Template

t = Template('$name is the $job of $company')
s = t.substitute(name='Tim Cook', job='CEO', company='Apple Inc.')
print(s)

# dictionary as substitute argument
d = {"name": "Tim Cook", "job": "CEO", "company": "Apple Inc."}
s = t.substitute(**d)
print(s)
~~~



# Unpacking

- unpacking list(tuple also works)

~~~py
# * unpacking for list( tuple also works!)
# equivalent to …[ array] in javascript
[ *[1, 2, 3], 4, 5]
~~~

- unpacking for dict

~~~py
# ** unpacking for dict
# equivalent to …{ obj} in javascript
{ **{"a": 1}, "b": 2}
~~~