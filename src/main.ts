import { NestFactory } from "@nestjs/core"
import { IntegrationModule } from "./integration.module"

async function bootstrap() {
	const app = await NestFactory.create(IntegrationModule)
	await app.listen(process.env.PORT || 3333)
}

bootstrap()
