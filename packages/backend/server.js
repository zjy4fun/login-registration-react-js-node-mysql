const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const pino = require('pino-http')()



const app = express();

app.use(pino);

app.use(cors());

// 解析 json 格式的请求  content-type: application/json
app.use(express.json());

// 解析 x-www-form-urlencoded 格式的请求  content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// cookie-session 有助于将 session 数据存储在 cookie 中，而不需要服务器端的任何数据库资源
app.use(
    cookieSession({
        name: "zjy4fun-session",
        secret: "COOKIE_SECRET",
        httpOnly: true //只允许通过 HTTP/HTTPS 发送 cookie
    })
);

const db = require("./app/models");
const Role = db.role;

// force: true  ==> drop existing table then re-sync database
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    })
}

// 简单路由
app.get("/", (req, res) => {
    res.json({message: "Welcome to zjy4fun application."})
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



