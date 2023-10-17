export interface IVehicleRequestPayload {
  id: number;
  badge: string;
  log: null;
  date_created: Date;
  date_updated: Date;
}

export interface IMake {
  id: number;
  name: string;
}

export interface IModel {
  id: number;
  make_id: number;
  name: string;
}

export interface IBadge {
  id: number;
  model_id: number;
  name: string;
}

export interface ILog {
  make: string;
  model: string;
  badge: string;
  content: string;
}
