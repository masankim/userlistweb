# nodejs를 활용한 게시판 만들기



게시판에 콘텐츠를 CRUD 를 하기위한 데이터베이스는  MYSQL 를 이용한다.

!![image-20201203173155691](https://user-images.githubusercontent.com/75194770/101239058-fcd4f880-3727-11eb-920c-d0bec5b0c94a.png)

```cmd
mkdir userlistweb
cd userlistweb
npm init -y 
```



npm이라는 nodemodule 패키지 관리자를 이용해서 설치한다.



nodejs 는 라이브러를 설치할떄 npm 이용해서 설치를 하고 설치한 라이브러리등을 관리하고 기록하는 파일을 package.json 에 기록하고 관리한다.



package.json 파일을 확인한다.



http 라이브러리가 아닌 express 라이브러리를 이용해서 웹 서버를 띄운다. 

웹서버 url : 127.0.0.1 = localhost

###### 웹서버 port : 8080 

서버가 완성 : http://127.0.0.1:8080 =http://localhost:8080

```powershell
npm install express
```



```javascript
const express = require('express')
```



##### listen(포트번호 , url , backlog , callback 함수 )

callbakc function :  javascript에서는 callback 함수는 다른 함수의 매개변수로 함수를 전달하고, 어떠한 이벤트가 발생한 후 매개변수로 전달한 함수가 다시 호출되는 것을 의미합니다.

callback은 쉽게 말하자면 어떤 일을 다른 객체에게 시키고, 그 일이 끝나는 것은 기다리지 않고 끝나고 부를 때까지 다른 일을 하는 것을 말합니다.

그렇기 때문에 non-block이며, 비동기 방식의 함수를 사용합니다.



get메소드와 post메소드 등을 활용하여 routing을 만든다.

일정한 경로로 요청이 들어왔을때 서버에서 반응할 것들을 콜백함수에서 처리한다.

callback 함수에서 매개변수로 request , response , next 형식으로 받아서 처리한다.





app.js에 최소한에 코드를 통해서 실행한다.

set . use .listen 메소드를 기본으로 하여 코드를 작성한다.

set method : 처음에 서버를 띄우전에 기초 세팅을 할떄 사용 

use method : 미들웨어를 등록하고 사용할때

listen method : 서버를 실행시킬때 사용한다.



**MySQL**

Mysql 접속 : mysql -uroot -p

db만들기 : create database something;

```
ex) CREATE DATABASE o2 CHARACTER SET utf8 COLLATE utf8_general_ci;
```

db보기 : show databases;

db사용하기 : use something;

현재 사용중이 db 확인하기 :  select database();

table 보기 : show tables;

**table 생성 : create table**

```mysql
ex) CREATE TABLE `topic` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`author` varchar(30) NOT NULL,
	PRIMARY KEY (id)
	) ENGINE=innoDB DEFAULT CHARSET=utf8;
```

id : 각 행들을 식별할 수 있게하는 식별자

Auto_increment : id를 따로 설정해주지 않으면, 자동으로 숫자가 1씩 늘어나는 방식



**데이터 추가 : INSERT**

```mysql
INSERT INTO topic (title, description, author) VALUES('JavaScript', 'Computer language for web.', 'abel');
//topic 이라는 테이블에 title, description, author정보를 추가한다.
//topic의 순서와, values의 값의 순서는 일치해야한다.

```



express 라이브러리에서 views라는 개념은 view templates이라고 생각하면 됩니다.

render라는 메소를 메소를 이용해서 html 형식의 문서를 랜더링할때 에를 들어 test.html를 랜더링하려고 한다면

render("test.thml") ===> views폴더내에서 있는 test.html 찾아 자동으로 랜더링 해주려면 

views라는 폴더를 view template의 기본 폴더로 세팅하면 됩니다.



```javascript
...

//app.set() ==> views폴더를 기본 폴더로 지정

app.set('views' , path.resolve(__dirname ,'/views'))
...
```

뷰 템플릿 랜더하기 위해 엔진을 express 사용 하는데 jade와 ejs가 있는데 

그중에 ejs를 쓰기 위해서 엔진으로 등록 

```javascript
require('ejs')

app.set('view engine' , 'ejs')
```



client에서 body등에 실어 보내준 내용을 보기 위해서는 미들웨어로 body-parser에 있는 urlencoded 를 등록하여 사용한다.

use메소드를 이용해서 미들웨어 등록

```javascript
const bodyParser = require('body-parser')

app.use(bodyPaser.urlencoded({extended:true})
```





예를 들어 시나리오 생각해 봅시다.

서버가 http://lolcalhost:8080 에서 띄워져 있습니다.

크롬 클라이언트가 http://lolcalhost:8080/data 로 get방식으로 request을 합니다.

그랬을떄 서버는 response를 index.ejs파일을 문서로 변환한후 크롬 클라이언트에게 전송해준다.

크롬은 그 문서를 해석해서 화면에 보여진다.

![image-20201205103605518](https://user-images.githubusercontent.com/75194770/101239074-11b18c00-3728-11eb-86f6-d4e5ba00ae28.png)



```
app.get('/data', function(request , reponse ) {

})
```

이 형태에서 request에는 클라이언트가 요청하면서 보낸 정보가 담아진다.

reponse는 클라이언트에게 반응할 어떤 정보 등을 실어 보내주는 역활을 하는 객체이다.



테스트 해보기 위해서

```javascript
app.get('/data', function(request , response ) {
    console.log(request)
    response.send("Hello world!!!!")
})
```

console창에 출력되는 메세지

![image-20201205163205145](https://user-images.githubusercontent.com/75194770/101239098-3f96d080-3728-11eb-9c17-88ae56729af5.png)

클라이언트에 나타는 모습을 보자

![image-20201205163238458](https://user-images.githubusercontent.com/75194770/101239108-4f161980-3728-11eb-9365-88f5fbcaf457.png)



response.render메소들을 이용해서 views폴더에 indes.ejs 템플릿을 문서로 변환해서 보낸다.

```javascript
app.get('/data', function(request , response ) {
    console.log(request.body)
    response.render('index' , {data:"김태경"})
})
```

views폴더에 index.ejs 추가

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>안녕하세요</h1>
    <%= data %>
</body>
</html>
```





실행했을떄 크롬브라우저에 나타나는 문서는 다음과 같다.

![image-20201205164017209](https://user-images.githubusercontent.com/75194770/101239117-5c330880-3728-11eb-89f6-5f44703d1b26.png)



http://localhost:8080/topics 로 get방식으로 요청을 하면

mysql에 접속하여 topic에 있는 contents를 모두 조회해서 console창에 띄워 보는 시나리오를 생각해 보자

![image-20201205170650025](https://user-images.githubusercontent.com/75194770/101239132-6b19bb00-3728-11eb-899d-6b0ce63e3800.png)



mysql 라이브러를 활용해서 mysql 접속한다.

```javascript
const mysql = require('mysql')

// mysql.createConnection(객체의형태로 접속 정보)
const db = mysql.createConnection({
    //mysql 접속 정보
})

```

```powershell
npm install mysql
```



```javascript
const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:"o2"
})


app.get('/topic', function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql,function(err, result ){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.send("Success")
        }
    })
})

```

결과물

o2 database 내용

![image-20201205173816049](https://user-images.githubusercontent.com/75194770/101239138-7836aa00-3728-11eb-92ca-5fd8dc69492d.png)



실행결과물 

![image-20201205180229687](C:\Users\82108\AppData\Roaming\Typora\typora-user-images\image-20201205180229687.png)





database의o2에 있는 topic 테이블에 contents를 추가하는 기능을 구현한다.

[url : http://localhost:8080/topic](http://localhost:8080/topic)

Method: POST

내용 : 

o2.topic에 

Json방식으로 body에 

{

“title“:”python”

“descriptions“:”fowjefwefwef”

“author”:”gary”

}

db 에 저장되도록 요청



![image-20201205180415020](https://user-images.githubusercontent.com/75194770/101239146-884e8980-3728-11eb-9280-e69dba5500ce.png)



```javascript
app.post("/topic" ,app.post('/topic', function(req, res){
    let sql = "INSERT INTO `topic` (`title`, `description`, `author`) VALUES (?,?,?);"
    // console.log(req.body.title)
    // res.send(req.body.title)
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.send("Success")
        }
    }) 
}))
```



라우팅 파일을 만들어 app.js에서 미들웨어로 등록한다.

router폴더에 apiRouter.js를 추가하고 다음과 같이 코드를 생성한다.

전에 app.js에 있었던 mysql관련등 일부 코드를 이곳으로 옮긴다.

경로 : http://localhost:8080/topic/add '

method :GET

index.ejs 파일을 documents로 변환해서 클라이언트에게 전송한다.

router/apiRouter.js

```jvascript
const express = require('express')
const router  = express.Router()
const mysql = require('mysql')

// mysql.createConnection(객체의형태로 접속 정보)
const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:"o2"
})

router.get('/topic/add', function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql,function(err, result ){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.render('index' , {topics:result})
        }
    })
})


module.exports = router;
```



views/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>안녕하세요</h1>
    <%= topics[0] %>
</body>
</html>
```





좀더 역동감 있게 보여주기 위해서 콘텐츠를  for문을 이용해서 순환시킨다.

```html
<!-- //index.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'></a>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i< topics.length; i++){ %> 
        <!-- // 전달 받은 topics를 통하여 글목록 보여주기 -->
        <li>
          <a href='/topic/<%= topics[i].id %>'>
             <!-- // 링크를 누르면, db에 저장된 각 글의 id 값을 통하여 아래의 article 태그 안에 글의 상세 내용을 보여주게 한다. -->
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      
        <!-- // 글 목록을 누를지 않았을때,(id 값이 없을때 환영한다는 내용을 띄운다.) -->
        <h2>Welcome</h2>
         This is server side javascript tutorial.
     
    </article>
   
  </body>
</html>
```



각 제목 목록을 클릭하면  title목록에 따라 상세내용이 하단에 출력되도록 구현한다.

각 title을 클릭하면  http://localhost:8080/topic/<id>   이 경로로 get방식으로 요청이 들어오므로

router/apiRouter.js 코드를 추가 

```javascript
router.get(['/topic', '/topic/:id'] , function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql, function(err, results){
        let ids = req.params.id
        let sql = "SELECT * FROM topic WHERE id = ?"
        if(ids) {
            db.query(sql, [ids] ,function(err, result){
                if(err) {
                    console.log(err)
                    res.status(500).send('Internal Server Error')
                } else {
                    console.log(result)
                    res.render('index', {topics:results, topic:result[0]})
                }
            })
        } else {
            res.render('index', {topics:results, topic:undefined})
        }
    })
})
```



views/index.ejs

```html
<!-- //view.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'></a>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i< topics.length; i++){ %> 
        <!-- // 전달 받은 topics를 통하여 글목록 보여주기 -->
        <li>
          <a href='/topic/<%= topics[i].id %>'>
             <!-- // 링크를 누르면, db에 저장된 각 글의 id 값을 통하여 아래의 article 태그 안에 글의 상세 내용을 보여주게 한다. -->
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <% if(topic){ %> 
        <!-- // 글 목록을 눌렀을때, topic객체를 get방식으로 넘겨 받을 수 있고, -->
        <h2><%= topic.title %></h2>  
        <!-- topic 객체의 title키를 통하여 제목을 알 수 있고, -->
        <p> <%= topic.description %> </p> 
        <!-- description키를 통하여 내용을 알 수 있고, -->
        <p><%= 'by ' + topic.author %></p> 	
        <!-- author키를 통하여 저자를 알 수 있다. -->
      <% } else { %> 
        <!-- // 글 목록을 누를지 않았을때,(id 값이 없을때 환영한다는 내용을 띄운다.) -->
        <h2>Welcome</h2>
         This is server side javascript tutorial.
      <% } %>
    </article>
   
  </body>
</html>
```



와 같이 수정하면 다음과 같은 결과가 나온다.

![](https://user-images.githubusercontent.com/75194770/101270128-7d900500-37b9-11eb-953c-62027c04b669.png)

게시판에 추가 버튼을 누루면 다음과 같은 페이지로이동

![image-20201206115955303](https://user-images.githubusercontent.com/75194770/101270245-951bbd80-37ba-11eb-8eb0-68c9b904d301.png)



게시판에 추가버튼을 누루면 글을 추가하는 기능을 구현한다.

views/index.ejs 에 추가버튼을 생성하기 위해 다음과 같은 코드를 추가한다.

```html
....  
<a href="/topic/add"><button style="size:10px" >추가</button></a>
</body>
...
```



views/add.ejs 추가하고 다음과 같이 코드를 작성한다.

타이틀 , 내용, 저자 등을 입력하고 제출을 누루면 POST방식으로 http://localhost:8080/topic/add 요청이 들어가는 폼을 구현한다.

title input 은 type="text" name은 title 

description 은 input 태그아닌 좀더 긴 글을 입력할수 있는 textarea태그를 적용 name은 description 

author input type은 text name은 author 

```html
<form action="요청경로" method="요청방식">
    <input type="" name="request.body.name으로 정할 이름" plackholder="" />
    ..
    ...
    <input type="submit"  value="제출"/>
</form>
```





views/add.ejs

```html
<!-- //edit.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'>Server Side Javascript</a></h1>
    <ol>
      <% for(var i=0; i<topics.length;i++){ %>
        <li>
          <a href='/topic/<%- topics[i].id -%>'>
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <form action="/topic/add" method="POST">
        <p><input type="text" name="title"  placeholder="title" ></p> // value를 통하여 전달받은 topic객체의(수정해야할) 데이터를 표시할 수 있다.
        <p><textarea name="description" rows="6" cols="50" placeholder="description"> </textarea></p>// textarea는 태그들 사이에 데이터를 입력해야 표시가능.(	rows는 행이고, cols는 열이다 이걸 통하여 textarea의 크기를 조정한다. )
        <p><input type="text" name="author"  placeholder="author"></p>
        <p><input type="submit" value="추가확정"></p>
      </form>
    </article>
    <ul>
        <li><a href="/topic/add">add</a></li>
    </ul>
  </body>
</html>
```



추가확정 버튼을 누루면 

http://localhost:8080/topic/add

방식 : POST 

request에 body부분에 추가할 콘텐츠를 보내준다.

그걸 받아서 서버에서 처리할 코드를 구현하다.

```javascript
...

router.post('/topic/add' , function(req, res) {
    // console.log(req.body)
    let sql = "INSERT INTO `topic` (`title`, `description`, `author`) VALUES (?,?,?);"
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.redirect('/topic')
        }
    }) 
    
...
```

