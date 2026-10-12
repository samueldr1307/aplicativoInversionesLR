import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlojamientoModel } from '../models/alojamiento.model';
import { ResenaModel } from '../models/resena.model';

interface MarketplaceData {
  alojamientos: AlojamientoModel[];
  resenas: ResenaModel[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'data/marketplace-data.json';

  constructor(private http: HttpClient) {}

  getAlojamientos(): Observable<MarketplaceData> {
    return this.http.get<MarketplaceData>(this.url);
  }
}
