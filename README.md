# Doge vs. Chuck 8bit Pong Game


## Overview

**Doge vs. Chuck 8bit Pong Game** is a retro-inspired Pong game featuring the legendary Chuck Norris and the internet sensation Doge. The game is designed to be both nostalgic and fun, offering a classic arcade-style experience with a modern twist.

## How It Works

### Game Mechanics

- **Single-Player Mode:** In this mode, you control Doge with the `W` and `S` keys. Chuck Norris is controlled by AI, and the goal is to outscore your opponent by making sure the ball passes through the opponent's side.
  
- **Multi-Player Mode:** In multiplayer mode, one player controls Doge using the `W` and `S` keys, while the other player controls Chuck Norris using the `Up` and `Down` arrow keys.

- **Scoring:** The first player to reach 6 points wins the game. Each time the ball passes through a player’s side, the opposing player scores a point.

### Animations

- **Doge Animation:** Doge transitions from `doge still.png` to `doge kick.png` when hitting the ball and then back to `doge still.png`.
  
- **Chuck Animation:** Chuck transitions from `chuck still.png` to `chuck kick.png` when hitting the ball and then back to `chuck still.png`.

### Controls

- **Single Player:**
  - `W` - Move Doge Up
  - `S` - Move Doge Down
  
- **Multiplayer:**
  - Player 1 (Doge): `W` - Move Up, `S` - Move Down
  - Player 2 (Chuck): `Up Arrow` - Move Up, `Down Arrow` - Move Down

### Technology Stack

- **HTML5** for the structure of the game.
- **JavaScript (Canvas API)** for game mechanics and animations.
- **CSS** for styling.
- **GitHub Pages** for deployment.

## Integration

You can easily integrate this game into your website or project by following these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/thegr8liberator/Doge-vs-Chuck-8bit-Pong-Game.git
   ```

2. **Host Locally**:
   - Open the `index.html` file in your browser to play the game locally.

3. **Embed the Game**:
   - If you want to embed this game into your own website, you can host the game files on your server and use an `<iframe>` to embed the game, or directly link to the hosted GitHub Pages site.

4. **Deploying Your Own Version**:
   - Follow the steps mentioned in the GitHub Pages section above to deploy your own version of the game on GitHub Pages.

## Contributions

Contributions are welcome! If you find any bugs or have feature requests, please open an issue or submit a pull request.
