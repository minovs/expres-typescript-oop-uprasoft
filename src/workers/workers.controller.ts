import { JsonController, Get, Params, UseBefore, Req, Res } from 'routing-controllers'
import { WorkersService } from './workers.service'
import { AuthMiddleware } from '../middlewers/auth.middleware'
import { ParamsType } from '../types/types'
import 'reflect-metadata'

@JsonController('/workers')
@UseBefore(AuthMiddleware)
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {
    this.workersService = new WorkersService()
  }

  @Get('/:date')
  async getAll(@Req() req: any, @Res() res: any, @Params() { date }: ParamsType) {
    try {
      const { alfirm, parent_id, id_log } = req.user
      const result = await this.workersService.getAll(alfirm, parent_id, id_log, date)
      return res.json(result)
    } catch (e) {
      throw e
    }
  }
}
