import { UserModel } from '../models/User';
var settings = require("./settings").Settings;

exports.AuthenticateRequest = async function (req, res, next) {

   var basicAuth = new Buffer(
    settings.APP_KEY + ":" + settings.APP_SECRET
  ).toString("base64");
if(req.user){
    let email= req.user.data.email;
    let username=req.user.data.username;
    const user = await UserModel.findOne({ email,username });
    console.log(user,'ufjinjkm');
     next();
}

else if(req.auth != basicAuth){
   next();
}
 
  
}
 