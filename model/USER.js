'user strict'
const DB = require('../database/config')

let User = function(value){
    if(value.length>0){
            var datalist = []
            value.map((el,id)=>{
            let data = [el.name,el.email,el.phone,el.address]
            datalist.push(data)
            })
            return datalist
    }else{
        return [[value.name,value.email,value.phone,value.address]]
    }
}



User.getAll = (result)=>{
        const query = 'SELECT * FROM user'
        DB.query(query,(err,res)=>{
            if(err){
                console.log("error",err)
                result(null,err)
            }
            else{
                console.log("success",res)
                result(null,res)
            }
        })
}

User.create = (newUser, result)=>{
        const query = 'INSERT INTO `user` (name, email, Phone,address) VALUES ?'
        console.log(newUser)
        DB.query(query,[newUser],(err,res)=>{
            if(err){
                console.log("error",err)
                result(null,err)
            }
            else{
                console.log("success",res)
                result(null,res)
            }
            
        })
}

User.getByKey = (keySearch,result)=>{
    const query = 'Select * from user where Concat(name,email,Phone,address) like ?'
    DB.query(query,'%'+keySearch+'%',(err,res)=>{
        if(err){
            console.log("error",err)
            result(null,err)
        }
        else{
            console.log("success",res)
            result(null,res)
        }
    })
}


module.exports = User