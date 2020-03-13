---
layout: 'post'
title: 'Go: Hello World'
permalink: 'go/go-hello-world'
tags: go 
---


## Go: install 

- 安裝

  - [Go Downloads](https://golang.org/dl/){:target="_back"}
  - [git](https://git-scm.com/){:target="_back"}
     - go 使用 `git` 安裝 第三方套件


## Hello World XDD

- exercise_01.go

~~~go
// Print a friendly greeting

package main

import {
    "fmt" 
}

func main() {
    fmt.Println("Welcome Gopheres :)")
}
~~~

- `go run exercise_01.go`

## Go tools

- run
   - `go run <file-name.go>`

- build 
   - `go build .\welcom.go` 建一個 __exe__
   - ![Imgur](https://i.imgur.com/veTUQAG.jpg)

- get
   - connect 3th parties packages

- 自己教自己  `go help`

~~~
Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         download and install packages and dependencies
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildmode   build modes
        c           calling between Go and C
        cache       build and test caching
        environment environment variables
        filetype    file types
        go.mod      the go.mod file
        gopath      GOPATH environment variable
        gopath-get  legacy GOPATH go get
        goproxy     module proxy protocol
        importpath  import path syntax
        modules     modules, module versions, and more
        module-get  module-aware go get
        module-auth module authentication using go.sum
        module-private module configuration for non-public modules
        packages    package lists and patterns
        testflag    testing flags
        testfunc    testing functions

Use "go help <topic>" for more information about that topic
~~~


## 算平均數拉

- [fmt](https://golang.org/pkg/fmt/){:target="_back"}

   - verbs: General 
      - `%v`: the value in a default format when printing structs, the plus flag (%+v) adds field names
      - `%#v`: a Go-syntax representation of the value
      - `%T`： a Go-syntax representation of the type of the value
      - `%%a`: literal percent sign; consumes no value

~~~go
package main

import {
    "fmt" // gofmt (reformat) package sources
}

func main() {
   var x float64
   var y float64

   x = 1
   y = 2

   fmt.Printf("x=%v, type of %T\n", x, x) 
   fmt.Printf("y=%v, type of %T\n", y, y)

   var mean int
   mean = ( x + y ) / 2.0
   fmt.Printf("result: %v, type of %T\n", mean, mean)

}
~~~

- 宣告後直接 asgsin 數值

   - `x := 1.0`
   - `y := 2.0`
~~~go
// Calculate the mean of two numbers
package main

import (
	"fmt"
)

func main() {
	x  := 1.0
	y  := 2.0

	fmt.Printf("x=%v, type of %T\n", x, x)
	fmt.Printf("y=%v, type of %T\n", y, y)

	mean := (x + y) / 2.0
	fmt.Printf("result: %v, type of %T\n", mean, mean)
}
~~~

~~~
PS E:\Lynda\go\Ex_Files_Go_EssT\Exercise Files\Ch02\02_01> go run .\mean_complete.go
x=1, type of float64
y=2, type of float64
result: 1.5, type of float64
~~~


## Conditionals 

  - `&&`: and
  - `||`: or

~~~go
// example of "if" statement
package main

import (
    "fmt"
)

func main() {
    x := 10

    if x > 5 {
        fmt.Println("x is big")
    }

    if x > 100 {
       fmt.Println("x is very big")   
    } else {
        fmt.Println("x is not that big ")
    }

    if x > 5 && x < 15 {
       fmt.Println("x is just right")
    }

    if x < 20 || x > 30 {
        fmt.Println("x is out of range")
    }

    a := 11.0 
    b := 20.0 

    if frac := a / b; frac > 0.5 {
        fmt.Println("a is more than half of b")
    }
}
~~~

- switch 

~~~go 
package main

import (
    "fmt"
)

func main() {
    x := 2

    switch x {
        case 1: 
            fmt.Println("one")
        case 2: 
            fmt.Println("two")
        case 3: 
            fmt.Println("three")
        default: 
            fmt.Println("many")
    }

    switch {
        case x > 100:
            fmt.Println("x is very big")
        case x > 10:
            fmt.Println("x is big")
        default:
            fmt.Println("x is small")
    }
}

~~~

## For loops

~~~go
package main

import (
    "fmt"
)

func main() {
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }

fmt.Println("____")

for i := 0; i < 3; i++ {
    if i > 1 {
        break
    }
    fmt.Println(i) 
   }

fmt.Println("____")

for i :=0; i < 3; i++ {
    if i < 1 {
        continue
    }
    fmt.Println(i)
}

fmt.Println("____")

a := 0

for a < 3 {
    fmt.Println(a)
    a++
}

fmt.Println("____")

b := 0

for {
    if b > 2 {
        break
    }
    fmt.Println(b)
    b++
}


}


~~~

- 跟 while loop 很像

~~~go

a := 0

for a < 3 {
    fmt.Println(a)
    a++
}
~~~