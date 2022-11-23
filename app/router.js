// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  AuthenticationController,
} = require("./controllers");

const {
  User,
  Role,
} = require("./models");

function apply(app) {
  const roleModel = Role;
  const userModel = User;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.post("/v1/auth/login", authenticationController.handleLogin);
  app.post("/v1/auth/register", authenticationController.handleRegister);
  app.get("/v1/auth/whoami", authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply, }
