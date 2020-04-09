---
layout: 'post'
title: 'React: Happy react Note'
permalink: 'react/hyappy-react-note'
tags: react udemy-react
---

## Add env

- [https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/){:target="_back"}

   - 一定要 REACT_APP_ 開頭喔


## functional components redirect [history]

- [https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router](https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router){:target="_back"}


   -  
      ~~~js
      import { useHistory } from "react-router-dom";
      
      function BackButton({ children }) {
        let history = useHistory()
        return (
          <button type="button" onClick={() => history.goBack()}>
            {children}
          </button>
        )
      }
      ~~~

## 好棒棒網站 分享 functional components and class components

- [https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks](https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks){:target="_back"}