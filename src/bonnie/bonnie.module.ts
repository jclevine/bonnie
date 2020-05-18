import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BonnieComponent } from './bonnie.component';

@NgModule({
  declarations: [
    BonnieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [BonnieComponent]
})
export class BonnieModule { }
