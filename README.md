# Restaurant-List

此專案可以讓使用者添加自己的餐廳收藏

## Features - 產品功能

- 使用者可以建立帳號並登入以建立自己的專屬餐廳清單
- 使用者可以使用 Facebook 帳號登入
- 使用者可以點擊 Detail 按鈕來觀看餐廳的詳細內容
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
- bcryptjs: v2.4.3
- body-parser: v1.19.0
- connect-flash: v0.1.1
- dotenv v10.0.0
- passport v0.4.1
- passport-facebook v3.0.0
- passport-local v1.0.0

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
將.env.example檔案更名為.env
```

5. 加入種子資料

```
npm run seed
```

6. 啟動網頁伺服器

```
npm run dev
```

當 Terminal 出現以下文字表示成功連結本地伺服器

```
App is running on http://localhost:3000
```

7. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案

## Developer - 開發者

[Steven Chang](https://github.com/steven4program)
