import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if ((absX === 1 && absY === 0) || (absX === 0 && absY === 1) || (absX === 1 && absY === 1)) {
      if (!super.canMove(target))
        return false;
      if (this.cell.isEmptyVertical(target)) {
        return true;
      }
      if (this.cell.isEmptyHorizontal(target)) {
        return true;
      }
      if (this.cell.isEmptyDiagonal(target)) {
        return true;
      }
    }

    return false;
  }
}
