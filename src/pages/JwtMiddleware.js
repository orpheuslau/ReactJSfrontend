import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Set the decoded token as the request user
    req.user = decoded;

    // Call the next middleware
    next();
  });
}

export default jwtMiddleware;