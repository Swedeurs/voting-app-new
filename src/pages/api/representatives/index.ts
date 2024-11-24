
import { representatives } from '@/src/lib/mockData';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Handle GET request to return the list of representatives
  if (req.method === 'GET') {
    return res.status(200).json(representatives);
  } 

  // Handle POST request to add a new representative
  else if (req.method === 'POST') {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Normalize email to lowercase for case-insensitive uniqueness check
    const normalizedEmail = email.toLowerCase();

    // Ensure email is unique
    if (representatives.some((rep) => rep.email.toLowerCase() === normalizedEmail)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new representative with normalized email
    const newRepresentative = {
      id: representatives.length + 1,
      name,
      email: normalizedEmail,
      publicVotes: 0,
      lastVote: null,
    };

    // Add new representative to the list
    representatives.push(newRepresentative);

    return res.status(201).json({ message: 'Representative added successfully', representative: newRepresentative });
  }

  // Handle DELETE request to remove a representative by ID
  else if (req.method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ message: 'Representative ID is required for deletion' });
    }

    // Find the index of the representative
    const representativeIndex = representatives.findIndex((rep) => rep.id === parseInt(id as string, 10));

    // Handle case where representative was not found
    if (representativeIndex === -1) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Remove the representative from the list
    representatives.splice(representativeIndex, 1);

    return res.status(200).json({ message: 'Representative removed successfully' });
  }
  else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
