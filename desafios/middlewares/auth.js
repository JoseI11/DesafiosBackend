function roladm(req,res,next){
  if(req.session.user.role==="user"){
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  }else{
    next();
  }
}
function roluser(req,res,next){
  if(req.session.user.role==="admin"){
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  }else{
    next();
  }
}
function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/");
    next();
  }
  
  function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/products");
    next();
  }
  
  export { checkLogged, checkLogin,roladm,roluser };