import ReportsModel from './reports.model'

export class ReportsService {
  getReport = async (alias: string, date: string, id: string) => {
    const dateSotr = new Intl.DateTimeFormat('ru-RU')
      .format(+date)
      .split('.')
      .reverse()
      .join('')

    try {
      return await ReportsModel.getReport(alias, dateSotr, id)
    } catch (e) {
      throw e
    }
  }
}
