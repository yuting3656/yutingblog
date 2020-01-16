---
layout: "post"
title: " HackerRank: Sorting - Comparator "
permalink: 'code-practice/hackerrank-mark-and-toys'
tags: 紮馬步 hackerrank
---


## [Ssorting:Comparator](https://www.hackerrank.com/challenges/ctci-comparator-sorting/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=sorting){:target='_back'}

> 這題一整個 怪怪的兒~


- reference

   - [https://www.youtube.com/watch?v=N3sdaHuG3e8](https://www.youtube.com/watch?v=N3sdaHuG3e8){:target="_back"}

   


- java

   - [java Comparator](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html){:target="_back"}

   - [https://stackoverflow.com/questions/6203411/comparing-strings-by-their-alphabetical-order](https://stackoverflow.com/questions/6203411/comparing-strings-by-their-alphabetical-order){:target="_back"}

~~~java
class Checker implements Comparator<Player> {
  	// complete this method
	public int compare(Player a, Player b) {

        if (a.score == b.score) {
                return a.name.compareTo(b.name);
        }
        return b.score - a.score;
    }
}
~~~


- 全部code 

~~~java
import java.util.*;

class Player {
	String name;
	int score;

	Player(String name, int score) {
		this.name = name;
		this.score = score;
	}
}

class Checker implements Comparator<Player> {
  	// complete this method
	public int compare(Player a, Player b) {

        if (a.score == b.score) {
                return a.name.compareTo(b.name);
        }
        return b.score - a.score;
    }
}


public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();

        Player[] player = new Player[n];
        Checker checker = new Checker();
        
        for(int i = 0; i < n; i++){
            player[i] = new Player(scan.next(), scan.nextInt());
        }
        scan.close();

        Arrays.sort(player, checker);
        for(int i = 0; i < player.length; i++){
            System.out.printf("%s %s\n", player[i].name, player[i].score);
        }
    }
}
~~~



- python

   - #1 [`__repr__`](https://www.programiz.com/python-programming/methods/built-in/repr){:target="_back"}

   - #2 [`__repr__`](https://www.geeksforgeeks.org/str-vs-repr-in-python/){:target="_back"}

   - #3 [`__repr__`](https://docs.python.org/2/library/repr.html){:target="_back"}


~~~py
# Enter your code here. Read input from STDIN. Print output to STDOUT
class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score
        
    def __repr__(self):
        return "{} {}".format(self.name , self.score)
        
    def comparator(a, b):
        
        if a.score == b.score:
            return -1 if a.name < b.name else 1

        return b.score - a.score
~~~