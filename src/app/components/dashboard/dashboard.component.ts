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
  colors = ["#FF6384", "#F29220", "#3cba9f", "#4365B0", "#D00", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"];
  linechart = [];
  barchart = [];
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.initLineChart();
    this.initBarChart();

  }
  initLineChart() {
    var nombre = [];
    var mois = [];
    this.ticketService.getCountgroupmonth().subscribe((res: Graph2d[]) => {
      res.forEach(y => {
        mois.push(y.ligne);
        nombre.push(y.colonne);
      });
      this.linechart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: mois,
          datasets: [
            {
              data: nombre,
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
  initBarChart() {
    var products = [];
    var status = [];
    var values: Number[][] = [];//values[status][product]
    var datasets = [];
    var labels = [];
    this.ticketService.getCountgroupproductstatus().subscribe((res: Graph2d[]) => {
      res.forEach(y => {
        if (!products.includes(y.ligne)) {
          //console.log("add ligne" + y.ligne);
          products.push(y.ligne);
          for (var i = 0; i < status.length; i++) {
            values[i][products.length - 1] = 0;
          }
        }

        if (!status.includes(y.groupe)) {
          //console.log("add groupe" + y.groupe);
          status.push(y.groupe);
          values[status.length - 1] = [];
          for (var i = 0; i < products.length; i++) {
            values[status.length - 1][i] = 0;
          }
        }
        console.log("values[" + status.indexOf(y.groupe) + "][" + products.indexOf(y.ligne) + "] = " + y.colonne);
        values[status.indexOf(y.groupe)][products.indexOf(y.ligne)] = y.colonne;
      });

      products.forEach(y => {
        labels.push(this.getColumn(y, 2));
      });

      for (var i = 0; i < status.length; i++) {
        var color = this.colors[i % this.colors.length];
        datasets.push({
          'label': this.getColumn(status[i], 2),
          'backgroundColor': color,
          'borderColor': color,
          'data': values[i]
        });
      }
      //console.log("status=" + JSON.stringify(datasets));

      var data = {
        labels: ["Data1", "Data2", "Data3"],//products
        datasets: [{
          label: "Apples",
          backgroundColor: "#F29220",
          borderColor: "#F29220",
          data: [40, 20, 30]
        }, {
          label: "Bananas",
          backgroundColor: "#4365B0",
          borderColor: "#4365B0",
          data: [60, 80, 70]
        }, {
          label: "Cookies",
          backgroundColor: "#D00",
          borderColor: "#D00",
          data: [10, 5, 10]
        }]
      };
      var g2data = {
        labels: labels,
        datasets: datasets
      };
      this.barchart = new Chart('canvas2', {
        type: 'bar',
        data: g2data,
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{
              stacked: true, ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });

    });
  }
  public pieChartLabels: string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

  getColumn(data: string, pos: number): string {
    var ideb;
    var ifin;
    ideb = this.getPosition(data, ";", pos - 1);
    ifin = this.getPosition(data, ";", pos);
    console.log("data=" + data + ",pos=" + pos + ",ideb=" + ideb + ",ifin=" + ifin);
    if (ideb == -1 && ifin == -1)
      return "";
    if (ideb == -1) {
      ideb = 0;
    } else { ideb++; }
    if (ifin == -1) {
      ifin = data.length;
    } else { ifin--; }

    return data.substring(ideb, ifin + 1);
  }

}
