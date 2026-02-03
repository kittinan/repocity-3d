export interface CityEntity {
  name: string;
  path: string;
  type: 'block' | 'building';
  size: number;
  depth: number;
  children?: CityEntity[];
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number; depth: number };
  color: string;
}
