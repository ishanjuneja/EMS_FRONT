import { Component, OnInit } from '@angular/core';
import { Chart } from 'Chart.js';
import { ViewChild } from '@angular/core'
import { StaticGraphService } from '../../static-graph.service'
import {MatDialog} from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-static-graph',
  templateUrl: './static-graph.component.html',
  styleUrls: ['./static-graph.component.css']
})
export class StaticGraphComponent implements OnInit {
  @ViewChild('linestaticChart') private staticChartRef;
  staticChart: any;
  dynamicChart: any;
  

  BasicEntity: {
    id: Number;
    voltage: Number;
    current: Number
  }
  constructor(private staticGraphService: StaticGraphService,public dialog: MatDialog) {

    var self = this;
    
  }

  ngOnInit() {
    
    var canvas = <HTMLCanvasElement> document.getElementById("canvasStatic");
var ctx = canvas.getContext("2d");

    this.staticChart = new Chart('canvasStatic', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'voltage',
            data: [],
            borderColor: "#3cba9f",
            fill: true
          },
          {
            label: 'current',
            data: [],
            borderColor: "#ffcc00",
            fill: true
          },
        ]
      },
      options: {
        onClick: (graphClickEvent, array: Array<any>) => {

          var index = array[0]._index;
          var year = this.staticChart.data.labels[index];
          var temp = year.toString();


          if (temp.indexOf('HOUR') > -1) {
            var hour = temp.substring(0, temp.indexOf('t'));
            this.staticGraphService.getDataForHour(hour).subscribe(
              (data: any[]) => {
                this.staticChart.data.labels.length = 0;
                this.staticChart.data.datasets[0].data.length = 0;
                this.staticChart.data.datasets[1].data.length = 0;
                data.forEach(BasicEntity => {
                  this.staticChart.data.labels.push(BasicEntity[2] + 'th Minute');
                  this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
                  this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
                  this.staticChart.update();
                });

              },
              error => {

              });
          }

          if (temp.indexOf('DAY') > -1) {
            var day = temp.substring(0, temp.indexOf('t'));
            this.staticGraphService.getDataForDay(day).subscribe(
              (data: any[]) => {
                this.staticChart.data.labels.length = 0;
                this.staticChart.data.datasets[0].data.length = 0;
                this.staticChart.data.datasets[1].data.length = 0;
                data.forEach(BasicEntity => {
                  this.staticChart.data.labels.push(BasicEntity[2] + 'th HOUR');
                  this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
                  this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
                  this.staticChart.update();
                });

              },
              error => {

              });
          }

          if (temp.indexOf('MONTH') > -1) {
            var month = temp.substring(0, temp.indexOf('t'));
            this.staticGraphService.getDataForMonth(month).subscribe(
              (data: any[]) => {
                this.staticChart.data.labels.length = 0;
                this.staticChart.data.datasets[0].data.length = 0;
                this.staticChart.data.datasets[1].data.length = 0;
                data.forEach(BasicEntity => {
                  this.staticChart.data.labels.push(BasicEntity[2] + 'th DAY');
                  this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
                  this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
                  this.staticChart.update();
                });

              },
              error => {

              });
          }
          else {
            this.staticGraphService.getDataForYear(year).subscribe(
              (data: any[]) => {
                this.staticChart.data.labels.length = 0;
                this.staticChart.data.datasets[0].data.length = 0;
                this.staticChart.data.datasets[1].data.length = 0;
                data.forEach(BasicEntity => {
                  this.staticChart.data.labels.push(BasicEntity[2] + 'th MONTH');
                  this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
                  this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
                  this.staticChart.update();
                });
              },
              error => {
                console.log(error.error.text);

              });
          }
        },
        maintainAspectRatio: true,
        legend: {
          display: true
        },
        scales: {

          xAxes: [{
            ticks: {
              min: 0,
              beginAtZero: false
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,

            }
          }]

        },

        
      }
    });




    this.staticGraphService.getData().subscribe(
      (data: any[]) => {

        data.forEach(BasicEntity => {

          this.staticChart.data.labels.push(BasicEntity[2]);
          this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
          this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
          this.staticChart.update();
        });

      },
      error => {
        console.log(error.error.text);

      });

    this.dynamicChart = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'voltage',
            data: [],
            borderColor: "#3cba9f",
            fill: true
          },
          {
            label: 'current',
            data: [],
            borderColor: "#ffcc00",
            fill: true
          },
        ]
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: true
        },
        scales: {

          xAxes: [{
            ticks: {
              min: 0,
              beginAtZero: false
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,

            }
          }]

        }
      }
    });

  }

  refreshStaticGraph() {
    this.staticGraphService.getData().subscribe(
      (data: any[]) => {
        this.staticChart.data.labels.length = 0;
        this.staticChart.data.datasets[0].data.length = 0;
        this.staticChart.data.datasets[1].data.length = 0;
        data.forEach(BasicEntity => {

          this.staticChart.data.labels.push(BasicEntity[2]);
          this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
          this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
          this.staticChart.update();
        });

      },
      error => {
        console.log(error.error.text);

      });
  }


  maximizeWidget(event) {
    
    const dialogRef = this.dialog.open(StaticGraphDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'static-graph-modal',
  templateUrl: './static-graph-modal.html',
})
export class StaticGraphDialog implements OnInit{

  
  constructor(private staticGraphService: StaticGraphService,public dialog: MatDialog) {

    
  }

ngOnInit(){
}





// startDateSelected(type: string, event: MatDatepickerInputEvent<Date>) {
//   this.startDate=event.value;
//   console.log(this.startDate);
// }
// endDateSelected(type: string, event: MatDatepickerInputEvent<Date>) {
//   this.endDate=event.value;
//   this.staticGraphService.getDataForDates(this.startDate,this.endDate).subscribe(
//     (data: any[]) => {
//       console.log(data);
//       this.staticChart.data.labels.length = 0;
//       this.staticChart.data.datasets[0].data.length = 0;
//       this.staticChart.data.datasets[1].data.length = 0;
//       data.forEach(BasicEntity => {
//         this.staticChart.data.labels.push(BasicEntity[2]+'-'+BasicEntity[3]+'-'+BasicEntity[4]);
//         this.staticChart.data.datasets[0].data.push(BasicEntity[0]);
//         this.staticChart.data.datasets[1].data.push(BasicEntity[1]);
//         this.staticChart.update();
//       });
//     },
//     error => {
//       console.log(error.error.text);

//     });
// }

}