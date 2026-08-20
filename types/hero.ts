export type ShapeType = 'circle' | 'square' | 'rectangle' | 'line' | 'triangle';

export type ShapeColor = 'yellow' | 'cyan' | 'pink' | 'green' | 'surface' | 'band' | 'text';

export interface ShapePosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface HeroShape {
  type: ShapeType;
  width?: number;
  height?: number;
  size?: number;
  position: ShapePosition;
  rotation?: number;
  color: ShapeColor;
  opacity?: number;
  borderWidth?: number;
  zIndex: number;
  shadow?: boolean;
  filled?: boolean;
  responsive?: {
    hideOnMobile?: boolean;
    position?: ShapePosition;
    size?: number;
    width?: number;
    height?: number;
  };
}
