const express = require('express');
const ErrorHandler = require('./middleware/error');

const app = express();
const cookieParser = require('cookie-parser');
const bodayParser = require('body-parser');
const cors = require('cors');
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'chrome-extension://mcodhjbjmleoenimenidgjkgphlabebh',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  bodayParser.urlencoded({
    extended: true,
    limit: '50mb',
  })
);
//config
if (process.env.NODE_EN != 'PRODUCTION') {
  require('dotenv').config({
    path: 'config/.env',
  });
  const userRouter = require('./router/userRouter');
  const tokenRouter = require('./router/tokenRouter');
  const accountRouter = require('./router/accountRouter');

  app.use('/api/v2/user', userRouter);
  app.use('/api/v2/tokens', tokenRouter);
  app.use('/api/v2/account', accountRouter);

  // it is for ErrorHandler
  app.use(ErrorHandler);
}
module.exports = app;
