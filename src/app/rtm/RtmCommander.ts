import { Task } from './Task';

export class RtmCommander {
  getTasks(): Task[] {
    return [
      {
        name: 'Complice monthly review'
      },
      {
        name: 'Call Mom'
      },
      {
        name: 'Call Dad'
      },
      {
        name: 'Finish BLE Grit Everett 3 Activities'
      },
      {
        name: 'Definitely go over month\'s mint transactions'
      },
      {
        name: 'Get recipe from Andrea for falafel salad'
      }
    ];
  }
}
