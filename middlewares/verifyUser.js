import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const { blogitAuthToken } = req.cookies;

  if (!blogitAuthToken) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(blogitAuthToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default verifyUser;
