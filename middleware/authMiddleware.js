export const isAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};

export const isMember = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.status){
        next();
    }else{
        res.send(401).json({msg:'You are not authorised to view this'});
    }
}