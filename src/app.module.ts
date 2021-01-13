import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { getTypeORMConfig } from "./config/typeOrmCOnfig"

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(getTypeORMConfig()),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}