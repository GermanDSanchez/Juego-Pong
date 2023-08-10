import { Component, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { Player } from 'src/app/app.component';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html'
})

export class LeftComponent implements OnDestroy {

  @Output()
  public onMovePlayerLeft: EventEmitter<Player> = new EventEmitter();

  public playerLeft: Player = new Player(301, 0, 112);

  private keysPressed: { [key: string]: boolean } = {};
  private animationFrameId: number | null = null;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.keysPressed[event.key] = true;

    if (!this.animationFrameId) {
      this.updatePlayersMovement();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this.keysPressed[event.key] = false;
    this.stopPlayersMovement();
  }

  updatePlayersMovement(): void {
    if (this.keysPressed['s']) {
      this.playerLeft.move += 10;
      this.playerLeft.move = Math.min(600, this.playerLeft.move);
      this.onMovePlayerLeft.emit(this.playerLeft);
    }
    else if (this.keysPressed['w']) {
      this.playerLeft.move -= 10;
      this.playerLeft.move = Math.max(10, this.playerLeft.move);
      this.onMovePlayerLeft.emit(this.playerLeft);
    }
    else if (this.keysPressed['S']) {
      this.playerLeft.move += 10;
      this.playerLeft.move = Math.min(600, this.playerLeft.move);
      this.onMovePlayerLeft.emit(this.playerLeft);
    }
    else if (this.keysPressed['W']) {
      this.playerLeft.move -= 10;
      this.playerLeft.move = Math.max(10, this.playerLeft.move);
      this.onMovePlayerLeft.emit(this.playerLeft);
    }

    this.animationFrameId = requestAnimationFrame(() => this.updatePlayersMovement());
  }

  stopPlayersMovement(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopPlayersMovement();
  }
}
