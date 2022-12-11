import { StarShip } from './starship.interface';

export interface StarShipCollection {
  count?: number;
  next?: string;
  previous: string;
  results?: StarShip[];
}
