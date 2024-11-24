import { NextApiRequest, NextApiResponse } from "next";
import {
  getRepresentatives,
  addRepresentative,
} from "@/src/lib/api/representatives";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(getRepresentatives());
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    try {
      const newRepresentative = addRepresentative(name, email);
      return res
        .status(201)
        .json({
          message: "Representative added successfully",
          representative: newRepresentative,
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
