// const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploader = require('./middleware/uploader')
const {
	UserController,
  ApplicationController,
  AuthenticationController,
  AirportController,
  AirplaneController
} = require("./controllers");
const uploader = require('./middleware/uploader')
const {
  User,
  Role,
  Airport,
  Airplane
} = require("./models");

function apply(app) {
  const roleModel = Role;
  const userModel = User;
  const airportModel = Airport;
  const airplaneModel = Airplane;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const airportController = new AirportController({ airportModel });
  const airplaneController = new AirplaneController({ airplaneModel });

	app.get("/", applicationController.handleGetRoot);

	app.post("/api/auth/login", authenticationController.handleLogin);
	app.post("/api/auth/register", authenticationController.handleRegister);
	app.get("/api/auth/user", authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);
	app.put("/api/auth/update_user/:id", uploader.single("photoProfile"), authenticationController.handleUpdateUser);
  app.get("/", applicationController.handleGetRoot);
  
  app.post("/api/v1/airports", airportController.handleCreateAirport);
  app.get("/api/v1/airports", airportController.handleListAirport);
  app.get("/api/v1/airports/:id", airportController.handleGetAirport);
  app.put("/api/v1/airports/:id", airportController.handleUpdateAirport);
  app.delete("/api/v1/airports/:id", airportController.handleDeleteAirport);

	app.use(applicationController.handleNotFound);
	app.use(applicationController.handleError);
  app.post("/api/v1/airplanes", airplaneController.handleCreateAirplane);
  app.get("/api/v1/airplanes/:id", airplaneController.handleGetAirplane);
  app.put("/api/v1/airplanes/:id", airplaneController.handleUpdateAirplane);
  app.delete("/api/v1/airplanes/:id", airplaneController.handleDeleteAirplane);
  app.get("/api/v1/airplanes", airplaneController.handleListAirplane);

	return app;
}

module.exports = { apply, }
