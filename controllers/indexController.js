import expressAsyncHandler from "express-async-handler";

export const indexPageGet = (req,res,next)=>{
    res.render('index',{title:'Express'});
};

export const signUpGet = (req,res)=>{
    res.render('sign-up-form');
};

export const signUpPost = expressAsyncHandler(async (req,res)=>{
    // TODO: Implement
});




