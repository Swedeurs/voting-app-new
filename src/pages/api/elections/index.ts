// src/pages/api/elections/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getElections, addElection } from '@/src/lib/api/elections';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(getElections());
  } else if (req.method === 'POST') {
    const { name, choices } = req.body;
    try {
      const newElection = addElection(name, choices);
      return res.status(201).json(newElection);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
