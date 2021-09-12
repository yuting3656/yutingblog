---
layout: "post"
title: "Dart: Hello World 003 之 颱風來了室內時間比較多 XDD"
permalink: "dart/dart-hello-world-03"
tags: dart
---

# Classes and objects

> [OOP](https://www.freecodecamp.org/news/object-oriented-concepts/){:target="\_back"} 拉!

> 靠書的寫法已經 GG 了 LOL....
>
> [not_initialized_non_nullable_instance_field](https://dart.dev/tools/diagnostic-messages#not_initialized_non_nullable_instance_field){:target="\_back"}
>
> > `Non-nullable instance field ‘{0}’ must be initialized.`

> > Has a type that’s potentially non-nullable
> > Doesn’t have an initializer
> > Isn’t marked as late

```dart
void main() {
  Person clark = Person();
  clark.name = 'Clark';
  clark.age = 20;
  print('Name: ${clark.name},  Age: ${clark.age}, Blood Type:${clark.bloodType}, nickName: ${clark.nickName}');
}
// Name: Clark,  Age: 20, Blood Type:AB, nickName: null

class Person {
  // late
  late String name;
  late int age;
  // initializer
  String bloodType = 'AB';
  // can be null
  String? nickName;
}
```

> In Dart, no identifiers such as **Private** or **Public**
>
> unless begin (\_) ===> consider **Private**

> In Dart, 不用刻意加 `new`
>
> `Person clark = New Person();` 是完全一樣的啦!

# Using getters and setters

```dart
void main() {
  /// person2
  Person2 p = Person2();
  p.name = "Tim";
  p.bloodType = "AB";
  p.age = 32;
  print("Person2: ${p.name} ${p.bloodType} ${p.age}");
  // Person2: Tim AB 18
}

class Person2 {
  late String name, bloodType;
  late int _age;

  set age(int years) {
    if (years > 0 && years < 30 ) {
      _age = years;
    } else {
      // 18 forever :)
      _age = 18;
    }
  }

  int get age {
    return _age;
  }
}
```

# Constructors

> In Dart, you can have only one **unnamed constructor**
>
> but you can have any number of **named constructor**.

```dart
void main() {
  /// constructor
  Person3 p3NameAndAge = Person3.withNameAndAge('tim3', 'AB');
  Person3 p3Empty = Person3();

  print('${p3NameAndAge.name} ${p3NameAndAge.bloodType}');
  print('${p3Empty.name} ${p3Empty.bloodType}');
  // tim3 AB
  // null null
}


class Person3 {
  String? name, bloodType;
  // unnamed constructor
  Person3();
  // named constructor
  Person3.withNameAndAge(this.name, this.bloodType);
  Person3.empty();
}
```

> 好 Flutter 書介紹 dart 部分沒了 XDDDD
>
> 可以準備 進入重工了 :)
