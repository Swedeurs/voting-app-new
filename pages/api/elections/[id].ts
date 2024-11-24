import { NextApiRequest, NextApiResponse } from 'next';
import { elections } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const election = elections.find((e) => e.id === parseInt(id as string));
  
  if (!election) {
    return res.status(404).json({ message: 'Election not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(election);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
