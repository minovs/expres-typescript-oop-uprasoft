import { JsonController, Get, Params, UseBefore, Req, Res } from 'routing-controllers'
import { ReportsService } from './reports.service'
import { AuthMiddleware } from '../middlewers/auth.middleware'
import { ParamsType } from '../types/types'
import 'reflect-metadata'

@JsonController('/reports')
@UseBefore(AuthMiddleware)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
    this.reportsService = new ReportsService()
  }

  @Get('/:date/:id')
  async getAll(@Req() req: any, @Res() res: any, @Params() { date, id }: ParamsType) {
    try {
      const { alfirm } = req.user
      const result = await this.reportsService.getReport(alfirm, date, id)
      return res.json(result)
    } catch (e) {
      throw e
    }
  }
}
