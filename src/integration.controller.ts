import { Body, Controller, HttpException, HttpService, Post, UseGuards } from '@nestjs/common'
import { IntegrationService } from './integration.service'
import Order from './dto/request/opTigerApi/Order'
import PartnerOrder from './dto/request/partner/PartnerOrder'
import { catchError, map } from 'rxjs/operators'
import { OPTAuth } from './auth/optAuth/OPTAuth'

@Controller('api')
export class IntegrationController {
  constructor(private readonly appService: IntegrationService, private readonly httpService: HttpService) {
  }

  @Post('orders')
  @UseGuards(OPTAuth)
  async postOrders(@Body() body: PartnerOrder) {
    const order = (await Order.createOrder(body))
    const token = Buffer.from(`${process.env.OPT_USERNAME}:${process.env.OPT_PASSWORD}`).toString('base64')
    return this.httpService.post(process.env.EP_OPT_ORDER + '/api/orders', order, {
      headers: {
        Authorization: 'Basic '
          + token,
      },
    }).pipe(map(response => response.data)).pipe(catchError(e => {
        throw new HttpException(e.response.data, e.response.status)
      },
    )).pipe(map(async () => {
      await order.save()
      console.log("Order saved")
    }))
  }
}
