import { IsEmail, IsNotEmpty } from 'class-validator'
import { IsCountry } from '../../../utils/validators/CountryDecorator'

export class OrderDetails {
  @IsNotEmpty()
  productId!: number
  @IsNotEmpty()
  quantity!: number
  @IsNotEmpty()
  eanCode!: string
}

export default class PartnerOrder {
  @IsNotEmpty()
  id!: number

  @IsNotEmpty()
  fullName!: string
  @IsNotEmpty()
  @IsEmail()
  email!: string
  @IsNotEmpty()
  phone!: string
  @IsNotEmpty()
  addressLine1!: string
  addressLine2: string
  @IsNotEmpty()
  company!: string
  @IsNotEmpty()
  zipCode!: string
  @IsNotEmpty()
  city!: string
  @IsNotEmpty()
  @IsCountry()
  country!: string

  @IsNotEmpty()
  carrierKey!: string
  status: string

  @IsNotEmpty()
  details!: OrderDetails[]
}
