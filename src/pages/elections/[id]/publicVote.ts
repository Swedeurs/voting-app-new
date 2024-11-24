import { NextApiRequest, NextApiResponse } from "next";
import { elections } from "@/src/lib/mockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const election = elections.find((e) => e.id === parseInt(id as string));

  if (!election) {
    return res.status(404).json({ message: "Election not found" });
  }

  if (req.method === "POST") {
    const { choice } = req.body;

    if (!election.choices.includes(choice)) {
      return res.status(400).json({ message: "Invalid choice" });
    }

    election.publicPreferences[choice] += 1;

    return res
      .status(200)
      .json({ message: "Public preference recorded", election });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
