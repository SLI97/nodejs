const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sli');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
  console.log("连接数据库成功！")
})

const todoSchema = new mongoose.Schema({
  item: String
});

// Mongoose的model方法有四个参数：name为模型model的名称；
// schema为mongodb的document映射的schema；
// collection为真正的collection名称；
// skipInit为是否跳过初始化，默认为false.
mongoose.model
const Todo = mongoose.model('Todo', todoSchema);

const itemOne = Todo({item: 'buy flowers'}).save(function(err) {
  if (err) throw err;
  console.log('item saved');
});
//
// const data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];;

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    const itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}
