---
layout: "single"
title: "Dart: Hello World 001 之 謝謝你 小狐狸 🐶 "
permalink: "dart/dart-hello-world-01"
tags: dart
---

> 阿就 去年給自己目標 要寫一個
>
> Flutter 的 賽 Project :sunglasses:
>
> 一直有點餛飩的 此時此刻的上半年
>
> 也把 [Yuting Object Detection](https://yuting-object-detection.web.app/dashboard){:target="\_back"} 用好 :soccer:
>
> 想說就把 東西 用 [expo 搬到 react-native](https://yuting3656.github.io/yutingblog//daily-programming/react-native-and-expo){:target="\_back"} 丟上 app (ios, android) XDDD :star::star:
>
> 很聰明吧! 不用學新的 阿就這樣 XD :eyes::eyes:
>
> 阿現在八月中
>
> 作天回了一趟鄉下 :sunny:
>
> 看到小狐狸 撿來來阿嬤家也 10 多年了 :dog:
>
> 生老病死
> 春夏秋冬
> 東南西北
> 花開花落
>
> 也是時候督述自己拉! :bikini:
>
> 好就這樣 :mortar_board::mortar_board::mortar_board:

# 可以直接線上玩 Dart

- [https://dartpad.dartlang.org/](https://dartpad.dartlang.org/){:target="\_back"}

# 官方土魠魚 :whale:

- [https://dart.dev/guides/language/language-tour](https://dart.dev/guides/language/language-tour){:target="\_back"}

> 啊我就照著土魠魚 玩 XDD

## A basic Dart porgram

```dart
// 簡簡單單 function
void printIntergert(int aNumber) {
    print('數字是 $aNumber');
}

void main() {
    var number = 1450;
    printIntergert(number);
```

- `//`

  - Comment

- `void`

  - 沒有回傳值拉!

- `int`

  - [built-in types](https://dart.dev/guides/language/language-tour#built-in-types){:target="\_back"}

- `'...'` or `"..."`

  - 跟 python 一樣 `"", ''` 都可以!

- `$variableName` or `${expression}`

  - [Strings](https://dart.dev/guides/language/language-tour#strings){:target="\_back"}

- `main()`
  - 一定要有! 其始點!
  - [main()](https://dart.dev/guides/language/language-tour#the-main-function){:target="\_back"}

## Built-in types

> 阿~ 你問我都看玩熟讀了嗎?
>
> 那五摳您~~ 當然是碰到後 速度來看! :snowman:
>
> 常保熱情! 終身學習ㄚㄚ!

- [Numbers](https://dart.dev/guides/language/language-tour#numbers){:target="\_back"} (int, double)
- [Strings](https://dart.dev/guides/language/language-tour#strings){:target="\_back"} (String)
- [Booleans](https://dart.dev/guides/language/language-tour#booleans){:target="\_back"} (bool)
- [Lists](https://dart.dev/guides/language/language-tour#lists){:target="\_back"} (List, also known as arrays)
- [Sets](https://dart.dev/guides/language/language-tour#sets){:target="\_back"} (Set)
- [Maps](https://dart.dev/guides/language/language-tour#maps){:target="\_back"} (Map)
- [Runes](https://dart.dev/guides/language/language-tour#characters){:target="\_back"} (Runes; often replaced by the characters API)
- [Symbols](https://dart.dev/guides/language/language-tour#symbols){:target="\_back"} (Symbol)
- The value null (Null)

## [Import concepts 精華重點!](https://dart.dev/guides/language/language-tour#important-concepts){:target="\_back"} :mushroom:

> As you learn about the Dart language, keep these facts and concepts in mind:
>
> 當你把玩 Dart 請把以下事項 牢記在心~
>
> 靠這文件寫得很好ㄟ!!! 學起來! 用在工作上! XDD

- Everything you can place in a variable is an object, and every object is an instance of a class. Even numbers, functions, and null are objects. With the exception of null (if you enable [sound null safety](https://dart.dev/null-safety){:target="\_back"}), all objects inherit from the [Object](https://api.dart.dev/stable/2.13.4/dart-core/Object-class.html){:target="\_back"} class.

`Version note: Null safety was introduced in Dart 2.12. Using null safety requires a language version of at least 2.12.`

- Although Dart is strongly typed, type annotations are optional because Dart can infer types. In the code above, number is inferred to be of type int.

- If you enable [null safety](https://dart.dev/null-safety){:target="\_back"}, variables can’t contain `null` unless you say they can. You can make a variable nullable by putting a question mark (?) at the end of its type. For example, a variable of type int? might be an integer, or it might be `null`. If you know that an expression never evaluates to `null` but Dart disagrees, you can add ! to assert that it isn’t null (and to throw an exception if it is). An example: `int x = nullableButNotNullInt!`

- When you want to explicitly say that any type is allowed, use the type Object? (if you’ve [enabled null safety](https://dart.dev/null-safety#enable-null-safety){:target="\_back"}), Object, or — if you must defer type checking until runtime — the [special type dynamic](https://dart.dev/guides/language/effective-dart/design#avoid-using-dynamic-unless-you-want-to-disable-static-checking){:target="\_back"}.

- Dart supports generic types, like `List<int>` (a list of integers) or `List<Object>` (a list of objects of any type).

- Dart supports top-level functions (such as `main()`), as well as functions tied to a class or object (static and instance methods, respectively). You can also create functions within functions (nested or local functions).

- Similarly, Dart supports top-level variables, as well as variables tied to a class or object (static and instance variables). Instance variables are sometimes known as fields or properties.

- Unlike Java, Dart doesn’t have the keywords `public, protected`, and `private`. If an identifier starts with an underscore (\_), it’s private to its library. For details, see [Libraries and visibility](https://dart.dev/guides/language/language-tour#libraries-and-visibility){:target="\_back"}.

- Identifiers can start with a letter or underscore (\_), followed by any combination of those characters plus digits.

- Dart has both expressions (which have runtime values) and statements (which don’t). For example, the [conditional expression](https://dart.dev/guides/language/language-tour#conditional-expressions){:target="\_back"} `condition ? expr1 : expr2` has a value of `expr1` or `expr2`. Compare that to an [if-else statement](https://dart.dev/guides/language/language-tour#if-and-else){:target="\_back"}, which has no value. A statement often contains one or more expressions, but an expression can’t directly contain a statement.

- Dart tools can report two kinds of problems: **warnings** and **errors**. Warnings are just indications that your code might not work, but they don’t prevent your program from executing. Errors can be either compile-time or run-time. A compile-time error prevents the code from executing at all; a run-time error results in an [exception](https://dart.dev/guides/language/language-tour#exceptions){:target="\_back"} being raised while the code executes.

## 資源

- [Dart style guide](https://dart.dev/guides/language/effective-dart/style){:target="\_back"}
