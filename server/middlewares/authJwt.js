const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

// verifying token from request header using jsonwebtoken
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "No token provided"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.userId = decoded.id;
        next()
    });
};

// Verify if the user if admin
isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find({
            _id: {$in: user.roles}
        }, (err, roles) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            for (i of roles) {
                if (i.name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({message: "Require Admin Role!"});
            return;
        }
        )
    })
}

// Verify if the user if moderator
isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find({
            _id: {$in: user.roles}
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                for (i of roles) {
                    if (i.name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "Require Admin Role!"});
                return;
        }
        )
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJwt;