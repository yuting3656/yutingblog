---
layout: 'post'
title: 'Go: Simple RESTful API'
permalink: 'go/go-simple-restful-api'
tags: go 
---


## Creating a Simple RESTful API in Go - Part 1

<iframe  src="https://www.youtube.com/embed/W5b64DXeP0o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 基本架/跑起來~~~

- go: http

   - [`net/http`](https://golang.org/pkg/net/http/){:target="_back"}

~~~go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint hit")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}
~~~

![Imgur](https://i.imgur.com/yLb5lGk.jpg)

> 成功!


### 開一個 抓 json

- go: struct 的第三個參數!?

   - [struct tag](https://stackoverflow.com/questions/25497375/what-is-the-third-parameter-of-a-go-struct-field){:target="_back"}: 
      
      ~~~go
         type StructTag struct {
             StructTag string `json:"StructTag"`
         }
      ~~~

   -  [Struct types:](https://golang.org/ref/spec#Struct_types){:target="_back"}

       > A field declaration may be followed by an optional 
       > string literal tag, which becomes an attribute for 
       > all the fields in the corresponding field declaration.
       >
       >
       > The tags are made visible through a reflection interface 
       > and take part in type identity for structs but are otherwise ignored.

~~~go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)


type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

func allArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Test Title", Desc: "Test Description", Content: "Hello World"},
	}

	fmt.Println("Endpoint Hit: All Articles Endpoint")
	json.NewEncoder(w).Encode(articles)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint hit")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/articles", allArticles)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}

~~~

![Imgur](https://i.imgur.com/JdiBekc.jpg)

> GOOD~~~



## Creating a Simple RESTful API in Go - Part 2


<iframe src="https://www.youtube.com/embed/YMQUQ6XQgz8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### [mux: github.com/gorilla/mux](https://github.com/gorilla/mux){:target="_back"}


~~~go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

type Article struct {
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

func allArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Test Title", Desc: "Test Description", Content: "Hello World"},
	}

	fmt.Println("Endpoint Hit: All Articles Endpoint")
	json.NewEncoder(w).Encode(articles)
}

func testPostArticles(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Test Post endpoint hit")
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint hit")
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/articles", allArticles).Methods("GET")
	myRouter.HandleFunc("/articles", testPostArticles).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", myRouter))
}

func main() {
	handleRequests()
}
~~~

![Imgur](https://i.imgur.com/aq7BE2c.jpg)

> Cool~~~