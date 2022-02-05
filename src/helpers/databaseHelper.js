export const getDBName = (dbPrefix, nodeEnv) => `${dbPrefix}_${nodeEnv}`;

export const ensureEnvironment = ({ allowedEnvs, env }) => {
  if (!allowedEnvs.includes(env)) {
    throw new Error(
      `This action cannot be executed on an environment other than ${envList}.`
    );
  }
};
