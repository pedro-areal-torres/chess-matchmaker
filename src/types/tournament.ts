/**
 * Represents an individual match between two players.
 * If there is a BYE, player2 is undefined.
 */
export type Match = {
  player1: string;
  player2: string;
};

/**
 * Represents a single round in the tournament.
 * Each round consists of multiple matches.
 */
export type Round = {
  round: number;
  matches: Match[];
};

/**
 * The function returns an array of rounds.
 */
export type RoundRobinSchedule = Round[];
