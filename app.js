const express = require("express"); // express - это функция
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let users = [];
let id = 1;

app.post("/test", (req, res) => {
    req.query.id = id++;
    res.send("hello," + req.query.name);
    users.push(req.query);
})

app.get("/test", (req, res) => {
    if (req.query.id) {
        const user = users.find(user => user.id == parseInt(req.query.id));
        if (user) {
            res.send(user);
        } else {
            res.send("user not found!");
        }
    } else {
        res.send(users);
    }
})

app.put("/test", (req, res) => {
    const user = users.find(user => user.id == parseInt(req.query.id));
    if (user) {
        const { name, lastName, age } = { ...req.body }
        user.name = name;
        user.lastName = lastName;
        user.age = age;
        res.send(user);
    } else {
        res.send("user not found!");
    }
})

app.delete("/test", (req, res) => {
    if (req.query.id) {
        const user = users.find(user => user.id == parseInt(req.query.id));
        if (user) {
            const userIndex = users.indexOf(user);
            console.log(userIndex);
            users.splice(userIndex, 1);
            res.send("user deleted");
        } else {
            res.send("user not found!");
        }
    } else {
        users = [];
        res.send("all users are deleted");
    }
})

app.listen(3001);