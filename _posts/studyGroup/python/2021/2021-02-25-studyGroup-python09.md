---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 09'
permalink: 'stydeGroup/python-09'
tags: 讀書會 python
---

# [difflib](https://docs.python.org/3/library/difflib.html){:target="_back"}

~~~python
import json
from difflib import get_close_matches
import mysql.connector

file = open('data.json')
# key -> array
# word -> def
data = json.load(file)
file.close()

def translate(word):
  word = word.lower()

  if word in data.keys():
    return data[word][0]
  elif word.title() in data.keys():
    return data[word.title()][0]
  elif word.upper() in data.keys():
    return data[word.upper()][0]
  else: 
    similar_list = get_close_matches(word, data.keys())
    if len(similar_list) > 0:
      yn = input('Do you mean {}?'.format(similar_list[0]))
      if yn.upper() =='Y':
        return data[similar_list[0]][0]

  return 'Word: {} is not found'.format(word)

def translate_by_db(word):
    conn = mysql.connector.connect(
      database='ardit700_pm1database',
      user='ardit700_student',
      password = 'ardit700_student',
      host = '108.167.140.122'
    )
    # select * from Dictionary where expression = ''
    # Dictionary
    cursor = conn.cursor()
    cursor.execute(' select * from Dictionary where expression like "%{}%"'.format(word))
    result = cursor.fetchall()
    print(result)
    return result[0][1]

    pass
word = input('Please enter a word:')
print(translate_by_db(word))
~~~