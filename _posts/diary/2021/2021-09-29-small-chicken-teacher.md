---
layout: "post"
title: "小雞老師的指導 😎 謝謝你 小雞老師!!! 有您真好❤️❤️❤️"
permalink: "diary/:year-:month-:day/hello-git-again"
tags: 今日隨意 go
---

> 先這樣 等等冥想完 再來
>
> 繼續寫 心得
>
> 也有可能 不寫了 XDDD
>
> 但! 謝謝小雞老師的 code review 真心感激 :)

```go

package main

import (
	"fmt"
	"time"
)

func loopFunc(stringSlice []string) {
	start := time.Now()
	var checker = func(arr []string,s string) bool{
		for _, i := range arr {
			if i == s {
				return true
			}
		}
		return false
	}

	var noDuplicatedSlice []string

	for _, s := range stringSlice {
		if !checker(noDuplicatedSlice, s) {
			noDuplicatedSlice = append(noDuplicatedSlice, s)
		}
	}

	fmt.Println("stringSlice", stringSlice)
	fmt.Println("noDuplicatedSlice", noDuplicatedSlice)
	fmt.Println("duration [loop]: ", time.Since(start))
}

func mapFunc(stringSlice []string) {
	start := time.Now()
	var stringMap = make(map[string]bool, 0)
	for _, i := range stringSlice {
		if exist, _ := stringMap[i]; !exist {
			stringMap[i] = true;
		}
	}
	var noDuplicatedSlice []string
	for key, _ := range stringMap {
		noDuplicatedSlice = append(noDuplicatedSlice, key)
	}
	fmt.Println("stringSlice", stringSlice)
	fmt.Println("noDuplicatedSlice", noDuplicatedSlice)
	fmt.Println("duration [map]: ", time.Since(start))
}

func main() {
	var stringSlice = []string{"test", "test", "test", "test", "test1", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5", "test2", "test3", "test4", "test5"}
	loopFunc(stringSlice)
    // duration [loop]:  1.3756ms
	fmt.Println("=====")
	mapFunc(stringSlice)
    // duration [map]:  997.3µs
}

```
