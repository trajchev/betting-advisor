import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public splashImage = 'assets/images/backgrounds/sports-betting.jpg';
  public i = 0;

  constructor() { }

  ngOnInit() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.generateAnimation(width, height);

  }

  generateAnimation(width, height) {

    const svg = d3.select('.home-overlay').append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent');

    function particle() {

        const m = d3.mouse(this);
    
        svg.append('circle', 'rect')
          .attr('cx', m[0])
          .attr('cy', m[1])
          .attr('r', 1e-6)
          // .style('stroke', d3.hsl((this.i = (this.i + 1) % 360), 1, .5))
          .style('stroke', '#36507f')
        .transition()
          .duration(2000)
          .ease(Math.sqrt)
          .attr('r', 100)
          .style('stroke-opacity', 1e-6)
          .remove();
    
          d3.event.preventDefault();
      }

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .on('ontouchstart' in document ? 'touchmove' : 'mousemove', particle);

  }

}
