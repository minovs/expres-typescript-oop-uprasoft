import Db from '../database'
import { RowDataPacket } from 'mysql2'

class ReportsModel {
  async getReport(alias: string, date: string, id: string): Promise<RowDataPacket[string]> {
    const tableObgekts = `${alias}obgekts`
    const tableAnalisis = `${alias}analisis`
    const msQuery = `SELECT o.inf, o.adr, o.lat, o.lng, o.marker, an.id_obg, an.t_in, an.t_out, an.t_dist, an.t_in_obg, an.s_dist 
      FROM ${tableObgekts} o, ${tableAnalisis} an WHERE an.date = ? 
      AND an.id_log = ? AND o.id_obg = an.id_obg ORDER BY t_out`
    try {
      const connection = await Db.connectDb()
      const [rows] = await connection.execute(msQuery, [date, id])
      return rows
    } catch (e) {
      console.log(e)
    }
  }
}
export default new ReportsModel()
