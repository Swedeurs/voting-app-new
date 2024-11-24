import { NextApiRequest, NextApiResponse } from "next";
import { removeRepresentative } from "@/src/lib/api/representatives";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      removeRepresentative(parseInt(id as string, 10));
      return res
        .status(200)
        .json({ message: "Representative removed successfully" });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
