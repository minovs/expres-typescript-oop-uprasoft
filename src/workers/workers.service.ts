import WorkersModel from './workers.model'
import AppService from '../app.service'

export class WorkersService {
  async getAll(date: string) {
    const alias = 'upk'
    const userGroup: string = '0'
    const userSingl: string = '0'

    const dateSotr = new Intl.DateTimeFormat('ru-RU')
      .format(+date)
      .split('.')
      .reverse()
      .join('')

    let checResult = []
    try {
      checResult = await WorkersModel.checTree(alias)
    } catch (e) {
      console.log(e)
    }

    if (checResult.length > 0) {
      if (userGroup === '0') {
        try {
          const data = await WorkersModel.getWorkersForTree(alias, dateSotr)
          return await AppService.buildTree(data)
        } catch (e) {
          console.log(e)
        }
      } else if (userSingl === '0') {
        try {
          return await WorkersModel.getWorkers(alias, dateSotr, userGroup)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          return await WorkersModel.getWorker(alias, dateSotr, userSingl)
        } catch (e) {
          console.log(e)
        }
      }
    } else if (userSingl === '0') {
      try {
        return await WorkersModel.getWorkers(alias, dateSotr, '0')
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        return await WorkersModel.getWorker(alias, dateSotr, userSingl)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
