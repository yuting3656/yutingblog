---
layout: "single"
title: "daily Programming: 工作終於又有有趣的可以玩了～～ face-api.js"
permalink: "daily-programming/face-api-js"
tags: daily-programming react face-api.js
---

> 上一篇炸掉了 要填表到 Azure 上


# 先找開源的來玩

-  [face-api.js](https://github.com/justadudewhohacks/face-api.js/){:target="_back"}

   ```
     npm i face-api.js
   ```

```jsx

import { Col, Modal, Row, message, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

//
// IMPORT ZONE
//

const FaceRecognitionModal = ({ visible, setVisible }) => {
  const [showContent, setShowContet] = useState(false);

  const startViedo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById("worker-video");
      if ("srcObject" in video) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
        console.log("inside srcObject");
      } else {
        console.log("not inside srcObject");
        video.src = URL.createObjectURL(stream);
      }
    } catch (err) {
      message.error("處理鏡頭異常", err);
    }
  }, []);

  const resolveFaceRecognition = useCallback(() => {
    const video = document.getElementById("worker-video");
    const canvas = document.getElementById("worker-canvas");
    // cropped photo
    const croppedPhotoCanvas = document.getElementById("cropped-photo-canvas");
    const croppedPhotoImg = document.getElementById("cropped-photo");

    const displayStyle = {
      width: video.width,
      height: video.height,
    };

    faceapi.matchDimensions(canvas, displayStyle);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks();

      console.log("detections:", detections);
      const resizeDetections = faceapi.resizeResults(detections, displayStyle);

      // clear previous face frames
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // draw video view
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizeDetections);
      faceapi.draw.DrawFaceLandmarks(canvas, resizeDetections);
      if (detections.length > 0) {
        const box = detections[0].detection._box;
        // console.log("box", box);
        croppedPhotoCanvas
          .getContext("2d")
          .clearRect(0, 0, croppedPhotoCanvas.width, croppedPhotoCanvas.height);
        croppedPhotoCanvas
          .getContext("2d")
          .drawImage(
            video,
            box._x,
            box._y,
            box._width,
            box._height,
            0,
            0,
            croppedPhotoCanvas.width,
            croppedPhotoCanvas.height
          );
        let d = croppedPhotoCanvas.toDataURL("image/png", 1.0);
        console.log("d:", d);
        croppedPhotoImg.setAttribute("src", d);
      }
    }, 300);
  }, []);

  const initFaceApi = useCallback(async () => {
    setShowContet(false);
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      startViedo();
      setShowContet(true);
      resolveFaceRecognition();
    } catch (err) {
      setShowContet(false);
      console.log("err", err);
      console.log("initFaceApi error", err);
    }
  }, [startViedo, resolveFaceRecognition]);

  useEffect(() => {
    if (visible) {
      initFaceApi();
    }
  }, [initFaceApi, visible]);

  const handleOnCancel = () => {
    setVisible(false);
  };

  const handleCropImage = () => {};

  return (
    <Modal visible={visible} onCancel={() => handleOnCancel()}>
      <video
        id="worker-video"
        width="320"
        height="260"
        style={ border: "1px solid gray", display: "none" }
      />
      {!showContent && <SpinnerBlock />}
      {showContent && (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Button onClick={() => handleCropImage()}> 截圖 </Button>
          </Col>
          <Col span={24}>
            <canvas
              id="worker-canvas"
              width="320"
              height="260"
              style={ border: "1px solid gray" }
            />
          </Col>
          <Col span={24}>
            <canvas
              id="cropped-photo-canvas"
              width="320"
              height="260"
              style={border: "1px solid gray", display: "none" }
            ></canvas>
            <img id="cropped-photo" alt="" src="" width={300} />
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default FaceRecognitionModal;

```