import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const getTypeORMConfig = (): TypeOrmModuleOptions => {
	return {
		type: "mongodb",
		url: process.env.MONGODB_CON_STR,
		database: process.env.MONGODB_DB,
		entities: [
			__dirname + "/**/*.entity{.ts,.js}",
		],
		ssl: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}
}
