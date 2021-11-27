---
layout: "single"
title: "daily Programming:  誰是小老鼠! 🐹 "
permalink: "daily-programming/who-is-money-mouse"
tags: daily-programming firebase python
---

> 故事就是 家裡有小老鼠!!!
>
> 在我可愛的 line bot 裡面 
>
> 再加一個 記帳功能 !!
>

### [Firebase Admin Python SDK](https://firebase.google.com/docs/reference/admin/python/){:target="_back"}


## [塞資料進 Firebase FireStore Collection](https://firebase.google.com/docs/firestore/manage-data/add-data){:target="_back"}

~~~py
data = {
    'stringExample': 'Hello, World!',
    'booleanExample': True,
    'numberExample': 3.14159265,
    'dateExample': datetime.datetime.now(),
    'arrayExample': [5, True, 'hello'],
    'nullExample': None,
    'objectExample': {
        'a': 5,
        'b': True
    }
}

db.collection('data').document('one').set(data)
~~~


## [拿資料](https://firebase.google.com/docs/firestore/query-data/get-data){:target="_back"}


~~~py
collections = db.collection('cities').document('SF').collections()
for collection in collections:
    for doc in collection.stream():
        print(f'{doc.id} => {doc.to_dict()}')
~~~

- limit

~~~py
cities_ref = db.collection("cities")
query = cities_ref.order_by("name").limit(2)
results = query.get()   
~~~

