const mongoose = require('mongoose')
const express = require('express')
const Donor = require('./schema.js')
const Register=require('./register.js')
const bodyParser = require('body-parser')
const cors=require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
// https://bloodbank-exwj.onrender.com

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://aarthi32:Aarthi32@cluster0.grrieqs.mongodb.net/BloodBank?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connection established')
        const port = process.env.PORT || 8002 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
        app.listen(port, function () {
            console.log(`Listening on port ${port} `)
        })
    } catch (error) {
        console.log(error)
        console.log("Couldn't establish connection")
    }
}

connectToDb()

app.post('/add-user',async function(request,response){
    try{
        const newUser=await Register.create({
            username:request.body.username,
            email:request.body.email,
            password:request.body.password
        })
        response.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: newUser
        })
    }
    catch(error){
        console.error('Error creating User:', error)
        response.error(500).json({
            status: 'failure',
            message: 'Failed to create User',
            error: error.message
        })
    }
})

app.post('/req-user',async function(request,response){
    try{
        const {username,password}=request.body
        const user=await Register.findOne({username,password})

        if(user){
            response.status(200).json({
                "status":"success",
                "message":"Valid user"
            })
        }
        else{
            response.status(401).json({
                "status":"failure",
                "message":"Invalid user"
            })
        }
    }
    
    catch (error) {
        console.error('Error fetching users:', error);
        response.status(500).json({
          status: 'failure',
          message: 'Failed to fetch users',
          error: error.message
        })
      }
})
app.post('/add-donor', async function (request, response) {
    try {
        const newDonor = await Donor.create({
            donorname: request.body.donorname,
            age:request.body.age,
            email: request.body.email,
            bloodgroup: request.body.bloodgroup,
            gender:request.body.gender,
            address:request.body.address,
            phoneno:request.body.phoneno
            
        })
        response.status(201).json({
            status: 'success',
            message: 'Donor created successfully',
            user: newDonor
        })
    } catch (error) {
        console.error('Error creating donor:', error)
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create donor',
            error: error.message
        })
    }
})

app.get('/req-donor', async function (request, response) {
    try {
        const donors = await Donor.find(); 
        response.status(200).json(donors);
    } catch (error) {
        console.error('Error fetching donors:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to fetch donors',
            error: error.message
        });
    }
});
