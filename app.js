const express = require('express');
const app = express();
var body = require('body-parser');
var encoder = body.urlencoded();
const mongoose = require('mongoose');
const { render } = require('ejs');

const User = require('./models/users' , {

    userNewUrlParser : true,
    useUnifiedTopology: true


});

mongoose.connect('<mongo_connection_link>');

app.set('view engine' , 'ejs');

app.get("" , function(req , res){

    res.render('home')

});

app.post("/create" , encoder , function(req , res){

    
    var p_id = Math.floor(Math.random()*100) + req.body.fname + Math.floor(Math.random()*100) + req.body.lname + Math.floor(Math.random()*100);
    var e_token =  req.body.fname + "." + Math.floor(Math.random()*1000) + "." + Math.floor(Math.random()*1000);
    const data = new User({

        _id:new mongoose.Types.ObjectId(),
        profile_id: p_id,
        edit_token: e_token,
        fname:req.body.fname,
        lname:req.body.lname,
        roll:req.body.roll,
        city:req.body.city,
        branch:req.body.branch,
        img_link:req.body.img_l,
        about:req.body.about,
        interests:req.body.tags
    });

    data.save().then((result)=>{

        res.render('profile_created' , {profile_id : p_id , edit_token : e_token});
        console.warn("Profile created");

    }).catch(err=>console.warn(err))


});

app.get("/create" , function(req , res){

    res.render('create')

});

app.get("/profile" , function(req , res){

    res.render('profile')

});

app.get("/profile/:p_id" , function(req , res){

    User.findOne({profile_id: req.params.p_id} , function(err , data){

        if(err){

        }else{
            res.render('profile' , {data:data})
        }

    })

});


app.get("/edit_token" , function(req , res){

    res.render('edit_token')

});

app.post("/edit" , encoder , function(req , res){

    User.findOne({edit_token: req.body.edit_t} , function(err , data){

        if(err){

        }else{
            res.render('edit' , {data:data})
        }

    })

});

app.get("/edit" , function(req , res){

    res.render('edit')

});

app.post("/edit_done" , encoder , function(req , res ){

    User.updateOne(
        {edit_token:req.body.edit_t} , 
        {$set:{ fname:req.body.fname , 
                lname:req.body.lname,
                roll:req.body.roll,
                branch:req.body.branch,
                img_link:req.body.img_l,
                about:req.body.about,
                interests:req.body.tags,
                city:req.body.city }}
                ).then((result)=>{
                    res.render('edit_done' , {result})
                }).catch((err)=>{  console.warn(err)})

})

app.get("/edit_done" , function(req , res){

    res.render('edit_done')

});

app.post("/search" ,encoder , function(req , res){

    var regex = new RegExp(req.body.search , 'i');
    User.find({interests:regex}).then((result)=>{
        console.log(result);
        res.render('search' , {result:result})
    })

});

app.listen(1000);
