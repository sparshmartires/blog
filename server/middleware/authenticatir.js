import { UserModel } from '../models/User';


exports.AuthenticateRequest = async function (req, res, next) {

  console.log(req.user,'uhj');
if(req.user){
    let email= req.user.data.email;
    let username=req.user.data.username;
    const user = await UserModel.findOne({ email,username });
    console.log(user,'ufjinjkm');
     next();
}
  next();
  
}
 