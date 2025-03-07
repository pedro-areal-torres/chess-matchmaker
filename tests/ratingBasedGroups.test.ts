import { ratingBasedGroups } from '../src/features/ratingBasedGroups';
import { Player, Round } from '../src/types/tournament';

/**
 * Generates a random rating between 500 and 1800, ensuring at least a 50-point difference from the previous player.
 */
const generateRandomRatings = (numPlayers: number): Player[] => {
  const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Isaac', 'Jack'];

  // Shuffle players to avoid always having Alice as the top-rated
  players.sort(() => Math.random() - 0.5);

  let rating = Math.floor(Math.random() * (1800 - 500 + 1)) + 500; // Start with a random rating
  const playerList: Player[] = [];

  for (let i = 0; i < numPlayers; i++) {
    playerList.push({ name: players[i % players.length], rating });
    rating -= Math.floor(Math.random() * 200) + 50; // Ensure at least 50-point difference, max 250
    if (rating < 500) rating = 500; // Prevent ratings below 500
  }

  return playerList;
};

describe('Rating-Based Groups Tournament', () => {
  test('should correctly group players and apply Round Robin with randomized ratings', () => {
    const players = generateRandomRatings(6);
    const maxPlayersPerGroup = 3;
    const schedule = ratingBasedGroups(players, maxPlayersPerGroup);

    expect(schedule.groups.length).toBe(2);

    const uniquePlayers = new Set();
    schedule.rounds.forEach((round: Round) => {
      round.matches.forEach(({ player1, player2 }) => {
        uniquePlayers.add(player1);
        uniquePlayers.add(player2);
      });
    });

    expect(uniquePlayers.size).toBe(players.length + 1); // It will be added the player 'BYE'
  });

  test('should balance groups and avoid duplicates', () => {
    const players = generateRandomRatings(8);
    const maxPlayersPerGroup = 4;
    const schedule = ratingBasedGroups(players, maxPlayersPerGroup);

    expect(schedule.groups.length).toBe(2);

    const groupedPlayers = new Set(schedule.groups.flat().map((player) => player.name));
    expect(groupedPlayers.size).toBe(players.length);
  });

  test('should throw an error if fewer than two players are provided', () => {
    expect(() => ratingBasedGroups(generateRandomRatings(1), 3)).toThrow('At least two players are required.');
  });
});
