import { JsonController, Get, Params } from 'routing-controllers'
import { WorkersService } from './workers.service'
import 'reflect-metadata'

type WorkersParamsType = {
  date: string
}

@JsonController('/workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {
    this.workersService = new WorkersService()
  }

  @Get('/:date')
  async getAll(@Params() { date }: WorkersParamsType) {
    try {
      const result = await this.workersService.getAll(date)
      return JSON.stringify(result)
    } catch (e) {
      console.log(e)
    }
  }
}
