const mongoose = require('mongoose')
const express = require('express')
const Donor = require('./schema.js')
const Register=require('./register.js')
const bodyParser = require('body-parser')
const cors=require('cors')
const Donated = require('./donated.js')
const Camp = require('./camp.js')
const Volunteer =require("./volunteer.js")
const app = express()
const nodemail=require('nodemailer')
require("dotenv").config()
app.use(bodyParser.json())
app.use(cors())
// https://bloodbank-exwj.onrender.com

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://aarthi32:Aarthi32@cluster0.grrieqs.mongodb.net/BloodBank?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connection established')
        const port = process.env.PORT || 8001 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
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
        const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
         
        const newUser=await Register.create({
            _id: userId,
            username:request.body.username,
            email:request.body.email,
            password:request.body.password
        })
        response.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: newUser,
            _id: userId
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

app.post('/req-user', async (request, response) => {
    try {
      const { username, password } = request.body;
      const user = await Register.findOne({ username, password });
  
      if (user) {
        response.status(200).json({
          status: "success",
          message: "Valid user",
          _id: user._id,
          username:user.username
        });
      } else {
        response.status(401).json({
          status: "failure",
          message: "Invalid user"
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      response.status(500).json({
        status: 'failure',
        message: 'Failed to fetch users',
        error: error.message
      });
    }
  });
  

app.post('/add-donated',async function (request,response){
    
    try{

        // Use the same ID provided from the register process          
        const newDonated = await Donated.create({
           
            // _id: request.body.id,
            id:request.body.id,
            amount:request.body.amount,
            hospitalname:request.body.hospitalname,
            hospitaladdress:request.body.hospitaladdress,
            date:request.body.date,
        })
        response.status(201).json({
            status: 'success',
            message: 'details added successfully',
            user: newDonated
        })
    } catch (error) {
        console.error('Error adding details:', error)
        response.status(500).json({
            status: 'failure',
            message: 'Failed to add donated details',
            error: error.message
        })
    }

})

const transporter= nodemail.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const sendemailalert = async (email,donor)=>{
    const mail={
        from:process.env.EMAIL,
        to:email,
        subject : "🚨 New Emergency Alert! from Bloodbuddy",
        text : `${donor.donorname} - (${donor.gender}) is in willing to donate blood of  
        ${donor.bloodgroup} bloodgroup\n\n Want the donor ? Login in to the app`
    }
   
          try{
                await transporter.sendMail(mail);
                console.log("email sent successfully")
          }
          catch(error){
            console.log(error)
          }
}

app.post('/add-donor', async function (request, response) {

    const users=await Register.find()

    try {
        const {_id } = request.query;
        // const donorId = request.body.id; 
        const newDonor = await Donor.create({
            id: _id,
            donorname: request.body.donorname,
            age:request.body.age,
            email: request.body.email,
            bloodgroup: request.body.bloodgroup,
            gender:request.body.gender,
            address:request.body.address,
            phoneno:request.body.phoneno
            
        })

        users.forEach((user)=>{
            console.log(user.email)
                 sendemailalert(user.email,newDonor)
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
        const donors = await Donor.find({ donated: false }); 
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

app.delete('/delete-donor',async (request,response) => {
  
  try  {  const { _id } = request.query;
    const donor = await Donor.findOneAndDelete({_id});
    if (!donor) {
        return response.status(404).json({ message: 'Donor not found' });
      }
  
      response.status(200).json({ message: 'Donor details deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ message: 'Error deleting donor details' });
    }
})


app.get('/get-donor', async (request, response) => {
    try {
        const { _id } = request.query;
        // const donorId = request.params._id;
        const donor = await Donor.findOne({_id});

        if (!donor) {
            return response.status(404).json({ error: 'Donor not found' });
        }

        // Return the donor details
        response.status(200).json(donor);
    } catch (error) {
        console.error('Error fetching donor details:', error);
        response.status(500).json({ error: 'Failed to fetch donor details' });
    }
});
app.put('/edit-donor', async function (request, response) {
    try {
        const { _id } = request.query;
        // const donorId = request.params._id;
        const updatedDonor = await Donor.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    donorname: request.body.donorname,
                    age: request.body.age,
                    email: request.body.email,
                    bloodgroup: request.body.bloodgroup,
                    gender: request.body.gender,
                    address: request.body.address,
                    phoneno: request.body.phoneno
                }
            },
            { new: true } // To return the updated donor
        );

        if (!updatedDonor) {
            return response.status(404).json({
                status: 'failure',
                message: 'Donor not found'
            });
        }

        response.status(200).json({
            status: 'success',
            message: 'Donor updated successfully',
            donor: updatedDonor
        });
    } catch (error) {
        console.error('Error updating donor:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to update donor',
            error: error.message
        });
    }
});


app.get('/donor-details', async (request, response) => {
    try {
        const donatedDetails = await Donated.find();

        const donorDetailsList = [];

        for (const donatedDetail of donatedDetails) {
            const donorId = donatedDetail.id;

            const donor = await Donor.find({_id: donorId });
            if (!donor) {
                continue;
            }

            // await Donor.findByIdAndUpdate(donorId, { donated: true });
            await Donor.updateOne({ _id: donorId }, { donated: true });

            donorDetailsList.push({ donor, donatedDetail });
        }

        response.status(200).json(donorDetailsList);
    } catch (error) {
        console.error('Error fetching donor details:', error);
        response.status(500).json({ error: 'Failed to fetch donor details' });
    }
});

app.get('/profile', async (request, response) => {
    const { _id } = request.query;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return response.status(400).send('Invalid user ID format');
    }

    try {
        // Find all donors by the given ID (assuming 'id' is the field in Donor model)
        const donorDetails = await Donor.find({ id: _id });

        // Fetch donation details for each donor
        let donationDetails = [];
        if (donorDetails.length > 0) {
            donationDetails = await Promise.all(
                donorDetails.map(async (donor) => {
                    const donations = await Donated.find({ id: donor._id }).sort({ date: -1 });
                    return donations;
                })
            );
        }

        // Flatten the donation details array
        donationDetails = donationDetails.flat();

        // Fetch volunteer details for the user
        const volunteerDetails = await Volunteer.find({ id: _id }).populate('camp').sort({ date: -1 });

        const result = {
            donorDetails,
            donationDetails,
            volunteerDetails
        };

        response.json(result);
    } catch (err) {
        console.error('Error fetching profile data:', err);
        response.status(500).send('Server error');
    }
});


app.post('/add-camp', async (request, response) => {
    const { organisation, date, description, location, startTime, endTime } = request.body;

    try {
        const camp = new Camp({
            organisation,
            date: new Date(date),
            description,
            location,
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        });

        await camp.save();
        response.status(201).json({ message: 'Camp created successfully', camp });
    } catch (error) {
        response.status(500).json({ message: 'Error creating camp', error });
    }
});



app.get('/get-camp', async (req, res) => {
    try {
        const camps = await Camp.find({ upcoming: true });
        const now = new Date();
        const expiredCampIds = camps
            .filter(camp => new Date(camp.date) < now)
            .map(camp => camp._id);

        if (expiredCampIds.length > 0) {
            await Camp.updateMany(
                { _id: { $in: expiredCampIds } },
                { $set: { upcoming: false } }
            );
        }

        const updatedCamps = await Camp.find({ upcoming: true });
        res.status(200).json(updatedCamps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching camps', error });
    }
});

app.post('/add-volunteer', async (request, response) => {
    try {
        const { id,fullName, dob, phoneNumber, email, role, agreement,camp } = request.body;

        const newVolunteer = new Volunteer({
            id,
            fullName,
            dob,
            phoneNumber,
            email,
            role,
            agreement,
            camp
        });

        await newVolunteer.save();
        response.status(201).json({ message: 'Volunteer registered successfully' });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});


module.exports = app; 