
module.exports = (req, res, next) => {
    try{
      next();
    }catch(err){
        res.status(401).json({
            status: 'error',
            message : 'Authenctication Failed. Not allowed to perform this operation',
        });
    };
}