// /lib/mockData.ts

export const representatives = [
  { id: 1, name: 'Andrea', email: 'andrea@example.com', publicVotes: 10, publicPreferences: { 'GB Glace': 5, 'Sia Glass': 5 } },
  { id: 2, name: 'Beatrice', email: 'beatrice@example.com', publicVotes: 20, publicPreferences: { 'GB Glace': 15, 'Triumf Glass': 5 } },
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
    },
  ];
  