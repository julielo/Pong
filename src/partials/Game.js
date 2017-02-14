import { SVG_NS, KEYS, SETTINGS } from '../settings';

import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Message from './Message';

export default class Game {

  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.boardGap = SETTINGS.boardGap;
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.pause = false;

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    );

    this.player2 = new Paddle(this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
    );

    this.ball = new Ball(this.radius, this.width, this.height);

    this.score1 = new Score(170, 30, 30);
    this.score2 = new Score(320, 30, 30);
    this.winner = new Message(80, 170, 40);

    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });
  }

  render() {
    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = '';

    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.ball.render(svg, this.player1, this.player2);

    /* Players (paddles) */
    this.player1.render(svg);
    this.player2.render(svg);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);

    // Declare Winner
    const player1Msg = 'Player 1 Wins!';
    const player2Msg = 'Player 2 Wins!';
    if (this.player1.score === 5) {
      this.winner.render(svg, player1Msg);
    } else if (this.player2.score === 5) {
      this.winner.render(svg, player2Msg);
    }
  }
}
