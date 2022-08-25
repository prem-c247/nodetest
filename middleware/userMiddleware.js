
const ageVerification = function(req, res, next){
    console.log(req.body.age);
    age = req.body.age;
    if(age>=18){
        return next();
        next();
    }else{
        return next('The provided age is not older than 18 year old');

    }
}
const qualification = function(req, res, next){
    var qualification = req.body.qualification;
    if(qualification>=12){
        return next();
    }else{
        throw new Error('A url must be provided');
    }
}

module.exports = {
    ageVerification,
    qualification
}