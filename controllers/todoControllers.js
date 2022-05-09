var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = "mongodb://localhost:27017/todo";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
    console.log('Database connected:', db)
})

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({ item: 'Buy Flowers' }).save(function (err) {
    if (err) throw err;
    console.log('item saved');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        })
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

};