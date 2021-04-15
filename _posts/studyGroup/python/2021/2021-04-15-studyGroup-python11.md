---
layout: 'post'
title: 'Study Group: 巾凡哥出品 品質保證 python 11 (jupyter-notebook, pandas)'
permalink: 'stydeGroup/python-11'
tags: 讀書會 python jupyter-notebook pandas
---


~~~py
df1 = pd.read_csv('supermarkets.csv')

"""
	ID	Address	City	State	Country	Name	Employees
0	1	3666 21st St	San Francisco	CA 94114	USA	Madeira	8
1	2	735 Dolores St	San Francisco	CA 94119	USA	Bready Shop	15
2	3	332 Hill St	San Francisco	California 94114	USA	Super River	25
3	4	3995 23rd St	San Francisco	CA 94114	USA	Ben's Shop	10
4	5	1056 Sanchez St	San Francisco	California	USA	Sanchez	12
5	6	551 Alvarado St	San Francisco	CA 94114	USA	Richvalley	20
"""


df1['New_columns'] = [ i for i in range(6)]

"""
ID	City	State	Country	Name	Employees	New_columns
Address							
3666 21st St	1	San Francisco	CA 94114	USA	Madeira	8	0
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop	15	1
332 Hill St	3	San Francisco	California 94114	USA	Super River	25	2
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop	10	3
1056 Sanchez St	5	San Francisco	California	USA	Sanchez	12	4
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley	20	5
"""
~~~

~~~py
df1.T

"""
Address	3666 21st St	735 Dolores St	332 Hill St	3995 23rd St	1056 Sanchez St	551 Alvarado St
ID	1	2	3	4	5	6
City	San Francisco	San Francisco	San Francisco	San Francisco	San Francisco	San Francisco
State	CA 94114	CA 94119	California 94114	CA 94114	California	CA 94114
Country	USA	USA	USA	USA	USA	USA
Name	Madeira	Bready Shop	Super River	Ben's Shop	Sanchez	Richvalley
Employees	8	15	25	10	12	20
New_columns	0	1	2	3	4	5
"""

df2 = df1.T

"""
Address	3666 21st St	735 Dolores St	332 Hill St	3995 23rd St	1056 Sanchez St	551 Alvarado St
ID	1	2	3	4	5	6
City	San Francisco	San Francisco	San Francisco	San Francisco	San Francisco	San Francisco
State	CA 94114	CA 94119	California 94114	CA 94114	California	CA 94114
Country	USA	USA	USA	USA	USA	USA
Name	Madeira	Bready Shop	Super River	Ben's Shop	Sanchez	Richvalley
Employees	8	15	25	10	12	20
New_columns	0	1	2	3	4	5
"""
~~~

~~~py
df2['New_Row'] = [ i for i in range(df2.shape[0])]


"""
	ID	City	State	Country	Name	Employees	New_columns	New_Row
Address								
3666 21st St	1	San Francisco	CA 94114	USA	Madeira	8	0	0
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop	15	1	1
332 Hill St	3	San Francisco	California 94114	USA	Super River	25	2	2
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop	10	3	3
1056 Sanchez St	5	San Francisco	California	USA	Sanchez	12	4	4
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley	20	5	5
New_Row	0	1	2	3	4	5	6	6
"""
~~~

- at

~~~py
df2.at['New_Row', 'ID'] = 9527

"""
	ID	City	State	Country	Name	Employees	New_columns	New_Row
Address								
3666 21st St	1	San Francisco	CA 94114	USA	Madeira	8	0	0
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop	15	1	1
332 Hill St	3	San Francisco	California 94114	USA	Super River	25	2	2
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop	10	3	3
1056 Sanchez St	5	San Francisco	California	USA	Sanchez	12	4	4
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley	20	5	5
New_Row	9527	1	2	3	4	5	6	6
"""
~~~

- drop

~~~py

df2.drop(df2.columns[6:], 1)

"""
	ID	City	State	Country	Name	Employees
Address						
3666 21st St	1	San Francisco	CA 94114	USA	Madeira	8
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop	15
332 Hill St	3	San Francisco	California 94114	USA	Super River	25
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop	10
1056 Sanchez St	5	San Francisco	California	USA	Sanchez	12
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley	20
New_Row	9527	1	2	3	4	5
"""


df1['test']= [1, 1, 1, 1,1 ,1]

"""

               ID	City	State	Country	Name	Employees	New_columns	  test
Address								
3666 21st St	1	San Francisco	CA 94114	USA	Madeira	8	            0   1
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop	15	        1   1
332 Hill St   	3	San Francisco	California 94114	USA	Super River	25	2	1
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop	10      	3	1
1056 Sanchez St	5	San Francisco	California	USA	Sanchez	12	            4   1
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley	20	        5   1
"""

df1 = df1.drop(df1.columns[6:], 1)

"""
	            ID   City	  State	  Country	Name
      Address			
3666 21st St	1	San Francisco	CA 94114	USA	Madeira
735 Dolores St	2	San Francisco	CA 94119	USA	Bready Shop
332 Hill St	    3	San Francisco	California 94114	USA	Super River
3995 23rd St	4	San Francisco	CA 94114	USA	Ben's Shop
1056 Sanchez St	5	San Francisco	California	USA	Sanchez
551 Alvarado St	6	San Francisco	CA 94114	USA	Richvalley
"""
~~~


## lambda

~~~py
(lambda x, y, z:x + 2*y + z)(1, 2, 3)
~~~

~~~py
high_order_func = lambda x, callback: x + callback(x)

high_order_func(4, lambda x: 2* x)
~~~

~~~py
list( map( lambda x: x.capitalize(), ['cat', 'dog', 'fish']   ))
"""
['Cat', 'Dog', 'Fish']
"""
~~~


## Example (geopy)

~~~py
df1['Address'] = df1['Address'] + ', ' + df1['City'] + ', '+ df1['State'] + ', ' + df1['Country']
~~~

![Imgur](https://i.imgur.com/klng5Xx.png)

~~~py
from geopy.geocoders import ArcGIS
~~~

~~~py
nom = ArcGIS()
nom.geocode('3666 21st St, San Francisco, CA 94114, USA')

"""
Location(3666 21st St, San Francisco, California, 94114, (37.756648011392286, -122.42937496976432, 0.0))
"""
~~~

~~~python
nom = ArcGIS()
result =  nom.geocode('3666 21st St, San Francisco, CA 94114, USA')
df1['Coordinate'] = df1['Address'].apply(nom.geocode)
~~~

![Imgur](https://i.imgur.com/GHisxxh.png)


~~~python
df1['Latitude'] = df1['Coordinate'].apply(lambda x: x.latitude)
~~~
![Imgur](https://i.imgur.com/JABpwvZ.png)


~~~python
df1['Longitude'] = df1['Coordinate'].apply(lambda x: x.longitude)
~~~
![Imgur](https://i.imgur.com/Mz4UpjU.png)