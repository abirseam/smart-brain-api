const express= require('express');
const { request } = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs')
const cors = require ('cors')
const knex = require('knex');
const register = require('./controllers/register');
const signin =  require('./controllers/signin');
const image =  require('./controllers/image');
const id = require('./controllers/id');

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smartbrain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

 
app.get('/', (req,res)=>{
    res.send(database.users);
})

app.get('/profile/:id',(req,res)=>{ id.handleId(req,res,db,bcrypt)})

app.post('/signin',(req,res)=>{ signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt) }) //dependency injection

app.put('/image',(req,res)=>{ image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{ image.handleApiCall(req,res)})

app.listen(3001, ()=>{
    console.log('This is working')
});