import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

export interface PeriodicElement {
  name: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', price: 100},
  {name: 'Helium', price: 200}
];

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})

export class FirstComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }

  title = 'PRF';

  example = ['1_elem'];
  displayedColumns: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource<any>();

  data1: any;
  
  goToSecond() {
    this.router.navigate(['/second', '2', {message: this.title}]);
  }

  goToListProducts() {
    this.router.navigate(['/listProducts']);
  }

  hello() {
    console.log('Hello World!');
    if(this.title === 'PRF') {
      this.title = 'NOT PRF';
    } else {
      this.title = 'PRF';
    }
    this.example.push(Math.floor(Math.random()*100) + '_elem');
    this.connectionService.getProducts().subscribe(data => {
      console.log('This came from the server: ', data);
      this.data1 = data;
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });
  }

  helloFrom(st: string) {
    console.log('Hello from ' + st);
  }

  ngOnInit(): void {
  }

}
