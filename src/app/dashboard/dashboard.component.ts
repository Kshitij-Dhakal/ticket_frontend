import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { aggregate, distinct, map, pipe } from 'iter-ops';
import { Ticket } from '../reserve/ticket';
import { ShowsService } from '../shows/shows.service';

type MovieDateFrequency = {
  movie: string;
  data: {
    date: Date;
    reservations: number;
  }[];
};

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

  tableData?: MovieDateFrequency[]
  tableHeader?: string[]

  constructor(private showService: ShowsService) { }

  ngOnInit(): void {
    this.showService.getAllReservations()
      .subscribe({
        next: (v) => {
          this.data = v;
          this.createByDateGraph();
          this.createByMovieGraph();
          this.getTableData();
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
      barData.set(d, (barData.get(d) ?? 0) + e.show?.reservedSeats?.length!)
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

    const domain = this.data!.map(d => d.show?.movie?.name!);
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
      const d = e.show?.movie?.name!
      barData.set(d, (barData.get(d) ?? 0) + e.show?.reservedSeats?.length!)
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


  getDataDates(): string[] {
    return [...pipe(this.data!,
      map((it: Ticket) => this.getDate(it)),
      distinct((it) => it))]
  }

  getFormattedDate(n: number): string {
    return new Intl.DateTimeFormat('en-US').format(new Date(n))
  }

  getTableData() {
    let d = new Map<string, Map<number, number>>()
    let df = new Set<number>();
    for (const it of this.data!) {
      const movieName = it.show?.movie?.name;
      if (d.has(movieName!)) {
        const mdf = d.get(movieName!);
        mdf?.set(it.date!, (mdf.get(it.date!) ?? 0) + it.show?.reservedSeats?.length!)
        df.add(it.date!)
        d.set(movieName!, mdf!)
      } else {
        const mdf = new Map<number, number>()
        mdf.set(it.date!, it.show?.reservedSeats?.length!)
        df.add(it.date!)
        d.set(movieName!, mdf)
      }
    }
    const dates = [...df].sort((a, b) => a - b)
    const td: MovieDateFrequency[] = []
    for (const it of d.entries()) {
      td.push({
        movie: it[0],
        data: dates.map(d => { return {date: new Date(d), reservations: (it[1].get(d) ?? 0)}})
      })
    }
    this.tableHeader = dates.map((it) => this.getFormattedDate(it))
    this.tableData = td;
  }

  getTableHeaders(): string[] {
    return this.tableData![0].data.map((it) => it + '')
  }

  // groups objects by property value:
  groupBy<T>(array: T[], predicate: (v: T) => string) {
    return array.reduce((acc, value) => {
      (acc[predicate(value)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: T[] });
  }
}
