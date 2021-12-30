# Snake game

This project is my implementation of the Snake game which was available on classic Nokia phones.

The game is available here: https://oliwerin.github.io/snake-game/

## Implementation

I used Vite with the `react-ts` template to bootstrap the project. As the game is fairly simple, I stuck with the basic setup and intentionally didn't set up more advanced CSS tooling or a state management library. I might do it later, if I keep adding new features to the game.

As to the game engine implemenation, the rendering algorithm is currently suboptimal, as it renders the board squares instead of the snake segments and doesn't join adjacent squares into one element. The reason for dynamically rendering the board instead of the snake is because I wanted to have the gradient on the snake and needed it to be transparent in order to achieve this effect.

## Backlog

- [ ] Optimise the board rendering algorithm (join adjacent squares)
- [ ] Allow using the SPACEBAR key for starting and pausing the game
- [ ] Improve the Game Over screen
- [ ] Add a difficulty level selection (refresh rate)
- [ ] Add a transparent walls mode
- [ ] Add ESLint and resolve potential issues
- [ ] Add :focus-visible polyfill for Safari
- [ ] Review the usage of `rem` and `px`
- [ ] Animate pause overlay blur
