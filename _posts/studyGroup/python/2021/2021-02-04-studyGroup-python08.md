---
layout: "single"
title: 'Study Group: 巾凡哥出品 品質保證 python 08'
permalink: 'stydeGroup/python-08'
tags: 讀書會 python
---

# Random Module

~~~python
import random
random.random() # a random float value from 0 ~ 1
random.randint(start, end) # a random int value from start to end
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.choice(a) # pick up a random value from list
random.sample(a, 3) # pick up N numbers from list
~~~

~~~python
import string
import random
total_len = int(input("Wellome to the PyPassword Generator! \n How many letters would you like in your password?"))
symbols_len = int(input("How many symbols would you like?"))
num_len = int(input("How many numbers would you like?"))
result = ''
# symbol
for s_count in range(symbols_len):
    result += random.choice(string.punctuation)
# num
for num_count in range(num_len):
    result += random.choice(string.digits)
# rest
for rest_len in range(total_len - (symbols_len + num_len)):
    result += random.choice(string.ascii_letters)
print(''.join(random.sample(result,len(result))))
~~~


# Caesar Cipher

- [https://gist.github.com/jameslyons/8701593](https://gist.github.com/jameslyons/8701593)

~~~python
import random
import string
def cesearcode(): 
  codetype = input('decode/encode?')
  message = input('message?')
  shiftNum = int(input('shiftNum?'))
  output = ''
  for i in message:
    if i.strip() and i in string.ascii_letters:
      if codetype=='encode':
        output += string.ascii_lowercase[(string.ascii_lowercase.index(i.lower()) + shiftNum) % 26]  
      if codetype=='decode':
        output += string.ascii_lowercase[(string.ascii_lowercase.index(i.lower()) - shiftNum) % 26]    
    else:
      output += i
  return output
while True:
  print(cesearcode())
  if input('keep going? y/n')=='n':
    break
~~~

- [maketrans](https://www.programiz.com/python-programming/methods/string/maketrans)

~~~python
import string
def play():
    crypt = input("Type 'encode' to encrypt, type 'decode' to decrypt:")
    input_str = input("Tell me something:").lower()
    shift_num = int(input("shift :"))
    text = string.ascii_lowercase
    def caesar_cipher(lower_input_str, shift, crypt):
        shift_text = ''
        if crypt == 'encode':
            shift_text = text[shift:] + text[:shift]
        else:
            shift_text = text[-shift:] + text[:-shift]
        table = str.maketrans(text, shift_text)
        return lower_input_str.translate(table)
    print(caesar_cipher(input_str, shift_num, crypt))
while True:
  play()
  if input("Do you want to play again? ~ (y/n)") == "n" :
    break
~~~

# Simple Project - Blackjack

- 遊戲中只有player 與 dealer
- dealer 在最後點數⼀定要⼤於 16，若⼩於16 則要發卡片到滿⾜條件為⽌
- 如果player⼿中有5張牌，且點數沒有超過 21點，則稱為 Five Card Charlie，則直接獲勝
- J Q K 視為 10點
- A 可視為 1 或 11點
- A + J/Q/K 稱為 Blackjack
- 因為排組沒上限，要留意也許會出現 2 張以上的 A 在排組中，總和可以視為 2 或是12

-- 

- If the player is dealt an Ace and a ten-value card (called a "blackjack" or "natural"), and
the dealer does not, the player wins and usually receives a bonus.
- If the player exceeds a sum of 21 ("busts"), the player loses, even if the dealer also
exceeds 21.
- If the dealer exceeds 21 ("busts") and the player does not, the player wins.
- If the player attains a final sum higher than the dealer and does not bust, the player wins.
- If both dealer and player receive a blackjack or any other hands with the same sum
called a "push", no one wins.
- If player get 5 cards without busts, player wins automatically(extra).