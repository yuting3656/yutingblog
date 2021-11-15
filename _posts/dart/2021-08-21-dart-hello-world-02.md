---
layout: "post"
title: "Dart: Hello World 002 "
permalink: "dart/dart-hello-world-02"
tags: dart
---

> 超速度過水!
>
> XDD
>
> 其實最主要目標是要 學 Flutter
>
> 所以 我就用 [Flutter Projects](https://github.com/PacktPublishing/Flutter-Projects){:target="\_back"}
>
> J 本書的 基本教學速度帶過 Dart XDDD :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:
>
> 官方土魠魚 等心情好的時候再來 :sparkles::sparkles::sparkles:

# Area calculator

- at this time, functtion overloading is not supported in Dart!

```dart
void main() {
   double result = caculateArea(12, 5);
   print('12 * 5 是: $result'); // 60
}

double caculateArea(double width, double height) {
  double area = width * height;
  return area;
}
```

# For loops and strings

- [substring](https://api.dart.dev/stable/2.13.4/dart-core/String/substring.html){:target="\_back"}

```dart
void main() {
  String myString = 'Throw your Dart';
  String result = reverse(myString);
  print(result); // traD ruoy worhT
}

String reverse(String old) {
  int length = old.length;
  String resString = '';
  for (int i = length-1; i>=0 ; i-- ){
    resString += old.substring(i, i+1);
  }
  return resString;
}
```

- using position of the character

```dart
void main() {
  String myString = 'Throw your Dart';
  String result = reverse2(myString);
  print(result); // traD ruoy worhT
}

String reverse2(String old) {
  int length = old.length;
  String resString = '';
  for (int i = length-1; i>=0 ; i-- ){
    resString += old[i]
  }
  return resString;
}
```

- `String result = myString.split('').reversed.join();`
  - [split](https://api.dart.dev/stable/2.13.4/dart-core/String/split.html){:target="\_back"}
  - [reversed](https://api.dart.dev/stable/2.13.4/dart-core/List/reversed.html){:target="\_back"}
  - [join](https://api.dart.dev/stable/2.13.4/dart-core/Iterable/join.html){:target="\_back"}

# Arrow syntax and the ternary operator

> 我最愛的三元拉!

```dart
bool convertToBoolLong(int value){
  if (value == 1) {
    return false;
  } else {
    return true;
  }
}

bool converToBoolLongArrow(int value) => (value == 1) ? false: true;
```

# While loops, lists, and generics

- [List](https://api.dart.dev/stable/2.13.4/dart-core/List-class.html){:target="\_back"}
  - (書的寫法已經 `Deprecated` 了!)
    - `var songs = List<String>();` --> GG!

```dart
void main() {
   String mySongList = sing();
   print(mySongList); // We will Rock You, Miss Murder, Hate me,

}


String sing() {
  var songs = [];
  var songName = '';
  songs.add('We will Rock You');
  songs.add('Miss Murder');
  songs.add('Hate me');
  int i = 0;
  while(i<songs.length){
    songName += '${songs[i]}, ';
    i++;
  }
  return songName;
}
```

> forEach, map, where

- foreEach

```dart
void main() {
   String mySongList = singForEach();
   print(mySongList); // We will Rock You * Miss Murder * Hate me *
}
String singForEach() {
  var songs = [];
  var songName = '';
  songs.add('We will Rock You');
  songs.add('Miss Murder');
  songs.add('Hate me');
  songs.forEach((s) => songName += s + " * ");
  return songName;
}
```

- map

```dart
void main() {
   List mySongList = singMapUpper();
   print(mySongList);
} // [WE WILL ROCK YOU, MISS MURDER, HATE ME]

List singMapUpper() {
  var songs = [];
  songs.add('We will Rock You');
  songs.add('Miss Murder');
  songs.add('Hate me');
  var upperSongs = songs.map((s) => s.toUpperCase()).toList();
  return upperSongs;
}
```

- where

```dart
void main() {
   String mySongListWithW = singWhere();
   print(mySongListWithW);
} // (We will Rock You)

String singWhere() {
  var songs = [];
  songs.add('We will Rock You');
  songs.add('Miss Murder');
  songs.add('Hate me');
  var wSongs = songs.where((s) => s.contains('w')).toString();
  return wSongs;

```

> 好先這樣!
>
> 拜拜 + 跑步! GOGO~~~ :heart::heart::heart:
