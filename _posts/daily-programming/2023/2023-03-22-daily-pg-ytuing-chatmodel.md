---
layout: "single"
title: "daily Programming: 用 transformers 建一個 classification 的 model"
permalink: "daily-programming/chat-yuting-transformaers-build-classification"
tags: daily-programming ChatGPT hugging-face transformers
---


>  1. Tokenizer 文字 Input
>
>  2. 組成 tf 看得懂的樣子
> 
>  3. Build Model 
>
>  4. Testing



### Import

~~~python
from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf
import pandas as pd
from tensorflow.keras.layers import Input, Dense
from tensorflow.keras.models import Model
import numpy as np
~~~


### Tokenizer

~~~python
# Load tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
# Load pre-trained model
base_model = TFBertForSequenceClassification.from_pretrained('bert-base-chinese')
~~~

### Data

~~~python
"""
    ("今天生產效率", 1),
    {"昨日生產效率", 1},
    ("事不是可以提高訂單量", 1),
    ("今天工廠整場表現", 1),
    ("哪幾台產出最多良品", 0),
    ("有哪些機台異常？", 0),
    ("哪些工單會遲交", 0),
    ("請問 小王 今天表現如何", 0),
    ("請問 小明 這週表現如何", 0)
    
    ----
    
        ("今天生產效率", "效率"),
    {"昨日生產效率", "效率"},
    ("事不是可以提高訂單量", "效率"),
    ("今天工廠整場表現", "效率"),
    ("哪幾台產出最多良品", "其他"),
    ("有哪些機台異常？", "其他"),
    ("哪些工單會遲交", "其他"),
    ("請問 小王 今天表現如何", "其他"),
    ("請問 小明 這週表現如何", "其他")
"""
mock_data = [    
  ("今天生產效率", 1),
    ("昨日生產效率", 1),
    ("事不是可以提高訂單量", 1),
    ("今天工廠整場表現", 1),
    ("哪幾台產出最多良品", 0),
    ("有哪些機台異常？", 0),
    ("哪些工單會遲交", 0),
    ("請問 小王 今天表現如何", 0),
    ("請問 小明 這週表現如何", 0)
]
~~~

~~~python
# 0: 其他
# 1: 效率
label_array = ["其他", "效率"]
df = pd.DataFrame(mock_data, columns=['text', 'label'])
~~~


### 組 dataset

~~~python
# Tokenize data
tokens = tokenizer.batch_encode_plus(
    df['text'].tolist(),
    max_length=512,
    padding='max_length',
    truncation=True,
    return_attention_mask=True,
    return_tensors='tf'
)

# Create TensorFlow dataset
dataset = tf.data.Dataset.from_tensor_slices(({
    'input_ids': tokens['input_ids'],
    'attention_mask': tokens['attention_mask']
}, df['label']))
~~~


### Transfer Learning & Build Model


~~~python
# Freeze BERT layers
for layer in base_model.layers:
    layer.trainable = False
    
# Define input layer
inputs = Input(shape=(512,), dtype=tf.int32, name="input_ids")

# Define classification layer
x = base_model(inputs)[0]
x = Dense(256, activation="relu")(x)
outputs = Dense(len(label_array), activation="softmax")(x)

model = Model(inputs=inputs, outputs=outputs)

optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5, epsilon=1e-08)
model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Fit model
model.fit(dataset.shuffle(100).batch(64), epochs=6, batch_size=64)
~~~


### Model Summary

~~~python
model.summary()


"""
Model: "model_7"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 input_ids (InputLayer)      [(None, 512)]             0         
                                                                 
 tf_bert_for_sequence_classi  TFSequenceClassifierOutp  102269186
 fication_8 (TFBertForSequen  ut(loss=None, logits=(No           
 ceClassification)           ne, 2),                             
                              hidden_states=None, att            
                             entions=None)                       
                                                                 
 dense_18 (Dense)            (None, 256)               768       
                                                                 
 dense_19 (Dense)            (None, 2)                 514       
                                                                 
=================================================================
Total params: 102,270,468
Trainable params: 1,282
Non-trainable params: 102,269,186
_________________________________________________________________
"""
~~~


### Testing

~~~python
questions = "今天 ggg 表現如和!"
tokens = tokenizer.encode_plus(questions,truncation=True, return_tensors='tf', max_length=512, padding='max_length')
model_input = {
    'input_ids': tokens['input_ids'],
    'attention_mask': tokens['attention_mask']
}
result = model(model_input)
~~~


### Check Result

~~~python
predicted_label_index = np.argmax(result)
predicted_probs = result[0]
ans_idx = np.argmax(result)
ans_pro = predicted_probs[ans_idx]
result_intent = label_array[ans_idx]
~~~

~~~python
if ans_pro > 0.8:
    print("信心超過 80 %")
    print(result_intent)
else:
    print("烙賽!!! 信心只有 {}% -> {}".format(ans_pro * 100, result_intent))

"""
烙賽!!! 信心只有 50.254486083984375% -> 效率

"""    
~~~



### requirements.txt

```txt
absl-py==1.4.0
aiofiles==22.1.0
aiosqlite==0.18.0
anyio==3.6.2
appnope==0.1.3
argon2-cffi==21.3.0
argon2-cffi-bindings==21.2.0
arrow==1.2.3
astunparse==1.6.3
attrs==22.2.0
Babel==2.12.1
backcall==0.2.0
beautifulsoup4==4.11.2
bleach==6.0.0
cached-property==1.5.2
cachetools==5.3.0
certifi==2022.12.7
cffi==1.15.1
charset-normalizer==3.0.1
ckip-transformers==0.3.2
ckiptagger==0.2.1
click==8.1.3
debugpy==1.6.6
decorator==5.1.1
defusedxml==0.7.1
entrypoints==0.4
fastjsonschema==2.16.3
filelock==3.9.0
Flask==2.2.3
flatbuffers==23.1.21
fqdn==1.5.1
gast==0.4.0
gdown==4.6.4
google-auth==2.16.1
google-auth-oauthlib==0.4.6
google-pasta==0.2.0
grpcio==1.51.3
h5py==3.8.0
hanlp-downloader==0.0.25
huggingface-hub==0.12.1
idna==3.4
importlib-metadata==6.0.0
importlib-resources==5.12.0
ipykernel==6.16.2
ipython==7.34.0
ipython-genutils==0.2.0
isoduration==20.11.0
itsdangerous==2.1.2
jedi==0.18.2
jieba==0.42.1
Jinja2==3.1.2
JPype1==0.7.0
json5==0.9.11
jsonpointer==2.3
jsonschema==4.17.3
jupyter-events==0.6.3
jupyter-server==1.23.6
jupyter-ydoc==0.2.2
jupyter_client==7.4.9
jupyter_core==4.12.0
jupyter_server_fileid==0.8.0
jupyter_server_ydoc==0.6.1
jupyterlab==3.6.1
jupyterlab-pygments==0.2.2
jupyterlab_server==2.19.0
keras==2.11.0
libclang==15.0.6.1
Markdown==3.4.1
MarkupSafe==2.1.2
matplotlib-inline==0.1.6
mistune==2.0.5
nbclassic==0.5.2
nbclient==0.7.2
nbconvert==7.2.9
nbformat==5.7.3
nest-asyncio==1.5.6
notebook==6.5.2
notebook_shim==0.2.2
numpy==1.21.6
oauthlib==3.2.2
opencv-python==4.7.0.72
opt-einsum==3.3.0
packaging==23.0
pandas==1.3.5
pandocfilters==1.5.0
parso==0.8.3
pexpect==4.8.0
pickleshare==0.7.5
pkgutil_resolve_name==1.3.10
prometheus-client==0.16.0
prompt-toolkit==3.0.38
protobuf==3.19.6
psutil==5.9.4
ptyprocess==0.7.0
pyasn1==0.4.8
pyasn1-modules==0.2.8
pycparser==2.21
Pygments==2.14.0
pyhanlp==0.1.84
pyrsistent==0.19.3
PySocks==1.7.1
python-dateutil==2.8.2
python-json-logger==2.0.7
pytz==2022.7.1
PyYAML==6.0
pyzmq==25.0.0
regex==2022.10.31
requests==2.28.2
requests-oauthlib==1.3.1
rfc3339-validator==0.1.4
rfc3986-validator==0.1.1
rsa==4.9
Send2Trash==1.8.0
six==1.16.0
sklearn==0.0.post1
sniffio==1.3.0
soupsieve==2.4
tensorboard==2.11.2
tensorboard-data-server==0.6.1
tensorboard-plugin-wit==1.8.1
tensorflow==2.11.0
tensorflow-estimator==2.11.0
tensorflow-io-gcs-filesystem==0.31.0
termcolor==2.2.0
terminado==0.17.1
thulac==0.2.2
tinycss2==1.2.1
tokenizers==0.13.2
tomli==2.0.1
torch==1.13.1
tornado==6.2
tqdm==4.64.1
traitlets==5.9.0
transformers==4.26.1
typing_extensions==4.5.0
uri-template==1.2.0
urllib3==1.26.14
wcwidth==0.2.6
webcolors==1.12
webencodings==0.5.1
websocket-client==1.5.1
Werkzeug==2.2.3
wrapt==1.15.0
y-py==0.5.9
ypy-websocket==0.8.2
zipp==3.15.0
```