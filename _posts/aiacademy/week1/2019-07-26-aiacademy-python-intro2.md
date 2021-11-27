---
layout: "single"
title: 'python intro 2'
permalink: 'aiacademy/week1/python-intro-2'
tags: aiacademy python jupyter-notebook
---

### Python function

- funcion
   ~~~python
   def function_name(parameters):
      # code...

   def greet():
      print("Hello!")
   ~~~

- return statement
   ~~~python
   def square(x, y):
       return x*x, y*y

   res_x, res_y =square(2, 3)
   print(res_x) # 4
   print(res_y) # 9
   ~~~

- anonymous function - lambda
   ~~~python
   double = lambda x: x *2

   print(double(5)) # 10

   # Lambda functions can have any number of arguments
   double = lambda x, y: x*2 + y

   print(double(5,2) # 12
   ~~~ 

### Python Generators

- Generator with for loop
   ~~~python
   def generator_example():
      a = 1
      yield print(a) # 1
      a += 1 
      yield print(a) # 2
      return
    
    for i in generator_exmple():
        continue

    # Output:
    # 1 
    # 2
   ~~~

- Generator with next, avoid StopIteration Error
   ~~~python
   def generator_example():
      yield print(1)
      yield print(2)
      return

   gen = generator_example()
   gen.__next__() # 1
   gen.__next__() # 2
   gen.__next__() # Traceback (most recent call last): 
                  #  File "<stdin>", line 1, in <module>
                  # StopIteration

   # avoid StopIteration Error
   try: 
        gen.__next__()
    except StopIteration:
        pass
   ~~~

- Benefits - Memory Usage
   ~~~python
   # 利用 list 迭代
   range_num = 10
   for i in [x*x for x in range(range_num)]:
       # do something
       pass

   # 利用 generator 迭代
   for i in (x*x for x in range(range_num)):
       # do something
       pass
   ~~~

   - Memory Usage - by using list
      ~~~python
      import psutil
      before_used = psutil.virtual_memory().used  # expressed in bytes
      after_used = 0
      print("before:", before_used)
      
      range_num = 1000000
      for i in [x*x for x in range(range_num)]: # 第一種方法：對 list 進行迭代
          if i == (range_num - 1) * (range_num - 1):
              after_used = psutil.virtual_memory().used
              print("after:", after_used) 
      
      print("used memory:", (after_used - before_used))    
      
      """
      before: 6833217536
      after: 6859653120
      used memory: 26435584
      """
      ~~~
   
   - Memory Usage - by using generator
      ~~~python
      import psutil
      before_used = psutil.virtual_memory().used  # expressed in bytes
      after_used = 0
      print("before:", before_used)
      
      range_num = 1000000
      for i in (x*x for x in range(range_num)): # 第二種方法：對 generator 進行迭代
          if i == (range_num - 1) * (range_num - 1):
              after_used = psutil.virtual_memory().used
              print("after:", after_used) 
      
      print("used memory:", (after_used - before_used))

      """
      before: 6848933888
      after: 6850170880
      used memory: 1236992
      """
      ~~~

### Modules

- Modules
   ~~~python
   import re

   import re as r

   from re import findall

   from re import *
   ~~~

- Module - os
   ~~~python
   import os
   # 顯示絕對路徑
   os.path.abspath("")
   
   # 將多個字串組合為路徑
   "/".join(['path', 'result', 'a.csv'])
   
   # 將多個字串組合為路徑
   os.path.join('path', 'result', 'a.csv')
   
   # 檢查某路徑 /資料夾是否存在
   os.path.exists("path/session_1-ans.ipynb")
   ~~~


### Regular Expression 

- re 
   ~~~python
   "This is demo string, do nothing!"

   # pattern_1
   "is"

   # pattern_2
   "abc"

   # find - does the string contains the pattern?
   # YES or NO
   ~~~

   ~~~python
   "This is demo string, 01234567899876543210"

   # pattern
   "01234567899876543210"

   # if you want to search more complex pattern?
   # using regular expression!

   syntax = "[0-9]{20}"
   ~~~

   - Special Characters

      ~~~
      .     match any character except a newline 
      *     match 0 or more repetitions of the preceding character
      +     match 1 or more repetitions of the preceding character
      {m}   match exactly m copies of the previous character
      {m,n} match from m to n repetitions of the preceding character
      \     escapes special characters
      [ ]   Used to indicate a set of characters 
         [amk] will match 'a', 'm', or 'k'
         [a-z] will match any lowercase ASCII letter
         [0-5][0-9] will match all the two-digits numbers from 00 to 59
      ~~~

- Module - re

   ~~~python
   import re
   
   string = "This is demo string, do nothing!"
   pattern = "is"
   
   # Return a list of all non-overlapping matches in the string.
   print(re.findall(pattern, string))  # ['is', 'is']
   ~~~

   ~~~python
   import re

   # find numbers
   pattern = "[0-9]+"
   string = "12 drummers drumming, 111 pipers piping, 1006 lords a-leaping"
   re.findall(pattern, string)  # ['12', '111'. '1006']

   # find letters 
   pattern = "[cmf]an"
   string = "find: can, man, fan, skip: dan, ran, pan"
   re.findall(pattern, string) # ['can', 'man', 'fan']
   ~~~

   - find e-mail
      ~~~python
      import re
      email_text= """ Big Data Analytics/ Deep LearningSocial Computing / Computational Social Science / Crowdsourcing Multimediaand Network SystemsQuality of ExperienceInformation SecurityPh.D. candidate at NTU EEchihfan02-27883799#1602Camera CalibrationComputer VisionData Analysiscmchang02-27883799#1671System OptimizationMachine LearningyusraBig data analysiscclin02-27883799#1668Data Analysisrusi02-27883799#1668Government Procurement ActFinancial Managementkatekuen02-27883799#1602AdministrationEvent Planningseanyu02-27883799#1668Data AnalysisPsychology & NeuroscienceMarketingxinchinchenEmbedded Systemkyoyachuan062602-27883799 #1601FinTechActuarial ScienceData Analysiskai0604602-27883799#1601Data AnalysisMachine Learningchloe02-27839427Accountingafun02-27883799 felix2018@iis.sinica.edu.tw #1673Data AnalysisWeb developmentyunhsu198902-27883799#1668MarketingTIGP Ph.D. Fellow at Academia Sinica & NCCUbaowalyMachine LearningData AnalysisSocial Computingchangyc1427883799#1678 Data Analysisjimmy1592302-2788379 jimmy15923@iis.sinica.com.tw#1688Data AnalysisjasontangAnalysisMachine Learninguchen02-27883799#1668Deep Learningpjwu02-27883799#1604Computational PhotographyData Analysis """

      re.findall("([A-Za-z0-9._]+@[A-Za-z.]+[com|edu]\.tw)", email_text) # ['felix2018@iis.sinica.edu.tw', 'jimmy15923@iis.sinica.com.tw']
      ~~~

- Class

   ~~~python
   class MyClass:
      var = 123
      def method(self):
         return "hello world"

   # Instantiation
   my_object = MyClass()
   
   ~~~

   - init, self
      ~~~python
      # no arguments
      class MyClass:
          def __init__(self):
              print("do nothing")

      # with arguments
      class MyClass:
          def __init__(self, var1, var2):
              self.var1 = var1
              self.var2 = var2
      
      ~~~

   - Object
      ~~~python
      class MyClass:
          def __init__(self, var1):
              self.var1 = var1
      
      my_object_123 = MyClass(123)    # <__main__.MyClass object at 0x7f2008391438>
      my_object_987 = MyClass(987)    # <__main__.MyClass object at 0x7f20083916a0>
      ~~~

      - example
         ~~~python
         class Person:
            bmi = 0.0
            height = 0.0
            weight = 0

            def __init__(self):
                pass

            def ask_person_info(self):
                self.height = float(input("What is your height? (meter) : "))
                self.weight = int(input("What is your weight? (kg) : "))

            def cal_BMI(self):
                self.bmi = round((self.weight / (self.height ** 2)), 2)
                print("Your BMI is " + str(self.bmi))
         ~~~


### jupyter notebook 快捷鍵

   - ESC 跳出 cell
   - Enter 進入 cell
   
   - run cell
      - `Shift-Enter` : 執行完跳下一行
      - `Ctrl-Enter` : 執行完留在同一行
      - `Alt-Enter` : 執行完insert下一行
   
   - Cell 新增、移除、合併
      - `A` : insert cell above
      - `B` : insert cell below
      - `X` : cut selected cells
      - `C` : copy selected cells

      - `Shift + V` : pasts cells above
      - `V` : pasts cells below
      - `Z` : undo cells deletion
      - `D D` : delete selected cells
      - `Shift + M` : merge selected cells, or current cell with cell   below if only one cell is selected

   - 改變 cell 功能 (code、markdown、raw)
      - `Y` : change cell to code
      - `M` : change cell to markdown
      - `R` : change cell to raw

  - edit mode
     - `TAB` : code completion or indent / __(提供輸入選項)__
     - function 提示說明:
         - `Shift + TAB` : tooltip
         - `Shift + TAB + TAB` : tooltip + parameters

  - Jupyter notebook 魔術指令
     - % 
        - %cd : 改變路徑
        - %save: 將 cell 儲存為 .py 
        - %run xxx.py: 執行 xxx.py 檔
        - %timeit: 計算該 cell 執行之時間
        - %matplotlib inline: 將繪製的圖直接顯示在 notebook 上
        - %matplotlib notebook
     - ! 可以直接輸入 terminal 的指令
        - !nvidia-smi
        - !ls
        - !rm
        - !pip install ...