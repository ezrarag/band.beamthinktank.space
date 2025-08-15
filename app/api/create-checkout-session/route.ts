import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { amount, cityId, cityName, donorName, message, isAnonymous } = await request.json()

    if (!amount || !cityId || !cityName || !donorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      lineItems: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Donation to ${cityName}`,
            description: message || `Supporting ${cityName} community initiatives`,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      }],
      success_url: `${request.headers.get('origin')}/city/${cityId}?success=true&amount=${amount}`,
      cancel_url: `${request.headers.get('origin')}/city/${cityId}`,
      client_reference_id: cityId,
      metadata: {
        city_id: cityId,
        donor_name: donorName,
        message: message || '',
        anonymous: isAnonymous.toString(),
      },
    })

    return NextResponse.json({
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
