/**
 * Represents an individual match between two players.
 */
export type Match = {
  gameNumber: number;
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
 * Represents a player in the Swiss System tournament.
 * Each player has a name and a score.
 */
export type Player = {
  name: string;
  rating: number;
};

/**
 * Represents a groups of rounds
 */
export type Tournament = Round[];

/**
 * Represents the grouped players and the rounds they play.
 */
export type GroupedTournament = {
  groups: Player[][];
  rounds: Tournament;
};
