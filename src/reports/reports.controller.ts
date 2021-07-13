import { JsonController, Get, HttpCode, Params } from 'routing-controllers'
import { ReportsService } from './reports.service'
import 'reflect-metadata'

type ReportParamsType = {
  date: string
  id: string
}
@JsonController('/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {
    this.reportsService = new ReportsService()
  }

  @Get('/:date/:id')
  @HttpCode(200)
  async getAll(@Params() { date, id }: ReportParamsType) {
    try {
      const result = await this.reportsService.getReport(date, id)
      return JSON.stringify(result)
    } catch (e) {
      console.log(e)
    }
  }
}
