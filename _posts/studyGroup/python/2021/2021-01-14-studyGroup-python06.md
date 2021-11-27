---
layout: "single"
title: 'Study Group: 巾凡哥出品 品質保證 python 06'
permalink: 'stydeGroup/python-06'
tags: 讀書會 python
---

# List Comprehension

~~~python
cities = ['Austin', 'Tacoma', 'Topeka', 'Sacramento', 'Charlotte']
{city: [0 for _ in range(7)] for city in cities}
~~~

# function

- `slash /`
    - are positional-only


~~~python
def fn(a, b, c, /):
    print(a, b, c)

fn(1, 2, 3) # <=== work
fn(1, 2, c=3) # <=== error
# ==========================
~~~

- Requiring argument to be named
   - In this situation, parameter age `doesn’t have default` value, so you `must` pass named parameter [age] to fn

~~~python
def fn(*ages, age):
    pass

fn(age = 10) # <=== work
fn(123, 456, 789) # <=== error
fn(123, 456, age=789) # <=== work
~~~

- Keyword-only arguments without positional arguments
    - If you only accept keyword-only arguments, positional arguments are not allowed: `using * without anything after it`

~~~python
def fn(*, name, age):
    pass

fn(name="Tim", age=20) # <=== work
~~~


- Ex

~~~python
 
~~~