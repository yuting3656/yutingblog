---
layout: 'post'
title: 'Go: Hello World II'
permalink: 'go/go-hello-world-ii'
tags: go 
---

## 每次都 package main ??

- [Uderstanding Golang Packages](https://thenewstack.io/understanding-golang-packages/){:target="_back"}

> The package “main” tells the Go compiler that the package should compile as an executable program instead of a shared library. The main function in the package “main” will be the entry point of our executable program. When you build shared libraries, you will not have any main package and main function in the package.

## Challenge: FizzBuzz

> 被 3 整除 叫 `fizz`
>
> 被 5 整除 叫 `buzz`
>
> 被 3 and 5 整除 叫 `fizz buzz`

- 我的寫法

~~~go
package main

import(
	"fmt"
)

func main() {

a := 1
for a <=20 {
	
	if a % 3 == 0 && a % 5 == 0 {
		fmt.Println("fizz buzz")
	} else if a % 3 == 0  {
		fmt.Println("fizz")
	} else if a % 5 == 0 {
		fmt.Println("buzz")
	} else {
		fmt.Println(a)
	}
	a++
} 

}
~~~

- 解答寫法

~~~go
package main

import(
	"fmt"
)

func main() {


for i := 1; i <= 20; i++ {
	
	if i % 3 == 0 && i % 5 == 0 {
		fmt.Println("fizz buzz")
	} else if i % 3 == 0  {
		fmt.Println("fizz")
	} else if i % 5 == 0 {
		fmt.Println("buzz")
	} else {
		fmt.Println(i)
	}
} 

}
~~~

~~~
PS E:\Lynda\go\Ex_Files_Go_EssT\Exercise Files\yuting-exercies> go run .\fizzbuzz.go
1
2
fizz
4
buzz
fizz
7
8
fizz
buzz
11
fizz
13
14
fizz buzz
16
17
fizz
19
buzz
~~~

## Strings

~~~go
package main

import (
    "fmt"
)

func main() {

    book := "The colour of magic"

    fmt.Println(book)
    fmt.Println(len(book))
    // 記得要用 Printf 才能吃 %v, %T
    fmt.Printf("book[0] = %v (type %T)\n", book[0], book[0])

}

// --- return ---
// The colour of magic
// 19
// book[0] = 84 (type uint8)
~~~

- __String in go are immutable__

~~~go

book := "This is a book"
book[0] == 116 // ---> cannot assign to book[0]
~~~

- String slice (跟python 好像)

~~~go
package main

import (
    "fmt"
)

func main() {

    book := "The colour of magic"

    fmt.Println(book)
    fmt.Println(len(book))
    // 記得要用 Printf 才能吃 %v, %T
    fmt.Printf("book[0] = %v (type %T)\n", book[0], book[0])
    
    fmt.Println(book[4:11])
    fmt.Println(book[4:])
    fmt.Println(book[:4])
}

// PS E:\Lynda\go\Ex_Files_Go_EssT\Exercise Files\yuting-exercies> go run .\exercise.go
// The colour of magic
// 19
// book[0] = 84 (type uint8)
// colour
// colour of magic
// The
~~~

- Use + to concatenate strings, Unicode, Multiline

~~~go
package main

import (
    "fmt"
)

func main() {

    book := "The colour of magic"

    fmt.Println(book)
    fmt.Println(len(book))
    // 記得要用 Printf 才能吃 %v, %T
    fmt.Printf("book[0] = %v (type %T)\n", book[0], book[0])
    
    // Use + to concatenate strings
    fmt.Println("t" + book[1:])
    
    // Unicode
    fmt.Println("It was ½ price")

    // Multi line
    poem := `
    The road goes ever on 
    Down from the door where it began
    ...
    `

    fmt.Println(poem)
}
~~~

~~~
PS E:\Lynda\go\Ex_Files_Go_EssT\Exercise Files\yuting-exercies> go run .\exercise.go
The colour of magic
19
book[0] = 84 (type uint8)
the colour of magic
It was ½ price

    The road goes ever on
    Down from the door where it began
    ...

~~~

- 更了解 string [用法](https://golang.org/pkg/fmt/#Springg){:target="_back"}
   - `%s`: 在 `fmt.Printf` 吃 string
   - `%q`: 會幫你加 `""`

   ~~~go
       func main() {
    	a := 2
    	b := fmt.Sprintf("%d", a)
    	fmt.Printf(" %q, (type: %T)", b, b)
    	fmt.Printf("\n")
    	fmt.Printf(" %s, (type: %T)", b, b)
       }
       /**
       
        PS E:\Lynda\go\Ex_Files_Go_EssT\Exercise Files\yuting-exercies> go run even-ended.go
         "2", (type: string)
         2, (type: string)
       
       / 
   ~~~

## Even and End Number: 第一個數和最後一個數字一樣有多少的?

~~~go
package main

import (
	"fmt"
)

func main() {
	count := 0

	for a := 1000; a <= 9999; a++ {
		for b := a; b<= 9999; b ++ { // avoid counting twice 
			n := a * b

			s := fmt.Sprintf("%d", n)

			if s[0] == s[len(s)-1] {
				count ++
			}
		}
	}
   fmt.Println(count)
}
~~~

## Slices: 

- sequence of items
- all item in slices must be the same type

- An array has a fixed size. A slice, on the other hand, is a dynamically-sized, flexible view into the elements of an array. In practice, slices are much more common than arrays.
   - [https://tour.golang.org/moretypes/7](https://tour.golang.org/moretypes/7){:target="_back"}

~~~go
package main

import (
    "fmt"
)

func main() {

    loons := []string{"bugs", "daffy", "taz"}
    fmt.Printf("loons = %v (type %T)", loons, loons)
    // loons = [bugs daffy taz] (type []string)
    fmt.Println(len(loons))
    // 3 
    fmt.Println(loons[1])
    // daffy
    fmt.Println(loons[1:])
    // daffy taz

}

~~~

- 抓 index 出來

~~~go
loons := []string{"bugs", "daffy", "taz"}
for i := range loons{
    fmt.Println(i)
}
// 0
// 1
// 2
~~~

- 抓 index 和 value

~~~go
loons := []string{"bugs", "daffy", "taz"}
for i, name := range loons{
    fmt.Printf("%s at %d\n", name, i)
}
// bugs at 0
// daffy at 1
// taz at 2
~~~

- ignore index

~~~go
loons := []string{"bugs", "daffy", "taz"}
for _, name := range loons{
    fmt.Println(name)
}
// bugs
// daffy
// taz
~~~

- append

~~~go
loons := []string{"bugs", "daffy", "taz"}
loons = append(loons, "eleer")
fmt.Println(loons)
// [bugs daffy taz eleer]
~~~

## 找出最大值

~~~go
func main() {
    nums := []int{16, 8, 42, 4, 23, 15}
    
    maxValue := nums[0]
    
    for _, number := range nums[1:] {
        if  number > maxValue {
            maxValue = number
        }
    }
    fmt.Println(maxValue)
}
~~~

## Maps

- key must be the same type
- value must be the same type
- Must have trailing comma in multi line

~~~go
func main() {
    stocks  := map[string]float64{
        "AMZN": 1699.8,
        "GOOG": 1129.19,
        "MSFT": 98.61, // Must have trailing comma in multi line 
    }

    // Number of items
    fmt.Println(len(stocks))
    // 3

    // Get a Value
    fmt.Println(stocks["GOOG"])
    // 1129.19
    
    // Get zero value if not found
    fmt.Println(stocks["TSLA"])
    // 0

    // use two value to see if found
    value, ok := stocks["TSLA"]
    if !ok {
        fmt.Println("TSLA not found")
    } else {
        fmt.Println(value)       
    }
    // TSLA not found

}
~~~

- set 
   - 跟 javascript 有點像
~~~go
stocks["TASLA"] = 322.12
fmt.Println(stocks["TASLA"])
// 322.12
~~~

- delete 

~~~go
delete(stocks, "AMZN")
fmt.Println(stocks["AMZN"])
// 0
~~~

- 抓 key

~~~go
for key := range stocks {
    fmt.Println(key)
}
// TASLA
// GOOG
// MSFT
~~~

- 抓 key and value

~~~go
for key, value := range stocks {
    fmt.Printf("%q --> %.2f\n", key, value)
}
// "GOOG" --> 1129.19
// "MSFT" --> 98.61
// "TASLA" --> 322.12
~~~

##　Challeng: Maps 

~~~go
func main() {
    text :=
    Needles and pins
    Needles and pins
    Sew me a sail
    To catch me the wind

    // Print out how many times each word appeaers in the text
    // Use strings.Fields to split to words and 
    // stings.ToLower to convert to lowercase
}
~~~

- 我的解

~~~go
package main

import (
	"fmt"
	"strings"
)

func main() {
	text :=`
	 Needles and pins
     Needles and pins 
     Sew me a sail 
     To catch me the wind`
    text = strings.ToLower(text)

	texSlices := strings.Fields(text)
	fmt.Printf("%v, type: %T", texSlices, texSlices)
    fmt.Println("======\n")
	var mapText = map[string]int{}

	for _, value := range texSlices{
		if mapText[value] != 0 {
			mapText[value] ++
		} else {
			mapText[value] = 1
		}
	}

	fmt.Println(mapText)
}
~~~

- 老師的解

~~~go
func main() {
	text :=`
	 Needles and pins
     Needles and pins 
     Sew me a sail 
     To catch me the wind`
	texSlices := strings.Fields(text)
	mapText := map[string]int{} // Empty map
	for _, value := range texSlices{
		mapText[strings.ToLower(value)] ++
	}

	fmt.Println(mapText)
}
~~~