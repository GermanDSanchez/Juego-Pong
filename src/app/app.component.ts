import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public playerLeft = { move: 294, points: 0, height: 0 };

  public playerRight = { move: 294, points: 0, height: 0 };

  public ballState = 3;

  public ballDirection = 1;

  public point = true;

  public buttonPlay = true;

  public arrow = { left: false, right: false };

  public winner = { left: false, right: false };

  public ball = { top: 346, left: 705 };

  onMovePlayerLeft(player: Player) {
    this.playerLeft = player;
  }

  onMovePlayerRight(player: Player) {
    this.playerRight = player;
  }

  play() {
    this.buttonPlay = false;
    if (this.ballDirection === 1) {
      this.arrow.right = true;
    } else {
      this.arrow.left = true;
    }
    setTimeout(() => {
      this.arrow.right = false;
      this.arrow.left = false;
      setInterval(() => {
        if (this.point) {
          this.moveBall();
        }
      }, 10);
    }, 3000);
  }

  onPoints() {
    if (this.ball.left >= 1400) {
      this.arrow.right = true;
      this.playerLeft.points++;
      this.ballDirection = 1;
      this.ballState = 3;
      this.ball = { top: 346, left: 695 };
      this.point = false;
      if (this.playerLeft.points === 10) {
        this.winner.left = true;
      }
      else {
        setTimeout(() => {
          this.point = true;
          this.arrow.right = false;
        }, 3000);
      }
    } else if (this.ball.left <= 0) {
      this.arrow.left = true;
      this.playerRight.points++;
      this.ballDirection = 2;
      this.ballState = 6;
      this.ball = { top: 346, left: 715 };
      this.point = false;
      if (this.playerRight.points === 10) {
        this.winner.right = true;
      }
      setTimeout(() => {
        this.point = true;
        this.arrow.left = false;
      }, 3000);
    }
  }

  moveBall() {
    this.checkStateBall();

    this.onPoints();

    switch (this.ballState) {
      case 1: // derecha, abajo
        this.ball.left = this.ball.left += 10;
        this.ball.top = this.ball.top += 10;
        break;
      case 2: // derecha, arriba
        this.ball.left = this.ball.left += 10;
        this.ball.top = this.ball.top -= 10;
        break;
      case 3: // derecha, centro
        this.ball.left = this.ball.left += 10;
        break;
      case 4: // izquierda, arriba
        this.ball.left = this.ball.left -= 10;
        this.ball.top = this.ball.top -= 10;
        break;
      case 5: // izquierda, abajo
        this.ball.left = this.ball.left -= 10;
        this.ball.top = this.ball.top += 10;
        break;
      case 6: // izquierda, centro
        this.ball.left = this.ball.left -= 10;
        break;
      case 7: // derecha, medioarriba
        this.ball.left = this.ball.left += 10;
        this.ball.top = this.ball.top -= 5;
        break;
      case 8: // derecha, medioabajo
        this.ball.left = this.ball.left += 10;
        this.ball.top = this.ball.top += 5;
        break;
      case 9: // izquierda, medioabajo
        this.ball.left = this.ball.left -= 10;
        this.ball.top = this.ball.top += 5;
        break;
      case 10: // izquierda, medioarriba
        this.ball.left = this.ball.left -= 10;
        this.ball.top = this.ball.top -= 5;
        break;
    }
  }

  checkStateBall() {
    const {
      derArriba,
      derCentro,
      derAbajo,
      derMedioAbajo,
      derMedioArriba,
    } = this.touchPlayerLeft();

    const {
      izqArriba,
      izqCentro,
      izqAbajo,
      izqMedioAbajo,
      izqMedioArriba,
    } = this.touchPlayerRight();

    if (this.touchPlayerLeft()) {
      if (derArriba) {
        this.ballDirection = 1;
        this.ballState = 2;
      } else if (derCentro) {
        this.ballDirection = 1;
        this.ballState = 3;
      } else if (derAbajo) {
        this.ballDirection = 1;
        this.ballState = 1;
      } else if (derMedioAbajo) {
        this.ballDirection = 1;
        this.ballState = 8;
      } else if (derMedioArriba) {
        this.ballDirection = 1;
        this.ballState = 7;
      }
    }
    if (this.touchPlayerRight()) {
      if (izqArriba) {
        this.ballDirection = 2;
        this.ballState = 4;
      } else if (izqCentro) {
        this.ballDirection = 2;
        this.ballState = 6;
      } else if (izqAbajo) {
        this.ballDirection = 2;
        this.ballState = 5;
      } else if (izqMedioAbajo) {
        this.ballDirection = 2;
        this.ballState = 9;
      } else if (izqMedioArriba) {
        this.ballDirection = 2;
        this.ballState = 10;
      }
    }

    if (this.ballDirection === 1) {
      if (this.ball.top >= 700) this.ballState = 2;
      else if (this.ball.top <= 0) this.ballState = 1;
    } else if (this.ballDirection === 2) {
      if (this.ball.top >= 700) this.ballState = 4;
      else if (this.ball.top <= 0) this.ballState = 5;
    } else if (
      (this.ballDirection === 1 && this.ballState === 7) ||
      this.ballState === 8
    ) {
      if (this.ball.top >= 700) this.ballState = 7;
      else if (this.ball.top <= 0) this.ballState = 8;
    } else {
      if (this.ball.top >= 700) this.ballState = 9;
      else if (this.ball.top <= 0) this.ballState = 10;
    }
  }

  touchPlayerLeft() {
    let derArriba = false;
    let derCentro = false;
    let derAbajo = false;
    let derMedioAbajo = false;
    let derMedioArriba = false;

    if (
      this.ball.left <= 38 &&
      this.ball.top >= this.playerLeft.move - 24 &&
      this.ball.top <= this.playerLeft.move - 14
    ) {
      derArriba = true;
    } else if (
      this.ball.left <= 38 &&
      this.ball.top >= this.playerLeft.move - 14.01 &&
      this.ball.top <= this.playerLeft.move + 23.33
    ) {
      derMedioArriba = true;
    } else if (
      this.ball.left <= 38 &&
      this.ball.top >= this.playerLeft.move + 23.34 &&
      this.ball.top <= this.playerLeft.move + 60.66
    ) {
      derCentro = true;
    } else if (
      this.ball.left <= 38 &&
      this.ball.top >= this.playerLeft.move + 60.67 &&
      this.ball.top <= this.playerLeft.move + 98
    ) {
      derMedioAbajo = true;
    } else if (
      this.ball.left <= 38 &&
      this.ball.top >= this.playerLeft.move + 98.01 &&
      this.ball.top <= this.playerLeft.move + 112
    ) {
      derAbajo = true;
    }

    return {
      derArriba,
      derCentro,
      derAbajo,
      derMedioAbajo,
      derMedioArriba
    };
  }

  touchPlayerRight() {
    let izqArriba = false;
    let izqCentro = false;
    let izqAbajo = false;
    let izqMedioAbajo = false;
    let izqMedioArriba = false;

    if (
      this.ball.left >= 1370 &&
      this.ball.top >= this.playerRight.move - 24 &&
      this.ball.top <= this.playerRight.move - 14
    ) {
      izqArriba = true;
    } else if (
      this.ball.left >= 1370 &&
      this.ball.top >= this.playerRight.move - 14.01 &&
      this.ball.top <= this.playerRight.move + 23.33
    ) {
      izqMedioArriba = true;
    } else if (
      this.ball.left >= 1370 &&
      this.ball.top >= this.playerRight.move + 23.34 &&
      this.ball.top <= this.playerRight.move + 60.66
    ) {
      izqCentro = true;
    } else if (
      this.ball.left >= 1370 &&
      this.ball.top >= this.playerRight.move + 60.67 &&
      this.ball.top <= this.playerRight.move + 98
    ) {
      izqMedioAbajo = true;
    } else if (
      this.ball.left >= 1370 &&
      this.ball.top >= this.playerRight.move + 98.01 &&
      this.ball.top <= this.playerRight.move + 112
    ) {
      izqAbajo = true;
    }

    return {
      izqArriba,
      izqCentro,
      izqAbajo,
      izqMedioAbajo,
      izqMedioArriba
    };
  }
}

export class Player {
  constructor(
    public move: number,
    public points: number,
    public height: number
  ) {}
}
