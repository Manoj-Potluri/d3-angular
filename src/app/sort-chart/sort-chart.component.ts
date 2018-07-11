import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { OlympicDataServiceService } from '../olympic-data-service.service';
import { OlympicData } from '../olympic-data';

@Component({
  selector: 'app-sort-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sort-chart.component.html',
  styleUrls: ['./sort-chart.component.scss']
})
export class SortChartComponent implements OnInit {

  title = 'Sorting Chart';
  olympicDatas: OlympicData[];

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(private DataService: OlympicDataServiceService) { }

  ngOnInit() {
    this.DataService.getData().subscribe((olympicDatas: OlympicData[]) => {
      this.olympicDatas = olympicDatas;
      this.initSvg();
      this.initAxis();
      this.drawAxis();
    })

  }

  private initSvg() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    console.log(this.olympicDatas);
    this.x.domain(this.olympicDatas.map((d) => d.year));
    this.y.domain([0, d3Array.max(this.olympicDatas, (d) => d.total)]);
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Total Medals won from 2000 - 2012');
  }

  private drawBars(category) {

    this.g.selectAll('.bar')
      .data(this.olympicDatas.filter(function (d) { return d.country == category; }))
      // .data(this.olympicDatas)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d.year))
      .attr('y', (d) => this.y(d.total))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.total));

    this.g.selectAll('.bar')
      .data(this.olympicDatas.filter(function (d) { return d.country == category; }))
      .exit().remove();
  }

  private select(category) {
    this.drawBars(category);
  }

}
