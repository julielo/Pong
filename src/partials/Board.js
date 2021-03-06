import { SVG_NS, SETTINGS } from '../settings';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardColor = SETTINGS.boardColor;
  }
  render(svg) {
    let board = document.createElementNS(SVG_NS, 'rect');
    board.setAttributeNS(null, 'width', this.width);
    board.setAttributeNS(null, 'height', this.height);
    board.setAttributeNS(null, 'fill', this.boardColor);

    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width / 2);
    line.setAttributeNS(null, 'y1', 0);
    line.setAttributeNS(null, 'x2', this.width / 2);
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', '#fff');
    line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
    line.setAttributeNS(null, 'stroke-width', '5');

    svg.appendChild(board);
    svg.appendChild(line);
  }
}
