import { NextApiRequest, NextApiResponse } from 'next';
import { elections } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const election = elections.find((e) => e.id === parseInt(id as string));

  if (!election) {
    return res.status(404).json({ message: 'Election not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(election);
  }

  if (req.method === 'POST') {
    const { representativeId, choice } = req.body;

    if (election.status === 'concluded') {
      return res.status(400).json({ message: 'Election has already concluded.' });
    }

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

  // Add PATCH endpoint to conclude the election
  if (req.method === 'PATCH') {
    if (election.status === 'concluded') {
      return res.status(400).json({ message: 'Election has already concluded.' });
    }

    election.status = 'concluded';
    return res.status(200).json({ message: 'Election concluded successfully', election });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
