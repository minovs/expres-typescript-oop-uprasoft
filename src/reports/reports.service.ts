import ReportsModel from './reports.model'

export class ReportsService {
  getReport = async (date: string, id: string) => {
    const dateSotr = new Intl.DateTimeFormat('ru-RU')
      .format(+date)
      .split('.')
      .reverse()
      .join('')
    const alias = 'upk'

    try {
      return await ReportsModel.getReport(alias, dateSotr, id)
    } catch (e) {
      console.log(e)
    }
  }
}
