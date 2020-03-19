---
layout: 'post'
title: 'Go: Hello World III'
permalink: 'go/go-hello-world-iii'
tags: go 
---

## Functions

~~~go
package main

import (
    "fmt"
)


// add adds a to b
func add(a int, b int) int {
    return a + b
}

// divmod return quotient and reminder
func divmod(a int, b int) (int, int) {
   return a / b, a % b
}

func main() {
	val := add(1, 2)
    fmt.Println(val)
    // 3
    
    div, mod := divmod(7, 2)
    fmt.Printf("div = %d, mode = %d", div, mod)
    // div = 3, mode = 1
}
~~~

- params passing

   - Go pass integer to a func: it passese by value, which means it will copy it then pass into func. 不會改變原本的變數
   - Go pass `slices` or `map`: passing by reference. func 裡面運作的就是原本的 object!!

~~~go
func doubleAt(values []int, i int) {
    values[i] *=2
}

func double(n int) {
     n *= 2
}

func main() {
    values := []int{1, 2, 3, 4}
    doubleAt(values, 2)
    fmt.Println(values)
    // [1 2 6 4]

    val := 10
    double(10)
    fmt.Println(val)
    // 10
}
~~~

   - 用 pointer 可以解決傳 integer 的 copy by value 狀況

       - ~~~go 
             func doublePtr(n *int) {
               *n *=2
           }
       ~~~

       - ~~~go
            doublePtr(&val)
            fmt.Println(val)
            // 20
            fmt.Println(&val)
            // 0xc0000100c8
       ~~~

   ~~~go
   func doubleAt(values []int, i int) {
       values[i] *=2
   }
   
   func double(n int) {
        n *= 2
   }
   
   func doublePtr(n *int) {
       *n *=2
   }
   
   func main() {
       values := []int{1, 2, 3, 4}
       doubleAt(values, 2)
       fmt.Println(values)
       // [1 2 6 4]
   
       val := 10
       double(10)
       fmt.Println(val)
       // 10
       
       doublePtr(&val)
       fmt.Println(val)
       // 20
       fmt.Println(&val)
       // 0xc0000100c8
   }
   ~~~


- Error return

   - go func can return more than one value
   - [`nil`](https://stackoverflow.com/questions/19761393/why-does-go-have-typed-nil){:target="_back"}


~~~go
package main

import (
    "fmt"
    "math"
)

func sqrt(n float64) (float64, error) {
    if n < 0 {
        return 0.0, fmt.Errorf("sqrt of negative value (%f)", n)
    }

    return math.Sqrt(n), nil
}


func main() {

    s1, err := sqrt(2.0)
    if err != nil {
        fmt.Printf("ERROR: %s\n", err)
    } else {
        fmt.Println(s1)
    }
    // 1.4142135623730951

    s2, err2 := sqrt(-2.0)
    if err2 != nil {
        fmt.Printf("ERROR: %s\n", err2)
    } else {
        fmt.Println(s2)
    }
    // ERROR: sqrt of negative value (-2.000000)
}
~~~


- defer

   - go has its garbage collector
   - `defer`: make sure resources is closed / free

~~~go
func cleanup(name string) {
    fmt.Printf("Cleaning up %s\n", name)
}

func worker() {
    defer cleanup("A")
    defer cleanup("B")
    fmt.Println("worker")
}



func main() {
   worker()
   // worker
   // Cleaning up B
   // Cleaning up A
}
~~~

## Challenge: Functions

- Write a function that gets a URL and returns the value of Content-Type response HTTP header

- The function should return an error if it can't perform a GET request

- `func contentType(url string) (string, error)`

- Use `net/http` Get function to make HTTP call
   - __resp, err := http.Get("https:/golang.org")__

- Use `res.Header.Get` to get the value of a header 
   - __resp.Header.Get("Content-Length")__

- Maker sure the response body is closed 

   - __resp.Body.Close()__


#### 我的解

~~~go
package main

import (
	"fmt"
	"net/http"
)


func contentType(url string) (string, error) {
   resp, err := http.Get(url)
   defer resp.Body.Close()
   if err != nil {
	   return "error", fmt.Errorf("Error: %s\n", err)
   } else {
	   result := resp.Header.Get("Content-Type")
	   fmt.Printf("type: %T\n", result)
	   return result, nil
   }

}


func main() {

	sr, err  := contentType("https://golang.org")
	fmt.Println("content-type: ", sr ,"\n", "Error:", err)
}

// type: string
// content-type:  text/html; charset=utf-8
// Error: <nil>
~~~

#### 老師的解

~~~go
package main

import (
	"fmt"
	"net/http"
)


func contentType(url string) (string, error) {
   resp, err := http.Get(url)

   if err != nil {
	   return "", err
   }
   
   defer resp.Body.Close() // Make sure we close the body

   ctype := resp.Header.Get("Content-Type")
   if ctype == "" { // Return error if Content-Type header not found
      return "", fmt.Errorf("can't find Content-Type header")
   }

   return ctype, nil

}


func main() {

	ctype, err  := contentType("https://linkedin.com")
    if err != nil {
	    fmt.Printf("ERRPR: %s\n", err)
	} else {
        fmt.Println(ctype)
	}
}
// text/html; charset=utf-8
~~~   


## Object-Oriented

- define your own data-structure: [`struct`](https://gobyexample.com/structs){:target="_back"}
   - Go’s structs are typed collections of fields. They’re useful for grouping data together to form records.

- 在 Go struct 裡面
   - var 大寫開頭 ---> 可以被其他 package 吃的到

~~~go
package main

import (
    "fmt"
)

// Trade is a trade in stocks
type Trade struct {
	Symbol string // Stock symbol
	Volume int // Number of shares
	Price float64 // Trade price
	Buy bool // true if buy trade, false if sell trade
	
}

func main() {
	t1 := Trade{"MSFT", 10, 99.98, true}
    fmt.Printf("%+v\n", t1)
    // {Symbol:MSFT Volume:10 Price:99.98 Buy:true}
    fmt.Printf("%v\n", t1)
    // {MSFT 10 99.98 true}
    
    fmt.Println(t1.Symbol)
    // MSFT
    
    // 如果用 key 值塞 不用管順序
    t2 := Trade{
        Symbol: "MSFT",
        Volume: 10,
        Price: 99.98,
        Buy: true,
    }
    fmt.Printf("%+v\n", t2)
    // {Symbol:MSFT Volume:10 Price:99.98 Buy:true}
    
    t3 := Trade{}
    fmt.Printf("%+v\n", t3)
    // {Symbol: Volume:0 Price:0 Buy:false}
}
~~~