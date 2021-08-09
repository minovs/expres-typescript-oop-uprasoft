import Db from '../database'
import { RowDataPacket } from 'mysql2'

class UsersModel {
  checkLogin = async (login: string): Promise<RowDataPacket[string]> => {
    const msQuery = 'SELECT id, login, password, alfirm, parent_id, id_log, roles FROM users WHERE login =? LIMIT 1'
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.query(msQuery, [login])
      return rows
    } catch (e) {
      throw e
    }
  }

  checkUserInTokenStore = async (user_id: string): Promise<RowDataPacket[string]> => {
    const msQuery = 'SELECT user_id FROM tokensstor WHERE user_id =? LIMIT 1'
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.query(msQuery, [user_id])
      return rows
    } catch (e) {
      throw e
    }
  }

  checkTokenInStore = async (refreshToken: string): Promise<RowDataPacket[string]> => {
    const msQuery = 'SELECT token FROM tokensstor WHERE token =? LIMIT 1'
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.query(msQuery, [refreshToken])
      return rows
    } catch (e) {
      throw e
    }
  }

  updateToken = async (user_id: string, refreshToken: string) => {
    const msQuery = 'UPDATE tokensstor SET token=? WHERE user_id=?'
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.execute(msQuery, [refreshToken, user_id])
      return rows
    } catch (e) {
      throw e
    }
  }

  saveToken = async (user_id: string, token: string) => {
    const msQuery = `INSERT INTO tokensstor SET user_id=?, token=?`
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.execute(msQuery, [user_id, token])
      return rows
    } catch (e) {
      throw e
    }
  }

  logout = async (refreshToken: string) => {
    const msQuery = `DELETE FROM tokensstor WHERE token=?`
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.execute(msQuery, [refreshToken])
      return rows
    } catch (e) {
      throw e
    }
  }
}
export default new UsersModel()
