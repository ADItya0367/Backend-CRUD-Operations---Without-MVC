const express = require('express')

const app = express()
app.use(express.json())
// process 2 to connect database and define schema 
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Aditya:abcde12345@nodejs.euh2mao.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs')
.then(() => {
    console.log('Connection successful')
}).catch(() => {
    console.log('Connection failed')
})
// definig schema   
let studentSchema = new mongoose.Schema({
  
    studentId:Number,
    studentName:String,
    studentEmail:String,
    studentPhone:Number,
    studentAddress:String

}, {
    timestamps: true
})
const students = mongoose.model('students',studentSchema)




//--------------------------------------------------------
// Process 01 
// creating some routes 
// we will generally use get method for route creation 

app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the home page'
    // open postman and check the running status of the server
    // we got our message in the postman
    // now go to ngrok website and download the ngrok 
    })
})
// creating creating student route
app.get('/api/students/create', (req, res) => {

    if (req.query.studentName !== ""){
        // creating student object to recieve the data from the client
// use postman here to send the data to the server through query string 
 let studentObject = new students({
    studentId:req.query.studentId,
    studentName:req.query.studentName,
    studentEmail:req.query.studentEmail,
    studentPhone:req.query.studentPhone,
    studentAddress:req.query.studentAddress

 })

    studentObject.save().then((d) => {
        console.log('Data saved successfully')
        res.status(200).json({
            message: 'Student created'
        })
    }).catch((err) => {
       
    res.status(404).json({
        message: 'Student not created'
  
    })
    })
    }
else{
    res.status(404).json({
        message: 'No data found'
    })
}

})


// 3rd step we are done with the creation of students now we will perform read operation 
// for this we will be using humoungous database where we can write our query and perform operations

app.get('/api/students/read', (req, res) => {
    students.find().then((d) => {
        res.status(200).json({
            message: 'Data fetched',
            data: d
        })
    }).catch((err) => {
        res.status(404).json({
            message: 'Data not fetched'
        })
    })
})
// 4th step we will perform delete operation
app.delete('/api/students/:studentId', (req, res) => {
    console.log(req.params.studentId)
    students.findByIdAndDelete({
        _id:req.params.studentId
    }).then((d) => {
        res.status(200).json({
            message: 'Data deleted'
        })
    }).catch((err) => {
        res.status(404).json({
            message: 'Data not deleted'
        })
    })
})

// lets update the data now !!

app.put('/api/students/update/', (req, res) => {
    
    students.findByIdAndUpdate(req.body._id,req.body,(err,data)=>{
        res.status(200).json({
            message: 'Data updated'
    })
})
    })


let port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

