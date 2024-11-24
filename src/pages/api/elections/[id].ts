import { elections, representatives } from "@/src/lib/mockData";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
 if (!id) {
    return res.status(400).json({ message: "Election ID is required." });
  }

  const electionId = parseInt(id as string, 10);
  if (isNaN(electionId)) {
    return res.status(400).json({ message: "Invalid Election ID." });
  }

  const election = elections.find((e) => e.id === electionId);
  if (!election) {
    return res.status(404).json({ message: "Election not found." });
  }

  if (req.method === "GET") {
    return res.status(200).json(election);
  }

  if (req.method === "POST") {
    const { representativeId, choice } = req.body;

    if (!choice) {
      return res.status(400).json({ message: "Choice is required." });
    }

    if (election.status === "concluded") {
      return res
        .status(400)
        .json({ message: "Election has already concluded." });
    }

    if (!election.choices.includes(choice)) {
      return res.status(400).json({ message: "Invalid choice." });
    }

    if (representativeId) {

      const representative = representatives.find(
        (rep) => rep.id === representativeId,
      );
      if (!representative) {
        return res.status(404).json({ message: "Representative not found." });
      }


      election.votes[choice] += 1;


      election.representativeVotes[representativeId] = choice;

      return res
        .status(200)
        .json({ message: "Vote registered successfully.", election });
    } else {

      election.publicPreferences[choice] += 1;

      return res
        .status(200)
        .json({
          message: "Public preference recorded successfully.",
          election,
        });
    }
  }

  if (req.method === "PATCH") {
    if (election.status !== "ongoing") {
      return res.status(400).json({ message: "Election is not ongoing." });
    }
    election.status = "concluded";


    const agreementRates = representatives.map((rep) => {
      const repVote = election.representativeVotes[rep.id];
      if (!repVote) {
        return { representativeId: rep.id, name: rep.name, agreementRate: 0 };
      }

      const publicVotesForRepChoice = election.publicPreferences[repVote] || 0;
      const totalVotesRepresented = rep.publicVotes;

      const agreementRate =
        totalVotesRepresented === 0
          ? 0
          : (publicVotesForRepChoice / totalVotesRepresented) * 100;

      return {
        representativeId: rep.id,
        name: rep.name,
        agreementRate: agreementRate.toFixed(2),
      };
    });

    return res
      .status(200)
      .json({
        message: "Election concluded successfully.",
        election,
        agreementRates,
      });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
