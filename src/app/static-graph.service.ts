import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StaticGraphService {

  

  url = "http://localhost:8080/";
  // url="http://iot-env.ap-south-1.elasticbeanstalk.com:8080/"

  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  getData(){
    return this.http.get(this.url + "getCurrentAndVoltage",  httpOptions).pipe(
    );
  }

  getDataForYear(year:Number){
    return this.http.get(this.url + "getDataForYear/"+year,  httpOptions).pipe(
    );
  }

  getDataForMonth(month:Number){
    return this.http.get(this.url + "getDataForMonth/"+month,  httpOptions).pipe(
    );
  }

  getDataForDay(day:Number){
    return this.http.get(this.url + "getDataForDay/"+day,  httpOptions).pipe(
    );
  }

  getDataForHour(hour:Number){
    return this.http.get(this.url + "getDataForHour/"+hour,  httpOptions).pipe(
    );
  }

  getDataForDates(startDate:Date,endDate:Date){
    return this.http.get(this.url + "getDataForDates/"+this.datePipe.transform(startDate,"yyyy-MM-dd")+"/"+this.datePipe.transform(endDate,"yyyy-MM-dd"),  httpOptions).pipe(
    );
  }

}
