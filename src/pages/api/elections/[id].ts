// src/pages/api/elections/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { registerVote, concludeElection } from '@/src/lib/api/elections';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const updatedElection = concludeElection(parseInt(id as string, 10));
      return res.status(200).json({ message: 'Election concluded successfully', election: updatedElection });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    const { representativeId, choice } = req.body;
    try {
      const updatedElection = registerVote(parseInt(id as string, 10), representativeId, choice);
      return res.status(200).json({ message: 'Vote registered successfully', election: updatedElection });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
