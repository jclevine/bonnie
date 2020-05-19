import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BonnieComponent } from './bonnie.component';
import {RtmComponent} from './rtm/rtm.component';
import { GcalComponent } from './gcal/gcal.component';
import { CompliceComponent } from './complice/complice.component';

@NgModule({
  declarations: [
    BonnieComponent, RtmComponent, GcalComponent, CompliceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    RtmComponent
  ],
  bootstrap: [BonnieComponent]
})
export class BonnieModule { }
