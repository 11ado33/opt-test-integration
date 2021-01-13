import { Entity, ObjectID, ObjectIdColumn } from "typeorm"

@Entity()
export class OrderRecord {
	@ObjectIdColumn() id: ObjectID
}
