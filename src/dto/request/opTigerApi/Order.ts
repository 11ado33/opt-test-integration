import PartnerOrder from '../partner/PartnerOrder'
import { getManager } from 'typeorm'
import { Carrier } from '../../../entities/carrier.entity'
import { OrderRecord, OrderState } from '../../../entities/orderRecord.entity'

const iso3311a2 = require('iso-3166-1-alpha-2')

class DeliveryAddress {
  AddressLine1!: string // required
  AddressLine2?: string // optional
  City!: string // required
  Company?: string // optional
  CountryCode!: string // required, ISO 3166-1 alpha-2,
  Email!: string // required
  PersonName!: string // required
  Phone!: string // required
  State!: string // required
  Zip!: string // required
}

class Shipping {
  CarrierID: number // required, mapped from carriers list
  DeliveryAddress!: DeliveryAddress
}

class Product {
  Barcode!: string // required, EAN code
  OPTProductID!: string // required, EAN code
  Qty!: number // required
}

export default class Order {
  OrderID!: string
  InvoiceSendLater: boolean = true // allways false
  Issued!: string // required, ISO 8601 date-time format
  OrderType: string = 'standard' // allways "standard",
  Shipping!: Shipping
  Products!: Product[]

  public static async createOrder(partnerOrder: PartnerOrder) {
    const order = new Order()
    order.OrderID = String(partnerOrder.id)
    order.Issued = (new Date()).toISOString()
    const carrier = await getManager().findOne(Carrier, { where: { carrierId: Number(partnerOrder.carrierKey) } })
    order.Shipping = {
      CarrierID: carrier.carrierId,
      DeliveryAddress: {
        AddressLine1: partnerOrder.addressLine1,
        AddressLine2: partnerOrder.addressLine2,
        City: partnerOrder.city,
        Company: partnerOrder.company,
        CountryCode: iso3311a2.getCode(partnerOrder.country),
        Email: partnerOrder.email,
        PersonName: partnerOrder.fullName,
        Phone: partnerOrder.phone,
        State: partnerOrder.country,
        Zip: partnerOrder.zipCode,
      },
    }
    order.Products = partnerOrder.details.map<Product>((d: any) => {
        return { Barcode: d.eanCode, OPTProductID: d.productId, Qty: d.quantity }
      },
    )
    return order
  }

  async save() {
    await getManager().getRepository(OrderRecord).save({ OrderID: this.OrderID, State: OrderState.NEW })
  }
}
