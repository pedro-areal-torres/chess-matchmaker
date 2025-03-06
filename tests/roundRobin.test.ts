import { roundRobin } from '../src/roundRobin';

describe('Round Robin Tournament', () => {
  test('should generate correct number of rounds for even players', () => {
    const players = ['A', 'B', 'C', 'D'];
    const schedule = roundRobin(players);

    expect(schedule.length).toBe(players.length - 1);
    expect(schedule[0]).toHaveProperty('round');
    expect(schedule[0]).toHaveProperty('matches');
  });

  test('should generate correct number of rounds for odd players (BYE included)', () => {
    const players = ['A', 'B', 'C', 'D', 'E'];
    const schedule = roundRobin(players);

    expect(schedule.length).toBe(players.length - 1); // 5 rounds (BYE added)

    const hasBye = schedule.some((round) => round.matches.some((match) => match.player2 === 'BYE'));
    expect(hasBye).toBe(true);
  });

  test('should ensure all players play against each other exactly once', () => {
    const players = ['A', 'B', 'C', 'D'];
    const schedule = roundRobin(players);
    const matchups = new Set();

    schedule.forEach((round) => {
      round.matches.forEach(({ player1, player2 }) => {
        if (player2) {
          const matchKey = [player1, player2].sort().join('-');
          expect(matchups.has(matchKey)).toBe(false); // Ensure no duplicate matches
          matchups.add(matchKey);
        }
      });
    });

    expect(matchups.size).toBe((players.length * (players.length - 1)) / 2); // Combination of N choose 2
  });

  test('should throw an error if less than two players are provided', () => {
    expect(() => roundRobin(['A'])).toThrow('At least two players are required.');
  });
});
