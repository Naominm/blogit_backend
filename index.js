import express from "express"

const app=express();

const port=process.env.PORT ||4000;

app.listen("4000", ()=>{
    console.log(`Server running on port ${port}`)
})