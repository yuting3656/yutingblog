---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 01'
permalink: 'stydeGroup/python-01'
tags: 讀書會 python
---

> import this
> The Zen of Python, by Tim Peters
> 
> Beautiful is better than ugly.
>
> Explicit is better than implicit.
>
> Simple is better than complex.
>
> Complex is better than complicated.
>
> Flat is better than nested.
>
> Sparse is better than dense.
>
> Readability counts.
>
> Special cases aren't special enough to break the rules.
>
> Although practicality beats purity.
>
> Errors should never pass silently.
>
> Unless explicitly silenced.
>
> In the face of ambiguity, refuse the temptation to guess.
>
> There should be one-- and preferably only one --obvious way to do it.
>
> Although that way may not be obvious at first unless you're Dutch.
>
> Now is better than never.
>
> Although never is often better than *right* now.
>
> If the implementation is hard to explain, it's a bad idea.
>
> If the implementation is easy to explain, it may be a good idea.
>
> Namespaces are one honking great idea -- let's do more of those!


> 我最愛的 [python](https://www.udemy.com/course/the-python-mega-course/learn/lecture/15947958#overview){:=target="_back"}

## Introductin

- python 2.7 vs. python 3.x
- python 3.0 在 2008發佈
- python 3 上功能有部分無法向下兼容，但也因不向下兼容，python 3的程式碼
才不會太過肥⼤
- 其餘還有諸多差異，可直接參考網路上[比較](https://www.guru99.com/python-2-vs-python-3.html){:target="_back"}
- python 2.x 維護到 2020年，但⽬前仍有許多運⾏在 python 2.x的系統與程式
- 課程中主要使⽤ python 3.x

## Online IDE

- [https://repl.it/](https://repl.it/){:target="_back"}

## Style Guide

- [PEP(Python Enhancement Propposal)](https://www.python.org/dev/peps/pep-0008/#function-and-variable-names){:target="_back"}

- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html#316-naming){:target="_back"}


   - `module_name, package_name, ClassName, method_name, ExceptionName, function_name, GLOBAL_CONSTANT_NAME, global_var_name, instance_var_name, function_parameter_name, local_var_name.`


## Simple Types: Integer, String, Float, Boolean

~~~py
x = 10
y = '10'
z = 10.0
a = True
print(type(x), type(y), type(z), type(a))
# <class 'int'> <class 'str'> <class 'float'> <class 'bool'>
~~~


## Which code line throws the exception?

~~~python
x =    10
y          = '10'
        z=20.0
~~~

~~~python
        z=20.0
        ^
IndentationError: unexpected indent
~~~

## List type

~~~python
list = [1, 1.0, '1', [1,2,3, [4,5,6]]
~~~

## help 幫助你看!

~~~python
>>> list.help()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: type object 'list' has no attribute 'help'
>>> help(print)
Help on built-in function print in module builtins:

print(...)
    print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)

    Prints the values to a stream, or to sys.stdout by default.
    Optional keyword arguments:
    file:  a file-like object (stream); defaults to the current sys.stdout.
    sep:   string inserted between values, default a space.
    end:   string appended after the last value, default a newline.
    flush: whether to forcibly flush the stream.

>>> help(list)
Help on class list in module builtins:

class list(object)
 |  list(iterable=(), /)
 |
 |  Built-in mutable sequence.
 |
 |  If no argument is given, the constructor creates a new empty list.
 |  The argument must be an iterable if specified.
 |
 |  Methods defined here:
 |
 |  __add__(self, value, /)
 |      Return self+value.
 |
 |  __contains__(self, key, /)
 |      Return key in self.
 |
 |  __delitem__(self, key, /)
 |      Delete self[key].
 |
 |  __eq__(self, value, /)
 |      Return self==value.
 |
 |  __ge__(self, value, /)
 |      Return self>=value.
 |
 |  __getattribute__(self, name, /)
 |      Return getattr(self, name).
 |
 |  __getitem__(...)
 |      x.__getitem__(y) <==> x[y]
 |
 |  __gt__(self, value, /)
 |      Return self>value.
 |
 |  __iadd__(self, value, /)
 |      Implement self+=value.
 |
 |  __imul__(self, value, /)
 |      Implement self*=value.
 |
 |  __init__(self, /, *args, **kwargs)
 |      Initialize self.  See help(type(self)) for accurate signature.
 |
 |  __iter__(self, /)
 |      Implement iter(self).
 |
 |  __le__(self, value, /)
 |      Return self<=value.
 |
 |  __len__(self, /)
 |      Return len(self).
 |
 |  __lt__(self, value, /)
 |      Return self<value.
 |
 |  __mul__(self, value, /)
 |      Return self*value.
 |
 |  __ne__(self, value, /)
 |      Return self!=value.
 |
 |  __repr__(self, /)
 |      Return repr(self).
 |
 |  __reversed__(self, /)
 |      Return a reverse iterator over the list.
 |
 |  __rmul__(self, value, /)
 |      Return value*self.
 |
 |  __setitem__(self, key, value, /)
 |      Set self[key] to value.
 |
 |  __sizeof__(self, /)
 |      Return the size of the list in memory, in bytes.
 |
 |  append(self, object, /)
 |      Append object to the end of the list.
 |
 |  clear(self, /)
 |      Remove all items from list.
 |
 |  copy(self, /)
 |      Return a shallow copy of the list.
 |
 |  count(self, value, /)
 |      Return number of occurrences of value.
 |
 |  extend(self, iterable, /)
 |      Extend list by appending elements from the iterable.
 |
 |  index(self, value, start=0, stop=9223372036854775807, /)
 |      Return first index of value.
 |
 |      Raises ValueError if the value is not present.
 |
 |  insert(self, index, object, /)
 |      Insert object before index.
 |
 |  pop(self, index=-1, /)
 |      Remove and return item at index (default last).
 |
 |      Raises IndexError if list is empty or index is out of range.
 |
 |  remove(self, value, /)
 |      Remove first occurrence of value.
 |
 |      Raises ValueError if the value is not present.
 |
 |  reverse(self, /)
 |      Reverse *IN PLACE*.
 |
 |  sort(self, /, *, key=None, reverse=False)
 |      Stable sort *IN PLACE*.
 |
 |  ----------------------------------------------------------------------
 |  Static methods defined here:
 |
 |  __new__(*args, **kwargs) from builtins.type
 |      Create and return a new object.  See help(type) for accurate signature.
 |
 |  ----------------------------------------------------------------------
 |  Data and other attributes defined here:
 |
 |  __hash__ = None
~~~


## dir([object]) 回傳參數所有 sttribute

~~~python
list = [1, 2, 3]
attrs = dir(list)
print( attrs ) # <= show all attributes of the list
# list = [1, 2, 3]
# attrs = dir(list)
# print( attrs ) # <= show all attributes of the list
~~~

- dir( __builtins__ ): 所有 built-in functions


## [快樂蛇蛇命名!!!](https://dbader.org/blog/meaning-of-underscores-in-python#:~:text=The%20underscore%20prefix%20is%20meant,public%E2%80%9D%20variables%20like%20Java%20does.){:target="_back"}


|Pattern	|Example	|Meaning|
|:---:|:---:|:---:|
|Single Leading Underscore|	_var|aming convention indicating a name is meant for internal use. Generally not enforced by the Python interpreter (except in wildcard imports) and meant as a hint to the programmer only.|
|Single Trailing Underscore|	var_	|Used by convention to avoid naming conflicts with Python keywords.|
|Double Leading Underscore|	__var	|Triggers name mangling when used in a class context. Enforced by the Python interpreter.|
|Double Leading and Trailing Underscore|	__ var __ 	|Indicates special methods defined by the Python language. Avoid this naming scheme for your own attributes.|
|Single Underscore|	_	|Sometimes used as a name for temporary or insignificant variables (“don’t care”). Also: The result of the last expression in a Python REPL.|


## name mangling

~~~python
class Person:
    def __init__(self, name):
        self.__name = name
        self._name = name


class Woman(Person):
    def __init__(self, name):
        Person.__init__(self, name)
        self.__name = name


if __name__ == "__main__":
    jack = Person("Jack")
    print(jack)
    print(dir(jack))
    print(jack._name)
    print(jack._Person__name)
    print("==============")
    tina = Woman('tina')
    print(dir(tina))



# <__main__.Person object at 0x000001C06E087BE0>
#'_Person__name', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', #'__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_name']
#Jack
#Jack
#==============
#['_Person__name', '_Woman__name', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', #'__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_name']
#
~~~


## 繼承好玩

~~~python
class Person:
    def __init__(self, name):
        self.__name = name
        self._name = name

    def speak(self):
        print("person: hahaha")


class Woman(Person):
    def __init__(self, name):
        Person.__init__(self, name)
        self.__name = name

    def speak(self):
        print("====== from woman ========")
        Person.speak(self)
        print("woman: yayay")


class LittleWoman(Woman):
    def __init__(self, name):
        Woman.__init__(self, name)
        self.__name = name

    def speak(self):
        Person.speak(self)
        Woman.speak(self)
        print("little woman: yayay")


if __name__ == "__main__":
    little_woman = LittleWoman("Jack")
    print(little_woman.speak())


# person: hahaha
# ====== from woman ========
# person: hahaha
# woman: yayay
# little woman: yayay

~~~