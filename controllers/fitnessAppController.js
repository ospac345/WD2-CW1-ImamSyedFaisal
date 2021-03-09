const { response } = require('express');
const fitnessAppDAO = require('../models/fitnessAppModel');
const db = new fitnessAppDAO('../users.db');

exports.landing_page = function(req, res) {
   res.render('loginPage');
};

exports.homePage = function(req, res) {
    res.render('homePage');
 };
 
 exports.add_goal = function(req, res) {
    res.render('addActivity');
};

exports.about_page = function(req, res) {
    res.redirect('./about.html');
};

exports.addUserToDb = function(req, res){
    console.log('processing addUserToDb from controller');
    if(!req.body.rPassword || !req.body.rLName || !req.body.rFName || !req.body.rEmail) {
        response.status(400).send("entries must have password.");
        return;
    }
    db.addUser(req.body.rLName, req.body.rFName, req.body.rEmail, req.body.rPassword);
    res.redirect('/home');
};

//authorise login credentials
exports.authLogin = function(req, res) {
    console.log('finding login details in db for ', req.body.inputEmail);

    let email = req.body.inputEmail;
    let password = req.body.inputPassword;
    db.verifyLogin(email, password).then((entries) => {

        if((entries[0].rPassword==req.body.inputPassword) && (entries[0].rEmail == req.body.inputEmail)){
        res.redirect('/users/' + entries[0].rFName);
        } else{

        console.log('Noooooot found'); }
        
    }).catch((err) => {
        console.log('error handling authLogin in controller', err)
    });
}

// if credentials match redirect to user personalised home screen 
exports.show_user_entries = function(req, res) {
    console.log('filtering author name', req.params.rFName);


    let name = req.params.rFName;
    db.getEntriesByUser(name).then((entries) => {

        res.render('homePage', {
            'heading': entries
            
        });
        
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
        
}

exports.addActivity = function(req, res){
    console.log('sample data is');
    console.log('Processing Add Activity from controller');
    if(!req.body.activity || !req.body.date){
        response.status(400).send("entries must date or type.");
        return;
    }

    db.addSchedule(req.body.date,req.body.activity);
    //alert('activity added succefully');
    res.redirect('/users/' + req.params.rFName);
};