---
layout: "single"
title: "daily Programming: 2022 過年虎年小專案 "
permalink: "daily-programming/2022-lunar-new-year-project"
tags: daily-programming python tkinter pyinstaller
excerpt: "虎虎生風 新年快樂 天天開心~~~"
header:
  overlay_image:  https://i.imgur.com/rWZ4nba.jpg
---



> 過年還是要保持著~
>
> 對各種事物的好奇 !!!
>
> 問了表哥 最近公司有沒有好玩的東西或點子!!

- 小專案需求

   - MM (1 Byte): 
       - 前 4 bits: 代表 `年` 的後四 bits
       - 後 4 bits: 代表 `月`
   - DD (1 Byte)
       - 前 3 bits: 代表 `年` 的前三 bits
       - 後 5 bits: 代表 `日`
   
    - ** 年: 2000+  DD( 前 3 bits) + MM(前 4 bits) 
       - 從 2000 年開始
       - 對沒錯! 你想的沒錯 這功能的年 過了 2128 年就記錄不了了 XDDD




### 我怎寫的 


1. 先架環境
   - [venv](https://yuting3656.github.io/yutingblog/daily-programming/python-venv-window){:target="_back"}
2. 開GUI
   - [速度拿自己之前的筆記複習~](https://yuting3656.github.io/yutingblog/python/tkinter/smile-face){:targar="_back"}
3. [pyinstaller](https://pypi.org/project/pyinstaller/){:target="_back"} 
   - `pyinstaller --onefile your_main_file.py`

![Imgur](https://i.imgur.com/y8Lqj65.png)

~~~python
from tkinter import *
from tkinter import ttk

class DdpGUI:
    def __init__(self, master):
        self.master = master
        self.input_year_var = StringVar()
        self.input_year_var.set('0')
        self.input_month_var = StringVar()
        self.input_month_var.set('0')
        self.input_date_var = StringVar()
        self.input_date_var.set('0')
        self.result_var = StringVar()
        self.result_var.set("輸入完按下 看一下!! 看結果吧!")

        self._create_gui()
        self._create_input()

    def _create_gui(self):
        # self.master.configure(background='bisque')
        self.style_frame_bg = ttk.Style()

        self.style_frame_bg.configure('Sample.eye.TFrame', background='black')
        self.style_frame_bg.configure('Sample.pupil.TFrame', background='#f4f4f4')
        self.style_frame_bg.configure('Sample.teeth.TFrame', background='red')
        self.style_frame_bg.configure('Sample.default.TFrame', background='bisque')

        self.master.geometry("500x400")

        # 相關連結: https://stackoverflow.com/questions/45847313/what-does-weight-do-in-tkinter
        self.master.rowconfigure(0, weight=3)
        self.master.rowconfigure(1, weight=3)
        self.master.rowconfigure(2, weight=3)
        self.master.rowconfigure(3, weight=3)
        self.master.rowconfigure(4, weight=1)
        self.master.rowconfigure(5, weight=1)

        self.master.columnconfigure(0, weight=1)
        self.master.columnconfigure(1, weight=1)
        self.master.columnconfigure(2, weight=1)
        self.master.columnconfigure(3, weight=1)
        self.master.columnconfigure(4, weight=1)
        self.master.columnconfigure(5, weight=1)
        self.master.columnconfigure(6, weight=1)
        self.master.columnconfigure(7, weight=1)

        # Title
        self.title_var = StringVar()
        self.title_var.set('2022 虎年快樂小專案!')
        self.frame_new_year_project_title = ttk.Frame(self.master)
        self.frame_new_year_project_title.grid(row=1, column=1,  sticky='nsew')
        self.new_year_project_title = Label(self.frame_new_year_project_title, textvariable=self.title_var, font=("", 35, ""))
        self.new_year_project_title.pack()

    def _create_input(self):

        # show date var
        self.year_label_var = StringVar()
        self.year_label_var.set('年:')
        self.frame_year_text = ttk.Frame(self.master)
        self.frame_year_text.grid(row=2, column=0, sticky='nsew')
        self.year_frame_label = Label(self.frame_year_text, textvariable=self.year_label_var, font=("", 20, ""))
        self.year_frame_label.pack()

        self.year_input_frame = ttk.Frame(self.master)
        self.year_input_frame.grid(row=2, column=1, columnspan=3, sticky='nsew')
        self.year_input_box = ttk.Entry(self.year_input_frame, font=('', 20, 'bold'),
                                  textvariable=self.input_year_var)
        self.year_input_box.pack()

        # month
        self.month_label_var = StringVar()
        self.month_label_var.set('月:')
        self.frame_month_text = ttk.Frame(self.master)
        self.frame_month_text.grid(row=3, column=0, sticky='nsew')
        self.month_frame_label = Label(self.frame_month_text, textvariable=self.month_label_var, font=("", 20, ""))
        self.month_frame_label.pack()

        self.month_input_frame = ttk.Frame(self.master)
        self.month_input_frame.grid(row=3, column=1, columnspan=3, sticky='nsew')
        self.month_input_box = ttk.Entry(self.month_input_frame, font=('', 20, 'bold'),
                                        textvariable=self.input_month_var)
        self.month_input_box.pack()
        # date
        self.date_label_var = StringVar()
        self.date_label_var.set('日:')
        self.frame_date_text = ttk.Frame(self.master)
        self.frame_date_text.grid(row=4, column=0, sticky='nsew')
        self.date_frame_label = Label(self.frame_date_text, textvariable=self.date_label_var, font=("", 20, ""))
        self.date_frame_label.pack()

        self.date_input_frame = ttk.Frame(self.master)
        self.date_input_frame.grid(row=4, column=1, columnspan=3, sticky='nsew')
        self.date_input_box = ttk.Entry(self.date_input_frame, font=('', 20, 'bold'),
                                         textvariable=self.input_date_var)
        self.date_input_box.pack()
        # button
        self.button_frame = ttk.Frame(self.master)
        self.button_frame.grid(row=5, column=1, columnspan=5, sticky='nsew')
        btn = Button(self.button_frame, text='看一下! !',
                     command=self.get_date)
        btn.pack()
        # result
        self.result_frame =  ttk.Frame(self.master)
        self.result_frame.grid(row=6, column=0, columnspan=8, sticky='nsew')
        self.result_label = Entry(self.result_frame, textvariable=self.result_var, font=("", 20, ""))
        self.result_label.configure( relief="flat")
        # self.result_label.configure(state="disabled")
        self.result_label.pack()

    def get_date(self):
        ## year
        year = self.input_year_var.get()
        month = self.input_month_var.get()
        date = self.input_date_var.get()

        y = int(year) - 2000
        y_bin = bin(y)
        y_result = y_bin[2:].zfill(7)

        ## month
        m_bin = bin(int(month))
        m_result = m_bin[2:].zfill(4)

        ## date
        d_bin = bin(int(date))
        d_result = d_bin[2:].zfill(5)

        low_bits_of_year = y_result[-4:]
        high_bits_of_year = y_result[:3]

        date_MM = '' + low_bits_of_year + m_result
        dat_DD = '' + high_bits_of_year + d_result

        hex_date_MM = hex(int(date_MM, 2))[2:].upper()
        hex_date_DD = hex(int(dat_DD, 2))[2:].upper()
        self.result_var.set('{} {}'.format(hex_date_MM, hex_date_DD))


if __name__ == "__main__":
    root = Tk()
    DdpGUI(root)
    root.mainloop()
~~~
   