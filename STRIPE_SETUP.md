# Stripe Integration Setup for Lo and Lady Labs

This document explains how to set up Stripe payments for Lo and Lady Labs donations.

## Prerequisites

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Complete your account setup and business verification
3. Enable your account for live payments (for production use)

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Log in to your Stripe Dashboard
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`) - keep this secure!

### 2. Update the Frontend Code

In `src/components/common/StripeForm/StripeForm.jsx`, replace the placeholder with your actual publishable key:

```javascript
// Replace this line:
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE')

// With your actual publishable key:
const stripePromise = loadStripe('pk_test_your_actual_key_here')
// or for production:
const stripePromise = loadStripe('pk_live_your_actual_key_here')
```

### 3. Backend Integration (Required for Production)

**Important**: The current implementation is frontend-only and for demonstration purposes. For production, you need a backend server to:

1. Create payment intents securely
2. Handle webhook events
3. Store donation records
4. Send confirmation emails

#### Example Backend Setup (Node.js/Express)

```javascript
const express = require('express')
const stripe = require('stripe')('sk_test_your_secret_key_here')

app.post('/create-payment-intent', async (req, res) => {
  const { amount, donorInfo } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        message: donorInfo.message
      }
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }
})
```

### 4. Environment Variables

For security, use environment variables for your keys:

Create a `.env` file:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

Update the code to use the environment variable:
```javascript
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

### 5. Webhook Setup (Recommended)

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/stripe-webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Use the webhook to update your database and send confirmation emails

### 6. Testing

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiration date and any 3-digit CVC

### 7. Going Live

1. Complete your Stripe account activation
2. Switch to live API keys (starting with `pk_live_` and `sk_live_`)
3. Update your webhook endpoints
4. Test thoroughly in production environment

## Current Implementation Status

✅ Frontend donation form with Stripe Elements
✅ Amount selection and custom amounts
✅ Donor information collection
✅ Secure card input with Stripe Elements
✅ Success/error handling
⚠️ Backend integration needed for production
⚠️ Webhook handling for order fulfillment
⚠️ Email confirmations
⚠️ Donation tracking/receipts

## Security Notes

- Never expose your secret key in frontend code
- Always validate payments on your backend
- Use HTTPS in production
- Implement proper error handling
- Store minimal customer data and follow PCI compliance guidelines

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements React](https://stripe.com/docs/stripe-js/react)
- [Webhooks Guide](https://stripe.com/docs/webhooks)