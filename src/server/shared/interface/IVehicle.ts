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
  id: number;
  badge_id: number;
  file: {
    name: string;
    attachment: string;
  };
  date_created: Date;
  date_updated: Date | null;
}
