const express=require("express");  //impoting express
const fs=require("fs");            //importing fs
const path=require("path");        //importing path
const app=express();               //assign express method to app 
const PORT=3000;                   //port creating
const createdFile="./newFile"      //assign the folder name to the variable

if(!fs.existsSync(createdFile)){  //existsSync method find the folder exists in current folder
    fs.mkdirSync(createdFile)
}

app.get("/currentTime",(req,res)=>{   // writing the get request;
    const currentTimeer=new Date();
    const year=currentTimeer.getFullYear().toString();
    const month=(currentTimeer.getMonth()+1).toString();
    const date=(currentTimeer.getDate()).toString();        //converting the all date and time to string
    const hours=(currentTimeer.getHours()).toString();
    const min=(currentTimeer.getMinutes()).toString();
    const sec=(currentTimeer.getSeconds()).toString();
    const DateTimeFileName=`${year}-${month}-${date}-${hours}-${min}-${sec}.txt` //then creat the extension for the date and time combined
                                                                                  //string with .txt formate file 
   
                                                                                 
 const filepath=path.join(createdFile,DateTimeFileName)            //creating the file path with path.join method with two folder and file parameter           

fs.writeFile(filepath,currentTimeer.toString(),(err)=>{    // fs.writefile method  is used to write a text inside a .txt file    
    if(err){
        res.send(`error connection ${err}`)     //error response
        return;
    }
    res.status(200).send(`file created successfully at :> ${filepath} `)  //data response
})
})

app.get("/getFiles",(req,res)=>{
    fs.readdir(createdFile,(err,files)=>{         //reading the folder to filter the files inside folder to find all .txt extension files
        if(err){
            res.send(`error connection ${err}`)
            return;
        }
        const textFile=files.filter((file)=>path.extname(file)===".txt"); 
        res.json(textFile)
    })
})


app.listen(PORT,()=>{
    console.log("server is connected in port :",PORT)
})