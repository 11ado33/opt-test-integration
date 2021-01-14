import { registerDecorator } from 'class-validator'

export function IsCountry() {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCountry',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: propertyName + ' is not a country',
      },
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          const iso3311a2 = require('iso-3166-1-alpha-2')
          return iso3311a2.getCode(value as string)
        },
      },
    })
  }
}
