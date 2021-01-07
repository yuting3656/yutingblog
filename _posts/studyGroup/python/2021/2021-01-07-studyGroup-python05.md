---
layout: 'post'
title: 'Study Group: 凡哥出品 品質保證 python 05'
permalink: 'stydeGroup/python-05'
tags: 讀書會 python
---

# List Comprehension

- More elegant way to define or create list via existing list
- Better Performance (Link)
- We should avoid writing long list comprehensive expression
- List comprehension can be rewritten in for-loop, but for-loop may not be rewritten in list comprehension
- [Ref](https://www.programiz.com/python-programming/list-comprehension)

~~~python
list = [ i for i in range(10) if i % 2 == 0]
~~~

- Exercise 
   
   ~~~python
    list = [239, 283, 490, 902, 84, 949,92, 0, -3, -4, 8934, 'n', 3.4]
    
    #3Define a function which takes a list as parameter and return a new list which only contains positive integers and can be divided by 2 and 5

    aa_ans = [ i for i in list if isinstance(i, int) == True and i > 0 and i % 2 == 0 and i % 5 == 0 ]
   ~~~

   ~~~python
    list = ['1.1', '2.2', '3.3']
    # Define a function which take list as parameter. Return the sum of the list.
    # In this case. Function should return 7.1.
    ans = [ float(i) for i in list ]
    print(sum(ans))
   ~~~

# Function

   - non keuword arg: def(4, 6)
   - keyword arg: def(a=4, b=5)

   - cannot define non-default args. after default args.
      - default 要放後面

- Arbitrary number of non-keyword arguments

-  Fixed length of arguments
   - like type, isinstance, etc..
   - If you pass more or less arguments to function, error will be thrown

- Arbitrary length of arguments
   - like print
   - You are able to pass random length number of arguments


- EX: 
~~~python
def func(*args):
   print(args) # func(1, 2, 3, 4, 5, 'a') tuple type
~~~


# Arbitrary number of keyword arguments

~~~python
def func(**kwargs):
    print(kwargs) # {"a":1, "b": 2, "c": 3.0}

func({a='1', b='2', c='3'})
~~~

# Arbitrary kwyword and non-keyword arguments

~~~python
def func(*args, **kwargs):
    print(args, kwargs)
~~~

~~~python
def func(*args, **kwargs):
  print(args, kwargs)
func(1,2,34,56, a=123, b=456, c=789)
# (1, 2, 34, 56) {'a': 123, 'b': 456, 'c': 789}
~~~

- A `positional argument` is a name that is not followed by an equal assign（=）
and default value.

- A `keyword argument` is followed by an equal sign and an expression that
gives its default value.

# More about function

~~~python
def func(a,b,c, *args, d=99, **kwargs):
    print(args, kwargs)

func(1, 2, 3, 4, 5, 6, g=10, h=11, d=12)

"""
a=1
b=2
c=3
d=12
args=(4, 5, 6)
kwargs={"g": 10, "h": 11}
"""
~~~

# [10 Examples to Master *args and **kwargs in Python](https://towardsdatascience.com/10-examples-to-master-args-and-kwargs-in-python-6f1e8cc30749)