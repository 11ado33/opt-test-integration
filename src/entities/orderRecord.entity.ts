import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export enum OrderState {
  NEW = 'new',
  FINISHED = 'finished'
}

@Entity('orders')
export class OrderRecord {
  @ObjectIdColumn() _id: ObjectID

  @PrimaryColumn() OrderID!: string


  @Column() State!: string

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date
}
