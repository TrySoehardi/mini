const USER = require('../model/USER')

exports.getAll = (req,res,next) =>{
    USER.getAll((err,result)=>{
       if(err){
            res.status(404)
            .json({
                message:err
            })
       }else{
            res.status(200)
            .json({
                message:result
            })
       }
    })
}

exports.create = (req,res,next)=>{
   let dataBody = new USER(req.body)
   USER.create(dataBody,function(err,result){
        if(err){
            res.status(404)
            .json({
                message:err
            })
        }else{
            res.status(200)
            .json({
                message:"User was created"
            })
        }
   })
}

exports.getUser = (req,res,next) =>{
    console.log(req.body.key)
    USER.getByKey(req.body.key,(err,result)=>{
       if(err){
            res.status(404)
            .json({
                message:err
            })
       }else{
            res.status(200)
            .json({
                message:result
            })
       }
    })
}