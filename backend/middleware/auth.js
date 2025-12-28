import jwt from "jsonwebtoken";

export const auth = (req, res) => {
    // token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({success: false, message: "no token, denied authorization"});
    }

    try {
        // verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'own-secret-key');
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "token not valid"});
    }
};

export const adminAuth = (req, res) =>{
    if(req.userRole != 'admin'){
        return res.status(403).json({success: false, message: "access denied, admin only"});
    }
    next();
};