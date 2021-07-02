module.exports = (req,res,next)=>{
    if(req.method === 'POST' && req.path === '/login'){
        if(req.body.username === '15527065691' && req.body.password === '123456'){
            return res.status(200).json({
                user:{
                    token:'zxc544vc56z4v65x4cv54zxcv64xcv654xc6zv4'
                }
            }) 
        }else{
            return res.status(400).json({
                message:'用户名或 密码错误'
            })
        }
    }
    next()
}