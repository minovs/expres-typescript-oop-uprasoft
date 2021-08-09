import { createExpressServer } from 'routing-controllers'
import dotenv from 'dotenv'
import { WorkersController } from './workers/workers.controller'
import { ReportsController } from './reports/reports.controller'
import { UsersController } from './users/users.controller'
import { GlobalErrorHandler } from './middlewers/errors.middlewer'
import { AuthMiddleware } from './middlewers/auth.middleware'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = createExpressServer({
  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL,
  },
  classTransformer: true,
  routePrefix: '/api',
  controllers: [WorkersController, ReportsController, UsersController],
  middlewares: [GlobalErrorHandler, AuthMiddleware],
  defaultErrorHandler: false,
})
app.listen(PORT, () => console.log(`server started on port - ${PORT}`))
