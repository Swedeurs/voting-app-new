import { representatives } from "@/src/lib/mockData";

export function getRepresentatives() {
  return representatives;
}

export function addRepresentative(name: string, email: string) {

  const normalizedEmail = email.toLowerCase();


  if (
    representatives.some((rep) => rep.email.toLowerCase() === normalizedEmail)
  ) {
    throw new Error("Email already exists");
  }

  const newRepresentative = {
    id: representatives.length + 1,
    name,
    email: normalizedEmail,
    publicVotes: 0,
    lastVote: null,
  };

  representatives.push(newRepresentative);
  return newRepresentative;
}

export function removeRepresentative(id: number) {
  const representativeIndex = representatives.findIndex((rep) => rep.id === id);
  if (representativeIndex === -1) {
    throw new Error("Representative not found");
  }

  representatives.splice(representativeIndex, 1);
}
