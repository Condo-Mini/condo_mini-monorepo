import readline from 'readline-sync';
import express from 'express';
import loaders from '../src/loaders';
import config from '../src/config';
import startServer from '../src/api/server';

if (!config.dbName) {
  console.log('Some environment variables were not found.');

  process.exit(1);
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

  try {
    loaders.express.init(app);
    startServer(app, port);

    console.log(`HTTP Server listening on port: ${port}`);
    console.log('Watch yourself!');
  } catch (error) {
    console.error(`Fail to connect with Express!
      ${error.message}`);

    process.exit(1);
  }
} else {
  console.log('Wrong answer. Later!');

  process.exit(1);
}
