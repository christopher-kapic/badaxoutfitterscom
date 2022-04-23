import { Directus } from '@directus/sdk';
const directus = new Directus(`https://${process.env.DIRECTUS_URL}`, {
	auth: {
		staticToken: process.env.DIRECTUS_WRITE_API_KEY, // If you want to use a static token, otherwise check below how you can use email and password.
	},
});


export default async function handler(req, res) {
  if (req.body.type === "checkout.session.completed" && req.body.data.object.payment_status === 'paid') {
    const id = req.body.data.object.id
    const pending_hunt = await directus.items('pending_hunt_purchases').readByQuery({
      filter: {
        stripe_id: id
      },
      limit: 1
    })
    const hunt = await directus.items('hunts').readByQuery({
      filter: {
        id: pending_hunt.data[0].hunt
      },
      limit: 1
    })
    await directus.items('hunt_purchases').createOne({
      name: pending_hunt.data[0].name,
      email: pending_hunt.data[0].email,
      phone: pending_hunt.data[0].phone,
      hunt: pending_hunt.data[0].hunt,
      party_size: pending_hunt.data[0].party_size,
      amount_paid: req.body.data.object.amount_total/100
    })
    await directus.items('hunts').updateOne(pending_hunt.data[0].hunt, {
      slots_remaining: hunt.data[0].slots_remaining - pending_hunt.data[0].party_size
    })
    await directus.items('pending_hunt_purchases').deleteOne(pending_hunt.data[0].id)


  }

  res.status(200).json({complete: 'false'})
}

