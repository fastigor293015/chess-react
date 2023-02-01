import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Queen } from "./Queen";

export class Pawn extends Figure {

  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target))
      return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    // Мы проверяем смещение по оси Y на 1 или на 2 (если первый шаг),
    // также проверяем, чтобы не было смещения относительно X,
    // и также убедимся, что ячейка, на которую мы хотим перейти, пустая
    if ((target.y === this.cell.y + direction || this.isFirstStep
      && (target.y === this.cell.y + firstStepDirection))
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty()) {
        return true;
    }

    // Условие атаки по диагонали
    // Проверяем, что мы двигаемся на одну ячейку либо вверх, либо вниз,
    // и также смещаемся по диагонали на одну ячейку
    // и проверяем, что на этой ячейке стоит враг
    if (target.y === this.cell.y + direction
      && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
      && this.cell.isEnemy(target)) {
        return true;
      }

    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.isFirstStep = false;
    // Когда пешка достигает края доски, она становится ферзём
    const edgeY = this.color === Colors.BLACK ? 7 : 0;
    if (target.y === edgeY) {
      this.cell.figure = new Queen(this.color, target);
    }
  }
}
