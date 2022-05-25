//1.注入模块
//Express服务器框架
const express = require("express");
//body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。
const bodyParser = require("body-parser");
//解决跨域问题
const cors = require("cors");
//引入token模块
const jwt = require("./jwt/jwt");

//引入路由模块
const user = require("./router/user");

//2.创建服务器
const server = express();

//注入中间件，解析post请求
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// 指定服务器对象监听的端口号
server.listen(3000, () => {
  console.log("server is running!");
  console.log("......");
});

// 使用CORS中间件
//统一伪装跨域，之后不用再res.writeHead
server.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

server.use((req, res, next) => {
  let _url = req.url.split("?")[0];
  if (
    _url != "/user/login" &&
    _url != "/user/message" &&
    _url != "/user/register" &&
    (_url.startsWith("/user") || _url.startsWith("/orders"))
  ) {
    let token = req.headers.token;
    let result = jwt.verifyToken(token);
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result === undefined) {
      res.send({ status: 403, msg: "未提供证书" });
    } else if (result.name == "TokenExpiredError") {
      res.send({ status: 403, msg: "登录超时，请重新登录" });
    } else if (result.name == "JsonWebTokenError") {
      res.send({ status: 403, msg: "证书出错" });
    } else {
      //通过验证，把token转换的用户对象绑定在req上，接着往下走
      req.user = result;
      next();
    }
  } else {
    next();
  }
});
//3.挂载路由
server.use("/user", user);
