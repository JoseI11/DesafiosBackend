import { userService } from "../src/dao/services/user.service.js";
function roladm(req, res, next) {

  if (req.session.user.role === "user" && req.session.user.role !== undefined) {
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function createProductpremium(req,res,next){

  if(req.user.role==="premium" || req.user.role==="admin"){
    next();
  }else{

    return res.status(401).send({ status: 'Error', error: "You cannot create a product" });
  }
}
function roluser(req, res, next) {
  if (req.session.user.role === "admin") {
    return res.status(401).send({ status: 'Error', error: "You cannot access to this place" });
  } else {
    next();
  }
}
function checkLogin(req, res, next) {

  if (!req.session.user) {
    return res.redirect("/");

  }
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) return res.redirect("/products");
  next();
}

export { checkLogged, createProductpremium,checkLogin, roladm, roluser };