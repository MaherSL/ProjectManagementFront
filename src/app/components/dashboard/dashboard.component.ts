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
  colors = ["#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB","#F29220", "#3cba9f", "#4365B0", "#D00"];

  linechart = [];
  barchart = [];
  groupbarchart = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.initLineChart();
    this.initBarChart();
    this.initGroupBarChart();

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
        //console.log("values[" + status.indexOf(y.groupe) + "][" + products.indexOf(y.ligne) + "] = " + y.colonne);
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

  initGroupBarChart() {
    var reportertype = [];
    var resolution = [];
    var values: number[][] = [];//values[resolution][reporter]
    var datasets = [];
    var labels = [];
    this.ticketService.getCcountfxornbgrpreportertype().subscribe((res: Graph2d[]) => {
      res.forEach(y => {
        if (!resolution.includes(y.ligne)) {
          //console.log("add groupe" + y.groupe);
          resolution.push(y.ligne);
          values[resolution.length - 1] = [];
          for (var i = 0; i < reportertype.length; i++) {
            values[resolution.length - 1][i] = 0;
          }
        }
        if (!reportertype.includes(y.groupe)) {
          reportertype.push(y.groupe);
          for (var i = 0; i < resolution.length; i++) {
            values[i][reportertype.length - 1] = 0;
          }
        }
        console.log("GroupBarChart values[" + resolution.indexOf(y.ligne) + "][" + reportertype.indexOf(y.groupe) + "] = " + y.colonne);
        values[resolution.indexOf(y.ligne)][reportertype.indexOf(y.groupe)] = y.colonne;
      });

      //Ajout de libelle
      for (var i = 0; i < reportertype.length; i++) {
        if (reportertype[i] == '0')
          reportertype[i] = '0;CLIENT';
        else if (reportertype[i] == '1')
          reportertype[i] = '1;INTERNAL';
        else
          reportertype[i] = reportertype[i] + ';XXX';
      }

      reportertype.forEach(y => {
        labels.push(this.getColumn(y, 2));
      });

      for (var i = 0; i < resolution.length; i++) {
        var color = this.colors[i % this.colors.length];
        datasets.push({
          label: this.getColumn(resolution[i], 2),
          backgroundColor: color,
          borderColor: color,
          data: values[i]
        });
      }
      //console.log("datasets=" + JSON.stringify(datasets));

      var g3data = {
        labels: labels,
        datasets: datasets
      };

      /*
      Chart de groupement de bar
      var data = {
        labels: ["Chocolate", "Vanilla", "Strawberry"],
        datasets: [
            {
                label: "Harpo",
                fillColor: "blue",
                data: [3,7,4]
            },
            {
                label: "Chico",
                fillColor: "red",
                data: [4,3,5]
            },
            {
                label: "Groucho",
                fillColor: "green",
                data: [7,2,6]
            }
        ]
    };*/


      this.groupbarchart = new Chart('canvas3', {
        type: 'bar',
        data: g3data
        /*options: {
          responsive: true,
          legend: {
            display: true,
            position: "top"
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },

          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }
          /*scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }
          ]
          }
      }*/
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
    //console.log("data=" + data + ",pos=" + pos + ",ideb=" + ideb + ",ifin=" + ifin);
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
