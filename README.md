# ♟️ Chess Matchmaker - Tournament Scheduler

**Chess Matchmaker** generates **tournament schedules** using different formats:

- **Round Robin** (Everyone plays against everyone)
- **Rating-Based Groups** (Players are grouped based on their rating and play Round Robin)
- **Knockout** (Single-elimination matches until a winner is determined)

This package **automatically handles an odd number of players** by adding a **BYE** when necessary.

---

## 📥 Installation

To install the package via NPM, run:

```sh
npm install chess-matchmaker
```

Or with yarn:

```sh
yarn add chess-matchmaker
```

After installing, you can import the functions like this:

```ts
import { roundRobin, ratingBasedGroups, knockout } from 'chess-matchmaker';
```

---

## 🛠️ Functions

1️⃣ **Round Robin**

Every player plays against every other player exactly once.

Example Input:

```ts
const players = ['Alice', 'Bob', 'Charlie'];
const schedule = roundRobin(players);
```

Example Output:

```ts
[
  {
    round: 1,
    matches: [
      { gameNumber: 1, player1: 'Alice', player2: 'Bob' },
      { gameNumber: 2, player1: 'Charlie', player2: 'BYE' },
    ],
  },
  {
    round: 2,
    matches: [
      { gameNumber: 3, player1: 'Alice', player2: 'Charlie' },
      { gameNumber: 4, player1: 'Bob', player2: 'BYE' },
    ],
  },
  {
    round: 3,
    matches: [
      { gameNumber: 5, player1: 'Bob', player2: 'Charlie' },
      { gameNumber: 6, player1: 'Alice', player2: 'BYE' },
    ],
  },
];
```

---

2️⃣ **Rating-Based Groups**

Players are grouped by their rating and play Round Robin within their group.
Groups are balanced so that they have a similar number of players.

Example Input:

```ts
const players = [
  { name: 'Alice', rating: 1800 },
  { name: 'Bob', rating: 1700 },
  { name: 'Charlie', rating: 1600 },
  { name: 'David', rating: 1500 },
];
const schedule = ratingBasedGroups(players, 2);
```

Example Output:

```ts
{
  groups: [
    [ { name: "Alice", rating: 1800 }, { name: "Bob", rating: 1700 } ],
    [ { name: "Charlie", rating: 1600 }, { name: "David", rating: 1500 } ]
  ],
  rounds: [
    {
      round: 1,
      matches: [
        { gameNumber: 1, player1: "Alice", player2: "Bob" },
        { gameNumber: 2, player1: "Charlie", player2: "David" }
      ]
    },
    {
      round: 2,
      matches: [
        { gameNumber: 3, player1: "Alice", player2: "BYE" },
        { gameNumber: 4, player1: "Charlie", player2: "BYE" }
      ]
    }
  ]
}
```

---

3️⃣ **Knockout Tournament**
Players compete in 1v1 matches.
Winners advance to the next round.

Example Input:

```ts
const players = ['Alice', 'Bob', 'Charlie', 'David'];
const schedule = knockout(players);
```

Example Output:

```ts
[
  {
    round: 1,
    matches: [
      { gameNumber: 1, player1: 'Alice', player2: 'Bob' },
      { gameNumber: 2, player1: 'Charlie', player2: 'David' },
    ],
  },
  {
    round: 2,
    matches: [{ gameNumber: 3, player1: 'Winner Game 1', player2: 'Winner Game 2' }],
  },
];
```
