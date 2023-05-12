const express = require('express');
const cors = require("cors");

const app = express();
const mysql = require("mysql2");
const PORT = process.env.port || 8000;

let corsOption = {
  origin: "*",
  credential: true
}
app.use(cors(corsOption));

const db = mysql.createPool({
  host: "localhost",
  user: "thisisjava",
  password: "1234",
  database: "test07db"
});

app.get("/list", function(request, response){
  let sql = "SELECT * FROM test07db ORDER BY no DESC";
  db.query(sql, function(error, boards){
    response.send(boards);
  })
})

app.post("/read", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    let no = post.no;

    let sql = "SELECT * FROM test07db WHERE no=?";
    db.query(sql, [no], function(error, board){
      response.send(board);
    })
  });
})

app.post("/create", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    
    let author = post.author;
    let title = post.title;
    let content = post.content;
    let cre_date = post.cre_date;

    let sql = "INSERT INTO test07db (title, content, author) VALUES(?, ?, ?)";
    db.query(sql, [title, content, author], function(error, result){
      response.send({id: result.insertId});
    })
  });
})

app.post("/update", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    
    let no = post.no;
    let title = post.title;
    let content = post.content;

    let sql = "UPDATE test07db SET title=?, content=? WHERE no=?";
    db.query(sql, [title, content, no], function(error, result){  })
  });
})

app.post("/delete", function(request, response){
  let body = "";
  request.on("data", function(data){
    body += data;
  });
  request.on("end", function(){
    let post = JSON.parse(body);
    
    let no = post.no;
    
    let sql = "DELETE FROM test07db WHERE no=?";
    db.query(sql, [no], function(error, result){  })
  });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});