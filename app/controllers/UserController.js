const {User} = require('../models')
const imagekit = require('../lib/imageKitConfig')
const ApplicationController = require("./ApplicationController");

class UserController extends ApplicationController {
    constructor({ userModel }) {
        super();
        this.userModel = userModel;
    }
    handleUpdateUserImage = async (req, res) => {
     
        try {
            const imageName = req.file.originalname
            
            // upload file 
            const img = await imagekit.upload({
                file: req.file.buffer,
                fileName: imageName,
            })
            const {
                name,
                email,
                image,
            } = req.body;
    
            const id = req.params.id;
            await User.update({
                name,
                email,
                image : img.url,
    
            },{
                where:{id}
            });
    
            res.status(200).json({
                'status': 'success',
                'data': {
                    name,
                    email,
                    image:img.url
                }
            })
        }
    
        catch(err) {
          res.status(422).json({
            error: {
              name: err.name,
              message: err.message,
            }
          });
        }
      }
    
    }

  module.exports = UserController;
