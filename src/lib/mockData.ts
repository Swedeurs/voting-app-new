
export const representatives = [
  {
    id: 1,
    name: 'Andrea',
    email: 'andrea@example.com',
    publicVotes: 10,
    lastVote: null,
  },
  {
    id: 2,
    name: 'Beatrice',
    email: 'beatrice@example.com',
    publicVotes: 20,
    lastVote: null, 
  },
];


export const elections = [
  {
    id: 1,
    name: 'Best Swedish Ice Cream',
    choices: ['GB Glace', 'Sia Glass', 'Hemglass', 'Triumf Glass'],
    status: 'ongoing',
    votes: {
      'GB Glace': 0,
      'Sia Glass': 0,
      'Hemglass': 0,
      'Triumf Glass': 0,
    },
    publicPreferences: {
      'GB Glace': 0,
      'Sia Glass': 0,
      'Hemglass': 0,
      'Triumf Glass': 0,
    },
    representativeVotes: {}, // To store which representative voted for which choice
  },
];




