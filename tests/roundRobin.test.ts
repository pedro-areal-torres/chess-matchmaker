import { BYE_PLAYER } from '../src/constants/global';
import { roundRobin } from '../src/features/roundRobin';
import { Round } from '../src/types/tournament';

describe('Round Robin Tournament', () => {
  test('should generate the correct number of rounds for even players', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = roundRobin(players);

    expect(schedule.length).toBe(players.length - 1); // 3 rounds expected

    schedule.forEach((round: Round) => {
      expect(round).toHaveProperty('round');
      expect(round).toHaveProperty('matches');
      expect(round.matches.length).toBe(players.length / 2); // Each round should have half the players in matches
    });
  });

  test('should generate the correct number of rounds for odd players with a BYE', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    const schedule = roundRobin(players);

    expect(schedule.length).toBe(players.length - 1); // 4 rounds expected

    const hasBye = schedule.some((round: Round) => round.matches.some((match) => match.player2 === BYE_PLAYER));
    expect(hasBye).toBe(true);
  });

  test('should correctly assign unique game numbers', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = roundRobin(players);

    const gameNumbers = new Set();
    schedule.forEach((round: Round) => {
      round.matches.forEach((match) => {
        expect(gameNumbers.has(match.gameNumber)).toBe(false); // No duplicate game numbers
        gameNumbers.add(match.gameNumber);
      });
    });

    expect(gameNumbers.size).toBe((players.length * (players.length - 1)) / 2); // Number of unique games should be N choose 2
  });

  test('should ensure all players play against each other exactly once', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = roundRobin(players);
    const matchups = new Set();

    schedule.forEach((round: Round) => {
      round.matches.forEach(({ player1, player2 }) => {
        const matchKey = [player1, player2].sort().join('-');
        expect(matchups.has(matchKey)).toBe(false); // No duplicate matches
        matchups.add(matchKey);
      });
    });

    expect(matchups.size).toBe((players.length * (players.length - 1)) / 2); // Number of unique games should be N choose 2
  });

  test('should throw an error if fewer than two players are provided', () => {
    expect(() => roundRobin(['Alice'])).toThrow('At least two players are required.');
  });
});
