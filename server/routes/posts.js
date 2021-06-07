import { PostModel } from '../models/Post';
import { UserModel } from '../models/User';

export default (app) => {

    app.get('/v1/posts', async (req, res) => {
   
        const { categories } = req.query;

        const categoriesList = categories ? categories.split(',') : [];
        if(req.user){if(req.user.data.role=="admin"){
var posts = await PostModel.find(
            
            { userid: { $eq: req.user.data._id } } 
        ) || [];
}else{
    var posts = await PostModel.find(
            
           { isactive: { $eq: true },isapproved : { $eq: true }} 
          
        ) || [];
}}else{
     var posts = await PostModel.find(
            
           { isactive: { $eq: true } ,isapproved : { $eq: true }} 
          
        ) || [];
}

        

        res.send(posts);
    });
      app.get('/v1/adminposts', async (req, res) => {
     
        const { categories } = req.query;

        const categoriesList = categories ? categories.split(',') : [];

        const posts = await PostModel.find(
            
        { isactive: { $eq: true } }    
        ) || [];

        res.send(posts);
    });
    
    app.get('/v1/posts/:id', async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if(post) {
                res.send(post);
            } else {
                res.status(404).end();
            }
        } catch(e) {
            res.status(404).end();
        }
    });
    
    app.post('/v1/posts', async (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'admin') {
           
            var Postdetails ={
                title:req.body.title,
                author:req.body.author,
                createdAt:req.body.createdAt,
                body:req.body.body,
                images:req.body.images,
                userid:req.user.data._id,
                isactive:true,
                isapproved:false,
            }
            const post = await PostModel.create(Postdetails);
            if(post) {
                res.send(post);
            } else {
                res.status(500).end();
            }
        }
        res.status(401).end();
    });
    app.post('/v1/adduser', async (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'superadmin') {
           
            var Userdetails ={
                username:req.body.username,
                email:req.body.email,
                role:'admin',
               
            }
            const post = await UserModel.create(Userdetails);
           
            if(post) {
                res.send(post);
            } else {
                res.status(500).end();
            }
        }
        res.status(401).end();
    });
    
    app.put('/v1/posts/:id', (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'admin') {
            console.log('an admin wants to update post')
            PostModel.findByIdAndUpdate(req.params.id, 
                req.body, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        } else {
            res.status(401).end();
        }
        
    });
     app.put('/v1/approveposts', (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'superadmin') {
            console.log('an admin wants to update post')
            
            PostModel.updateOne({ "_id" : req.body.id },
      { $set: { "isapproved" : req.body.isapproved } }, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        } else {
            res.status(401).end();
        }
        
    });
    app.put('/v1/deleteposts', (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'superadmin') {
            console.log('an admin wants to update post')
            
            PostModel.updateOne({ "_id" : req.body.id },
      { $set: { "isactive" : req.body.isactive } }, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        } else {
            res.status(401).end();
        }
        
    });

    app.delete('/v1/posts/:id', (req, res) => {
        
        if(req.user && req.user.data && req.user.data.role === 'admin') {
            
            PostModel.findByIdAndDelete(req.params.id, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        }
        else {
            res.status(401).end();
        }
        
    });
}
