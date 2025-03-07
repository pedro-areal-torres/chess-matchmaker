import { BYE_PLAYER } from '../src/constants/global';
import { knockout } from '../src/features/knockout';

describe('Knockout Tournament', () => {
  test('should generate correct number of rounds for even number of players', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = knockout(players);

    schedule.map((r) => ({ round: r.round, matches: r.matches.map((m) => console.log(m)) }));

    expect(schedule.length).toBe(2); // 2 rounds for 4 players

    expect(schedule[0].matches.length).toBe(2); // 2 matches in round 1
    expect(schedule[1].matches.length).toBe(1); // 1 final match in round 2
  });

  test('should generate correct number of rounds for odd number of players', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    const schedule = knockout(players);

    expect(schedule.length).toBe(3); // 3 rounds for 5 players

    const hasBye = schedule[0].matches.some((match) => match.player2 === BYE_PLAYER);
    expect(hasBye).toBe(true);
  });

  test('should correctly assign unique game numbers', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = knockout(players);

    const gameNumbers = new Set();
    schedule.forEach((round) => {
      round.matches.forEach((match) => {
        expect(gameNumbers.has(match.gameNumber)).toBe(false); // No duplicate game numbers
        gameNumbers.add(match.gameNumber);
      });
    });

    expect(gameNumbers.size).toBe(players.length - 1); // Should have (N-1) total games
  });

  test('should generate proper winner placeholders for next rounds', () => {
    const players = ['Alice', 'Bob', 'Charlie', 'David'];
    const schedule = knockout(players);

    expect(schedule[1].matches[0].player1).toContain('Winner Game');
    expect(schedule[1].matches[0].player2).toContain('Winner Game');
  });

  test('should throw an error if fewer than two players are provided', () => {
    expect(() => knockout(['Alice'])).toThrow('At least two players are required for a Knockout tournament.');
  });
});
