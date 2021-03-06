// Archivo de entrada de la aplicacion 
import logger from 'jet-logger';
import server from './server';

// Constants, se inicia en el puerto 3000
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
