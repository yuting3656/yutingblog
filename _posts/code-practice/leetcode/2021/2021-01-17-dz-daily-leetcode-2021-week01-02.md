---
layout: "post"
title: "DZ 快樂 LeetCode: 2021 week01-02"
permalink: 'dz-happy-leetcode/2021-week01-02'
tags: 紮馬步 leetcode
---


# Week 01

0. ???

    ## 愛情的Bonus題：

    難度： Hard
    題目： [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

    - YY
        1. Python (time & space: $\mathcal{O}(N)$)
        ~~~python
        class Solution:
            def trap(self, height: List[int]) -> int:
                n = len(height)

                lmax = [0] * n
                rmax = [0] * n

                m = 0
                for i in range(n):
                    m = max(height[i], m)
                    lmax[i] = m
                m = 0
                for i in range(n - 1, -1, -1):
                    m = max(height[i], m)
                    rmax[i] = m

                summ = 0
                for i in range(n):
                    summ += min(lmax[i], rmax[i]) - height[i]

                return summ
        ~~~
        2. Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def trap(self, height: List[int]) -> int:
                n = len(height)
                if n == 0:
                    return 0

                summ = 0
                lmax = rmax = 0
                i = 0
                j = n - 1
                while i <= j:
                    if lmax < rmax:
                        diff = lmax - height[i]
                        if diff > 0:
                            summ += diff
                        lmax = max(lmax, height[i])
                        i += 1
                    else:
                        diff = rmax - height[j]
                        if diff > 0:
                            summ += diff
                        rmax = max(rmax, height[j])
                        j -= 1

                return summ
        ~~~
    - CC
        - Go

        ~~~golang
        func trap(height []int) int {
            if len(height) < 3 {
                return 0
            }

            biggestIndex := 0
            for id, value := range height {
                if value > height[biggestIndex] {
                    biggestIndex = id
                }
            }

            water := getWater(height[:biggestIndex+1])

            // reverse
            reverse := height[biggestIndex:]
            for i, j := 0, len(reverse)-1; i < j; i, j = i+1, j-1 {
                reverse[i], reverse[j] = reverse[j], reverse[i]
            }
            water += getWater(reverse)

            return water
        }

        func getWater(height []int) int {
            water := 0
            for leftIndex := 0; leftIndex < len(height); leftIndex++ {
                addToWater := 0

                for rightIndex := leftIndex + 1; rightIndex < len(height); rightIndex++ {
                    if height[rightIndex] >= height[leftIndex] {
                        water += addToWater
                        leftIndex = rightIndex - 1
                        break
                    } else {
                        addToWater += height[leftIndex] - height[rightIndex]
                    }
                }
            }

            return water
        }
        ~~~

    - kevin
        - javascript
        ~~~javascript
        var trap = function(height) {
            let waterArray = Array.from({length: height.length}, (v,i) => 0)
            let markTag = {
                height: 0,
                index: 0
            }
            height.forEach((val, index) => {
                if (markTag.height <= val) {
                    markTag.index = index
                    markTag.height = val
                } else {
                    waterArray[index] = markTag.height
                }
            })
            const lastZero = markTag.index
            markTag = {
                height: 0,
                index: 0
            }
            for(let index = height.length-1; index >= lastZero; index--) {
                let val = height[index]
                waterArray[index] = 0
                if (markTag.height <= val) {
                    markTag.index = index
                    markTag.height = val
                } else {
                    waterArray[index] = markTag.height
                }
            }
            let output = 0
            waterArray.forEach((val,index) => {
                if (val!==0) {
                    if (val-height[index] > 0) {
                        output += (val-height[index])
                    }
                }
            })
            return output
        };
        ~~~
    
    
2. 1/4

    ## 愛情的第一題：

    選題者: 我
    難度： Easy
    題目： [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

    - 我同事YY
        - Python (time & space: $\mathcal{O}(N)$)

        ~~~python
        mapping = {')':'(', ']':'[', '}':'{'}

        class Solution:
            def isValid(self, s: str) -> bool:
                stack = []

                for c in s:
                    if len(stack) == 0 or c not in mapping:
                        stack.append(c)
                    else:
                        if mapping[c] != stack[-1]:
                            return False
                        stack.pop()

                return len(stack) == 0
        ~~~

    - kevin
        - Javascript

        ~~~javascript
        var isValid = function(s) {
                let output = true
           const charMap = {
               [')']: '(',
               [']']: '[',
               ['}']: '{',
           };
           let charQueue = []
           for(let i = s.length-1; i>=0; i--) {
                if(Object.keys(charMap).includes(s[i])) {
                    charQueue.push(s[i])
                } else {
                    const lastChar = charQueue.pop()
                    if (charMap[lastChar] !== s[i]) {
                        output = false
                        break;
                    }
                }
           }
           if (charQueue.length) {
               return false
           }
           return output

        };
        ~~~

    - Syun
        - Javascript

        ~~~Javascript
        var isValid = function(s) {
            let markMap = {
                '(':')', 
                '[':']', 
                '{':'}'
            }
            let array = [];
            for (const item of s) {
                if (markMap.hasOwnProperty(item)) {
                    array.push(item)
                } else {
                    let lastItem = array.pop();
                    if (item !== markMap[lastItem]) {
                        return false;
                    }
                }
            }

            if (array.length === 0) {
                return true;
            } else {
                return false;
            }
        };
        ~~~
        
    - Tim
        - python

        ~~~python
           class Solution(object):
               def isValid(self, s):
                   """
                   :type s: str
                   :rtype: bool
                   """
                   stack = []
                   
                   for i in s:
                       if i == u"(" or i == u"{" or i == u"[":
                           stack.append(i)
                       else:
                           self.pop_out_machine(stack, i)
                   return True if len(stack) == 0 else False
                   
               def pop_out_machine(self, stack, string):
                   if len(stack) == 0:
                       stack.append("LoL!!")
                   elif string == ")" and stack[-1] == u"(":
                       stack.pop()
                   elif string == "}" and stack[-1] == u"{":
                       stack.pop()
                   elif string == "]" and stack[-1] == u"[":
                       stack.pop()
                   else:
                       stack.append("LOL!!!")
        ~~~
        
    - Ezra
       - Javascript

       ~~~javascript
       var isValid = function(s) {
           if (s === null || s.length <= 0) return true
           let stack = []
           for (let i = 0; i < s.length; i++) {
               if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
                   stack.push(s[i])
               } else if (s[i] === ")" && stack[stack.length - 1] === "(") {
                   stack.pop()
               } else if (s[i] === "}" && stack[stack.length - 1] === "{") {
                   stack.pop()
               } else if (s[i] === "]" && stack[stack.length - 1] === "[") {
                    stack.pop()
               }
           }
           if (stack.length === 0) return true
           return false
       };
      ~~~

    - Chris
        - Go

        ~~~golang
        func isValid(s string) bool {
            stack := []rune{}
            rightLeft := map[rune]rune {
                ')': '(',
                ']': '[',
                '}': '{',
            }

            for _, ch := range s {
                if left, isRightCh := rightLeft[ch]; !isRightCh {
                    stack = append(stack, ch)
                } else {
                    if len(stack) == 0 {
                        return false
                    }

                    if stack[len(stack)-1] != left {
                        return false
                    }

                    stack = stack[:len(stack)-1]
                }
            }

            if len(stack) == 0 {
                return true
            }

            return false
        }
        ~~~
   
    
2. 1/5

    ## 愛情的第二題：

    選題者: 我祖母的爸爸的孫子的兒子
    難度： Easy
    題目： [463. Island Perimeter](https://leetcode.com/problems/island-perimeter/)

    - 我媽的兒子HY
        - Python (time: $\mathcal{O}(NM)$, space: $\mathcal{O}(1)$)

        ~~~python
        class Solution:
            def islandPerimeter(self, grid: List[List[int]]) -> int:
                peri = 0
                for i in range(len(grid)):
                    for j in range(len(grid[0])):
                        if grid[i][j] == 1:
                            if i == 0 or grid[i - 1][j] == 0:
                                peri += 2
                            if j == 0 or grid[i][j - 1] == 0:
                                peri += 2

                return peri
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var islandPerimeter = function(grid) {
            let output = 0
            const outsideLength = grid.length
            const insideLength = grid[0].length
            for( let i = 0; i< outsideLength; i++) {
                for( let j = 0; j < insideLength; j ++) {
                    if(grid[i][j] === 1){
                        output += 4
                        const checkList = []
                        if (j + 1 >= 0 && j + 1 < insideLength) {
                            checkList.push([i,j+1])
                        }
                        if (j - 1 >= 0 && j - 1 < insideLength) {
                            checkList.push([i, j - 1]);
                        }
                        if (i + 1 >= 0 && i + 1 < outsideLength) {
                            checkList.push([i+1, j]);
                        }
                        if (i - 1 >= 0 && i - 1 < outsideLength) {
                            checkList.push([i - 1, j]);
                        }
                        checkList.forEach(val => {
                            if(grid[val[0]][val[1]]===1) {
                                output -= 1
                            }
                        })
                    }

                }
            }
            return output
        };
        ~~~

    - Chris
        - Go
        - 想法是：
            1. 如果一個格子的上面那條邊可以被算進周長，那那個格子必須要是 1，而且他的上面那格要是 0，或是他沒有上面那格(當下這格在最前面那排)。
            2. 下面的邊如果要被算進去，則是他自己要是 1，它的下面那格要是 0，或是他沒有下面那格(當下這格在最後一排)。
            3. 一個格子的左右兩條邊要被算進周長的話，條件就跟上下的邊差不多，就是換個方向而已。
            4. 綜合上述，就用兩層 for 迴圈，當格子是 1，去做檢查有沒有符合條件就好了。

        ~~~golang
        func islandPerimeter(grid [][]int) int {
            perimeter := 0

            for row, valueRow := range grid {
                for col, valueCol := range valueRow {
                    if valueCol == 1 {
                        // the upper edge
                        if row - 1 < 0 || grid[row-1][col] == 0 {
                            perimeter += 1
                        }

                        // the left edge
                        if col - 1 < 0 || grid[row][col-1] == 0 {
                            perimeter += 1
                        }

                        // the right edge
                        if col + 1 >= len(valueRow) || grid[row][col+1] == 0 {
                            perimeter += 1
                        }

                        // the bottom edge
                        if row + 1 >= len(grid) || grid[row+1][col] == 0 {
                            perimeter += 1
                        }
                    }
                }
            }

            return perimeter
        }
        ~~~
        
    - 內🦊模仿王
        - python
        
        <iframe src="https://www.youtube.com/embed/FkjFlNtTzc8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        ~~~python
        class Solution(object):
            def islandPerimeter(self, grid):
                """
                :type grid: List[List[int]]
                :rtype: int
                """
                result = 0
                for row_idx ,row in enumerate(grid):
                    for el_idx , el in enumerate(row):
                        print("({}, {}) : {}".format(row_idx, el_idx, el) )
                        if grid[row_idx][el_idx] == 1:
                            result += 4
                            
                            if row_idx > 0 and grid[row_idx-1][el_idx] == 1:
                                result -= 2
                        
                            if el_idx > 0 and grid[row_idx][el_idx-1] == 1:
                                result -= 2
                return result             
        ~~~
        - javascript 

        ~~~javascript
             /**
             * @param {number[][]} grid
             * @return {number}
             */
            var islandPerimeter = function(grid) {
                let result = 0
                for (let i = 0; i < grid.length; i ++ ) {
                    for ( let j = 0; j < grid[i].length; j ++ ){
                        if (grid[i][j] === 1 ) {
                            result += 4
                            if ( i > 0 && grid[i-1][j] == 1) result -= 2
                            if ( j > 0 && grid[i][j-1] == 1) result -= 2
                        }
                    }
                }
                
                return result;
            };
        ~~~

    - Ezra
      - javascript

      ~~~ javascript
      var islandPerimeter = function(grid) {
          let perimeter = 0
          for (let i = 0; i < grid.length; i++) {
              for (let j = 0; j < grid[i].length; j++) {
                  if (grid[i][j] === 1) {
                      //上
                      if (!grid[i + 1] || !grid[i + 1][j]) perimeter++
                      //下
                      if (!grid[i - 1] || !grid[i - 1][j]) perimeter++
                      //左
                      if (!grid[i][j - 1]) perimeter++
                      //右
                      if (!grid[i][j + 1]) perimeter++
                  }
              }
          }
          return perimeter
      };
      ~~~
    
    
3. 1/6

    ## 愛情的第三題：

    選題者: 你
    難度： Easy
    題目： [9. Palindrome Number](https://leetcode.com/problems/palindrome-number/)

    - Chris
        - Go

        ~~~golang
        func isPalindrome(x int) bool {
            if x < 0 {
                return false
            }

            xStr := strconv.FormatInt(int64(x), 10)
            for index, ch := range xStr {
                if index == len(xStr)-1-index {
                    return true
                }
                if string(ch) != string(xStr[len(xStr)-1-index]) {
                    return false
                }
            }

            return true
        }
        ~~~

        沒轉字串可以了吧！！！！！

        ~~~golang
        func isPalindrome(x int) bool {    
            if x < 0 {
                return false
            }

            if x == 0 {
                return true
            }

            num := 0
            xCopy := x
            for {
                num += x % 10

                x = x / 10
                if x == 0 {
                    break
                } else {
                    num *= 10
                }
            }

            return num == xCopy
        }
        ~~~

    - Tim
        - python
        - 寫過了拉～～～～ ：）

        ~~~python
         from collections import deque
 
         class Solution(object):
             def isPalindrome(self, x):
                 """
                 :type x: int
                 :rtype: bool
                 """
                 x = str(x)
                 dq_rev = deque(reversed(x))
                 return True if ''.join(dq_rev) == x else False
        ~~~

    - kevin
        - javascript
        - 想法
            - 把字倒過來
            - 比有沒有一樣
            - 負數先排除

        ~~~javascript
        var isPalindrome = function(x) {
            if (x < 0) {
                return false;
            }
            x = x.toString();
            const y = x.split("").reverse().join("")
            return x === y

        };
        var isPalindrome = function(x) {
            if (x < 0) {
                return false;
            }
            x = x.toString();
            let begin = 0
            let last = x.length-1
            while(last >= begin) {
                if (x[begin] !== x[last]) {
                    return false
                }
                begin++
                last--
            }
            return true
        };
        ~~~
        
    - 你媽YY
        - Python (time: $\mathcal{O}(\log_{10} N)$, space: $\mathcal{O}(1)$)

        ~~~python
        import math

        class Solution:
            def isPalindrome(self, x: int) -> bool:
                if x < 0:
                    return False        
                if x == 0:
                    return True

                n = math.ceil(math.log10(x + 1))
                for i in range(0, n // 2):
                    if int(x / 10**i) % 10 != int(x / 10**(n - i - 1)) % 10:
                        return False

                return True
        ~~~

   - Ezra
      - javascript

      ~~~javascript
      var isPalindrome = function(x) {
          let input = x
          let output = 0
          if ( x < 0 ) return false
          while (x > 0) {
              output = x % 10 + output * 10
              x = Math.floor(x / 10)
          }
          if (output === input) return true
          else return false
      };
      ~~~
  
    


4. 1/7

    ## 愛情的第四題：

    選題者: Ezra
    難度： Easy
    題目： [1037. Valid Boomerang](https://leetcode.com/problems/valid-boomerang/)


    - YY
        - Python

        ~~~python
        import math

        def slope(a, b):
            dx = b[0] - a[0]
            dy = b[1] - a[1]

            return dy / dx if dx != 0 else math.inf

        class Solution:
            def isBoomerang(self, points: List[List[int]]) -> bool:
                if points[0] == points[1] or points[1] == points[2] or points[2] == points[0]:
                    return False

                return slope(points[0], points[1]) != slope(points[0], points[2])
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var isBoomerang = function(points) {
            let [point1, point2, point3] = points
            const rangeX1 = point1[0]-point2[0]
            const rangeY1 = point1[1]-point2[1]
            const rangeX2 = point1[0]-point3[0]
            const rangeY2 = point1[1]-point3[1]
            if (rangeX1 === rangeY1 && rangeX1 === 0) {
                return false
            }
            if (rangeX2 === rangeY2 && rangeX2 === 0) {
                return false
            }
            if (rangeY1 === 0) {
                return rangeY2 !== 0
            }
            // console.log(rangeX1)
            // console.log(rangeY1)
            // console.log(rangeX2)
            // console.log(rangeY2)
            if (rangeY1 !== 0 ) {
                if (rangeY2 === 0){
                    return true
                }
                const slope1 =  rangeX1/rangeY1
                const slope2 =  rangeX2/rangeY2
                // console.log(slope1)
                // console.log(slope2)
                return slope1 !== slope2
            }
        };
        ~~~

    - Ezra
        - javascript

        ~~~javascript
        var isBoomerang = function(points) {
            if ( (points[0][1] - points[1][1]) * (points[1][0] - points[2][0])  === (points[1][1] - points[2][1]) * (points[0][0] - points[1][0]) ) {
                return false
            }
            return true
        };
        ~~~

    - Tim
        - python 嘿嘿嘿
        - https://math.stackexchange.com/questions/701862/how-to-find-if-the-points-fall-in-a-straight-line-or-not

        ~~~python 
        class Solution(object):
            def isBoomerang(self, points):
                """
                :type points: List[List[int]]
                :rtype: bool
                """
                # ax + b = y
                d_s = {}
                for row_idx, row_value in enumerate(points):
                    d_s[row_idx + 1] = [row_value[0], row_value[1]]
                # (x2−x1)(y3−y1)−(y2−y1)(x3−x1)=0
                return False if ((d_s[2][0] - d_s[1][0]) * (d_s[3][1] - d_s[1][1])) - ((d_s[2][1] - d_s[1][1]) *(d_s[3][0] - d_s[1][0])) == 0 else True
        ~~~

    - ChCHCHCHCH
        - Go
        - 因為除法要處理很多麻煩的東東，所以 dy1 / dx1 != dy2 / dx2 ，乘以 dx1 * dx2 之後，叮咚叮咚！

        ~~~go
        func isBoomerang(points [][]int) bool {  
            return (points[0][1] - points[1][1]) * (points[0][0] - points[2][0]) != (points[0][1] - points[2][1]) * (points[0][0] - points[1][0])
        }
        ~~~
 
    
5. 1/8

    ## 愛情的第五題：

    選題者: Ezra
    難度： Easy
    題目： [204. Count Primes](https://leetcode.com/problems/count-primes/)
 
    - Ch
        - Go

        ~~~golang
        func countPrimes(n int) int {
            if n == 0 || n == 1 {
                return 0
            }

            notPrimes := make([]bool, n)
            notPrimes[0] = true
            notPrimes[1] = true

            for i := 2; i <= int(math.Sqrt(float64(n))); i++ {
                if notPrimes[i] == false {
                    for j := i; j <= (n-1)/i; j++ {
                        notPrimes[i*j] = true
                    }
                }
            }

            ans := 0
            for _, value := range notPrimes {
                if value == false {
                    ans += 1
                }
            }

            return ans
        }
        ~~~
  

---


# Week 02


0. ???

    ## 愛情的Bonus題：

    難度： Hard
    題目： [85. Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)

    - kevin
        - javascript

        ~~~javascript
        var maximalRectangle = function(matrix) {
            if (matrix.length === 0) {
                return 0
            }
            let xLength = matrix.length
            let yLength = matrix[0].length
            let newMatrix = [[]]
            let countMatrix = [[]]
            newMatrix[0] = Array.from({length: yLength+1}, () => 0)
            countMatrix[0] = Array.from({length: yLength+1}, () => 0)
            for (let i = 0; i< xLength; i++) {            
                countMatrix[i+1] = Array.from({length: yLength+1}, () => 0)
                newMatrix[i+1] = [0,...matrix[i]]
            }
            // 先把前面加上0
            // console.log(newMatrix)
            // console.log(countMatrix)
            xLength++
            yLength++

            for (let i = 1; i < xLength; i++) {
                for (let j = 1; j < yLength; j++) {
                    if (newMatrix[i][j] == 1) {
                        // console.log(newMatrix[i][j])
                        // countMatrix[i][j][0] = countMatrix[i-1][j][0]+1
                        countMatrix[i][j] = countMatrix[i][j-1]+1
                    }
                }
            }
            // console.log(countMatrix)
            let output = 0
            for (let i = 1; i< xLength; i++){
                for (let j = 1; j < yLength; j++) {
                    let _i = i
                    let currWidth = Number.MAX_VALUE
                    while (true) {
                        if (countMatrix[_i][j] > 0 ) {
                            currWidth = Math.min(countMatrix[_i][j], currWidth)
                            const currentReg = currWidth * (i-_i+1)
                            output = Math.max(output, currentReg)
                            _i--
                        } else {
                            break
                        }
                    }
                }
            }
            // console.log('output')
            // console.log(output)
            return output
        };
        ~~~
    :::
    
1. 1/11

    ## 愛情的第一題：

    難度： Easy
    題目： [278. First Bad Version](https://leetcode.com/problems/first-bad-version/)

    - YY
        - Python (time: $\mathcal{O}(\lg N)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def firstBadVersion(self, n):
                i = 1
                j = n
                while i <= j:
                    mid = i + (j - i) // 2

                    if isBadVersion(mid):
                        j = mid - 1
                    else:
                        i = mid + 1

                return j + 1
        ~~~

    - Chrris
        - Golang

        ~~~golang
        func firstBadVersion(n int) int {
            head := 0
            tail := n
            badV := (head + tail) / 2

            for {      
                if isBadVersion(badV) == true {
                    tail = badV
                } else {
                    head = badV
                }

                badV = (head + tail) / 2
                if badV == head {
                    return tail
                }
            }

            return 0
        }
        ~~~

    - Tim
        - Python
        - TLE 也很美！

        ~~~python
        class Solution(object):
            def firstBadVersion(self, n):
                """
                :type n: int
                :rtype: int
                """
                init_flag = isBadVersion(n)
                bad_value_neighbour = n
                current_version = isBadVersion(n)
                while True:
                    if  isBadVersion(bad_value_neighbour) != current_version:
                        return bad_value_neighbour + 1 if init_flag == True else    bad_value_neighbour - 1
                    
                    if isBadVersion(bad_value_neighbour) == True:
                        bad_value_neighbour -= 1
                    else:
                        bad_value_neighbour += 1
        
        ~~~

        - cool~ 

        ~~~python
        class Solution(object):
            def firstBadVersion(self, n):
                """
                :type n: int
                :rtype: int
                """
                # Binary Search
                left = 1
                right = n
                while left < right:
                    mid = left + (right - left) / 2
                    if isBadVersion(mid):
                        right = mid
                    else:
                        left = mid + 1
                    
                return left
        ~~~

   - Ezra
       - javascript

       ~~~javascript
       var solution = function(isBadVersion) {
           return function(n) {
              let goodVersion = 0
              let badVersion = n
              while (badVersion !== goodVersion + 1) {
                  let current = Math.floor((goodVersion + badVersion) / 2)
                  isBadVersion(current) ? badVersion = current : goodVersion = current
              }
              return badVersion
          }
       }
       ~~~

    - kevin
        - javascript

        ~~~javascript
        var solution = function(isBadVersion) {
            /**
             * @param {integer} n Total versions
             * @return {integer} The first bad version
             */
            return function(n) {
                if (n === 1 ) {
                    return 1
                }
                const originVal = n;
                let bigNum = n
                let smallNum = 1
                while (n>0) {
                    if (bigNum === smallNum) {
                        break
                    }
                    n = Math.ceil((bigNum+smallNum)/2)
                    // console.log(bigNum, smallNum)
                    // console.log(n)
                    // console.log(isBadVersion(n))
                    if (isBadVersion(n)) {
                        console.log(isBadVersion(n-1))
                        if (bigNum ===n){
                            break
                        }
                        if (isBadVersion(n-1)) {
                            bigNum = n
                        } else {
                            break
                        }
                    } else {
                        smallNum = n
                    }
                }
                if (isBadVersion(1)) {
                    return 1
                }
                return n

            };
        };
        ~~~

2. 1/12

    ## 愛情的第二題：

    難度： Easy
    題目： [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)


    - HY
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)

        ~~~python
        class Solution:
            def maxProfit(self, prices: List[int]) -> int:
                max_profit = profit = 0

                for i in range(1, len(prices)):
                    profit += prices[i] - prices[i - 1]

                    if profit >= 0:
                        max_profit = max(max_profit, profit)
                    else:
                        profit = 0

                return max_profit
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var maxProfit = function(prices) {
            const pricesLength = prices.length
            let a1 = []
            let a2 = Array.from({length: pricesLength}, () => 0);
            let a1Min = prices[0]
            let a2Max = prices[pricesLength-1]
            for (let i = 0; i< pricesLength;i++) {
                price = prices[i]
                a1Min = Math.min(a1Min,price)
                a1.push(a1Min)
            }
            for (let i = pricesLength-1; i>=0; i--) {
                price = prices[i]
                a2Max = Math.max(a2Max,price)
                a2[i] = a2Max
            }
            let output = 0
            for (let i = 0; i < a1.length; i++) {
                output = Math.max((a2[i]-a1[i]),output)
            }
            return output
        };
        ~~~
        
    - CC
        - Golang

        ~~~golang
        func maxProfit(prices []int) int {
            if len(prices) < 2 {
                return 0
            }

            profit := 0
            minPrice := math.MaxInt64

            for _, price := range prices {
                if price < minPrice {
                    minPrice = price
                }

                if price - minPrice > profit {
                    profit = price - minPrice
                }
            }

            return profit
        }
        ~~~

    - Tim
        - python
        - 發大財～～～～～
        
        ~~~python
           class Solution(object):
               def maxProfit(self, prices):
                   """
                   :type prices: List[int]
                   :rtype: int
                   """
                   
                   buy_price = sys.maxsize
                   profit = 0
                   for idx, v in enumerate(prices):
                       # 低買
                       if buy_price > v :
                           buy_price = v
                       elif v - buy_price > profit:
                           profit = v - buy_price 
                       
                   return profit
        ~~~
        
    - Ezra
        - javascript

        ~~~javascript
        var maxProfit = function(prices) {
            let maxProfit = 0
            let minPrice = prices[0]
            for (let i = 1; i < prices.length; i++) {
                if (prices[i] < minPrice) {
                    minPrice = prices[i] 
                } else {
                    const profit = prices[i] - minPrice
                    maxProfit = Math.max(profit, maxProfit)
                }
            }
            return maxProfit
        };
        ~~~   
    
3. 1/13

    ## 愛情的第三題

    難度：Easy
    題目：[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray)
    備註：其實昨天那題可以用這題的解法來解唷（把每天的股價各自減掉前一天的股價，得到一個差價array，再找出其中的maximum subarray，並算其總和，即解）

    - YY
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)

        ~~~python
        class Solution:
            def maxSubArray(self, nums: List[int]) -> int:
                max_summ = summ = nums[0]

                for i in range(1, len(nums)):
                    if summ < 0:
                        summ = 0

                    summ += nums[i]
                    max_summ = max(max_summ, summ)

                return max_summ
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var maxSubArray = function(nums) {
            let output = nums[0]
            let maxNumSum = nums[0]
            for (let i = 1; i < nums.length; i ++) {
                // 如果之前的連續數量已經是負數，那就乾脆不要取，重新來還會比較小
                if (maxNumSum < 0) {
                    maxNumSum = 0
                }
                maxNumSum += nums[i]
                output = Math.max(output,maxNumSum)
            }
            return output
        };
        ~~~

    - CCCCC
        - Golang
        - 想法：一開始先當作 index=0 的元素在可以加出最大值的subArray中，目前的最大值(max)就設定為index=0的那個元素，而且還需要一個變數(currentSum)來存目前subAry中元素的和。
            接著從index=1 開始掃給的輸入 nums，如果加上當前的元素會使得目前的和(currentSum)變大，則 currentSum 就會是原本的值加上當前的元素，如果加上目前元素結果變得比原本的和(currentSum)還要小，則捨棄之前的結果，也就是那個maximum subAry就算只有當前元素，也會比把現在的元素加進去來的好，因此 currentSum 重設為當前元素。當每一輪得到新的 currentSum 後(也就是決定要加入當前元素、或是乾脆捨棄前面結果，只把當前元素加入 maximum subAry 中)，將目前的 currentSum 與 max 值比對，大者就設定給 max，如此跑完一輪，即得答案。
        - 跑一次看看：
            * 初始: -2, 1, -3, 4, -1, 2, 1, -5, 4
                max = -2, currentSum = -2
            * index = 1，當前元素 nums[1] = 1: 
                若當前元素被加入 subAry 中，則此時和 -2 + 1 = -1
                因此重設 currentSum 為當前元素 = 1
                這輪結束了，此時 currentSum = 1 大於 max = -2，因此 max 重設為 1
            * index = 2，當前元素 nums[2] = -3:
                若當前元素被加入 subAry 中，則此時和 1 + -3 = -2 大於當前元素
                因此 currentSum = currentSum + -3 = -2
                這輪結束了，此時 currentSum = -2 並未大於 max = 1，因此 max 不變
            * index = 3，當前元素 nums[3] = 4:
                若當前元素被加入 subAry 中，則此時和 -2 + 4 = 2 並未大於當前元素
                因此重設 currentSum 為當前元素 = 4
                這輪結束了，此時 currentSum = 4 大於 max = 1，因此 max 重設為 4
            * index = 4，當前元素 nums[4] = -1:
                若當前元素被加入 subAry 中，則此時和 4 + -1 = 3 大於 當前元素
                因此 currentSum = currentSum + -1 = 3
                這輪結束了，此時 currentSum = 3 並未大於 max = 4，因此 max 不變
            * index = 5，當前元素 nums[5] = 2:
                若當前元素被加入 subAry 中，則此時和 3 + 2 = 5 大於 當前元素
                因此 currentSum = currentSum + 2 = 5
                這輪結束了，此時 currentSum = 5 大於 max = 4，因此 max 重設為 5
            * index = 6，當前元素 nums[6] = 1:
                若當前元素被加入 subAry 中，則此時和 5 + 1 = 6 大於 當前元素
                因此 currentSum = currentSum + 1 = 6
                這輪結束了，此時 currentSum = 6 大於 max = 5，因此 max 重設為 6
            * index = 7，當前元素 nums[7] = -5:
                若當前元素被加入 subAry 中，則此時和 6 + -5 = 1 大於 當前元素
                因此 currentSum = currentSum + -5 = 1
                這輪結束了，此時 currentSum = 1 並未大於 max = 6，因此 max 不變
            * index = 8，當前元素 nums[8] = 4:
                若當前元素被加入 subAry 中，則此時和 1 + 4 = 5 大於 當前元素
                因此 currentSum = currentSum + 4 = 5
                這輪結束了，此時 currentSum = 5 並未大於 max = 6，因此 max 不變

        ~~~golang

        func maxSubArray(nums []int) int {
            max := nums[0]
            head := nums[0]

            for i := 1; i < len(nums); i++ {    
                if head + nums[i] > nums[i] {
                    head = head + nums[i]
                } else {
                    head = nums[i]
                }

                if head > max {
                    max = head
                }
            }

            return max
        }

        ~~~

    - Tim 
        - python
        - 穩的拉！！！
        - https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/

        ~~~python
        class Solution(object):
            def maxSubArray(self, nums):
                """
                :type nums: List[int]
                :rtype: int
                """
                large_sum = - sys.maxsize
                sum_num = 0
                point = 0
                for idx ,i in enumerate(nums):
                    sum_num = sum_num + nums[idx]
                    if large_sum < sum_num:
                        large_sum = sum_num
                    
                    if sum_num < 0:
                        sum_num = 0
                        
                return large_sum
        ~~~
        
    - Ezra
        - javascript

        ~~~javascript
        var maxSubArray = function(nums) {
            let curSum = nums[0]
            let maxSum = curSum
            for (let i = 1; i < nums.length; i++) {
                curSum += nums[i]
                if (nums[i] > curSum) {
                    curSum = nums[i]
                }
                if (curSum > maxSum) {
                    maxSum = curSum
                }
            }
            return maxSum
        };
        ~~~

4. 1/14

    ## 愛情的第四題

    難度：Easy
    題目：[697. Degree of an Array](https://leetcode.com/problems/degree-of-an-array/)

    - CCCCCCCCC
        - Go

        ~~~go
        func findShortestSubArray(nums []int) int {
            numFrequency := map[int]int{}
            numFirstIndex := map[int]int{}

            maxFreq := 0
            minFreqIndexDiff := 0

            for index, value := range nums {
                freq, has := numFrequency[value]
                if has {
                    numFrequency[value] = freq + 1
                    if freq + 1 > maxFreq {
                        maxFreq = freq + 1
                        minFreqIndexDiff = index - numFirstIndex[value]
                    }

                    if freq + 1 == maxFreq {
                        if minFreqIndexDiff > index - numFirstIndex[value] {
                            minFreqIndexDiff = index - numFirstIndex[value]
                        }
                    }
                } else {
                    numFrequency[value] = 1
                    numFirstIndex[value] = index
                }
            }

            return minFreqIndexDiff + 1
        }
        ~~~

    - YY
        - Python (time & space: $\mathcal{O}(N)$)

        ~~~python
        import math
        from collections import defaultdict

        class Solution:
            def findShortestSubArray(self, nums: List[int]) -> int:
                counts = defaultdict(lambda: 0)
                degree = 0
                for x in nums:
                    counts[x] += 1
                    degree = max(degree, counts[x])

                min_len = math.inf

                counts = defaultdict(lambda: 0)
                i = 0
                for j, x in enumerate(nums):
                    counts[x] += 1

                    if counts[x] == degree:
                        while nums[i] != x:
                            counts[nums[i]] -= 1
                            i += 1
                        min_len = min(min_len, j - i + 1)

                return min_len
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var findShortestSubArray = function(nums) {
            const countMap = {}
            nums.forEach((val,index) => {
                if (countMap.hasOwnProperty(val)) {
                    countMap[val].end = index
                    countMap[val].count++
                } else {
                    countMap[val] = {
                        start: index,
                        end: index,
                        count: 1
                    }
                }
            })
            // find max count
            let maxCount = 0
            for (let index in countMap) {
                const currObj = countMap[index]
                maxCount = Math.max(currObj.count,maxCount)
            }
            let output = Number.MAX_VALUE
            // find min length
            for (let index in countMap) {
                const currObj = countMap[index]
                if (currObj.count === maxCount) {
                    output = Math.min(output, (currObj.end-currObj.start+1))
                }
            }
            return output
        };
        ~~~
        
    - 億載成五算啥麼_那壺成五才是王道 :)
        - python
        - 棒棒的拉!
        - <iframe src="https://www.youtube.com/embed/7wT5sFELf7Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        ~~~python

        class Solution(object):
            def findShortestSubArray(self, nums):
                """
                :type nums: List[int]
                :rtype: int
                """
                degree = 0
                min_length = 0
                count_dict = {}
                first_seen = {}
                for idx, v in enumerate(nums):
                    if first_seen.get(v, None) == None:
                        first_seen[v] = idx
                    
                    if count_dict.get(v, None) == None:
                        count_dict[v] = 1
                    else:
                        count_dict[v] += 1
                    
                    # count degree
                    if degree < count_dict[v]:
                        degree = count_dict[v]
                        min_length = idx - first_seen[v] + 1
                    elif degree == count_dict[v]:
                        min_length = min(min_length, idx - first_seen[v] + 1 )
                        
                return min_length
        ~~~


4. 1/15

    ## 愛情的第五題

    難度：Easy
    題目：[953. Verifying an Alien Dictionary](https://leetcode.com/problems/verifying-an-alien-dictionary/)

    - YY
        - Python (time: $\mathcal{O}(words)$, space: $\mathcal{O}(order)$)

        ~~~python
        class Comparator:
            def __init__(self, order):
                self._order = {c: i for i, c in enumerate(order)}

            def lte(self, w1, w2):
                l1, l2 = len(w1), len(w2)

                for i in range(min(l1, l2)):
                    o1, o2 = self._order[w1[i]], self._order[w2[i]]
                    if o1 < o2:
                        return True
                    if o1 > o2:
                        return False

                return l1 <= l2

        class Solution:
            def isAlienSorted(self, words: List[str], order: str) -> bool:
                comp = Comparator(order)

                for i in range(len(words) - 1):
                    if not comp.lte(words[i], words[i + 1]):
                        return False

                return True
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var isAlienSorted = function(words, order) {
            if (words.length === 1) {
                return true
            }
            let dictionary = {}
            // console.log(order[0])
            for (let i = 0; i < order.length; i ++) {
                dictionary[order[i]] = i
            }
            // console.log(dictionary)
            for (let i = 1; i <words.length; i ++){
                const firstWordLength = words[i-1].length
                for (let j = 0; j < firstWordLength; j++) {
                    const compareFirstWord = words[i-1][j]
                    const compareSecondWord = words[i][j]
                    if (compareSecondWord === undefined) {
                        return false
                    }
                    if (dictionary[compareFirstWord] > dictionary[compareSecondWord]) {
                        return false
                    }
                    if (dictionary[compareFirstWord] < dictionary[compareSecondWord]) {
                        break
                    }
                }
            }
                return true
        };
        ~~~

    - 提姆 
        - 帥了吧寫到還有try_except_XDDDD

        ~~~python
        class Solution(object):
            def isAlienSorted(self, words, order):
                """
                :type words: List[str]
                :type order: str
                :rtype: bool
                """
                
                alien_dict = {}
                for idx, i in enumerate(order):
                    alien_dict[i] = idx + 1
                
                # 跟下一個比
                for i in range(len(words) -1):
                    for j in range(len(words[i])):
                        if len(words[i]) > len(words[i+1]):
                            try: 
                                checker = alien_dict[words[i+1][j]]
                            except IndexError: 
                                return False
                            if alien_dict[words[i][j]] < alien_dict[words[i+1][j]]:
                                break
                            elif alien_dict[words[i][j]] == alien_dict[words[i+1][j]]:
                                continue
                            else: 
                                return False
                        
                        if alien_dict[words[i][j]] > alien_dict[words[i+1][j]]:
                            return False
                        if alien_dict[words[i][j]] < alien_dict[words[i+1][j]]:
                            break
                            
                return True
        ~~~


