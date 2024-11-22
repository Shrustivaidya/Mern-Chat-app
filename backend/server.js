const express = require('express');

const app =express();


app.get('/',(req,res)=>{
    res.send("Api is running");
})

app.listen(5000,console.log("Server Started on the port 5000"))