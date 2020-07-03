import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BonnieComponent } from './bonnie.component';
import {RtmComponent} from './rtm/rtm.component';
import { GcalComponent } from './gcal/gcal.component';
import { CompliceComponent } from './complice/complice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BonnieComponent, RtmComponent, GcalComponent, CompliceComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    RtmComponent
  ],
  bootstrap: [BonnieComponent]
})
export class BonnieModule { }
