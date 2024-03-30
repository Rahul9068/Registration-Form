const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/registrationdata');
  console.log('db conneccted')
 
}

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    password: String,
    phonenumber:String

  });
  const User = mongoose.model('User', userSchema);

const server = express();
// using middleware
server.use(cors());
server.use(bodyParser.json());

//CRUD -
server.post('/demo',async (req,res)=>{
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.password = req.body.password
    user.phonenumber = req.body.phonenumber;
    const doc = await user.save()

    console.log(doc)
    res.json(doc);
})

server.get('/demo', async (req,res)=>{
  const docs = await User.find({});
  res.json(docs)
})

server.listen(8080,()=>{
    console.log('server started')
})
