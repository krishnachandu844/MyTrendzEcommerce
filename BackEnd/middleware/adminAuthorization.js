import jwt from "jsonwebtoken";

const adminAuthenticateJwt = (req, res, next) => {
  // const startTime = Date.now();
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, user) => {
        if (err) {
          return res.json({ message: "Issue with token" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.json({ message: "token not found" });
    }
  }
};

export default adminAuthenticateJwt;
