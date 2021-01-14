import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm"

@Entity('carrier')
export class Carrier {
	@ObjectIdColumn() _id: ObjectID
	@Column() carrierId: number
	@Column() carrierName: string
}
