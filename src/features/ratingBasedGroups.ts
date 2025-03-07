import { DEFAULT_MAX_PLAYERS_PER_GROUP } from '../constants';
import { GroupedTournament, Player, Round } from '../types';
import { roundRobin } from './roundRobin';

/**
 * Generates a Swiss System tournament schedule.
 * Players are grouped based on their scores, with a max limit per group.
 * Each group plays a Round Robin tournament.
 *
 * @param players - Array of SwissPlayer objects (name & score).
 * @param maxPlayersPerGroup - The max number of players per group (default: 5).
 * @returns An array of rounds where players compete within their groups.
 */

/**
 * Groups players based on their rating and generates matchups within each group.
 * Each group plays a Round Robin tournament.
 *
 * @param players - Array of Player objects (name & rating).
 * @param maxPlayersPerGroup - The max number of players per group (default: 5).
 * @returns The created groups and an array of rounds where players compete within their groups.
 */
export function ratingBasedGroups(
  players: Player[],
  maxPlayersPerGroup = DEFAULT_MAX_PLAYERS_PER_GROUP,
): GroupedTournament {
  if (players.length < 2) {
    throw new Error('At least two players are required.');
  }

  // Sort players by rating (descending)
  players.sort((a, b) => b.rating - a.rating);

  // Determine the number of groups and group sizes
  const numPlayers = players.length;
  const numGroups = Math.ceil(numPlayers / maxPlayersPerGroup);
  const minGroupSize = Math.floor(numPlayers / numGroups);
  const remainder = numPlayers % numGroups;

  const groups: Player[][] = [];
  let startIndex = 0;

  for (let i = 0; i < numGroups; i++) {
    const groupSize = minGroupSize + (i < remainder ? 1 : 0); // Distribute extra players evenly
    groups.push(players.slice(startIndex, startIndex + groupSize));
    startIndex += groupSize;
  }

  const tournamentRounds: Round[] = [];

  // Run Round Robin within each group
  groups.forEach((group) => {
    const groupNames = group.map((player) => player.name);
    const roundResults = roundRobin(groupNames);

    roundResults.forEach((round) => {
      tournamentRounds.push({
        round: round.round,
        matches: round.matches.map((match) => ({
          gameNumber: match.gameNumber,
          player1: match.player1,
          player2: match.player2,
        })),
      });
    });
  });

  return { groups, rounds: tournamentRounds };
}
