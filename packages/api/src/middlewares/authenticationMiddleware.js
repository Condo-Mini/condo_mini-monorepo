import config from '../config';
import { verifyTokenAndExtractUser } from '../services/authService/commons';

export default async (req) => {
  const { authorization: jwtToken } = req.headers;
  const { jwtSecret } = config;

  req.loggedUser = await verifyTokenAndExtractUser({ jwtToken, jwtSecret });
};
