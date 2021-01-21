---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 02'
permalink: 'stydeGroup/python-02'
tags: 讀書會 python
---

# Access grandparent attributes

- type(suter()) <=class super
- dir(super()) <= no super attribute

- Using OOP design 
- Grandparent.attribute / Grandparent.method

# Dynamic Programming Language

- Dynamic & Static 

   - In computer science, a dynamic programming language is a class of highlevel programming languages, which `at runtime execute many common programming behaviours that static programming languages perform during compilation.` (Wiki)

      - Static: Java, C#, C, C++, Haskell
      - Dynamic: Python, Javascript, VB, PHP

# Dynamic Programming Language

- Definitions of "strong" or "weak"

   - A number of different language design decisions have been referred to as evidence of "strong" or "weak" typing. Many of these are more accurately understood as the `presence or absence of type safety, memory safety, static type-checking, or dynamic type-checking.`

   - Strong: Java, Python, Haskell, C#, Golang

   - Weak: C, C++, PHP, Javascript, VB
      - C supports more kinds of implicit conversion, and C also allows pointer values to be explicitly cast. For example: void * can be converted to any type of pointer.


# Dictionary

~~~py
grads = { 'Jhon': 20, 'Tom': 40, 'Many': 60}

grades.keys()
grades.values()
grades.get('Jhon') === grades['John']
~~~

# Tuple 

- immutable
- list is mutable

~~~py
tuple = (1, 2, 3, 4)
~~~

~~~py
a  = ()
print(type(a))
# <class 'typle'>
~~~


# List Operation

~~~py
list = [1, 2, 3]
list.append(4) # <= [1, 2, 3, 4]

list = [1, 2, 3]
list.insert(0, 4) # <= [4, 1, 2, 3]


list = [1, 2, 3]
list = [4, 5, 6] + list # <=[4, 5, 6, 1, 2, 3]

list = [1, 2, 3]
list.clear() # <= [ ]

list = [1, 2, 3, 2]
list.remove(2) # <= [1, 3, 2] remove value not index
~~~

- index 

~~~py
# vowels list
vowels = ['a', 'e', 'i', 'o', 'i', 'u']

# index of 'e' in vowels
index = vowels.index('e')
print('The index of e:', index)

# element 'i' is searched
# index of the first 'i' is returned
index = vowels.index('i')

print('The index of i:', index)
~~~

~~~py
# alphabets list
alphabets = ['a', 'e', 'i', 'o', 'g', 'l', 'i', 'u']

# index of 'i' in alphabets
index = alphabets.index('e')   # 2
print('The index of e:', index)

# 'i' after the 4th index is searched
index = alphabets.index('i', 4)   # 6
print('The index of i:', index)

# 'i' between 3rd and 5th index is searched
index = alphabets.index('i', 3, 5)   # Error!
print('The index of i:', index)

"""
The index of e: 1
The index of i: 6
Traceback (most recent call last):
  File "*lt;string>", line 13, in 
ValueError: 'i' is not in list
"""
~~~

- `__getitem__(index)`:
   - list = [1.0, 2.0, 3.0, 4.0]
   - list.__getitem__[1] <= return 2.0
   - list.__getitem__[1] is equivalent to list[1]
   - just use list[index]


- slice 

~~~py
list = ['a', 'b', 'c', 'd', 'e']
list[3:5] # <= ['d', 'e']
list[2:4] # <= ['c', 'd']
list[3:]  # <= ['d', 'e']
list[:2]  # <= ['a', 'b']
~~~

~~~py
list = ['a', 'b', 'c', 'd', 'e']
list[-1]
list[-200]
list[1: -2]
list[ 3: -3]
list[-3, 1]
list[-3:]
以 index start 與 end 最後位置取得 slice
~~~

- index & slice

~~~py
name = 'John'
name[0] # = 'J'
name[-1] # = 'n'
name[-4:] # = 'John'
~~~ 

## Converting between datatypes
- tuple to list

~~~py
data = (1, 2, 3)
list = list(data)
~~~

- list to tuple

~~~py
data = [1, 2, 3]
tuple = tuple(data)
~~~


- list to dictionary 

~~~py
data = [["Mary", 20], ["Tom", 10]]
dict123 = dict(data)
print(dict123)
# {'Mary': 20, 'Tom': 10}


dict2 = ((21, 21), (22, 23))
dict2 = dict(dict2)
print(dict2)
# {21: 21, 22: 23}

~~~

- print(isinstance(dict, object)) # True