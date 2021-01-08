const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    if (req.path.includes('login')) {
        next();
        return;
    }
    const authorization = req.headers.authorization;
    if (authorization) {
        const [scheme, token] = authorization.split(' ');
        if (token) {
            const secretKey = 'farhan123';
            jwt.verify(token, secretKey, (err, user) => {
                if (err) res.status(401).json()

            })
            next();
        }
    }
    res.status(401).json();
}

module.exports = auth;