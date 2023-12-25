const jwt = require("jsonwebtoken");
const seceretkey =
  "7f72acfed1f65f573b7891f6602e974f60f8030c30aa2b48818032687381d8a5";
  
  exports.tokenAuth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, seceretkey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      const expirationTimestamp = decoded.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
  
      if (currentTimestamp < expirationTimestamp) {
        const remainingSeconds = expirationTimestamp - currentTimestamp;
        console.log(
          "Token is still valid. Expires in",
          remainingSeconds,
          "seconds."
        );
        // console.log("shop ID:", decoded.id);
        req.id = decoded.id; 
        next();
      } else {
        return res.status(401).json({ error: "Token expired" });
      }
    });
  };
  