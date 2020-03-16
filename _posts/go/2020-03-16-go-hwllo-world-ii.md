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