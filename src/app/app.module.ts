import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftComponent } from './Pong/left/left.component';
import { RightComponent } from './Pong/right/right.component';
import { ArrowLeftComponent } from 'src/assets/svgs/arrow-left/arrow-left.component';
import { ArrowRightComponent } from 'src/assets/svgs/arrow-right/arrow-right.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,
    RightComponent,
    ArrowLeftComponent,
    ArrowRightComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
