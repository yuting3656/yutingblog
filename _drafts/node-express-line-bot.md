
## install 

~~~npm
npm install express @line/bot-sdk
~~~

## package.json

 - 在 scripts 下加入  "start": "node index.js"
~~~json
{
  "name": "line-bot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "@line/bot-sdk": "^6.8.0",
    "express": "^4.17.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
~~~

##　在根目錄的地方(和 package.json 同一層　)新增　index.js 

~~~javascript
var http = require('http')
~~~