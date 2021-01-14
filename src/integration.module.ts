import { HttpModule, Module } from '@nestjs/common'
import { IntegrationController } from './integration.controller'
import { IntegrationService } from './integration.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeORMConfig } from './config/typeOrmCOnfig'
import { PollingService } from './polling.service'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(getTypeORMConfig()), HttpModule],
  controllers: [IntegrationController],
  providers: [IntegrationService, PollingService],
})
export class IntegrationModule {
}
