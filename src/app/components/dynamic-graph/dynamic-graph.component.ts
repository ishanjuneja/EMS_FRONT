import { Component, OnInit } from '@angular/core';
import { Chart } from 'Chart.js';
import { ViewChild } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs/canvasjs.min';
import * as google from '../../../assets/loader.js';
@Component({
  selector: 'app-dynamic-graph',
  templateUrl: './dynamic-graph.component.html',
  styleUrls: ['./dynamic-graph.component.css']
})
export class DynamicGraphComponent implements OnInit {
  @ViewChild('linedynamicChart') private dynamicChartRef;
  dynamicChart: any;

  // voltageSocket: WebSocket = new WebSocket('ws://iot-env.ap-south-1.elasticbeanstalk.com:8080/voltageapi');
  // currentSocket: WebSocket = new WebSocket('ws://iot-env.ap-south-1.elasticbeanstalk.com:8080/currentapi');

  anysocket: WebSocket = new WebSocket('ws://localhost:8080/dynamicwebsocketapi/voltageapi');
  


  constructor() {
    var self = this;
    this.anysocket.onmessage = function (message) {
      // var datainsert:number;
      // datainsert=message.data;
      self.dynamicChart.data.labels.push('a');
      self.dynamicChart.data.datasets[0].data.push(message.data);
      self.dynamicChart.update();
    }

    
  }


  ngOnInit() {
    
    this.dynamicChart = new Chart('canvasd', {
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
          maintainAspectRatio:true,
          legend: {
            display: true
          },
          scales: {
            
              xAxes: [{
                  ticks: {
                      min: 0,
                      beginAtZero:false
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

}
