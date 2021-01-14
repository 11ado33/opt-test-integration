import { Injectable } from '@nestjs/common'
import { getManager } from 'typeorm'
import { OrderRecord, OrderState } from './entities/orderRecord.entity'
import axios, { AxiosResponse } from 'axios'
import { Order } from './dto/response/opTigerApi/Order'

@Injectable()
export class PollingService {

  public async poll() {
    console.info('Polling began')
    const token = Buffer.from(`${process.env.OPT_USERNAME}:${process.env.OPT_PASSWORD}`).toString('base64')
    const openOrders = await getManager().getRepository(OrderRecord).find({ where: { State: OrderState.NEW } })

    openOrders.map(async (o) => {
      console.log(o)
      const res = await axios(process.env.EP_OPT_ORDER + `/api/orders/${o.OrderID}/state`, {
        method: 'GET',
        headers: {
          Authorization: 'Basic '
            + token,
        },
      }).catch(console.error) as AxiosResponse

      if (res && res.data) {
        console.log(res.data)
        const orderUpdate = res.data as Order
        if (orderUpdate.State.toLowerCase() == OrderState.FINISHED) {
          console.info('Notify partner')
          const partner_res = await axios(process.env.EP_PARTNER_ORDER_UPDATE + `/api/orders/${orderUpdate.OrderId}`, {
            method: 'PATCH',
            headers: {
              'X-API-KEY': process.env.PARTNER_KEY_OUTBOUND,
            },
            data: {
              state: orderUpdate.State,
            },
          }).catch(console.error)
          if (partner_res) {
            console.info('Save to DB')
            const orderToSave = { ...o, ...orderUpdate }
            await getManager().getRepository(OrderRecord).update(o._id, orderToSave)
          }
        }
      }
    })

    setTimeout(() => this.poll(), Number(process.env.POLLING_SECONDS) * 10000)
  }
}
