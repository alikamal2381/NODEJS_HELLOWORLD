import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('short'));

const port = process.env.port || 3000;
let users = [];

app.use((req, res, next) => {
    console.log("req come ", req.body);
    next();
})

// GET ALL RECORDS
app.get('/users', (req, res)=>{
  res.send(users);  
})

// GET ONLY ONE RECORD
app.get('/users/:id', (req, res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }else{
        res.send('user not found');
    }
})

// ADD RECORD
app.post('/user', (req,res)=>{
    if (!req.body.student_name || !req.body.father_name || !req.body.age || !req.body.roll_no) {
         res.status(400).send('invalid code');      
    }else {
        users.push({
            student_name:req.body.student_name,
            father_name:req.body.father_name,
            age:req.body.age,
            roll_no:req.body.roll_no,          
        })
    }

})

// UPDATE RECORD
app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.student_name){
            users[req.params.id].student_name = req.body.student_name;
        }

        //if(req.body.student_name){
        //    users[req.params.id].student_name = req.body.student_name;
        //}        
        req.send(users[req.params.id]);
    }else{
        req.send('user not found');
    }
})

// DELETE RECORD
app.delete('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        users[req.params.id] = {};
        res.send('user deleted');
    }else{
        req.send('user not found');
    }

})

app.listen(port, ()=>{
    console.log('server is running');
})