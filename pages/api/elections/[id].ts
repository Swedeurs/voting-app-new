// /pages/api/elections/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { elections, representatives } from '@/lib/mockData'; // Correct import

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const election = elections.find((e) => e.id === parseInt(id as string));

  if (!election) {
    return res.status(404).json({ message: 'Election not found' });
  }

  if (req.method === 'POST') {
    const { representativeId, choice } = req.body;

    // Validate the choice
    if (!election.choices.includes(choice)) {
      return res.status(400).json({ message: 'Invalid choice' });
    }

    // Find the representative
    const representative = representatives.find((rep) => rep.id === representativeId);
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Update the votes for the chosen option
    election.votes[choice] += representative.publicVotes;

    return res.status(200).json({ message: 'Vote registered successfully', election });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
