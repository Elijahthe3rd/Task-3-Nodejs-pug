const express= require('express');
const app = express();
const port= process.env.port || 8880;
const path = require('path');

app.set("views",path.join(__dirname,"views"));
app.set('view engine','pug');

app.use(express.static('./views'));

app.get('/',(req,res)=>{
  
  res.render('index')

});

//app.get(express.static(path.join(__dirname ,'index')));

app.listen(port,()=>{

  console.info(`Server Running On Port: ${port}`);

})

