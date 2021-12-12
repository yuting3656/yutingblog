---
layout: "single"
title: 'daily Programming: music21 GOT music'
permalink: 'daily-programming/python-music21'
tags: daily-programming python music21
---

> 我還是很愛音樂的兒～～　XDD

~~~python
from music21 import *

# Stream

s1 = stream.Stream()
s1.append(note.Note('E6', quarterLength=1.5))
s1.append(note.Note('A5', quarterLength=1.5))
s1.append(note.Note('C6', quarterLength=0.5))
s1.append(note.Note('D6', quarterLength=0.5))
s1.append(note.Note('E6', quarterLength=2))
s1.append(note.Note('A5', quarterLength=2))
s1.append(note.Note('C6', quarterLength=0.5))
s1.append(note.Note('D6', quarterLength=0.5))
s1.append(note.Note('B5', quarterLength=4))


# view note

for i in s1.notes:
    print(i.octave)

# play music

st_player = midi.realtime.StreamPlayer(s1)
st_player.play()

~~~