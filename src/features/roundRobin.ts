import { BYE_PLAYER } from '@src/constants/global';
import { Match, Tournament } from '@src/types/tournament';

/**
 * Generates a round-robin tournament schedule.
 * If the number of players is odd, a "BYE" is added so that one player sits out each round.
 *
 * @param players - An array of player names.
 * @returns A 2D array where each sub-array represents a round of matches.
 */
export function roundRobin(players: string[]): Tournament {
  if (players.length < 2) throw new Error('At least two players are required.');

  // Ensure an even number of players by adding a "BYE" if necessary
  if (players.length % 2 !== 0) {
    players.push(BYE_PLAYER);
  }

  const numRounds = players.length - 1;
  const numPlayers = players.length;

  let gameNumber = 1;
  const rounds: Tournament = [];

  for (let round = 1; round <= numRounds; round++) {
    const matches: Match[] = [];

    for (let i = 0; i < players.length / 2; i++) {
      matches.push({ gameNumber: gameNumber++, player1: players[i], player2: players[numPlayers - 1 - i] });
    }

    rounds.push({ round, matches });

    // Rotate players: Remove the last player and then insert it at position 1 (right after the first player)
    const lastPlayer = players.pop();
    players.splice(1, 0, lastPlayer as string);
  }

  return rounds;
}
