export type ActivityType = 'LECTURE' | 'LAB_WORK' | 'EXHIBITION' | 'SOCIAL' | 'RESEARCH';

export interface SpatialCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface CameraView {
  position: SpatialCoordinates;
  target: SpatialCoordinates;
  zoom: number;
}

export interface LocationNode {
  id: string;
  name: string;
  floorLevel: number;
  coordinates: SpatialCoordinates;
  idealCameraView: CameraView;
  capacity: number;
  currentOccupancy: number;
}

export interface Activity {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: ActivityType;
  locationId: string;
  startTime: string;
  endTime: string;
  visuals: {
    heroImage: string;
    accentColor: string;
    icon: string;
  };
  tags: string[];
}
