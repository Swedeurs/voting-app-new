import { representatives } from '@/src/lib/mockData';
import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    // Find the index of the representative
    const representativeIndex = representatives.findIndex((rep) => rep.id === parseInt(id as string, 10));

    if (representativeIndex === -1) {
      return res.status(404).json({ message: 'Representative not found' });
    }

    // Remove the representative from the list
    representatives.splice(representativeIndex, 1);

    res.status(200).json({ message: 'Representative removed successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
