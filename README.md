## 登陆注册功能实现

### 环境部署

1. 安装依赖
```bash
npm install
```
2. 配置测试数据库
```js
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
```

3. 启动后端

```bash
npm run backend-dev
```

4. 启动前端

```bash
npm run frontend-dev
```

5. 浏览器打开 `http://localhost:3000` 进行调试

### 参考

- 后端：https://github.com/bezkoder/node-js-express-login-example
- 前端：https://github.com/bezkoder/react-js-login-registration-hooks
