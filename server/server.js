require('dotenv').config()
const express =require('express');
const cloudinary=require('./cloudinary')
const cors =require('cors')
const app = express();


// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.get('/', (req, res)=>{
    res.send("app running")
})
app.post('/upload', async(req, res)=>{
    const {image}=req.body;
    try{
        const result=await cloudinary.uploader.upload(image,{
            folder:'sample'
        })
        res.json({err:false, result})
    }catch(error){
        res.status(500).json({err:true, error})
    }
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));