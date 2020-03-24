---
layout: 'post'
title: 'Go: Hello World IIII'
permalink: 'go/go-hello-world-iiii'
tags: go 
---



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


- Object-Oriented with Methods

   - receiver: func `(t *Trade)` Value() flat64
   - method name: func (t *Trade) `Value()` flat64
   - return: func (t *Trade) Value() `flat64`

      ~~~go
         func (t *Trade) Value() float64 {
             value := float64(t.Volume) * t.Price
             if t.Buy {
                 value = -value
             }
             return value
         }
      ~~~


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

// Value return the trade value
func (t *Trade) Value() float64 {
    value := float64(t.Volume) * t.Price
    if t.Buy {
        value = -value
    }
    return value
}

func main() {
    t := Trade{
        Symbol: "MSFT",
        Volume: 10,
        Price: 99.98,
        Buy: true,
    }
    fmt.Println(t.Value())
    // -999.8000000000001
}
~~~

### pointer 

- without pointer 

   - 在 struct 裡面的 method 不會指向到 你所帶入的 struct 反而是 copy 一個

   ~~~go
      // 2 d point
      type Point struct {
      	X int
      	Y int
      }
      
      func (p Point) Move(dx int, dy int) {
      	p.X += dx
      	p.Y += dy
      }
      
      func main() {
      	p := Point{1, 2}
      	p.Move(2, 3)
        fmt.Printf("%+v \n", p)
        // {X:1 Y:2}
      }
   ~~~

- with pointer

   ~~~go
      // 2 d point
      type Point struct {
      	X int
      	Y int
      }
      
      func (p *Point) Move(dx int, dy int) {
      	p.X += dx
      	p.Y += dy
      }
      
      func main() {
      	p := Point{1, 2}
      	p.Move(2, 3)
        fmt.Printf("%+v \n", p)
        // {X:3 Y:5}
      }
   ~~~


## New stucts wiht functions

- In Go, we write a function to have a `constructor or initializer method (like Java, python)` when an object is created

   - the func usually start with `Newxxx` 

~~~go
package main

import (
	"fmt"
	"os"
)
// Trade is a trade in stocks
type Trade struct {
	Symbol string // Stock symbol
	Volume int // Number of shares
	Price float64 // Trade price
	Buy bool // true if buy trade, false if sell trade
}

func NewTrade(
	symbol string,
	volume int,
	price float64,
	buy bool) (*Trade, error) {
    if symbol == "" {
		return nil, fmt.Errorf("symbol can't be empty")
	}

	if volume <= 0 {
		return nil, fmt.Errorf("volume must be >= 0 (was %d)", volume)
	}

	if price <= 0.0 {
		return nil, fmt.Errorf("price must be >=0 (was %f)", price)
	}

	trade := &Trade{
		Symbol: symbol,
		Volume: volume,
		Price: price,
		Buy: buy,
	}
	return trade, nil
}

// Value returns the trade value
func (t *Trade) Value() float64 {
	value := float64(t.Volume) * t.Price
    if t.Buy {
        value = -value
	}
	return value
}

func main() {
	t, err := NewTrade("MSFT", 10, 99.8, true)

	if err != nil {
		fmt.Printf("error: can't create trade - %s\n", err)
		os.Exit(1)
	}
	fmt.Println(t.Value())
    // -998
}
~~~


## Challenge: Structs

- Square

   - Define a Square struct, which has two fields: 
      - center of type `point` and length of type `int`. Add two methods:

         - Move(dx int, dy int)
         - Area() int

   - Also write:
      - NewSquare(x int, y int, length int)(*Square, error)