import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  public playerLeft:Player = {move: 294, points: 0, height: 0}

  public playerRight:Player = {move: 294, points: 0, height: 0}

  public ballState = 3;

  public ballDirection = 1;

  public point = true;

  public buttonPlay = true;

  public arrow = {left: false, right: false}

  public winner = {left: false, right: false};

  public ball = {top: 350, left: 708};

  onMovePlayerLeft(player: Player):void {
    this.playerLeft = player;
  }

  onMovePlayerRight(player: Player):void {
    this.playerRight = player;
  }

  play():void{
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
        if(this.point) {
          this.moveBall();
        }
      }, 10)
    }, 3000)
}

onPoints(){
  if(this.ball.left >= 1400)
  {
    this.arrow.right = true
    this.playerLeft.points ++;
    this.ballDirection = 1;
    this.ballState = 3;
    this.ball = {top: 350, left: 698}
    this.point = false;
    if(this.playerLeft.points === 10)
    {
      this.winner.left = true;
    }
    setTimeout(() => {
      this.point = true;
      this.arrow.right = false;
    },3000)
  }
  else if(this.ball.left <= 0)
  {
    this.arrow.left = true
    this.playerRight.points ++;
    this.ballDirection = 2;
    this.ballState = 6;
    this.ball = {top: 350, left: 718}
    this.point = false;
    if(this.playerRight.points === 10)
    {
      this.winner.right = true;
    }
    setTimeout(() => {
      this.point = true;
      this.arrow.left = false
    },3000)
  }
}

  moveBall() {

    this.checkStateBall();

    this.onPoints();

    switch(this.ballState) {
        case 1: // derecha, abajo
            this.ball.left = (this.ball.left += 10);
            this.ball.top = (this.ball.top += 10);
            break;
        case 2: // derecha, arriba
            this.ball.left = (this.ball.left += 10);
            this.ball.top = (this.ball.top -= 10);
            break;
        case 3: // derecha, centro
            this.ball.left = (this.ball.left += 10);
            break;
        case 4: // izquierda, arriba
            this.ball.left = (this.ball.left -= 10);
            this.ball.top = (this.ball.top -= 10);
            break;
        case 5: // izquierda, abajo
            this.ball.left = (this.ball.left -= 10);
            this.ball.top = (this.ball.top += 10);
            break;
        case 6: // izquierda, centro
            this.ball.left = (this.ball.left -= 10);
            break;
        case 7: // derecha, medioarriba
            this.ball.left = (this.ball.left += 10);
            this.ball.top = (this.ball.top -= 5);
            break;
        case 8: // derecha, medioabajo
            this.ball.left = (this.ball.left += 10);
            this.ball.top = (this.ball.top += 5);
            break;
        case 9: // izquierda, medioabajo
            this.ball.left = (this.ball.left -= 10);
            this.ball.top = (this.ball.top += 5);
            break;
        case 10: // izquierda, medioarriba
            this.ball.left = (this.ball.left -= 10);
            this.ball.top = (this.ball.top -= 5);
            break;
    }
}

    checkStateBall() {

      const player1Collision = this.collidePlayer1();
      const { derArriba, derCentro, derAbajo, derMedioAbajo, derMedioArriba } = player1Collision;

      const player2Collision = this.collidePlayer2();
      const { izqArriba, izqCentro, izqAbajo, izqMedioAbajo, izqMedioArriba } = player2Collision;


      if (this.collidePlayer1()) {
        if (derArriba)
        {
          this.ballDirection = 1;
          this.ballState = 2;
        }
        else if (derCentro)
        {
          this.ballDirection = 1;
          this.ballState = 3;
        }
        else if (derAbajo)
        {
          this.ballDirection = 1;
          this.ballState = 1;
        }
        else if (derMedioAbajo)
        {
          this.ballDirection = 1;
          this.ballState = 8;
        }
        else if (derMedioArriba)
        {
          this.ballDirection = 1;
          this.ballState = 7;
        }
      }
      if (this.collidePlayer2()) {
        if (izqArriba)
        {
          this.ballDirection = 2;
          this.ballState = 4;
        }
        else if (izqCentro)
        {
          this.ballDirection = 2;
          this.ballState = 6;
        }
        else if (izqAbajo)
        {
          this.ballDirection = 2;
          this.ballState = 5;
        }
        else if (izqMedioAbajo)
        {
          this.ballDirection = 2;
          this.ballState = 9;
        }
        else if (izqMedioArriba)
        {
          this.ballDirection = 2;
          this.ballState = 10;
        }
      }


      if (this.ballDirection === 1)
      {
        if (this.ball.top >= 700)
        this.ballState = 2;
        else if (this.ball.top <= 0)
        this.ballState = 1;
      }
      else if (this.ballDirection === 2)
      {
        if (this.ball.top >= 700) this.ballState = 4;
        else if (this.ball.top <= 0 ) this.ballState = 5;
      }
      else if (this.ballDirection === 1 && this.ballState === 7 || this.ballState === 8)
      {
        if (this.ball.top >= 700) this.ballState = 7;
        else if (this.ball.top <= 0 ) this.ballState = 8;
      }
      else
      {
        if (this.ball.top >= 700) this.ballState = 9;
        else if (this.ball.top <= 0 ) this.ballState = 10;
      }
}

    collidePlayer1(){
      let derArriba:boolean = false;
      let derCentro:boolean = false;
      let derAbajo:boolean = false;
      let derMedioAbajo:boolean = false;
      let derMedioArriba:boolean = false;

    if (this.ball.left <= 38 &&
      this.ball.top >= (this.playerLeft.move - 24) &&
      this.ball.top <= (this.playerLeft.move - 14)){
        derArriba = true;
    } else if (this.ball.left <= 38 &&
      this.ball.top >= (this.playerLeft.move - 14.01) &&
      this.ball.top <= (this.playerLeft.move + 23.33)){
        derMedioArriba = true;
    } else if (this.ball.left <= 38 &&
      this.ball.top >= (this.playerLeft.move + 23.34) &&
      this.ball.top <= (this.playerLeft.move + 60.66)){
        derCentro = true;
    } else if (this.ball.left <= 38 &&
      this.ball.top >= (this.playerLeft.move + 60.67) &&
      this.ball.top <= (this.playerLeft.move + 98)){
        derMedioAbajo = true;
    } else if (this.ball.left <= 38 &&
      this.ball.top >= (this.playerLeft.move + 98.01) &&
      this.ball.top <= (this.playerLeft.move + 112)){
        derAbajo = true;
    }

    return {
      derArriba: derArriba,
      derCentro: derCentro,
      derAbajo: derAbajo,
      derMedioAbajo: derMedioAbajo,
      derMedioArriba: derMedioArriba,
  };

}

    collidePlayer2(){
      let izqArriba:boolean = false;
      let izqCentro:boolean = false;
      let izqAbajo:boolean = false;
      let izqMedioAbajo:boolean = false;
      let izqMedioArriba:boolean = false;

    if (this.ball.left >= 1370 &&
      this.ball.top >= (this.playerRight.move - 24) &&
      this.ball.top <= (this.playerRight.move - 14)){
        izqArriba = true;
    } else if (this.ball.left >= 1370 &&
      this.ball.top >= (this.playerRight.move - 14.01) &&
      this.ball.top <= (this.playerRight.move + 23.33)){
        izqMedioArriba = true;
    } else if (this.ball.left >= 1370 &&
      this.ball.top >= (this.playerRight.move + 23.34) &&
      this.ball.top <= (this.playerRight.move + 60.66)){
        izqCentro = true;
    } else if (this.ball.left >= 1370 &&
      this.ball.top >= (this.playerRight.move + 60.67) &&
      this.ball.top <= (this.playerRight.move + 98)){
        izqMedioAbajo = true;
    } else if (this.ball.left >= 1370 &&
      this.ball.top >= (this.playerRight.move + 98.01) &&
      this.ball.top <= (this.playerRight.move + 112)){
        izqAbajo = true;
    }

    return {
      izqArriba: izqArriba,
      izqCentro: izqCentro,
      izqAbajo: izqAbajo,
      izqMedioAbajo: izqMedioAbajo,
      izqMedioArriba: izqMedioArriba,
  };
}

}

export class Player {
  constructor(
    public move: number,
    public points: number,
    public height: number,
  ) {}
}
