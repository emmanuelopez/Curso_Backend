import { MongoClient } from 'mongodb'
import config from '../../../config/config.js'
import logger from '../../../logger.js'


const client = new MongoClient(config.MONGODB_URL)
await client.connect()
const db = client.db(config.MONGO_DB)
logger.info(`Base de datos ${config.MONGO_DB} conectada`);

export { db }