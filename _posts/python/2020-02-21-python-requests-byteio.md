---
layout: 'post'
title: 'python: 抓抓神奇寶貝圖 '
permalink: 'python/requests-get-pokemon'
tags: python 
---

> 最近除了面試 就是在進行我[可愛寶可夢的Porject](https://yuting-pokego-gallery.appspot.com/){:target="_back"}

> 很多點子在腦袋跑。

> 然後就想到可抓 1 ~ 5 代的圖到本機!!! 可以當作未來使用!


~~~py
import requests
from PIL import Image
from io import BytesIO
import os
import pathlib

"""
pokemon generation id
g1: 1 ~ 151
g2: 152 ~ 251
g3: 252 ~ 386
g4: 387 ~ 493
g5: 494 ~ 649
"""


def request_image(id):
    url = f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png'
    r = requests.get(url)
    image = Image.open(BytesIO(r.content))

    if id <= 151:
        image.save(f'./pokemon_photo/generation_1/{id}.png')
    elif 152 <= id <= 251:
        image.save(f'./pokemon_photo/generation_2/{id}.png')
    elif 252 <= id <= 386:
        image.save(f'./pokemon_photo/generation_3/{id}.png')
    elif 387 <= id <= 493:
        image.save(f'./pokemon_photo/generation_4/{id}.png')
    elif 494 <= id <= 649:
        image.save(f'./pokemon_photo/generation_5/{id}.png')


def build_dir():
    current_path = os.getcwd()
    pokemon_photo = os.path.join(current_path, 'pokemon_photo')
    if not os.path.exists(pokemon_photo):
        os.mkdir('pokemon_photo')
        print('create folder: pokemon_photo')

    # pathlib
    for i in range(1, 6):
        generation = os.path.join(pokemon_photo, f'generation_{i}')
        pathlib.Path(generation).mkdir(parents=True, exist_ok=True)


if __name__ == '__main__':
    build_dir()
    for i in range(650):
        request_image(i)

~~~

### 參考資料

- [mkdir-p-functionality-in-python](https://stackoverflow.com/questions/600268/mkdir-p-functionality-in-python){:target="_back"}

- [how-to-download-image-using-requests](https://stackoverflow.com/questions/13137817/how-to-download-image-using-requests){:target="_back"}

- [pokedex pokemon display](http://pokedream.com/pokedex/pokemon?display=gen1){:target="_back"}