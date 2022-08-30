import { Component } from '../../../Abstract/component';
import { TServices } from '../../../Interfaces/Types';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import {ru} from 'date-fns/locale';
import './graph.scss';

export class Graph extends Component {
  
  title: Component;
  
  graph: HTMLCanvasElement;

  myChart: Chart;

  constructor(parent: HTMLElement, private readonly services: TServices) {
    super(parent, 'div', ['chart-wrapper']);
    this.title = new Component(this.root, 'h3', []);

    this.graph = new Component(this.root, 'canvas', ['chart']).root as HTMLCanvasElement;

    this.myChart = new Chart(this.graph, {
      type: 'line',
      data: {
        labels: [new Date()],
        datasets: [{
          label: 'метка',
          data: [0],
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderColor: 'rgba(0, 206, 86, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'dd.MM.yy',
              }
            },
            ticks: {
              source: 'auto'
            },
            adapters: {
              date: {
                locale: ru
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
