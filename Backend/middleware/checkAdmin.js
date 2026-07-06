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
