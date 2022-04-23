// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Directus } from '@directus/sdk';
const directus = new Directus(`https://${process.env.DIRECTUS_URL}`);


export default async function handler(req, res) {
  const { partySize } = JSON.parse(req.body);
  const availableHunts = await directus.items('hunts').readByQuery({
    filter: {
      starts: {
        _gte: '$NOW'
      },
      slots_remaining: {
        _gte: partySize
      },
      status: "published"
    }
  })
  res.status(200).json(availableHunts)
}
