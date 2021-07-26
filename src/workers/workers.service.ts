import WorkersModel from './workers.model'
import BuildTree from '../services/tree.service'

export class WorkersService {
  async getAll(alfirm: string, parent_id: number, id_log: number, date: string) {
    const dateSotr = new Intl.DateTimeFormat('ru-RU')
      .format(+date)
      .split('.')
      .reverse()
      .join('')

    try {
      let checResult = []
      checResult = await WorkersModel.checTree(alfirm)
      if (checResult.length > 0) {
        if (parent_id === 0) {
          const data = await WorkersModel.getWorkersForTree(alfirm, dateSotr)
          return await BuildTree.tree(data)
        } else if (id_log === 0) {
          return await WorkersModel.getWorkers(alfirm, dateSotr, parent_id)
        } else {
          return await WorkersModel.getWorker(alfirm, dateSotr, id_log)
        }
      } else if (id_log === 0) {
        return await WorkersModel.getWorkers(alfirm, dateSotr, 0)
      } else {
        return await WorkersModel.getWorker(alfirm, dateSotr, id_log)
      }
    } catch (e) {
      throw e
    }
  }
}
