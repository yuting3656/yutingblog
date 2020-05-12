---
layout: 'post'
title: 'Go: structed data'
permalink: 'go/go-stucted-data'
tags: go 
---

>  馬步蹲得穩！路才走的穩！

- [參考好棒棒文章](https://yourbasic.org/golang/structs-explained/#2-ways-to-create-and-initialize-a-new-struct){:target="_black"}

## Create Structed Data

#### 打一波

   - 自我盲點: `var 出來的 struct 就已經實體化 會塞 default 數值`

   ~~~go
   package main
   
   import "fmt"
   
   type Passengers struct {
   	Person1 string `json:"person_1"`
   	Person2 string `json:"person_2"`
   }
   
   func main() {
   	var fooWay1 Passengers // fooWay1 == Passengers{"", ""}
   	fmt.Println(fooWay1) // {"", ""}
   	fooWay1.Person1 = "yuting"
   	fmt.Println(fooWay1) // {yuting, ""}
   	fooWay1.Person2 = "Ray"
   	fmt.Println(fooWay1) // {yuting Ray}
   
    fooWay2 := Passengers{ Person2: "tim"}
    fmt.Println(fooWay2) // {"", tim}

    fooWay3 := Passengers{}
    fmt.Println(fooWay3) // {"", ""}
   }
   ~~~

- result 

   ~~~
   { }
   {yuting }
   {yuting Ray}
   { tim}
   { }
   ~~~


####  打第二波

    
   ~~~go
   package main
   
   import "fmt"
   
   type Passengers struct {
   	Person1 string `json:"person_1"`
   	Person2 string `json:"person_2"`
   }
   
   type Car struct {
   	Passengers *Passengers `json:"passengers"`
   	Driver string `json:"driver"`
   }
   
   func main() {
   	// WAY 1
   	var car *Car // car == nil
   	fmt.Println(car) // nil
   	car = new (Car)
   	fmt.Println(car) // car == &{nil, ""}
   	car.Passengers = new(Passengers) // car.Passengers is a pointer to an instance of Passengers
   	fmt.Println(car) // car == &{記憶體位置, ""}
   	fmt.Println(car.Passengers) // car == &{"", ""}
   	car.Driver = "NeihuWu"
   	fmt.Println(car) // car == &{記憶體位置, "NeihuWu"}
   	// WAY 2 struct literal
   	car2 := Car{
   		Passengers: &Passengers{"tim", "yuting"},
   	}
   	fmt.Println(car2) // &{記憶體位置, ""}
   	fmt.Println(car2.Passengers)// &{"tim", "yuting"}
   	fmt.Println(car2.Driver) // ""
   	car2.Driver = "Tina"
   	fmt.Println(car2.Driver) // "Tina"
   }
   ~~~

- result 

   ~~~
   <nil>
   &{<nil> }
   &{0xc00000c0a0 }
   &{ }
   &{0xc00000c0a0 NeihuWu}
   {0xc00000c120 }
   &{tim yuting}
   
   Tina
   ~~~

- Chris 姊大作！


~~~go
package main

import (
	"fmt"
)

func main() {
	type Apple struct {
		Name string
	}
	
	type Banana struct {
		Type string
	}
	
	type All struct {
		Data struct {
			*Apple
			B	[]Banana
		}
	}
	
	a := Apple{ Name: "123" }
	b := []Banana{ Banana{ Type: "1" }, Banana{ Type: "2" } }
	all := All{
		struct {
			*Apple
			B	[]Banana
		}{ &a, b } }
	
	fmt.Println(all)
}

~~~