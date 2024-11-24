// src/lib/api/elections.ts
import { elections, representatives } from '@/src/lib/mockData';

export function getElections() {
  return elections;
}

export function addElection(name: string, choices: string[]) {
  const newElection = {
    id: elections.length + 1,
    name,
    choices,
    status: 'ongoing',
    votes: choices.reduce((acc, choice) => {
      acc[choice] = 0;
      return acc;
    }, {} as Record<string, number>),
    publicPreferences: choices.reduce((acc, choice) => {
      acc[choice] = 0;
      return acc;
    }, {} as Record<string, number>),
    representativeVotes: {},
  };

  elections.push(newElection);
  return newElection;
}

export function registerVote(electionId: number, representativeId: number, choice: string) {
  const election = elections.find((e) => e.id === electionId);
  if (!election) throw new Error('Election not found');
  if (election.status === 'concluded') throw new Error('Election has already concluded');
  if (!election.choices.includes(choice)) throw new Error('Invalid choice');

  const representative = representatives.find((rep) => rep.id === representativeId);
  if (!representative) throw new Error('Representative not found');

  election.votes[choice] += representative.publicVotes;
  election.representativeVotes[representativeId] = choice;

  return election;
}

export function concludeElection(electionId: number) {
  const election = elections.find((e) => e.id === electionId);
  if (!election) throw new Error('Election not found');

  election.status = 'concluded';
  return election;
}
