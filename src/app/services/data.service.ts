import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alojamiento } from '../models/alojamiento.model';
import { Resena } from '../models/resena.model';

interface MarketplaceData {
  alojamientos: Alojamiento[];
  resenas: Resena[];
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
