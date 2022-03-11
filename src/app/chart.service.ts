import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root'
})
export class ChartServices {
    API_BASE_URL = `http://localhost:3000`;

    constructor(
        private _http: HttpClient,
    ) { }

    getCharts(): Observable<any> {
        return this._http.get<any>(`${this.API_BASE_URL}/charts`).pipe(
            map(res => res.data)
        );
    }

}
