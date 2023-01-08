const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validators/auth");
const authenticateToken =require('../validators/token');

router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);



module.exports = router;
