#!/usr/bin/env node

import Table from 'cli-table3';
import inquirer from 'inquirer';

import { knockout, ratingBasedGroups, roundRobin } from './features';
import { Match, Player, Round, Tournament } from './types/tournament';

// Display CLI options
async function runCLI() {
  const roundRobinOpt = 'Round Robin (Everyone plays against everyone)';
  const ratingBasedGroupsOpt = 'Rating-Based Groups (Players are grouped based on their rating and play Round Robin)';
  const knockoutOpt = 'Knockout (Single-elimination matches until a winner is determined)';

  console.log('\n♟️ Welcome to Chess Matchmaker\n');

  const { tournamentType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tournamentType',
      message: 'Select the tournament format:',
      choices: [roundRobinOpt, ratingBasedGroupsOpt, knockoutOpt],
    },
  ]);

  const { playersInput } = await inquirer.prompt([
    {
      type: 'input',
      name: 'playersInput',
      message: 'Enter player names separated by commas:',
      validate: (input) => input.split(',').length >= 2 || 'You must enter at least 2 players.',
    },
  ]);

  const players = playersInput.split(',').map((p: string) => p.trim());

  let schedule;

  if (tournamentType === roundRobinOpt) {
    schedule = roundRobin(players);
  } else if (tournamentType === ratingBasedGroupsOpt) {
    // Ask for ratings for each player
    const playerObjects = [];
    for (const name of players) {
      const { rating } = await inquirer.prompt([
        {
          type: 'number',
          name: 'rating',
          message: `Enter rating for ${name} (100-3500):`,
          validate: (value) => (value && value >= 100 && value <= 3500) || 'Rating must be between 100 and 3500.',
        },
      ]);
      playerObjects.push({ name, rating });
    }

    const groupedTournament = ratingBasedGroups(playerObjects, 4);

    const groups = groupedTournament.groups;
    schedule = groupedTournament.rounds;

    displayGroupsAsTable(groups);
  } else {
    schedule = knockout(players);
  }

  console.log('\n📅 Tournament Schedule:\n');
  displayScheduleAsTable(schedule);
}

// Helper function to display results as a table
function displayScheduleAsTable(schedule: Tournament) {
  schedule.forEach((round: Round) => {
    console.log(`🏁 Round ${round.round}`);

    const table = new Table({
      head: ['Game #', 'Player 1', 'Player 2'],
      colWidths: [10, 15, 15],
    });

    round.matches.forEach((match: Match) => {
      table.push([match.gameNumber, match.player1, match.player2]);
    });

    console.log(table.toString(), '\n');
  });
}

// Helper function to display groups as a table
function displayGroupsAsTable(groups: Player[][]) {
  console.log('\n🔹 Player Groups\n');

  groups.forEach((group, index) => {
    console.log(`🎲 Group ${index + 1}`);

    const table = new Table({
      head: ['Player Name', 'Rating'],
      colWidths: [20, 10],
    });

    group.forEach((player) => {
      table.push([player.name, player.rating]);
    });

    console.log(table.toString(), '\n');
  });
}

runCLI();
