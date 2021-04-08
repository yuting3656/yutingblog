---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 10 (jupyter-notebook, pandas)'
permalink: 'stydeGroup/python-10'
tags: 讀書會 python jupyter-notebook pandas
---

# 速度幫自己架一個新環境
 
   - [我的筆記](https://yuting3656.github.io/yutingblog//daily-programming/python-venv-window){:target="_back"}


## pandas

~~~python
import pandas as pd

df1 = pd.DataFrame([ [2, 4, 6], [10, 20, 30]])
"""
df1

	0	1	2
0	2	4	6
1	10	20	30

"""
~~~

~~~py
df1 = pd.DataFrame([ [2, 4, 5], [10, 20, 30]], columns=['Price', 'Age', 'Value'], index=['First', 'Second'])

"""
df1

	Price	Age	Value
First	2	4	5
Second	10	20	30
"""
~~~

~~~py
df2 = pd.DataFrame([ {'Name': 'John', 'Last Name': 'Peter', 'gender': 'N'}])

"""
df2

	Name	Last Name	gender
0	John	Peter	N
"""
~~~

~~~py
df3 = pd.DataFrame([[30, 31]], columns=['Appples', 'Bananas'] )

"""
df3

	Appples	Bananas
0	30	31
"""
~~~

~~~py
df4 = pd.DataFrame([[35, 41], [41, 43]], columns=['Apples', 'Bananas'], index=['2017 Sales', '2018 Sales'])

"""
df4

	Apples	Bananas
2017 Sales	35	41
2018 Sales	41	43
"""

"""
df4.Apples

2017 Sales    35
2018 Sales    41
Name: Apples, dtype: int64
"""
~~~

### dir 看 package 的 function

- `dir()`

### listdir 看目前 目錄下的東西

~~~python
import os
os.listdir()
['.ipynb_checkpoints', 'practice1.ipynb', 'venv']
~~~


## pandas 抓 one row

- iloc
   - `.iloc[] is primarily integer position based (from 0 to length-1 of the axis), but may also be used with a boolean array.`

  ~~~py
   df4.iloc[0]

   """
    Apples     35
    Bananas    41
    Name: 2017 Sales, dtype: int64
   """
  ~~~

- loc
  - `.loc[] is primarily label based, but may also be used with a boolean array.`
  
  ~~~py
  df4.loc['2017 Sales']

   """
    Apples     35
    Bananas    41
    Name: 2017 Sales, dtype: int64
   """
  ~~~


## read_csv, read_json 

- 相關功能
   - sep 分隔符號 (預設是 , )
      - `pd.read_csv('./supermarkets/supermarkets/supermarkets.csv', sep=',')`
   - header 把錶頭忽略
      - `pd.read_csv('./supermarkets/supermarkets/supermarkets-data.txt', sep=',', header=None)`


- read_csv

~~~py
df_csv = pd.read_csv('./supermarkets/supermarkets/supermarkets.csv')

"""
df_csv

	ID	Address	City	State	Country	Name	Employees
0	1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
1	2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
2	3	332 Hill St	San Francisco	California 94114	USA	Super River	25
3	4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
4	5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
5	6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""
~~~


- read_json

~~~py
df_json = pd.read_json('./supermarkets/supermarkets/supermarkets.json')

"""
df_json

	ID	Address	City	State	Country	Name	Employees
0	1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
1	2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
2	3	332 Hill St	San Francisco	California 94114	USA	Super River	25
3	4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
4	5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
5	6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""
~~~

### 抓 txt , 去除 header, 自動加上 header, 改 index

~~~python
df_txt = pd.read_csv('./supermarkets/supermarkets/supermarkets-data.txt', sep=',', header=None)

"""
df_txt

0	1	2	3	4	5	6
0	1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
1	2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
2	3	332 Hill St	San Francisco	California 94114	USA	Super River	25
3	4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
4	5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
5	6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""

df_txt .columns=['ID', 'Address', 'City', 'State', 'Country', 'Name', 'Employees']

"""
df_txt

	ID	Address	City	State	Country	Name	Employees
0	1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
1	2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
2	3	332 Hill St	San Francisco	California 94114	USA	Super River	25
3	4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
4	5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
5	6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""

df_txt.set_index('ID', inplace=True)

"""
	Address	City	State	Country	Name	Employees
ID						
1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
3	332 Hill St	San Francisco	California 94114	USA	Super River	25
4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""
~~~

## loc 

~~~py
df_txt.loc['1': '3', 'City': 'Country']

"""
        City	State	Country
ID			
1	San Francisco	CA 94114	USA
2	San Francisco	CA 94119	USA
3	San Francisco	California 94114	USA
"""
~~~

## iloc

~~~py
df_txt.iloc[ 0:2, 0:3]

"""
             Address	City	State
ID			
1	3666 21st St	San Francisco	CA 94114
2	735 Dolores St	San Francisco	CA 94119
"""
~~~