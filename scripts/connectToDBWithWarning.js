import readline from 'readline-sync';
import loaders from '../src/loaders';
import express from 'express';
import config from '../src/config';
import startServer from '../src/api/server';

const run = () => {
  if (!config.dbName) {
    return console.log('Some environment variables was not found.');
  }

  const confirmationMessage = `Connect to ${config.dbName}`;

  const answer = readline.question(
    `WARNER!
Are you sure you want to connect to => ${config.dbName} <= database?
This could cause catastrophic events!
Type "${confirmationMessage}" to confirm.\n`
  );

  if (answer === confirmationMessage) {
    const app = express();
    const port = config.apiPort;

    loaders.express.init(app);

    startServer(app, port)
      .then(() => console.log(`HTTP Server listening on port: ${port}`))
      .then(() => console.log('Watch yourself!'))
      .catch((error) =>
        console.error(`Fail to connect with Express!
${error.message}`)
      );
  } else {
    console.log('Wrong answer. Later!');
  }
};

run();
