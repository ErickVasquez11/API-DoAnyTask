import logger from 'jet-logger';
import mongoose from 'mongoose';

const dbConnect = () => {
    // Se leera desde el .env
 mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
    logger.info('Connected to Db');
})
.catch((err) => {
    logger.err('Error connecting to db: ' + err);
})
}


export default dbConnect;