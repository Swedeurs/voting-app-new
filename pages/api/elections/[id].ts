// Imports should be at the very top of the file
import { NextApiRequest, NextApiResponse } from 'next';
import { elections, representatives } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Find the election by ID
  const election = elections.find((e) => e.id === parseInt(id as string));

  // Handle case where election is not found
  if (!election) {
    return res.status(404).json({ message: 'Election not found' });
  }

  // Handle GET request to fetch election details
  if (req.method === 'GET') {
    return res.status(200).json(election);
  }

  // Handle POST request to register a vote
  if (req.method === 'POST') {
    const { representativeId, choice } = req.body;

    // Check if election is already concluded
    if (election.status === 'concluded') {
      return res.status(400).json({ message: 'Election has already concluded.' });
    }

    // Validate that the choice is part of the available choices
    if (!election.choices.includes(choice)) {
      return res.status(400).json({ message: 'Invalid choice' });
    }

    // Find the representative who is voting
    const representative = representatives.find((rep) => rep.id === representativeId);
    if (!representative) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Update the votes for the chosen option
    election.votes[choice] += representative.publicVotes;

    return res.status(200).json({ message: 'Vote registered successfully', election });
  }

  // Handle PATCH request to conclude the election
  if (req.method === 'PATCH') {
    // Conclude the election by updating its status
    election.status = 'concluded';
    return res.status(200).json({ message: 'Election concluded successfully', election });
  }

  // Handle other HTTP methods that are not allowed
  return res.status(405).json({ message: 'Method Not Allowed' });
}
