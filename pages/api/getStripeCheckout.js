// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Directus } from '@directus/sdk';
const directus = new Directus(`https://${process.env.DIRECTUS_URL}`, {
	auth: {
		staticToken: process.env.DIRECTUS_WRITE_API_KEY, // If you want to use a static token, otherwise check below how you can use email and password.
	},
});

const stripe = require('stripe')(process.env.STRIPE_SECRET)


export default async function handler(req, res) {
  const { name, email, phone, huntId, partySize } = JSON.parse(req.body);
  const pendingHunts = await directus.items('pending_hunt_purchases')
  const availableHunts = await directus.items('hunts').readByQuery({
    filter: {
      starts: {
        _gte: '$NOW'
      },
      slots_remaining: {
        _gte: partySize
      },
      status: "published",
      id: huntId
    },
    limit: 1
  })

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${availableHunts.data[0].name} - Down Payment`,
          },
          unit_amount: 100*availableHunts.data[0].down_payment,
        },
        quantity: partySize,
      },
    ],
    mode: 'payment',
    success_url: `https://${process.env.ROOT_URL}/success`,
    cancel_url: `https://${process.env.ROOT_URL}/cancel`,
  });
  
  await pendingHunts.createOne({
    name: name,
    email: email,
    phone: phone,
    party_size: partySize,
    hunt: huntId,
    stripe_id: session.id
  });
  res.status(200).json({url: session.url})
}
