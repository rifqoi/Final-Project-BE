const ApplicationController = require("./ApplicationController");
const { ApiError, EmailNotRegisteredError, EmailAlreadyTakenError, InsufficientAccessError, NotFoundError, WrongPasswordError } = require("../errors");
const { JWT_SIGNATURE_KEY } = require("../../config/application");
const httpStatus = require('http-status');

class AuthenticationController extends ApplicationController {
  constructor({
    userModel,
    roleModel,
    bcrypt,
    jwt,
  }) {
    super();
    this.userModel = userModel;
    this.roleModel = roleModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  accessControl = {
    Public: "public",
    Admin: "Admin",
    Customer: "Customer",
  }

  authorize =(rolename) => {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        const payload = this.decodeToken(token)

        if (!!rolename && rolename != payload.role.name)
          throw new InsufficientAccessError(payload?.role?.name);
        req.user = payload;
        next();
      }

      catch(err) {
        res.status(401).json({
          error: {
            name: err.name,
            message: err.message,
            details: err.details || null,
          }
        })
      }
    }
  }

  handleLogin = async (req, res, next) => {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;
      const user = await this.userModel.findOne({
        where: { email, },
        include: [{ model: this.roleModel, attributes: [ 
          "id",
          "name"
        ], }]
      });

      if (!user) {
        const err = new EmailNotRegisteredError(email);
        res.status(404).json(err);
        return;
      }

      const isPasswordCorrect = this.verifyPassword(password, user.encryptedPassword);

      if (!isPasswordCorrect) {
        const err = new WrongPasswordError();
        res.status(401).json(err);
        return;
      }

      const accessToken = this.createTokenFromUser(user, user.Role);

      res.status(201).json({
        status: "OK",
        message: "Success Login",
        user: user.email,
        accessToken,
      })
    }

    catch(err) {
      res.status(err.statusCode || 400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  }

  handleRegister = async (req, res, next) => {
    const noKtp = req.body.noKtp;
    const username = req.body.username;
    const name = req.body.name;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const address = req.body.address;
    const photoProfile = req.body.photoProfile;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    let existingUser = await this.userModel.findOne({ 
      where: { email, },
      // include: [{ model: this.roleModel, attributes: [
      //   "noKtp",
      //   "username",
      //   "name",
      //   "gender",
      //   "dateOfBirth",
      //   "address",
      //   "email",
      //   "password"
      // ], }]
    });

    if (!!existingUser) {
      const err = new EmailAlreadyTakenError(email);
      res.status(422).json(err);
      return;
    }

    const role = await this.roleModel.findOne({
      where: { name: this.accessControl.Customer }
    });

    const user = await this.userModel.create({
      noKtp,
      username,
      name,
      gender,
      dateOfBirth,
      address,
      photoProfile,
      email,
      encryptedPassword: this.encryptPassword(password),
      roleId: role.id
    }) 

    const accessToken = this.createTokenFromUser(user, role);

    res.status(201).json({
      status: "OK",
      message: "Registering new user is successful",
      user: user.email,
      accessToken,
    })
  }

  handleGetUser = async (req, res) => {
    const user = await this.userModel.findByPk(req.user.id);

    if (!user) {
      const err = new NotFoundError(req.user.name);
      res.status(404).json(err)
      return;
    }

    const role = await this.roleModel.findByPk(user.roleId); 

    if (!role) {
      const err = new NotFoundError(user.user.name);
      res.status(404).json(err)
      return;
    }

    res.status(200).json(user);
  }

  createTokenFromUser = (user, role) => {
    return this.jwt.sign({
      id: user.id,
      noKtp: user.noKtp,
      username: user.username,
      name: user.name,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      photoProfile: user.photoProfile,
      email: user.email,
      role: {
        id: role.id,
        name: role.name,
      }
    }, JWT_SIGNATURE_KEY);
  }

  decodeToken(token) {
    return this.jwt.verify(token, JWT_SIGNATURE_KEY);
  }

  encryptPassword = (password) => {
    return this.bcrypt.hashSync(password, 10);
  }

  verifyPassword = (password, encryptedPassword) => {
    return this.bcrypt.compareSync(password, encryptedPassword)
  }
}

module.exports = AuthenticationController;
