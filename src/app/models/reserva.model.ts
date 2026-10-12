export interface Reserva {
  id: number;
  alojamientoId: number;
  nombreAlojamiento: string;
  ciudad: string;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: string;
  correo: string;
  estado: string;
  imagenAlojamiento?: string;
}

export type ReservaModel = Reserva;

