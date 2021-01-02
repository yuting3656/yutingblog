---
layout: "post"
title: "DZ 快樂 LeetCode: 2020 "
permalink: 'dz-happy-leetcode/2020'
tags: 紮馬步 leetcode
---

> 起源是這樣的兒 :star: :star2: :dizzy:
>
> 阿黃姐(小雞老師狀態) 在一陣js教學後
>
> 大聲地嘶吼: "本公司同仁 資料結構必須加強!!!!"
>
> 然後 快樂的 DZ 快樂 LeetCode 就誕生了 :v:
>
> 每天一回 見紅就收 :laughing:
>
> YA!!!!! :sunglasses:

# 2020 的足跡

1. 12/21

    ## 愛情的第一題：

    難度：EASY
    題目：[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

    - Tim
        - python

        ~~~python
         class Solution(object):
             def twoSum(self, nums, target):
                 """
                 :type nums: List[int]
                 :type target: int
                 :rtype: List[int]
                 """
                 for i in range(len(nums)):
                     for j in range(i + 1, len(nums) ):
                         if nums[i] + nums[j] == target:
                             return [i, j]
         
        ~~~
        
        ~~~python
           class Solution(object):
               def twoSum(self, nums, target):
                   """
                   :type nums: List[int]
                   :type target: int
                   :rtype: List[int]
                   """     
                   return [ [i, j] for i in range(len(nums)) for j in range(i+ 1, len(nums)) if nums[i] + nums[j] == target][0]
        ~~~
        
        - javascript

         ~~~javascript
         /**
          * @param {number[]} nums
          * @param {number} target
          * @return {number[]}
          */
         var twoSum = function(nums, target) {
             for ( let i = 0; i < nums.length; i ++ ) {
                 for ( let j = i + 1; j < nums.length; j ++ ) {
                     if ((nums[i] + nums[j]) === target) return [i , j]
                 }
             }
         };
        ~~~
        
    - Chris
        - Golang
        ~~~go
        func twoSum(nums []int, target int) []int {
            numMap := make(map[int]int)

            for index, value := range nums {
                _, ok := numMap[target - value]
                if ok {
                    return []int{ numMap[target - value], index }
                } else {
                    numMap[value] = index
                }
            }

            return nil
        }
        ~~~
        
    - Syun
         - javascript
         ~~~javascript
        var twoSum = function(nums, target) {
            for( let i = 0 ; i < nums.length; i++ ) {
                let answer = [];
                answer.push(i);
                 for( let j = i+1 ; j < nums.length; j++ ) {
                    if (nums[i] + nums[j] === target) {
                        answer.push(j)
                        return answer
                    }
                }
            }
        };
       ~~~

    - Kevin
        - javascript

        ~~~javascript
           /**
            * @param {number[]} nums
            * @param {number} target
            * @return {number[]}
            */
           var twoSum = function(nums, target) {
               let output = []
               for (let i = 0; i < nums.length; i++) {
                   for (let  j = i+1; j < nums.length; j ++) {
                       if ((nums[i]+nums[j]) === target) {
                           output = [i,j]
                           break
                       }
                   }
                   if(output.length) {
                       break
                   }
               }
               return output
           };
        ~~~
        
    - Ezra
        - javascript

        ~~~javascript
        /**
         * @param {number[]} nums
         * @param {number} target
         * @return {number[]}
         */ 
        var twoSum = function(nums, target) {
            for (let i = 0; i < nums.length-1; i++) {
                for (let j = i+1; j < nums.length; j++) {
                    if (nums[i] + nums[j] === target) {
                        return [i, j]
                    }
                }
            }
        };
    
        ~~~
        
       
2. 12/22

   ## 週二的第二題

    難度：EASY
    題目：[https://leetcode.com/problems/reverse-integer/](https://leetcode.com/problems/reverse-integer/)

    - Kevin
        - javascript

        ~~~javascript
        /**
         * @param {number} x
         * @return {number}
         */
        var reverse = function(x) {
            let output = ''
            if (x < 0) {
                output = '-'
                x = `${x}`.slice(1)
            } else {
                x = x.toString()
            }
            stringLength = x.length
            for (let i = 0; i < stringLength; i++){
                output += x[stringLength-i-1]
            }
            if (+output > (Math.pow(2,31) -1) || +output < -Math.pow(2,31)) {
                return 0
            }
            return output
        };
        ~~~
        
    - Tim
        - python

        ~~~python
        class Solution(object):
            def reverse(self, x):
                """
                :type x: int
                :rtype: int
                """
                str_x = str(x)
                if str_x[0] == '-' : 
                    str_x = str_x[1:][::-1]
                    return self.check_range( '-' + str(int(str_x)))
                return self.check_range(str(int(str_x[::-1])))
            
            def check_range(self, check_value):
                if int(check_value) > 2147483647 or -2147483648 > int(check_value) :
                    return 0
                else:
                    return check_value
        ~~~

        - javascript

        ~~~javascript
         /**
         * @param {number} x
         * @return {number}
         */
         var reverse = function(x) {
             let strX = JSON.stringify(x)
             if ( strX.charAt(0) === '-') {
                strX = strX.substring(1)
                           .split("")
                           .reverse()
                           .join("")
                return parseInt("-" + checkValue(strX))
             }
             return checkValue(strX.split("").reverse().join(""))
         };
         
         const checkValue = (value) => {
             const intX = parseInt(value)
             if (intX > ( ( 1 << 31)  *-1 - 1) || intX < ( 1 << 31 ) ) {
                 return 0;
             }
             return JSON.stringify(parseInt(value))
         }
        ~~~

    - Chris
        - golang

        ~~~golang
        func reverse(x int) int {
            xStr := strconv.Itoa(x)
            var answer int = 0

            for index := len(xStr) - 1; index >= 0; index-- {
                num, _ := strconv.Atoi(string(xStr[index]))
                answer += num * int(math.Pow10(index))
            }

            if string(xStr[0]) == "-" {
                answer = answer / 10 * -1    
            }

            if answer > (1 << 31 - 1) || answer < (1 << 31 * -1) {
                return 0
            }

            return answer
        }
        ~~~
        
    - Ezra
        - javascript

        ~~~javascript
        var reverse = function(x) {
            const input = x.toString()
            const max = 2147483647
            const min = -2147483648
            if (x === 0) {
                return 0
            } else {
                if (x >= 0) {
                    let output = ''
                    for (let i = input.length-1; i >= 0; i--) {
                        output += input[i]
                    }
                    if (output > max) return 0
                    return output
                } else {
                    let output = '-'
                    for (let i = input.length-1; i > 0; i--) {
                        output += input[i]
                    }
                    if (output < min) return 0
                    return output
                }
            }
        };
        ~~~
        
    - Syun
        - javascript

        ~~~javascript
        var reverse = function(x) {
            let y = x.toString();
            let str = '';

            if (y[0] === '-') {
                str = '-';
            }


            for (let i = y.length-1; i >= 0; i -- ) {
                if (y[i] !== '-') {
                    str += y[i];
                }
            }
            if (str < -2147483648 || str > 2147483647) {
                str = 0;
            }
            return str;
        };
        ~~~

    
3. 12/23

     ## 第三題：

     難度：MEDIUM
     題目：[https://leetcode.com/problems/add-two-numbers/](https://leetcode.com/problems/add-two-numbers/)
 
 
    - YY
        - Python (time & space: $\mathcal{O}(\max\{N, M\})$)
        ~~~python
        class Solution:
            def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
                tail = hat = ListNode()

                c = 0
                n1, n2 = l1, l2

                while (n1 is not None) or (n2 is not None) or (c != 0):
                    x = y = 0

                    if n1 is not None:
                        x, n1 = n1.val, n1.next
                    if n2 is not None:
                        y, n2 = n2.val, n2.next

                    c, z = divmod(x + y + c, 10)

                    tail.next = ListNode(val=z)
                    tail = tail.next

                return hat.next
        ~~~

    - kevin
        - js

        ~~~javascript
        /**
         * Definition for singly-linked list.
         * function ListNode(val, next) {
         *     this.val = (val===undefined ? 0 : val)
         *     this.next = (next===undefined ? null : next)
         * }
         */
        /**
         * @param {ListNode} l1
         * @param {ListNode} l2
         * @return {ListNode}
         */
        var addTwoNumbers = function(l1, l2) {
            let result = new ListNode(0, null);
            const head = result;
            let modNum = 0;
            let carry = 0;

            while (l1 || l2 || carry) {
                let a = l1 ? l1.val : 0;
                let b = l2 ? l2.val : 0;
                let psum = (a + b + carry);

                carry = Math.floor(psum / 10);
                modNum = psum % 10;

                result.val = modNum;

                l1 = l1 ? l1.next : null;
                l2 = l2 ? l2.next : null;
                //  如果有下一個我才需要有next
                (l1 || l2 || carry) ? result.next = new ListNode(0,null) : null;
                result = result.next;
            }
            return head;
        };
        ~~~

    - Chris
        - golang 目前傷眼，有空再改

        ~~~golang
        func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
            ptr1 := l1
            ptr2 := l2

            for {
                ptr1.Val += ptr2.Val

                if ptr1.Next == nil {
                    ptr1.Next = ptr2.Next
                    break
                }

                if ptr2.Next == nil {
                    break
                }

                ptr1 = ptr1.Next
                ptr2 = ptr2.Next
            }

            ptr1 = l1
            for {
                if ptr1.Val > 9 {
                    ptr1.Val -= 10
                    if ptr1.Next == nil {
                        ptr1.Next = &ListNode{ Val: 1, Next: nil }
                    } else {

                        ptr1.Next.Val += 1
                    }
                }

                if ptr1.Next == nil {
                    break
                }

                ptr1 = ptr1.Next
            }

            return l1;
        }
        ~~~
      
   - Tim 
      - python
          - yayayayay~~~~

      ~~~python
         # Definition for singly-linked list.
         # class ListNode(object):
         #     def __init__(self, val=0, next=None):
         #         self.val = val
         #         self.next = next
         class Solution(object):
             def addTwoNumbers(self, l1, l2):
                 """
                 :type l1: ListNode
                 :type l2: ListNode
                 :rtype: ListNode
                 """
                 
                 l_a = l1
                 l_b = l2
                 num_list_a = []
                 num_list_b = []
                 while True:
                     num_list_a.append(l_a.val)
                     if l_a.next :
                         l_a = l_a.next
                     else:
                         break
                 
                 while True:
                     num_list_b.append(l_b.val)
                     if l_b.next :
                         l_b = l_b.next
                     else:
                         break
                 num_a_str = ''
                 num_b_str = ''
                 for i in num_list_a[::-1]:
                     num_a_str = num_a_str + str(i)
                 for k in num_list_b[::-1]:
                     num_b_str = num_b_str + str(k)
                     
                 add_num = int(num_a_str) + int(num_b_str)
                 dummy_result = ListNode(0)
                 ans_str = str(add_num)[::-1]
                 pointer = dummy_result
                 for i, r_item in enumerate(ans_str):
                     current = ListNode(val=r_item )
                     if i == 0: 
                         dummy_result.next = current
                     else:
                         pointer.next = current
                     pointer = pointer.next
                 return dummy_result.next
      ~~~


3. 12/24

    ## 第四題：

    難度：EASY
    題目：[https://leetcode.com/problems/roman-to-integer/](https://leetcode.com/problems/roman-to-integer/)

    - YY
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)
        
        ~~~python
        
         R2I = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000,
         }

        class Solution:
            def romanToInt(self, s: str) -> int:
                out = 0
                last_i = 0

                for r in s[::-1]:
                    i = R2I[r]

                    if i >= last_i:
                        out += i
                    else:
                        out -= i

                    last_i = i

                return out
        ~~~

    - kevin
        - javascript

        ~~~javascript
        var romanToInt = function(ss) {
            const mapObject = {
                CM: 900,
                CD: 400,
                IV: 4,
                IX: 9,
                XL: 40,
                XC: 90,
                I: 1,
                V: 5,
                X: 10,
                L: 50,
                C: 100,
                D: 500, 
                M: 1000,
            }
            let s = ss
            let result = 0
            let valArray = []
            valArray = s.match(/CM|CD|IV|IX|XL|XC/gi) || [];
            s = s.replace(/CM|CD|IV|IX|XL|XC/g, '');
            if (s)
                valArray = [...valArray, ...s.match(/I|V|X|L|C|D|M/gi)];
            valArray.forEach(val => {
                if (val) {
                    result += mapObject[val]
                }
            })
            return result
        };
        ~~~

    - Chris
        之前寫過了，這次嘗試不同解法！玩玩看用正則表達式來解！
        啊當然就又慢又用很多記憶體辣～就豪玩～～～

        ~~~golang
        func romanToInt(s string) int {
            numAry := []string{ "IV", "IX", "XL", "XC", "CD", "CM", "I", "V", "X", "L", "C", "D", "M" }
            numMap := map[string]int {
                "I": 1,
                "V": 5,
                "X": 10,
                "L": 50,
                "C": 100,
                "D": 500,
                "M": 1000,
                "IV": 4, 
                "IX": 9,
                "XL": 40,
                "XC": 90,
                "CD": 400,
                "CM": 900,
            }

            answer := 0

            for _, value := range numAry {
                reg := regexp.MustCompile(value)
                answer += len(reg.FindAllIndex([]byte(s), -1)) * numMap[value]
                s = reg.ReplaceAllString(s, "")
            }

            return answer
        }
        ~~~

        再一個，雖然醜但又快又好！
        ~~~golang
        func romanToInt(s string) int {
            answer := 0

            for index, value := range s {
                switch string(value) {
                    case "I":
                        answer += 1
                    case "V":
                        answer += 5
                        if index - 1 >= 0 && string(s[index-1]) == "I" {
                            answer -= 2
                        }
                    case "X":
                        answer += 10
                        if index - 1 >= 0 && string(s[index-1]) == "I" {
                            answer -= 2
                        }
                    case "L":
                        answer += 50
                        if index - 1 >= 0 && string(s[index-1]) == "X" {
                            answer -= 20
                        }
                    case "C":
                        answer += 100
                        if index - 1 >= 0 && string(s[index-1]) == "X" {
                            answer -= 20
                        }
                    case "D":
                        answer += 500
                        if index - 1 >= 0 && string(s[index-1]) == "C" {
                            answer -= 200
                        }
                    case "M":
                        answer += 1000
                        if index - 1 >= 0 && string(s[index-1]) == "C" {
                            answer -= 200
                        }
                }
            }

            return answer
        }
        ~~~

   - Tim
       - python

       ~~~python
       class Solution(object):
       def romanToInt(self, s):
        """
        :type s: str
        :rtype: int
        """
        roman_dict = {
            "I": 1,
            "V": 5,
            "X": 10,
            "L": 50,
            "C": 100,
            "D": 500,
            "M": 1000
        }
        keep_go = 0
        result = 0
        for idex, s_str in enumerate(s):
            if keep_go is not idex:
                continue
            keep_go = idex + 1
            if s_str == 'I':
                if s[idex: idex+2] == 'IV':
                    result = result + 4
                    keep_go = idex + 2
                elif s[idex: idex+2] == 'IX':
                    result = result + 9
                    keep_go = idex + 2
                else:
                    result = result + roman_dict[s_str]
            elif s_str == 'X':
                if s[idex: idex+2] == 'XL':
                    result = result + 40
                    keep_go = idex + 2
                elif s[idex: idex+2] == 'XC':
                    result = result + 90
                    keep_go = idex + 2
                else:
                    result = result + roman_dict[s_str]
            elif s_str == 'C':
                if s[idex: idex+2] == 'CD':
                    result = result + 400
                    keep_go = idex + 2
                elif s[idex: idex+2] == 'CM':
                    result = result + 900
                    keep_go = idex + 2
                else:
                    result = result + roman_dict[s_str]
            else:
                result = result + roman_dict[s_str]
                    
        return result
       ~~~

       - javascript
       - 土砲姐 就是爽！！！

       ~~~javascript
           /**
           * @param {string} s
           * @return {number}
           */
          var romanToInt = function(s) {
              const romanMap = {
                  "I": 1,
                  "V": 5,
                  "X": 10,
                  "L": 50,
                  "C": 100,
                  "D": 500,
                  "M": 1000
              };
              const sStr = [...s];
              let result = 0;

              for ( let i = 0; i < sStr.length; i ++ ){
                  if ( sStr[i] === 'I' ) {
                      if ( sStr.slice(i,i+2).join("") === "IV" ) {
                          result = result + 4
                          i = i + 1
                      } else if ( sStr.slice(i,i+2).join("")  === "IX" ) {
                          result = result + 9      
                          i = i + 1
                      } else {
                          result = result + romanMap[sStr[i]]
                      }
                  } else if ( sStr[i] === 'X' ) {
                      if ( sStr.slice(i,i+2).join("")  === "XL" ) {
                          result = result + 40
                          i = i + 1
                      } else if ( sStr.slice(i,i+2).join("")  === "XC" ) {
                          result = result + 90      
                          i = i + 1
                      } else {
                          result = result + romanMap[sStr[i]]
                      }
                  } else if ( sStr[i] === 'C' ) {
                      if ( sStr.slice(i,i+2).join("")  === "CD" ) {
                          result = result + 400
                          i = i + 1
                      } else if ( sStr.slice(i,i+2).join("") === "CM" ) {
                          result = result + 900      
                          i = i + 1
                      } else {
                          result = result + romanMap[sStr[i]]
                      }
                  } else {
                      result = result + romanMap[sStr[i]]
                  }
              }
              return result
          };
      ~~~
      
    - Ezra
        - javascript

        ~~~javascript
            var romanToInt = function(s) {
               const roman = {
                  I:1,
                  V:5,
                  X:10,
                  L:50,
                  C:100,
                  D:500,
                  M:1000,
               }

               let sum = 0;
               for(let i = 0 ; i < s.length ; i++){
                  let n1 = roman[s[i]];
                  let n2 = roman[s[i+1]];
                  if(n2 > n1){
                      sum = sum + n2 - n1;
                      i++
                  }  else {
                      sum = sum + n1;
                  }
               }
               return sum;
            };
        ~~~
       
    - Syun
        - Javascript

        ~~~javascript
        var romanToInt = function(s) {
            let result = 0;
            for( let i = 0; i < s.length; i++) {   
                if (s[i] === 'I') {
                   result += 1;
                } else if (s[i] === "V") {
                    if (s[i-1] === "I") {
                        result += 3;
                    } else {
                        result += 5;
                    }
                } else if (s[i] === "X") {
                    if (s[i-1] === "I") {
                        result += 8;
                    } else {
                        result += 10;
                    }
                } else if (s[i] === "L") {
                    if (s[i-1] === "X") {
                        result += 30;
                    } else {
                        result += 50;
                    }
                } else if (s[i] === "C") {
                    if (s[i-1] === "X") {
                        result += 80;
                    } else {
                        result += 100;
                    }
                } else if (s[i] === "D") {
                    if (s[i-1] === "C") {
                        result += 300
                    } else {
                        result += 500;
                    }
                } else if (s[i] === "M") {
                    if (s[i-1] === "C") {
                        result += 800;
                    } else {
                        result += 1000;
                    } 
                }

            }
            return result;
        };
        ~~~
    
4. 12/25

    ## 愛情的第五題

    難度：Easy
    題目：[https://leetcode.com/problems/subdomain-visit-count/](https://leetcode.com/problems/subdomain-visit-count/)

    - kevin
        - javascript
        ~~~ javascript
        var subdomainVisits = function(cpdomains) {
            let resultObject = {}
            cpdomains.forEach(cpdomain => {
                let existDotIndex = 1
                const visitCount = cpdomain.split(' ')[0]
                cpdomain = cpdomain.split(' ')[1]
                while(existDotIndex !== -1) {
                    if (!resultObject[cpdomain]) {
                        resultObject[cpdomain] = 0
                    }
                    resultObject[cpdomain] += +visitCount
                    existDotIndex = cpdomain.indexOf('.')
                    cpdomain = cpdomain.substring(existDotIndex+1)
                }
            })
            return Object.entries(resultObject).map(val => `${val[1]} ${val[0]}`)
        };
        ~~~

    - 美人YY
        - Python (time & space: $\mathcal{O}(N)$)

        ~~~python
        from collections import defaultdict

        class Solution:
            def subdomainVisits(self, cpdomains: List[str]) -> List[str]:
                visits = defaultdict(lambda: 0)

                for cpdomain in cpdomains:
                    count, domain = cpdomain.split()
                    count = int(count)

                    visits[domain] += count

                    for i, c in enumerate(domain):
                        if c == '.':
                            visits[domain[i+1:]] += count

                return ['{} {}'.format(c, s) for s, c in visits.items()]
        ~~~

    - 柯瑞斯
        - golang

        ~~~golang
        func subdomainVisits(cpdomains []string) []string {
            domainCount := map[string]int{}

            countNdomain := []string{}
            for _, domain := range cpdomains {
                countNdomain = strings.Split(domain, " ")
                count, _ := strconv.Atoi(countNdomain[0])

                if _, has := domainCount[countNdomain[1]]; has {
                    domainCount[countNdomain[1]] += count
                } else {
                    domainCount[countNdomain[1]] = count
                }

                for {
                    index := strings.Index(countNdomain[1], ".")
                    if index != -1 {
                        if _, has := domainCount[countNdomain[1][index+1:]]; has {
                            domainCount[countNdomain[1][index+1:]] += count
                        } else {
                            domainCount[countNdomain[1][index+1:]] = count
                        }
                        countNdomain[1] = countNdomain[1][index+1:]
                    } else {
                        break
                    }
                }
            }

            answer := []string{}
            for k, v := range domainCount {
                answer = append(answer, strconv.Itoa(v) + " " + k )
            }

            return answer
        }
        ~~~
    
    
    - 氝🦊Ｘ舞
        - python

        ~~~python
        class Solution(object):
            def subdomainVisits(self, cpdomains):
                """
                :type cpdomains: List[str]
                :rtype: List[str]
                """
                subdomain_dict = {}
                for i in cpdomains:
                    v, d = i.split()
                    v_num = int(v.encode("utf8"))
                    domain_str = d.encode("utf8")
                    
                    while "." in domain_str:
                        if subdomain_dict.get(domain_str, None) == None:
                            subdomain_dict[domain_str] = v_num 
                        else:
                            subdomain_dict[domain_str] = subdomain_dict[domain_str] + v_num
                        domain_str = domain_str.split(".", 1)[1]
                    else:
                        # 有機會 dict 沒有 j 個 domain_str, so default num = 0
                        subdomain_dict[domain_str] = subdomain_dict.get(domain_str, 0) + v_num
                            
                result = []
                for key in subdomain_dict:
                    result.append("{} {}".format(subdomain_dict[key], key))
                # 炫砲！
                # return ["{} {}".format(subdomain_dict[key], key) for key in subdomain_dict]
                return result 
        ~~~
    



# LeetCode Week2

1. 12/28

    ## 愛情的第一題：

    難度：EASY
    題目：[167. Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

    - HH
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def twoSum(self, numbers: List[int], target: int) -> List[int]:
                i = 0
                j = len(numbers) - 1

                while i < j:
                    summ = numbers[i] + numbers[j]

                    if summ < target:
                        i += 1
                    elif summ > target:
                        j -= 1
                    else:
                        return [i + 1, j + 1]

                return [-1, -1]
        ~~~

    - Chris
        - Go

        ~~~go
        func twoSum(numbers []int, target int) []int {
            head := 0
            tail := len(numbers)-1

            for {
                if numbers[head] + numbers[tail] == target {
                    return []int{ head+1, tail+1 }
                } else if numbers[head] + numbers[tail] > target {
                    tail -= 1
                } else {
                    head += 1
                }
            }

            return []int{}
        }
        ~~~
    - keivn
        - Javascript
        ~~~javascript
        var twoSum = function (numbers, target) {
            let point1 = 0;
            let point2 = numbers.length - 1;
            while(true) {
                const ans = numbers[point1]+numbers[point2]
                if (ans === target) {
                    break
                } else if (ans > target) {
                    point2--
                } else if (ans < target) {
                    point1++
                }
            }
            return [point1+1,point2+1]
        };
        ~~~

    - Tim 
       - python

       ~~~python
        class Solution(object):
          def twoSum(self, numbers, target):
              """
              :type numbers: List[int]
              :type target: int
              :rtype: List[int]
              """
              tmp_dict = {}
              for i, number in enumerate(numbers):
                  if target-number in tmp_dict:
                      return [ tmp_dict[target-number], i +1 ]
                  else: 
                      tmp_dict[number] = i + 1
                      
       ~~~

       - typescript

       ~~~typescript
       function twoSum(numbers: number[], target: number): number[] {
          let pEnd: number = numbers.length - 1;
          let pStart: number = 0;
          
          let keepGoing: boolean = true;
          let result: number[];
          while (keepGoing) {
                  console.log(numbers[pEnd])
                  if (numbers[pEnd] + numbers[pStart] === target ) {
                      result = [ pStart +1, pEnd + 1 ]
                      keepGoing = false;
                  } else if (numbers[pEnd] + numbers[pStart] > target) {
                      pEnd = pEnd -1
                  } else {
                      pStart = pStart +1
                  }
                 }
          return result
       };
       ~~~
       
   - Ezra
     - javascript 
     ~~~javascript
     var twoSum = function(numbers, target) {
         let ansAry = []
         for (let i = 0; i < numbers.length-1; i++) {
             for (let j = numbers.length-1; j > i; j--) {
                 if (numbers[i] + numbers[j] === target) {
                     ansAry.push(i+1, j+1)
                     return ansAry
                 }
             }
         }
     };
     ~~~

    - Syun
        - JavaScript 
        ~~~Javascript
        var twoSum = function(numbers, target) {
            for (let i = 0; i < numbers.length; i ++) {
                for (let j = i+1; j < numbers.length; j ++) {
                    if (numbers[i] + numbers[j] === target) {
                        return [i+1, j+1]
                    }
                }
            }
        };
        ~~~

2. 12/29

    ## 愛情的第二題：

    難度：Easy
    題目：[507. Perfect Number](https://leetcode.com/problems/perfect-number/)

    - YY
        - Python (time: $\mathcal{O}\left(\sqrt{N}\right)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def checkPerfectNumber(self, num: int) -> bool:
                if num == 1:
                    return False

                summ = 1
                for i in range(2, int(num**(1/2)) + 1):
                    if num % i == 0:
                        summ += i + (num // i)

                return summ == num
        ~~~
        
    - Chrissssss
        - Go
        ~~~golang
        func checkPerfectNumber(num int) bool {
            sum := num * -1
            last := num - 1

            for i := 1; i < last; i++ {   
                if num % i == 0 {
                    sum += num / i
                    sum += i

                    last = num / i
                }
            }

            if sum == num {
                return true
            } else {
                return false
            }

            return false
        }
        ~~~
    - kevin
        - javascript
        ~~~javascript
        var checkPerfectNumber = function(num) {
            if (num ===1) {
                return false
            }
            let ans = []
            let sqrtNum = Math.floor(Math.sqrt(num))
            for (let i = 1; i <= sqrtNum; i++) {
                if (num%i === 0) {
                    ans.push(i)
                    if (i !== (num/i) && (num/i) !== num) {
                        ans.push(num/i)
                    }
                }
            }
            let sum = 0
            ans.forEach(val => sum += val)
            return sum === num
        };
        ~~~
   - Tim 😶
      - python
      > Great Artists Steal
      <iframe width="560" height="315" src="https://www.youtube.com/embed/IMyTlG0E_7c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      ~~~python
      class Solution(object):
      def checkPerfectNumber(self, num):
        """
        :type num: int
        :rtype: bool
        """
        if num <= 0 :
            return False
        res = 0
        high = int(math.sqrt(num)) + 1
        for i in range(1, high):
            if num % i == 0:
                res += i
                if i * i != num:
                    res += num/i
        return num == (res - num)
      ~~~
   - Syun
      - Javascript
      ~~~javascript
        var checkPerfectNumber = function(num) {
            let count = 0;
            for( let i = 1; i < num; i++) {
                if (num % i === 0 ) {
                    count += i 
                }
            }
            if (count === num) {
                return true;
            } else {
                return false;
            }
        };
      ~~~
        
   - Ezra
     - Javascript
     ~~~ javascript
       var checkPerfectNumber = function(num) {
           let sum = 0
           for (let i = 1; i <= num/2; i++) {
               if (num % i === 0){
                   sum = sum + i 
               }  
           }
           if (sum === num) {
               return true
           } else {
               return false
           }
       };
     ~~~
        
3. 12/30

    ## 愛情的第三題：

    難度：EASY 
    題目：[605. Can Place Flowers](https://leetcode.com/problems/can-place-flowers/)


    - HY
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
                if n == 0:
                    return True

                # 3-state FSM
                # (0: non-empty, 1: first empty, 2: second empty)
                state = 1

                for x in flowerbed:
                    if x == 0: # empty
                        state += 1
                        if state == 3:
                            state = 1
                            n -= 1
                            if n == 0:
                                return True
                    else: # non-empty
                        state = 0

                return n == 1 and state == 2
        ~~~
    - kevin
        - javascript
        ~~~javascript
        var canPlaceFlowers = function(flowerbed, n) {
            const flowerbedLength = flowerbed.length
            for(let i = 0; i<flowerbedLength;i++) {
                const flower = flowerbed[i]
                if (flower === 0) {
                    if (i === 0) {
                        if (flowerbedLength === 1) {
                            flowerbed[i] = 1
                            n = n - 1
                        } else {
                            if (flowerbed[i+1] === 0) {
                                flowerbed[i] = 1
                                n = n - 1
                            }
                        }
                    } else if ( i === flowerbedLength-1) {
                        if (flowerbed[i-1] === 0) {
                            flowerbed[i] = 1
                            n = n - 1
                        }
                    } else {
                        if (flowerbed[i-1] === 0 && flowerbed[i+1] === 0) {
                            flowerbed[i] = 1
                            n = n - 1
                        }
                    }
                }
                if (n <= 0) {
                    break;
                }
                if (i === 0) {
                    continue;
                }
            }
            return (n <= 0)
        };
        ~~~
    - Syun
        - Javascript
        ~~~javascript
        var canPlaceFlowers = function(flowerbed, n) {
            let count = 0;
            for (let i = 0; i < flowerbed.length; i ++) {
                if (i === 0) {
                    if (flowerbed.length-1 === i && flowerbed[i] !== 1) {
                        flowerbed[i] = 1;
                        count += 1;
                    }else if (flowerbed[i+1] === 0 && flowerbed[i] !== 1) {
                        flowerbed[i] = 1;
                        count += 1;
                    }
                } else if (i === flowerbed.length -1) {
                    if (flowerbed[i-1] === 0 && flowerbed[i] !== 1) {
                        flowerbed[i] = 1;
                        count += 1;
                    }
                } else {
                    if (flowerbed[i-1] === 0 && flowerbed[i+1] === 0 && flowerbed[i] !== 1) {
                        flowerbed[i] = 1;
                        count += 1;
                    }
                }
            }
            if (count >= n) {
                return true;
            } else {
                return false;
            }
        };
        ~~~
        - Javascript (Chris愛情的調整)
        ~~~ javascript
        var canPlaceFlowers = function(flowerbed, n) {
           flowerbed = [0, ...flowerbed, 0];
            for (let i = 1; i < flowerbed.length-1; i++ ) {
                if(flowerbed[i-1] === 0 && flowerbed[i+1] === 0 && flowerbed[i] !== 1) {
                    flowerbed[i] = 1;
                    n -= 1
                }
            }
             return n <= 0
        };
        ~~~
        
    - Tim
       - python
       > 人一定要靠自己！
       <iframe src="https://www.youtube.com/embed/JRqbV4sQS6M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       
       ~~~
          000  
          (010)101 -> 1 (101) 
          (010)000 -> 3 (101)
          (101)001 -> 2 (101)
          (101)010 -> 2 (010)
          (010)100 -> 1 (101)
          
          101 
              000 -> 1 (010)
              001 -> 0 (001)
              010 -> 0 (010)
              010 -> 0 (010)
          
          001
              000 -> 1 (010)
              001 -> 0 (001)
              010 -> 0 (010)
          
          010
              101 -> 0 (101)
              000 -> 2 (101)
              001 -> 1 (101)
              010 -> 0 (010)
              100 -> 1 (101)
          
          100
              
          (100)101 -> 0 (101)
          (101)000 -> 2 (010)
          (101)001 -> 1 (001)
          (101)010 -> 1 (010)
          (100)100 -> 0 (100)
          
          111 x
       ~~~
       
       ~~~python
       class Solution(object):
       def canPlaceFlowers(self, flowerbed, n):
        """
        :type flowerbed: List[int]
        :type n: int
        :rtype: bool
        """
        
        plots = 0
        for idx, i in enumerate(flowerbed):
            if i is 0 and ( idx == 0 or flowerbed[idx-1] == 0) and ( idx == len(flowerbed)-1 or flowerbed[idx+1] == 0):
                plots += 1
                flowerbed[idx] = 1
        
        return plots >= n 
                
       ~~~

    - Chris
        - Go
        ~~~golang
        func canPlaceFlowers(flowerbed []int, n int) bool {
            flowerbed = append([]int{0}, flowerbed...)
            flowerbed = append(flowerbed, 0)

            for i := 1; i < len(flowerbed)-1; i++ {
                if flowerbed[i-1] | flowerbed[i] | flowerbed[i+1] == 0 {
                    flowerbed[i] = 1
                    n -= 1
                }
            }

            return n <= 0
        }
        ~~~

    
4. 12/31

    ## 殘酷的第四題（面對它吧，凱開）☹：

    難度：EASY
    題目：[453. Minimum Moves to Equal Array Elements](https://leetcode.com/problems/minimum-moves-to-equal-array-elements/)

    - HY
        - Python (time: $\mathcal{O}(N)$, space: $\mathcal{O}(1)$)
        ~~~python
        class Solution:
            def minMoves(self, nums: List[int]) -> int:
                return sum(nums) - min(nums) * len(nums)
        ~~~
    - kevin 有偷偷看討論區的解法了QQ，周末多寫一題回來!!
        ~~~javascript
        var minMoves = function(nums) {
            return nums.reduce((cur, acc) => cur+acc) - Math.min(...nums)*nums.length
        };
        ~~~

    - Tim
        - python
        - TLE 也很美 ：）

        ~~~python
        class Solution(object):
        def minMoves(self, nums):
            """
            :type nums: List[int]
            :rtype: int
            """
            nums.sort()
            count = 0
            keep_going = True
            while keep_going:
                # nums.count(nums[0])==len(nums)
                # len(set(nums))
                same = True if nums.count(nums[0])==len(nums) else  False
                
                if same: 
                    return count
                
                nums.sort()
                last_item = nums[-1]
                nums = [ v + 1 for v in nums[: -1]]
                nums.append(last_item)
                count += 1
                
            return count 
            
        ~~~

    - Chris
        - 原來我還沒寫，趕快補寫
        - 說明：
        ```
        在 nums 裡面，最小的那一個數每一輪一定都會幫他 +1，所以假設我們最後的答案是做了 x 次，我們可以試試看寫出等式。
        1. 首先是以最小的那個數字每輪都要幫他 +1 來寫式子，這個最小的數字做完 x 輪，他最後會變成 min + x。
        而做到最後，nums 裡面的每個元素都是一樣大，所以總和可以這樣算 (min + x) * length。
        2. 為了要求出 x，我們可以試著寫看看另一種算總和的式子，也就是一開始給的 nums 先計算總合，後面用 sum 表示，一開始的總和加上 x 次的對 length - 1 個元素加一，因此可以寫成 sum + (length-1) * x。
        3. 把 1 跟 2 的式子寫成方程式： (min + x) * length = sum + (length-1) * x
        4. 3 的方程式中，除了 x 以外都是可以求得的已知數，因此我們稍微整理一下式子：
            a. (min + x) * length = sum + (length-1) * x
            b. 將乘法展開 => (min * length) + (x * length) = sum + (x * length) - x
            c. 同時減掉 x * length => (min * length) = sum - x
            d. 將等式的一邊只留下 x => x = sum - (min * length )
        5. 因此我們就可以知道 x 可以根據 sum 、 min 、 length 求得，因此程式碼只要求出 nums 總和跟 nums 最小的那個元素就可以算出答案。
        ```
        - Golang
        ~~~ golang
        func minMoves(nums []int) int {
            sum := 0
            min := (1<<63) -1   //max int64

            for _, value := range nums {
                sum += value
                if value < min {
                    min = value
                }
            }

            return sum - len(nums) * min
        }
        ~~~

> 希望 可以持續到2021年終! XDD