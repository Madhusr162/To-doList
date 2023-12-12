var mysql = require('mysql2');
let express = require('express');
let app = express();
let cors=require('cors')
app.use(cors());

app.use(express.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Madhu162',
    database: 'mydb'
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log("Connected Successfully")
})
app.post('/todolist', async function(req,res){ 
    console.log(req.body);
    let {taskname}= req.body;
    let sql="insert into todolist (taskname) values (?)"
    connection.query(sql,[taskname],function (err,result){
    
            if(err) throw err
            console.log(result);
            res.send(result);
    })
    console.log(taskname)
})
app.get('/alltasks',function(req,res){
    let getsql="Select * from todolist"
    connection.query(getsql, function(err, result) {
        if (err)
            throw err;
        console.log("Data Fetched Successfully")
        res.send(result);
    })
})
app.delete('/deleteTask/:id',function(req,res){

    let id = req.params.id;
    console.log(id);
    res.send(id);
 let del = 'DELETE FROM todolist where id = ' + id;
 connection.query(del,[id],function(err,result){
     if(err) throw err
     console.log(result);
 })
})

app.listen(5000, async () => {
    console.log('server has started!');
    /*calling storage init and storage clear to clear the data when server is started and initialize the storage*/
  });