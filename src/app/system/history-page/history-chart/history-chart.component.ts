import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'u-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  @Input() results: { 'name': string, 'value': number }[];

  view: number[] = [750, 500];
  scheme: object = {
    name: 'picnic',
    selectable: false,
    group: 'Ordinal',
    domain: [
      '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
    ]
  };
  legend: boolean = false;
  labels: boolean = true;
  doughnut: boolean = true;
  arcWidth: number = 0.3;

  constructor() { }

  ngOnInit() { }



}
