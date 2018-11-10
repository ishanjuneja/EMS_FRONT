import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { StaticGraphDialog} from '../static-graph/static-graph.component';
@Component({
  selector: 'app-widgethome',
  templateUrl: './widgethome.component.html',
  styleUrls: ['./widgethome.component.css']
})
export class WidgethomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

openStaticWidget(event){
  console.log(document.getElementById('staticGraph'));
    const dialogRef = this.dialog.open(StaticGraphDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}  
}
