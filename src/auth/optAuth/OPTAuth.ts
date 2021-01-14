import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class OPTAuth implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return OPTAuth.validateRequest(request)
  }

  private static validateRequest(request: any) {
    return request.headers['x-api-key'] === process.env.PARTNER_KEY_INBOUND
  }
}
