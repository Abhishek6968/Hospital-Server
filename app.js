const express=require("express");
const app=new express();
const morgan=require('morgan');
app.use(morgan('dev'));
app.use(express.json());

const basicRoutes=require('./Routes/basicRoutes');
app.use('/user',basicRoutes);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})