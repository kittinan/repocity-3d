import { create } from 'zustand';

interface BuildingData {
  id: string;
  name: string;
  type: 'js' | 'css' | 'other';
  height: number;
  position: [number, number, number];
  [key: string]: any;
}

interface StoreState {
  hoveredBuilding: BuildingData | null;
  setHoveredBuilding: (building: BuildingData | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  hoveredBuilding: null,
  setHoveredBuilding: (building) => set({ hoveredBuilding: building }),
}));
