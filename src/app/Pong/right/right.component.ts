import { Component, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/app.component';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
})
export class RightComponent implements OnDestroy {

  @Output()
  public onMovePlayerRight: EventEmitter<Player> = new EventEmitter();

  public playerRight: Player = new Player(301, 0, 112);

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
    if (this.keysPressed['ArrowDown']) {
      this.playerRight.move += 10;
      this.playerRight.move = Math.min(600, this.playerRight.move);
      this.onMovePlayerRight.emit(this.playerRight);
    }

    else if (this.keysPressed['ArrowUp']) {
      this.playerRight.move -= 10;
      this.playerRight.move = Math.max(10, this.playerRight.move);
      this.onMovePlayerRight.emit(this.playerRight);
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
