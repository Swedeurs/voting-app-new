import { NextApiRequest, NextApiResponse } from 'next';
import { representatives } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(representatives);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    const newRepresentative = {
      id: representatives.length + 1,
      name,
      email,
      publicVotes: 0,
    };
    representatives.push(newRepresentative);
    res.status(201).json(newRepresentative);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
