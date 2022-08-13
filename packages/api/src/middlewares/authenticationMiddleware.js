import config from '../config/index.js';
import { verifyTokenAndExtractUser } from '../services/authService/commons.js';

export default async (req) => {
  const { authorization: jwtToken } = req.headers;
  const { jwtSecret } = config;

  req.loggedUser = await verifyTokenAndExtractUser({ jwtToken, jwtSecret });
};
