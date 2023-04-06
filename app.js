const http=require('http')
const express=require('express')
const path=require('path')
const multer  = require('multer')
const {merge}=require('./merge')
const doc2pdf = require('doc2pdf');
const upload = multer({ dest: 'uploads/' })
let port=3200
let app=express()
app.use("/static",express.static("public"))
app.use("/extra",express.static("Extra"))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"views/index.html"))
})
app.post('/mer', upload.array('merger', 2),async (req, res, next)=> {
    // console.log({data:path.join(__dirname,req.files[0].path)})
        let p=await merge(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
        res.redirect(`http://localhost:3200/static/${p}.pdf`)
  })
app.post('/toword', upload.array('converter', 1),async (req, res, next)=> {
    // res.send({data:req.files})
    
    const buffer = fs.readFileSync(req.files[0].path);
    doc2pdf(buffer).then((pdf) => {
        console.log(pdf); // <Buffer>
      });
    doc2pdf(req.files[0].path).then((pdf) => {
        console.log(pdf); // <Buffer>
        res.redirect(`http://localhost:3200/static/${pdf}.pdf`)
      });
  })
app.listen(port,(req,res)=>{
    console.log(`http://localhost:${port}`);
})