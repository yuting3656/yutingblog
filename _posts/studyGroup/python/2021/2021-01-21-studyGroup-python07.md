---
layout: "single"
title: 'Study Group: 巾凡哥出品 品質保證 python 07'
permalink: 'stydeGroup/python-07'
tags: 讀書會 python
---

# File Processing & Module

~~~python
f = open(file="file.txt")
print(f.read())
~~~

- cursor

~~~python
f = open(file="file.txt")
print(f.read()) # print the content
print(f.read()) # print empth content
~~~

- close file

~~~python
f = open(file="file.txt")
f.close()
f.read()
~~~

- with 

~~~python
with open("file.txt") as t:
    content = t.read()
print(content)
~~~

- wiht text to a file

~~~python
with open('file.txt', 'w') as file:
    file.write('test')
~~~

# Append a file

|Character|Meaning|
|---|---|
|'r'|open for reading (default)|
|'w'|open for writing, truncating the file first|
|'x'|create a new file and open it for writing |
|'a'|open for writing, appending to the end of the file if it exists|
|'b'|binary mode|
|'t'|text mode (default)|
|'+'|open a disk file for updating (reading and writing)|
|'U'|universal newline mode (deprecated)|

- Append a file
   - x: Only works when the file doesn’t exist
   - a: Append contents to the end of the file, and move the cursor to the end
   - +: Support read and write the same file at the same time

   ~~~python
       with open('fruits.txt', 'a') as file:
           file.write('\nBanana\n')
   ~~~

- Read and Write

~~~python
with open(‘fruits.txt’, ‘a+’) as file:
   file.write('Banana\n') # <= Cursor moves to the end of file
   file.seek(0) # <= Cursor moves to position 0
   content = file.read() # <= Cursor moves to the end of file
   file.write(content)
~~~

- exercise 寫三次

~~~python
with open('file.txt', 'a+') as r:
  r.seek(0)
  content = r.read()
  print(content)
  r.write('\n')
  r.write(content)
  r.write('\n')
  r.write(content)
~~~