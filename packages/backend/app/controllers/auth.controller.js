const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            const result = user.setRoles(roles);
            if (result) {
                res.send({
                    message: "User registered successfully!"
                })
            }else{
                const result = user.setRoles([1]);
                if(result) {
                    res.send({
                        message: "User registered successfully!"
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}
























