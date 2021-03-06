module.exports={
    port:3000,
    host:"127.0.0.1",
    root:process.cwd(),
    compress:/\.(html|js|css|md)/,
    cache:{
        maxAge:0,
        expires:true,
        cacheControl:true,
        lastModified:true,
        etag:true
    }
}