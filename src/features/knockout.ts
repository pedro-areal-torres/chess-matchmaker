import { BYE_PLAYER } from '@src/constants/global';
import { Match, Tournament } from '@src/types/tournament';

/**
 * Generates a Knockout tournament schedule.
 * Players are paired in 1v1 matchups, with winners advancing to the next round.
 *
 * @param players - An array of player names.
 * @returns An array of rounds, each containing matches.
 */
export function knockout(players: string[]): Tournament {
  if (players.length < 2) {
    throw new Error('At least two players are required for a Knockout tournament.');
  }

  let currentRoundPlayers = [...players];
  let tournament: Tournament = [];
  let gameNumber = 1;

  while (currentRoundPlayers.length > 1) {
    let nextRoundPlayers: string[] = [];
    let matches: Match[] = [];
    let roundNumber = tournament.length + 1;

    for (let i = 0; i < currentRoundPlayers.length; i += 2) {
      let player1 = currentRoundPlayers[i];
      let player2 = i + 1 < currentRoundPlayers.length ? currentRoundPlayers[i + 1] : BYE_PLAYER;

      let match: Match = {
        gameNumber,
        player1,
        player2,
      };

      if (player2 === BYE_PLAYER) {
        nextRoundPlayers.push(player1);
      } else {
        nextRoundPlayers.push(`Winner Game ${gameNumber}`);
      }

      matches.push(match);
      gameNumber++;
    }

    tournament.push({ round: roundNumber, matches });
    currentRoundPlayers = nextRoundPlayers;
  }

  return tournament;
}
