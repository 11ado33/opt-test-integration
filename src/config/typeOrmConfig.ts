import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const getTypeORMConfig = (): TypeOrmModuleOptions => {
	return {
		type: "mongodb",
		port: 27017,
		url: process.env.MONGODB_CON_STR_FULL,
		entities: [
			__dirname + "/**/*.entity{.ts,.js}",
			"dist/**/entities/*{.ts,.js}",
		],
		ssl: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		synchronize: true,
	}
}
