const adminMiddleware = async (req,res,next)=>{
    try {
        //console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403)
            .json({message:"Access denied. User is not an admin"});
        }
        
        // res.status(200).json({msg:req.user.isAdmin});
        // next();
    } catch (error) {
       next(error);
    //    console.log("error in admin-middleware")
    }
}

module.exports= adminMiddleware;