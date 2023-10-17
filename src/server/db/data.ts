import { IBadge, ILog, IMake, IModel } from '../shared/interface/IVehicle';

export const makes: IMake[] = [
  {
    id: 1,
    name: 'ford',
  },
  {
    id: 2,
    name: 'bmw',
  },
  {
    id: 3,
    name: 'tesla',
  },
];

export const models: IModel[] = [
  {
    id: 1,
    make_id: 1,
    name: 'Ranger',
  },
  {
    id: 2,
    make_id: 1,
    name: 'Falcon',
  },
  {
    id: 3,
    make_id: 1,
    name: 'Falcon Ute',
  },
  {
    id: 4,
    make_id: 2,
    name: '130d',
  },
  {
    id: 5,
    make_id: 2,
    name: '240i',
  },
  {
    id: 6,
    make_id: 2,
    name: '320e',
  },
  {
    id: 7,
    make_id: 3,
    name: 'Model 3',
  },
];

export const badges: IBadge[] = [
  {
    id: 1,
    model_id: 1,
    name: 'Raptor',
  },
  {
    id: 2,
    model_id: 1,
    name: 'Raptor x',
  },
  {
    id: 3,
    model_id: 1,
    name: 'Wildtrak',
  },
  {
    id: 4,
    model_id: 2,
    name: 'XR6',
  },
  {
    id: 5,
    model_id: 2,
    name: 'XR6 Turbo',
  },
  {
    id: 6,
    model_id: 2,
    name: 'XR8',
  },
  {
    id: 7,
    model_id: 3,
    name: 'XR6',
  },
  {
    id: 8,
    model_id: 3,
    name: 'XR6 Turbo',
  },
  {
    id: 9,
    model_id: 4,
    name: 'xDrive 26d',
  },
  {
    id: 10,
    model_id: 4,
    name: 'xDrive 30d',
  },
  {
    id: 11,
    model_id: 5,
    name: 'xDrive 30d',
  },
  {
    id: 12,
    model_id: 5,
    name: 'xDrive 50d',
  },
  {
    id: 13,
    model_id: 6,
    name: 'xDrive 75d',
  },
  {
    id: 14,
    model_id: 6,
    name: 'xDrive 80d',
  },
  {
    id: 15,
    model_id: 6,
    name: 'xDrive 85d',
  },
  {
    id: 16,
    model_id: 7,
    name: 'Performance',
  },
  {
    id: 17,
    model_id: 7,
    name: 'Long Range',
  },
  {
    id: 18,
    model_id: 7,
    name: 'Dual Motor',
  },
];
