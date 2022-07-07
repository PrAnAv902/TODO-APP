//Initalising express module for use
const express = require ('express');
//Using path module to access different directories 
const path = require('path'); 

const port = 8000;
//configuring our database for all the operations in future
const db=require('./config/mongoose');
const Task=require('./models/task');
const app=express();

// setting up the viewengine folder/files 
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
//Using this to convert form data into key values pair
app.use(express.urlencoded());
//all the css,images,js files are stored and accessed using this folder assets
app.use(express.static('assets'));

//Displaying all the data entered by the user
app.get('/',function(req,res){
    Task.find({},function(err,tasks){
    //Handling error
        if(err){
        console.log('Error in fetching contacts from db');
        return;
    }
    //Rendering all tasks on website
    return res.render('home',
    {
        contact_list:tasks
    });
   });  
});
//Pushing data to database
app.post('/create-task',function(req,res){
    Task.create({
        description:req.body.activity,
        category:req.body.category_type,
        date:req.body.date
    },function(err){
        if(err){
            console.log("error in creating a contact!");
            return;
        }
        return res.redirect('back');
    });
});

//deleting multiple tasks from database
app.get('/delete-task',function(req,res){
    //This id variable contains all the unique ids that are to be deleted
     let id=req.query;
     var count = Object.keys(id).length;
     for (let i = 0; i < count; i++) {
        //Deleting the task from the database by using their individual ids
        Task.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log("Error in deleting the task from DB");
            }
        });
    }
    return res.redirect('back');
});
//Setting up our server on port 8000
app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('Yup! My Express Server is running on port:',port);
});