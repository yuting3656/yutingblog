---
layout: 'post'
title: '工作筆記: 我愛  Firebase'
permalink: 'work-note/i-love-firebase'
tags: 工作筆記 firebase go javascript
---

> 故事是這樣的 要照片 拿照片 安全的照片 好～開始！

# Js read image

- [Reference:](https://blog.logrocket.com/how-to-extract-text-from-an-image-using-javascript-8fe282fb0e71/)

~~~js
const setImageSrc = (image: HTMLImageElement, imageFile: File) => {
 return new Promise((resolve, reject) => {
   const fr = new FileReader();
   fr.onload = function() {
     if (typeof fr.result !== 'string') {
       return reject(null);
     }
     image.src = fr.result;
     return resolve();
   };
   fr.onerror = reject;
   fr.readAsDataURL(imageFile);
 });
};
~~~

# Firebase: JS [Post, Get]

- [https://firebase.google.com/docs/storage/web/download-files](https://firebase.google.com/docs/storage/web/download-files)

~~~js
   const file = e.event.target ; // input file 
   const imgRef = storage.ref('storagePath');
   const task = imgRef.put(file);
   task.on(
   // eventType
       firebase.storage.TaskEvent.STATE_CHANGED,
       // callback: ( callback: (a: firebase.database.DataSnapshot, b?: string) => any)
       null,
       // error (cancelCallbackOrContext?: Object),
       (error) => {},
       // context
       () => {
         task.snapshot.ref
             .getDownloadURL().then( (downloadURL) => {
              //
             },
             );
       },
   );
~~~

# Firebase: Golang [GET-SignedURL](https://pkg.go.dev/cloud.google.com/go/storage#SignedURL)

- 可拿一個會過期的圖檔  Url 帥～～～
- [A guide to Firebase Storage download URLs and tokens](https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens)

~~~go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/google"
)

func main() {
	sakeyFile := "/home/tamal/Downloads/xyz.json"

	saKey, err := ioutil.ReadFile(sakeyFile)
	if err != nil {
		log.Fatalln(err)
	}

	cfg, err := google.JWTConfigFromJSON(saKey)
	if err != nil {
		log.Fatalln(err)
	}

	bucket := "go-cloud"
	filename := "mypic3.json"
	method := "GET"
	expires := time.Now().Add(time.Second * 60)

	url, err := storage.SignedURL(bucket, filename, &storage.SignedURLOptions{
		GoogleAccessID: cfg.Email,
		PrivateKey:     cfg.PrivateKey,
		Method:         method,
		Expires:        expires,
	})
	if err != nil {
		fmt.Println("Error " + err.Error())
	}
	fmt.Println(url)
}
~~~

# Firebase: Golang [Write](https://cloud.google.com/appengine/docs/standard/go111/googlecloudstorageclient/read-write-to-cloud-storage)

~~~go
// createFile creates a file in Google Cloud Storage.
func (d *demo) createFile(fileName string) {
        fmt.Fprintf(d.w, "Creating file /%v/%v\n", d.bucketName, fileName)

        wc := d.bucket.Object(fileName).NewWriter(d.ctx)
        wc.ContentType = "text/plain"
        wc.Metadata = map[string]string{
                "x-goog-meta-foo": "foo",
                "x-goog-meta-bar": "bar",
        }
        d.cleanUp = append(d.cleanUp, fileName)

        if _, err := wc.Write([]byte("abcde\n")); err != nil {
                d.errorf("createFile: unable to write data to bucket %q, file %q: %v", d.bucketName, fileName, err)
                return
        }
        if _, err := wc.Write([]byte(strings.Repeat("f", 1024*4) + "\n")); err != nil {
                d.errorf("createFile: unable to write data to bucket %q, file %q: %v", d.bucketName, fileName, err)
                return
        }
        if err := wc.Close(); err != nil {
                d.errorf("createFile: unable to close bucket %q, file %q: %v", d.bucketName, fileName, err)
                return
        }
}
~~~

> ~好！線這樣！！ 目前卡在 用 go 傳圖到 storage~

> 一支全壘打! 爪抓今年拿冠軍~~~~

> 快樂 用 `GO`寫進 firebase storage 就是開心~~ 

- 前端 吃檔案 用 [`FileReader.readAsDataURL()`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL){:target="_back"} 
   - 把資料變成 [Data-URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs){:target="_back"} 送到後端 

- 後端 `Go` 要處裡 Data-URL (是 STRING 唷!)  `data:[<mediatype>][;base64],<data>` 
   - 把 `<data>` 和 `[<mediatype>]` 找出來 燈燈燈~~~
   - 找到 [github.com/vincent-petithory/dataurl](https://github.com/vincent-petithory/dataurl){:target="_back"} YA!!!


~~~go
c := *gin.Context

type imageStruct struct {
        Image string `json:"image"`
}

t := imageStruct{}
_ := c.ShouldBindJSON(&t)

dataURL, _ := dataurl.DecodeString(t.Image)
contentType := dataURL.MediaType.ContentType() // contentType string
fileData := dataURL.Data // fileData []byte

writer := bucket.Object("filePath").NewWriter(c)
writer.ObjectAttrs.ContentType = contentType
writer.ObjectAttrs.CacheControl = "no-cache"
if _, err := writer.Write(fileData); err != nil {
	return "", err
}
if err := writer.Close(); err != nil {
	fmt.Println(err)
	return "", err
}

~~~
