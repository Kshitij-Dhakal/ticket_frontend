import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ValueFn } from 'd3';
import { Ticket } from '../reserve/ticket';
import { ShowsService } from '../shows/shows.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private data?: Ticket[];
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private showService: ShowsService) { }

  ngOnInit(): void {
    this.showService.getAllReservations()
      .subscribe({
        next: (v) => {
          this.data = v;
          this.createByDateGraph();
          this.createByMovieGraph();
        }
      });
  }

  private createByDateGraph(): void {
    const svg = d3.select("figure#by-date")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    const domain = this.data!.map(d => this.getDate(d));
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(domain)
      .padding(0.2);

    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    svg.append("g")
      .call(d3.axisLeft(y));

    let barData: Map<string, number> = new Map();
    this.data?.forEach(e => {
      const d = this.getDate(e)
      barData.set(d, (barData.get(d) ?? 0) + 1)
    });

    // Create and fill the bars
    svg.selectAll("bars")
      .data(barData.entries())
      .enter()
      .append("rect")
      .attr("x", d => x(d[0])!)
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d[1]))
      .attr("fill", "#d04a35");
  }

  private createByMovieGraph(): void {
    const svg = d3.select("figure#by-movie")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    console.log(this.data)
    const domain = this.data!.map(d => d.show?.movie?.name!);
    console.log(domain)
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(domain)
      .padding(0.2);

    // Draw the X-axis on the DOM
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    svg.append("g")
      .call(d3.axisLeft(y));

    let barData: Map<string, number> = new Map();
    this.data?.forEach(e => {
      const d = e.show?.movie?.name!
      barData.set(d, (barData.get(d) ?? 0) + 1)
    });

    // Create and fill the bars
    svg.selectAll("bars")
      .data(barData.entries())
      .enter()
      .append("rect")
      .attr("x", d => x(d[0])!)
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d[1]))
      .attr("fill", "#d04a35");
  }

  getDate(ticket?: Ticket): string {
    return new Intl.DateTimeFormat('en-US').format(new Date(ticket?.date?.toString()!))
  }
}
