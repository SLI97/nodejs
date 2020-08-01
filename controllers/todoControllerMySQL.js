const mysql = require('mysql');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'test'
    }
);

connection.connect((err, result) => {
    if (err) {
        console.log(err);
        console.log("连接MySQL失败!");
        return;
    }
    console.log(result);
    console.log("连接MySQL成功!");
});
// connection.end();




module.exports = function (app) {
    app.get('/todo', function (req, res) {
        let sql = 'select * from todo';
        // connection.connect();
        connection.query(sql, (err, result) => {
            if (err) {
                console.log('[SELECT 失败] - ', err.message);
                return;
            }

            console.log('--------------查询-------------');
            console.log('查询成功:', result);
            console.log('--------------------------\n\n');
            res.render('todo', { todos: result });
            // connection.end();
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        let sql = `INSERT INTO todo(item) VALUES('${req.body.item}')`;
        // connection.connect();
        connection.query(sql, (err, result) => {
            if (err) {
                console.log('[增加失败] - ', err.message);
                return;
            }

            console.log('---------------插入-------------');
            console.log('增加成功 ID:', result.insertId);
            console.log('增加成功:', result);
            console.log('--------------------------------\n\n');
            res.json(result);
            // connection.end();
        });
    });

    app.delete('/todo/:item', function (req, res) {
        let sql = `DELETE FROM todo where item='${req.params.item}'`;
        // connection.connect();
        connection.query(sql, (err, result) => {
            if (err) {
                console.log('[删除失败] - ', err.message);
                return;
            }

            console.log('---------删除------------');
            console.log('删除成功', result.affectedRows);
            console.log('------------------------\n\n');
            res.json(result);
            // connection.end();
        });
    });
}