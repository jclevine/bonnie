import { Component, OnInit } from '@angular/core';
import { Permissions, RtmService } from './rtm.service';
import { Task } from './Task';

@Component({
  selector: 'bo-rtm',
  templateUrl: './rtm.component.html',
  styleUrls: ['./rtm.component.css']
})
export class RtmComponent implements OnInit {
  tasks: Task[];

  constructor(private rtmService: RtmService) {
    this.tasks = rtmService.authenticate('blah', Permissions.WRITE).getTasks();
  }

  ngOnInit(): void {
  }

}
