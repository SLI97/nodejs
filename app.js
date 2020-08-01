const express = require('express');

const todoController =require('./controllers/todoControllerMySQL');
// const todoController =require('./controllers/todoControllerMongoDB');



const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000,()=>{
    console.log('You are listening to port 3000');
});
