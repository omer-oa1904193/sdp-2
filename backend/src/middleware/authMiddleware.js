import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    const tokenArray = req.headers?.authorization?.split(" ");

    if (!tokenArray || tokenArray.length !== 2 || tokenArray[0] !== "Bearer" || !tokenArray[1]) {
        res.status(401).json({details: "Authentication token was not provided"});
        return;
    }
    const token = tokenArray[1];
    try {
        req.user = await jwt.verify(token, process.env.JWT_KEY);
        delete req.user.iat;
        next();
    } catch (e) {
        res.status(401).json({details: "Invalid credentials"});
    }
}

