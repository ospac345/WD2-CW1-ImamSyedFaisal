const Datastore = require('nedb');
const path = require('path');

class FitnessApp {
constructor(dbFilePath) {
    if(dbFilePath) {
        this.db = new Datastore({filename:path.join(__dirname, dbFilePath), autoload:true});
        console.log('DB connected to ', dbFilePath);
    } else {
        this.db = new Datastore();
        console.log('Db running in memory');
    } 
}

addUser(rLName, rFName, rEmail, rPassword) {
    var entry = {
        rLName : rLName,
        rFName : rFName,
        rEmail : rEmail,
        rPassword : rPassword,
        regDate : new Date().toISOString().split('T')[0]
    }
    console.log('User Added', entry);

    this.db.insert(entry, function(err, doc){
        if(err){
            console.log('Error adding user', lName,fName);
        } else {
            console.log('user added successfully to the db', doc);
        }
    })
}

verifyLogin(inputEmail, inputPassword) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'rEmail': inputEmail, 'rPassword': inputPassword}, function(err, user) {
            if(err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })

}





};

module.exports = FitnessApp;