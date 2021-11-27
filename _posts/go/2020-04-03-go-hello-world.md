---
layout: "single"
title: 'Go: Hello World XI Concurrnecy'
permalink: 'go/go-hello-world-XI=concurrency'
tags: go 
---

## Concurrency

~~~go
package main

import (
	"fmt"
	"net/http"
	"sync"
)

func returnType(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Print("error: %s\n", err)
		return
	}

	defer resp.Body.Close()
	ctype := resp.Header.Get("content-type")
	fmt.Printf("%s ==> %s \n", url, ctype)
}

func main() {
	urls := []string{
		"https://golang.org",
		"https://api.github.com",
		"https://httpbin.org/xml",
	}

	var wg sync.WaitGroup

	for _, url := range urls {
		wg.Add(1)
		go func(url string) {
			returnType(url)
			wg.Done()
		}(url)
	}
	wg.Wait()
}
~~~