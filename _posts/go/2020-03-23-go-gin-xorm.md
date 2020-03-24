---
layout: 'post'
title: 'Go: gin && xorm'
permalink: 'go/go-gin-xorm'
tags: go 
---


## Go: list

- gin
- xorm 
- net/http
- reflectg
- strconv


### [gin](https://github.com/gin-gonic/gin){:target="_back"}

> Framwork
>
> Gin is a web framework written in Go (Golang). It features a martini-like API with much better
> performance, up to 40 times faster thanks to httprouter. If you need performance and good
> productivity, you will love Gin

- [Custom Middleware](https://github.com/gin-gonic/gin#blank-gin-without-middleware-by-default){:target="_back"}

~~~go

~~~


### [xorm](https://godoc.org/github.com/go-xorm/xorm){:target="_back"}

- engine.count(): Count records

   ~~~go
   counts, err := engine.Count(&user)
   // SELECT count(*) AS total FROM user
   
   counts, err := engine.SQL("select count(*) FROM user").Count()
   // select count(*) FROM user
   ~~~

- name mapping [rule](https://github.com/coscms/xorm/blob/master/docs/QuickStart.md#21){:target="_back"}

   - use xorm.IMapper interface to implement. There are two IMapper implemented: `SnakeMapper` and `SameMapper`. 
      - SnakeMapper means struct name is word by word and table name or column name as `_`. 
      - SameMapper means same name between struct and table.

   - SnakeMapper example:

      - sql:
         
         ~~~sql
            
            CREATE TABLE work_order (
                id primary key,
                create_time timestamp,
                update_time timestamp,
                User_name varchar(50),
                ...
            )
         ~~~
    
      - go:

         ~~~go
            
            import "time"

            type WorkOder struct {
                Id string `xorm:"pk"`
                CreateTime time.Time `xorm:timestamp utc`
                UpdateTime time.Time `xorm:timestamp utc`
                UserName string `xorm:"varchar(50)"`
                ...
            }
         ~~~


- types:

   - [column types](https://github.com/coscms/xorm/blob/master/docs/COLUMNTYPE.md){:target="_back"}



### net/http

- [status code](https://golang.org/src/net/http/status.go){:target="_back"}



### reflect

- https://golang.org/pkg/reflect/

   - Package reflect implements `run-time` reflection, allowing a program to manipulate objects with arbitrary types. The typical use is to take a value with static type interface{} and extract its dynamic type information by calling TypeOf, which returns a Type.

   - A call to ValueOf returns a Value representing the run-time data. Zero takes a Type and returns a Value representing a zero value for that type.

- https://blog.golang.org/laws-of-reflection

   - Reflection in computing is the ability of a program to examine its own structure, particularly through types; it's a form of metaprogramming. It's also a great source of confusion.

   - In this article we attempt to clarify things by explaining how reflection works in Go. Each language's reflection model is different (and many languages don't support it at all), but this article is about Go, so for the rest of this article the word "reflection" should be taken to mean "reflection in Go".


### [strconv](https://golang.org/pkg/strconv/){:target="_back"}

> Package strconv implements conversions to and form string represntations of basic dataa types.

- __Most Common Conversions__

   - Atoi
      - string to int
   - Itoa
      - int to string
