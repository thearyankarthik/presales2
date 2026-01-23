import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface CallLog {
  user: string;
  phone: string;
  type: string;
  status: string;
  duration: string;
  time: string;
  notes: string;
}

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.css']
})
export class CallLogsComponent {

  displayedColumns: string[] = [
  'userName',
  'leadName',
  'phoneNumber',
  'callType',
  'callStatus',
  'callDuration',
  'callTime',
  'remarks'
  ];
  dataSource = new MatTableDataSource([
  {
    userName: 'Sashi',
    leadName: 'Ramesh Kumar',
    phoneNumber: '9876543210',
    callType: 'Outgoing',
    callStatus: 'Answered',
    callDuration: '3m 24s',
    callTime: '22-01-2026 14:10',
    remarks: 'Interested in site visit'
  },
  {
    userName: 'Prashanth',
    leadName: 'Anita Sharma',
    phoneNumber: '9123456789',
    callType: 'Incoming',
    callStatus: 'Missed',
    callDuration: '-',
    callTime: '22-01-2026 13:45',
    remarks: 'Follow up required'
  }
]);


}
