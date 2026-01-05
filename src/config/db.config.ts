import mongoose from 'mongoose'
import { serverConfig } from './index';
import logger from './logger.config';

async function connectToDB(){
        try{
            await mongoose.connect(serverConfig.MONGO_URI);
            logger.info('Connected to DB');
        }
        catch(err){
           logger.error('Error While connecting to the Database',err);
        }
}

export default connectToDB;