const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/to_do_db');
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Sucessfully connected to the database');
});