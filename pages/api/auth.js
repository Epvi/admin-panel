// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
export default function handler(req, res) {
  fs.readFile("blogdata/User.json",'utf-8',(err,data)=>{
    res.status(200).json( JSON.parse(data) )
    
  })
  //console.log(req,res)// Printed not in console of chrome but in terminal which shows this api route is for backend and not frontend 
}
