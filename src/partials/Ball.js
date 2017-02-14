import {
  SVG_NS,
  SETTINGS
} from '../settings';

export default class Ball {

  constructor(radius, boardWidth, boardHeight) {
    this.radius = 8;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ballColor = SETTINGS.ballColor;

    this.ping = new Audio('public/sounds/pong-03.wav');

    this.reset();
  }

  // Resets path of ball and randomises path.
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  // Detects ball collision and reverses path of ball.
  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  // Checks for coordinates of players paddles, detects collision of ball and plays sound.
  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x - this.radius >= leftX &&
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  // Increments players' score and resets the ball. Once maximum score is met, ball is
  // placed in the middle of the board.
  goal(player) {
    player.score++;
    this.reset();
    if (player.score === 5) {
      this.vx = 0;
      this.vy = 0;
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x),
    ball.setAttributeNS(null, 'cy', this.y),
    ball.setAttributeNS(null, 'r', this.radius),
    ball.setAttributeNS(null, 'fill', this.ballColor);

    svg.appendChild(ball);

    // Detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }
}
