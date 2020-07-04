import { Component, OnInit } from '@angular/core';
import { RtmService } from './rtm.service';
import { Task } from './task';
import { RtmCommander, RtmPermissions } from './rtm-commander';

@Component({
  selector: 'bo-rtm',
  templateUrl: './rtm.component.html',
  styleUrls: ['./rtm.component.css'],
  providers: [ RtmService ]
})
export class RtmComponent implements OnInit {
  tasks: Task[];
  rtmCommander: RtmCommander;

  constructor(private rtmService: RtmService) {
  }

  ngOnInit(): void {
    this.rtmService.authenticate();
  }

}
