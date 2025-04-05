declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps {
    children?: React.ReactNode;
    width?: number;
    height?: number;
    projectionConfig?: {
      scale?: number;
      rotation?: [number, number, number];
      center?: [number, number];
    };
    style?: React.CSSProperties;
    className?: string;
  }

  export interface Geography {
    rsmKey: string;
    properties: {
      ISO_A2: string;
      [key: string]: any;
    };
  }

  export interface GeographyProps {
    geography: Geography;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
  }

  export interface GeographiesProps {
    children: (props: { geographies: Geography[] }) => React.ReactNode;
    geography: string | object;
    style?: React.CSSProperties;
    className?: string;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
  export const ZoomableGroup: React.FC<any>;
} 