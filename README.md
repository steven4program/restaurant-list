# Restaurant-List

此專案可以讓使用者添加自己的餐廳收藏，可以在主畫面點擊餐廳圖示或底下的按鈕來瀏覽更詳細的餐廳資訊。
同時也具有修改及刪除餐廳資料的功能。

## Features - 產品功能

- 使用者可以瀏覽全部餐廳
- 使用者可以點擊 Detail 按鈕\*\*來觀看餐廳的詳細內容
- 使用者可以用**餐廳名稱**或**類別**來搜尋列表中的餐廳
- 使用者可以自行**新增**一家餐廳
- 使用者可以**修改**一家餐廳的資訊
- 使用者可以**刪除**一家餐廳

## Screenshot 畫面瀏覽

![image](https://github.com/steven4program/restaurant-list/blob/master/login.png)

## Prerequisites - 環境建置與需求

- Node.js v10.15.0
- express v4.17.1
- express-handlebars v5.3.2
- mongoose v5.13.2
- mongodb v4.2.14
- method-override: v3.0.0

## Installing - 安裝流程

1. 開啟終端機(Terminal)將此專案 Clone 至本機電腦

```
git clone https://github.com/steven4program/restaurant-list.git
```

2. 進入存放此專案的資料夾

```
cd restaurant_list
```

3. 安裝 npm 套件

```
npm install
```

4. 加入種子資料

```
npm run seed
```

5. 啟動網頁伺服器

```
npm run dev
```

當 Terminal 出現以下文字表示成功連結本地伺服器

```
Express is listening on localhost:3000
```

6. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案

## Developer - 開發者

[Steven Chang](https://github.com/steven4program)
