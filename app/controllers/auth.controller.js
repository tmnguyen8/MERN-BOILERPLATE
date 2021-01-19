const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Signup controller: create user in DB default role as "user" if not specified
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.passport, 10)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: {$in: req.body.roles}
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                user.roles = roles.map(role => role.id);

                user.save(err => {
                    if (err) {
                        res.status(500).send({message: error});
                        return;
                    }
                    res.send({message: "User was registered successfully!"});
                })
            }
            )
        } else {
            Role.findOne({name: "user"}, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                user.roles = [role.id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "User was registered successfully!"});
                })
            })
        }
    })
}

// signin controller: find by username in DB, compares the requested password with db password using bcrypt, 
// if passwords match, generate a token using jsonwebtoken, return user info and access token
// token are valid for 24 hours
exports.signin = (req, res) => {
    User.findOne({username: req.body.username})
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not Found."});
            }

            var passwordIdValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400 }) //expires in 24 hours

            for (let i=0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
}