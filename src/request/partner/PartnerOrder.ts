export default class PartnerOrder {
	id: number
	fullName: string
	email: string
	phone: string
	addressLine1: string
	addressLine2: string
	company: string
	zipCode: string
	city: string
	country: string
	carrierKey: string
	status: string
	details: [
		{
			productId: number,
			name: string,
			quantity: number,
			weight: number,
			eanCode: string
		}
	]
}
