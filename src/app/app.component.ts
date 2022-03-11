import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartServices } from './chart.service';

interface ResApi {
    product: string;
    data: any[];
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'hackhathon-chart';

    charts;

    constructor(
        private _chartServices: ChartServices
    ) {
    }

    ngOnInit() {
        this._chartServices.getCharts().subscribe({
            next: (res) => {
                this.charts = this.createCharts(res)
                console.log(this.charts)
            }
        })
    }

    createCharts(data) {
        return data.map(element => ({
            title: element.product,
            type: 'line',
            data: {
                labels: element.data[0].labels,
                datasets: element.data.map(d => ({
                    label: d.metric,
                    data: d.values,
                    backgroundColor: this.getColors(d),
                    borderColor: this.getColors(d),
                    pointBackgroundColor: this.getColors(d),
                }))
            }
        }));
    }

    getColors(elem: any): string {
        const colors = [
            {
                zone_code: 'UNTREATED',
                metric: 'STRESS',
                color: '#ffd7d4',
            },
            {
                zone_code: 'UNTREATED',
                metric: 'HYDRA',
                color: '#ff9e96'
            },
            {
                zone_code: 'UNTREATED',
                metric: 'SKIN_BARRIER',
                color: '#fc6658'
            },
            {
                zone_code: 'TREATED',
                metric: 'STRESS',
                color: '#a0bf9d'
            },
            {
                zone_code: 'TREATED',
                metric: 'HYDRA',
                color: '#74ba6e',
            },
            {
                zone_code: 'TREATED',
                metric: 'SKIN_BARRIER',
                color: '#52d647'
            }
        ]
        return colors.find(c => c.zone_code === elem.zone_code && c.metric === elem.metric).color
    }

}
