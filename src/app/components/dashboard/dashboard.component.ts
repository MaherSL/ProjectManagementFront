import { TicketService } from 'src/app/services/ticket.service';
import { HttpClient } from 'selenium-webdriver/http';
import { Chart } from 'chart.js';
import { Graph2d } from 'src/app/class/Graph2d';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app';
  month = [];
  price = [];
  barmonth = [];
  barprice = [];
  chart = [];
  barChart=[];
  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.initLineChart();
    this.initBarChart();

  }
initLineChart()
{
this.ticketService.getCount().subscribe((res: Graph2d[]) => {
  res.forEach(y => {
    this.month.push(y.ligne);
    this.price.push(y.colonne);
  });
  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: this.month,
      datasets: [
        {
          data: this.price,
          borderColor: '#3cba9f',
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });
});
}
  initBarChart(){
    this.ticketService.getCount().subscribe((res: Graph2d[]) => {
      res.forEach(y => {
        this.barmonth.push(y.ligne);
        this.barprice.push(y.colonne);
      });
      this.barChart = new Chart('canvas2', {
        type: 'stackedBar',
        data: {
          labels: this.barmonth,
          datasets: [
            {
              data: this.barprice,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]}

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }




}
