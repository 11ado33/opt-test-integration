import { NestFactory } from '@nestjs/core'
import { IntegrationModule } from './integration.module'
import { PollingService } from './polling.service'
import { ValidationPipe } from '@nestjs/common'

async function run() {
  const app = await NestFactory.create(IntegrationModule)
  app.useGlobalPipes(new ValidationPipe({}))
  await app.listen(process.env.PORT || 3333)

  const pollingService = app.get<PollingService>(PollingService)
  await pollingService.poll()
}

run()
