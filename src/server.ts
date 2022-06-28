import 'express-async-errors';

import baseRouter from '@routes/baseRouter';
import cookieParser from 'cookie-parser';
import express from 'express';

// Constants
const app = express();

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(baseRouter);
//Destructuring, sacar una propiedad desde el objeto

//metodo http , request y response.
// metodo para escuchar la ruta principal.
// query para consultar la manera en la que se muestra la informacion. 
// params, informacion que recibo, desde la url sin el query.
// headers, para autenticacion y autorizacion
app.post('/', (req, res) => {
    const { body, query, params, headers } = req;
    console.log(query);

    return res.status(200).json('Hello World');
});

// Export here and start in a diff file (for testing).
export default app;
