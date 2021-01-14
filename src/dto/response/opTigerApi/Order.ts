import { IsNotEmpty } from 'class-validator'

export class Order {
  @IsNotEmpty()
  OrderId!: string
  Reason: any
  State: string
}
