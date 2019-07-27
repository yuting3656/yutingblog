---
layout: 'post'
title: 'python pandas 2'
permalink: 'aiacademy/week1/pandas2'
tags: aiacademy python pandas
---

### 例子


~~~python
df = pd.read_csv('03_pandaserercies.csv', index_col=0)

# 轉成str
df['date'] = df['date'].astype(str)
# 未滿4位數，位數補零
df['Time'] = df['Time'].apply(lambda x: '{:0>4}'.format(x))
# 組合時間字串
date_string = df['date'] + df['Time']
# 換成pandas time type
date_times = pd.to_datetime(date_string, format='%Y%m%d%H%M')
# 塞到index
df_clean = df.set_index(date_times)
~~~

- 看csv colums
   ~~~python
   df = pd.read_csv('03_pandaserercies.csv', index_col=0)
   df.columns.values
   ~~~

- 沒數值補NaN
   ~~~python
   # 看選取範圍
   print(df_clean.loc['2011-06-20 08:00:00':'2011-06-20 10:00:00', 'dry_bulb_faren'])
   """
   If 'raise', then invalid parsing will raise an exception
   If 'coerce', then invalid parsing will be set as NaN
   If 'ignore', then invalid parsing will return the input 
   """
   df_clean['dry_bulb_faren'] = pd.to_numeric(df_clean['dry_bulb_faren'], errors = 'coerce')
   print(df_clean.loc['2011-06-20 08:00:00':'2011-06-20 10:00:00', 'dry_bulb_faren'])
   
   #
   df_clean['wind_speed'] = pd.to_numeric(df_clean["wind_speed"], errors="coerce")
   df_clean['dew_point_faren'] = pd.to_numeric(df_clean["dew_point_faren"], errors="coerce")

    # 2011-06-20 08:27:00     M
    # 2011-06-20 08:28:00     M
    # 2011-06-20 08:29:00     M
    # 2011-06-20 08:30:00     M
    # 2011-06-20 08:31:00     M
    # 2011-06-20 08:32:00     M
    # 2011-06-20 08:33:00     M
    # 2011-06-20 08:34:00     M
    # 2011-06-20 08:35:00     M
    # 2011-06-20 08:53:00    83
    # 2011-06-20 09:08:00    84
    # 2011-06-20 09:53:00    88
    # Name: dry_bulb_faren, dtype: object
    # 2011-06-20 08:27:00     NaN
    # 2011-06-20 08:28:00     NaN
    # 2011-06-20 08:29:00     NaN
    # 2011-06-20 08:30:00     NaN
    # 2011-06-20 08:31:00     NaN
    # 2011-06-20 08:32:00     NaN
    # 2011-06-20 08:33:00     NaN
    # 2011-06-20 08:34:00     NaN
    # 2011-06-20 08:35:00     NaN
    # 2011-06-20 08:53:00    83.0
    # 2011-06-20 09:08:00    84.0
    # 2011-06-20 09:53:00    88.0
    # Name: dry_bulb_faren, dtype: float64
   ~~~

- resample
   ~~~python
   # resample
   daily_mean_2011 = df_clean.resample("D").mean()
   daily_temp_2011 = daily_mean_2011["dry_bulb_faren"].values
   print(daily_mean_2011.head())
   
   #             Wban  StationType  dry_bulb_faren  dew_point_faren  wind_speed
   #2011-01-01  13904           12       50.166667        20.500000   11.083333
   #2011-01-02  13904           12       39.416667        19.708333    4.166667
   #2011-01-03  13904           12       46.846154        35.500000    2.653846
   #2011-01-04  13904           12       53.367347        50.408163    2.510204
   #2011-01-05  13904           12       57.965517        40.068966    4.689655   
   ~~~