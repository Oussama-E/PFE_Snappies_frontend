import { Component, OnInit } from '@angular/core';
import { TourneeService } from './tournee.service';

@Component({
  selector: 'app-tournee',
  templateUrl: './tournee.component.html',
  styleUrls: ['./tournee.component.css']
})
export class TourneeComponent /*implements OnInit */ {

  // tournees: any[] = [];

  // constructor(private tourneeService: TourneeService) { }

  // ngOnInit() {
  //   this.fetchTournees();
  // }

  // fetchTournees() {
  //   this.tourneeService.getTournees().subscribe(
  //     (data: any) => {
  //       this.tournees = data;
  //     },
  //     error => {
  //       console.error('Error fetching tournees:', error);
  //     }
  //   );
  // }
  
}
