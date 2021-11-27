---
layout: "single"
title: 'Go: Hello World X'
permalink: 'go/go-hello-world-iiiii'
tags: go 
---

> 萬丈高樓平地起　
>
> 居家放假 放太久~~　:sunny::sunny::sunny::sunny::sunny:
> 
> 開工前3天 到下午時候　:stuck_out_tongue_winking_eye:
> 
> 頭會暈阿　ＸＤＤＤＤ :satisfied::satisfied::satisfied:
>
> 越來越感覺 go 粉優雅~~~ :heart::heart::heart::heart:


## interface

- collection of methods  

- [官網介紹: io Reader](https://golang.org/pkg/io/#Reader){:target="_back"}


- Challenge: interface

   - Write a struct called __Capper__ that has a field to another __io.Writer__ and transforms everything written to uppercase. Capper should implement __io.Writer__

      ~~~go
         type Capper struct {
             wtr io.Writer
         }
         func (c *Capper) Write(p []byte) (n int, err error) {
             // Your code goes here
         }
      ~~~

~~~go
package main

import (
	"fmt"
	"io"
	"os"
)

type Capper struct {
	wtr io.Writer
}

func (c *Capper) Write(p []byte) (n int, err error) {
	diff := byte('a' - 'A')

	out := make([]byte, len(p))
	for i, c := range p {
		if c >= 'a' && c <= 'z' {
			c -= diff
		}
		out[i] = c
	}

	return c.wtr.Write(out)
}

func main() {
	c := &Capper{os.Stdout}
	fmt.Fprintln(c, "Hello there")
    // HELLO THERE
}

~~~


> 大約　７８％　理解　ＸＤＤ


## Go: runes: `' '`  & strings: `" "`

- [Blog on String: Strings, bytes, runes and characters in Go](https://blog.golang.org/strings){:target="_back"}
   
   - `' '`: represents a __single character (called a Rune)__
   - `" "`: represents a string 



## errors: github.com/pkg/errors & log

> 跟當年開桌機程式一樣！！！！　感動！！！！

~~~go
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/pkg/errors"
)

// Config holds configuration
type Config struct {
	// configuration fields go herer (redacted)
}

func readConfig(path string) (*Config, error) {
	file, err := os.Open(path)

	if err != nil {
		return nil, errors.Wrap(err, "can't open configuration file")
	}

	defer file.Close()

	cfg := &Config{}
	// Parse file here (redacted)
	return cfg, nil
}

func setupLogging() {
	// https://golang.org/pkg/os/#FileMode
	out, err := os.OpenFile("./logs/app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return
	}
	log.SetOutput(out)
}

func main() {
	setupLogging()
	cfg, err := readConfig("/path/to/config.toml")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s\n", err)
		log.Printf("err: %+v", err)
		os.Exit(1)
	}

	// Normal operation (redacted)
	fmt.Println(cfg)
}
~~~

- panic and recover


~~~go
package main

import (
	"fmt"
	// "os"
)

func safeValue(vals []int, index int) int {

	defer func() /*anonymous function*/ {
		if err := recover(); err != nil {
			fmt.Printf("ERROR: %s\n", err)
		}
	}()
	return vals[index]
}

func main() {
	/*
		vals := []int{1, 2, 3}
		// This will cause a panic
		v := vals[10]
		fmt.Println(v)
	*/
	/*
			file, err := os.Open("no-such-file")
			if err != nil {
				panic(err)
			}
		defer file.Close()
		fmt.Println("file opened")
	*/

	v := safeValue([]int{1, 2, 3}, 10)
	fmt.Println(v)
	// ERROR: runtime error: index out of range [10] with length 3
	// 0

}

~~~

### Challenge: Server kill

- Write a __killServer(pidFile string) error__ function that reads a process identifier from pidFile, converts it to an integer, and prints `killing <pid>` (instaed of using os.Kill)

   - Use github.com/pkg/errors to wrap errors
   - Use io/ioutil __ReadFile__ to read the file
   - Use strconv.Atoi to convert the file content to an integer


~~~go 
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/pkg/errors"
)

func killserver(pidFile string) error {
	data, err := ioutil.ReadFile(pidFile)
	if err != nil {
		return errors.Wrap(err, "can't open pid file (is server running?)")
	}

	if err := os.Remove(pidFile); err != nil {
		// We can go on if we file here
		log.Printf("Warning: can't remove pid file - %s", err)
	}

	strPID := strings.TrimSpace(string(data))
	pid, err := strconv.Atoi(strPID)
	if err != nil {
		return errors.Wrap(err, "bad process ID")
	}

	// Simulate kill
	fmt.Printf("Killing server kill pid=%s\n", pid)
	return nil
}

func main() {
	if err := killserver("server.pid"); err != nil {
		fmt.Fprintf(os.Stderr, "error: %s\n", err)
		os.Exit(1)
	}
}
~~~
