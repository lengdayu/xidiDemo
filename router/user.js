//注入依赖
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// 创建MySQL连接池
const pool = mysql.createPool({
  host: "127.0.0.1", //MySql数据库地址
  port: 3000, //MySql数据库端口号
  user: "root", //数据库用户的用户名
  password: "admin", //数据库用户的用户密码
  database: "xidi", //数据库名称
  connectionLimit: 20, //最大连接数
  charset: "utf8", //数据库服务器的编码方式
});
//创建服务器
const server = express();

//注入中间件，解析post请求
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//***********用户路由接口***************
//账户登录
server.get("/login", (req, res) => {
  let data = req.query;
  let sql = "select * from user where ?";
  pool.query(sql, [data.account, data.sms], (err, result) => {
    if (err) {
      res.send({ code: -1, msg: "登录失败！" });
      console.log(err);
    } else if (result.lenght > 0) {
      res.send({
        code: "000000",
        //将查询回来的用户名响应回去
        account: result[0]["account"],
        remember,
        //用查询回来的用户对象，生成新的token响应回去
        token: jwt.generateToken(result[0]),
      });
    } else {
      res.send({ code: "-1", msg: "用户名或密码错误！" });
    }
  });
});

//手机验证码
server.get("/message", (req, res) => {
  let phone = req.query.phoneNumber;
  let sql = "select * from user where phone = ?";
  pool.query(sql, phone, (err, result) => {
    ``;
    if (err) console.log(err);
    if (result.lenght > 0) {
      //查询到手机号后生成验证码
      let mes = Math.floor(Math.random(1000000) * 1000000);
      let sql = "update user set message= ? where phone =?";
      pool.query(sql, [mes, phone], (err, result) => {
        if (err) console.log(err);
        result.affectedRows
          ? res.send({ code: "000000", mes, Message: `验证码生成:${mes}` })
          : res.send({ code: "-1", message: "验证码生成失败!" });
      });
    } else {
      //查询不到手机号，注册用户
      let sql = "insert into user set phone=?";
      pool.query(sql, phone, (err, result) => {
        if (err) console.log(err);
        if (result.affectedRows > 0) {
          //注册用户后生成验证码
          let mes = Math.floor(Math.random(1000000) * 1000000);
          let sql = "update user set message= ? where phone =?";
          pool.query(sql, [mes, phone], (err, result) => {
            if (err) console.log(err);
            result.affectedRows
              ? res.send({ code: "000000", mes, Message: `验证码生成:${mes}` })
              : res.send({ code: "-1", message: "验证码生成失败!" });
          });
        } else {
          res.send({ code: -1, message: "新用户注册失败！" });
        }
      });
    }
  });
});

//手机号登录，没有注册会优先注册，然后登陆
server.post("/register", (req, res) => {
  let data = req.body;
  console.log(data);
  let sql = "select * from user where phone=?";
  pool.query(sql, data.phoneNumber, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ code: -1, msg: "登录失败！" });
    }
    //如果手机号存在，校验密码登录
    if (result.lenght > 0) {
      let sql = "select * from user where phone=? and message=?";
      pool.query(sql, [data.phoneNumber, data.message], (err, result) => {
        if (err) console.log(err);
        res.send({ code: -1, msg: "登录失败！" });
        if (result.lenght > 0) {
          res.send({
            code: "000000",
            phone: data.phoneNumber,
            remember,
            token: jwt.generateToken(result[0]),
            message: "登录成功!",
          });
          // 登录成功后要将临时验证码删除
          let sql = "upadte user set message=NULL where phone=?";
          pool.query(sql, data.phoneNumber, (err) => {
            if (err) console.log(err);
          });
        } else {
          res.send({ code: -1, message: "手机号或验证码错误！" });
        }
      });
    }
  });
});

module.exports = server;
