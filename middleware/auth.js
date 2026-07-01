const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ 
            SUCCESS: false, 
            MESSAGE: "Access Denied: No token provided" 
        });
    }

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = verified; 
        
        next(); 
    } catch (err) {
        return res.status(401).json({ 
            SUCCESS: false, 
            MESSAGE: "Invalid or expired token" 
        });
    }
};

const checkAdmin = (req, res, next) => {
  
    if (!req.user) {
        return res.status(401).json({
            SUCCESS: false,
            MESSAGE: "Unauthorized: Missing authentication data"
        });
    }

    if (req.user.role && req.user.role.toLowerCase() === 'admin') {
        next();
    } else {
        return res.status(403).json({
            SUCCESS: false,
            MESSAGE: "Forbidden: Access restricted to administrators only"
        });
    }
};

module.exports = { verifyToken, checkAdmin };

