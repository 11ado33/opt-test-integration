import { Body, Controller, HttpException, HttpService, Post } from '@nestjs/common'
import { IntegrationService } from './integration.service'
import Order from './request/opTigerApi/Order'
import PartnerOrder from './request/partner/PartnerOrder'
import { catchError, map } from 'rxjs/operators'

@Controller('api')
export class IntegrationController {
  constructor(private readonly appService: IntegrationService, private readonly httpService: HttpService) {
  }

  @Post('orders')
  async postOrders(@Body() body: PartnerOrder) {
    const token = Buffer.from(`${process.env.OPT_USERNAME}:${process.env.OPT_PASSWORD}`).toString('base64')
    return this.httpService.post(process.env.EP_OPT_ORDER + '/api/orders', (await Order.createOrder(body)), {
      headers: {
        Authorization: 'Basic '
          + token,
      },
    }).pipe(map(response => response.data)).pipe(catchError(e => {
        throw new HttpException(e.response.data, e.response.status)
      },
    ))
  }
}
