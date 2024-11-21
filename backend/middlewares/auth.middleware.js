import jwt from 'jsonwebtoken';

export const authorizeMiddleware = (req, res, next) => {
  try {
    console.log('cookies', req.cookies);
    const token = req.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'no token found', error: 'unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: 'invalid token', error: 'unauthorized' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: 'unauthorized', error: error.message });
  }
};

export const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      error: 'invalid credentials',
    });
  }
  next();
};
