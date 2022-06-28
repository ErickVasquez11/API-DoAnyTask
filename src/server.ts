import 'express-async-errors';

import cookieParser from 'cookie-parser';
import express from 'express';

// Constants
const app = express();

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Export here and start in a diff file (for testing).
export default app;
