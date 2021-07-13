import { createExpressServer } from 'routing-controllers'
import dotenv from 'dotenv'
import { WorkersController } from './workers/workers.controller'
import { ReportsController } from './reports/reports.controller'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = createExpressServer({
  classTransformer: true,
  routePrefix: '/api',
  controllers: [WorkersController, ReportsController],
})
app.listen(PORT, () => console.log(`server started on port - ${PORT}`))
