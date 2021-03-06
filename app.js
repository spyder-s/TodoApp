var express = require('express');
var todoController = require('./controllers/todoControllers');
var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('./public'));

app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log('you are listening to  port 3000');