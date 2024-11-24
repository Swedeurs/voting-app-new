import { NextApiRequest, NextApiResponse } from 'next';
import { elections } from '../../../lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(elections);
  } else if (req.method === 'POST') {
    const { name, choices } = req.body;
    const newElection = {
      id: elections.length + 1,
      name,
      choices,
      status: 'ongoing',
      votes: choices.reduce((acc: Record<string, number>, choice: string) => {
        acc[choice] = 0;
        return acc;
      }, {}),
    };
    elections.push(newElection);
    res.status(201).json(newElection);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
