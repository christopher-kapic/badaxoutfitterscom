// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Directus } from '@directus/sdk';
const directus = new Directus(`https://${process.env.DIRECTUS_URL}`, {
	auth: {
		staticToken: process.env.DIRECTUS_WRITE_API_KEY, // If you want to use a static token, otherwise check below how you can use email and password.
	},
});


export default async function handler(req, res) {
  const { name, email, phone, huntId, partySize } = JSON.parse(req.body);
  const pendingHunts = await directus.items('pending_hunt_purchases')
  
  await pendingHunts.createOne({
    name: name,
    email: email,
    phone: phone,
    party_size: partySize,
    hunt: huntId
  });
  res.status(200).json({done: 'true'})
}
