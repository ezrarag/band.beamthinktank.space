import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const createPaymentIntent = async (amount: number, cityId: string, donorName: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        city_id: cityId,
        donor_name: donorName,
      },
    })
    
    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
