Voting App

This is a simple Voting Application that allows representatives to vote and register their public preference on specific elections. The app was built using Next.js, React, and TypeScript, with state management using hooks and data stored in mock data files. This project also utilizes Tailwind CSS for styling and component-based architecture to keep the code modular and maintainable.

Table of Contents

Features

Getting Started

Project Structure

Components

API Endpoints

Usage

Future Improvements

Contributing

Features

Create elections with multiple choices.

Representatives can vote on behalf of public members.

Public preference can be registered separately.

Conclude an election and view results, including agreement rates of representatives.

Modularized components for easy maintainability.

Getting Started

Prerequisites

Node.js (>= 14.x.x)

npm or yarn

Installation

Clone the repository:

git clone https://github.com/your-username/voting-app.git
cd voting-app

Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 with your browser to see the app.

Project Structure

src/components/ - Reusable UI components.

src/pages/ - Next.js pages, including routes for elections and representatives.

src/pages/api/ - API routes for handling CRUD operations.

src/lib/ - Contains utility functions and mock data.

public/ - Static assets such as images.

Components

Navbar: A top navigation bar that provides links to different pages.

ElectionDetails: Displays the details of an election, including its status.

VotingSection: Allows users to select a choice and a representative to cast their vote.

ConcludeButton: Button to conclude an ongoing election.

ElectionResults: Displays the results of the election, including agreement rates and vote counts.

RepresentativeForm: A form to add new representatives.

RepresentativeList: A list displaying all representatives with the option to remove them.

API Endpoints

GET /api/elections - Get all elections.

POST /api/elections - Add a new election.

POST /api/elections/[id] - Register a vote for a representative in an election.

PATCH /api/elections/[id] - Conclude an election.

GET /api/representatives - Get all representatives.

POST /api/representatives - Add a new representative.

DELETE /api/representatives/[id] - Remove a representative.

Usage

Add Representatives: Go to the "Representatives" page, fill out the form, and add representatives. This is required before you can vote.

Create Elections: Go to the "Elections" page and create a new election by providing a name and choices.

Voting: Once an election is created, select it from the list. You can choose a representative and cast their vote for a particular choice.

Conclude the Election: After voting, click on the "Conclude Election" button to end the election and view the final results.

Future Improvements

Persistent Storage: Currently, the app uses mock data. Replace it with a real database for persistent data.

Authentication: Add authentication to secure the voting process.

Zod Validation: Add validation using Zod to ensure correct data is passed to the API.

More Granular Voting Metrics: Track the exact percentage of public agreement with representatives.

Testing: Add unit and integration tests to improve reliability.

Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

Fork the repository.

Create your feature branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature).

Open a Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

