import mysql from 'mysql2/promise'
import { RowDataPacket } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

class Db {
  connectDb = async (): Promise<RowDataPacket[string]> => {
    return await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
  }
}
export default new Db()
