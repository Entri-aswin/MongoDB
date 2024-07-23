const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { userRouter } = require('./routes/userRoute');
const { handleGenericErrors } = require('./errors/genericError');
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());

connectDB();



app.use('/api/v1/user', userRouter)

app.use(handleGenericErrors)


app.all('*',(req,res)=>{
    res.status(400).json({
        message:'end point does not exist'
    })
})



const port =  3005;

app.listen(port, () => {
    console.log(`===== server started on  : http://localhost:${port}`);
})

