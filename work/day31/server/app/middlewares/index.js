const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const basicAuth = require('basic-auth');
const usersModel = require("../models/users");
class MiddleWares {
    //登录验证
    async auth(ctx,next){
        try {
            const token = basicAuth(ctx.req).name;
            const user = jsonwebtoken.verify(token,config.tokenKey);
            ctx.state.user = user;
        }catch (e) {
            ctx.throw(401,"登录信息有问题")
        }
        await next()
    };

    //权限认证 判断当前登录的用户 和 当前需要修改用户是不是同一个
    //如果是同一个 允许修改
    //如果不是同一个 不允许修改
    //access依赖于auth
    async access(ctx,next){
        if(ctx.state.user._id === ctx.params.id){
            await next()
        }else{
            ctx.throw(403,"权限有误")
        }
    };


    //判断一下关注的用户 取消关注的用户 是否存在
    async followUserExist(ctx,next){
      const user =   await usersModel.findById(ctx.params.id);
      if(!user){ctx.throw(404,"关注的用户不存在")};
      await next()
    }
}

module.exports=new MiddleWares()