"use client";

import React, { useMemo } from "react";
import Map, {
  GeoJSONSourceSpecification,
  Layer,
  Source,
} from "react-map-gl/mapbox";
import { heatmapLayer } from "./map-style";
import { useTheme } from "next-themes";
import { TransactionStatsEntrySchema } from "~/server/api/routers/dashboard/getTransactionStats.schema";

type City = {
  name: string;
  lat: number;
  lng: number;
  region: "US" | "EU";
};

// Top 20 US cities by population with their coordinates
const US_CITIES: City[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060, region: "US" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, region: "US" },
  { name: "Chicago", lat: 41.8781, lng: -87.6298, region: "US" },
  { name: "Houston", lat: 29.7604, lng: -95.3698, region: "US" },
  { name: "Phoenix", lat: 33.4484, lng: -112.0740, region: "US" },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652, region: "US" },
  { name: "San Antonio", lat: 29.4241, lng: -98.4936, region: "US" },
  { name: "San Diego", lat: 32.7157, lng: -117.1611, region: "US" },
  { name: "Dallas", lat: 32.7767, lng: -96.7970, region: "US" },
  { name: "San Jose", lat: 37.3382, lng: -121.8863, region: "US" },
  { name: "Austin", lat: 30.2672, lng: -97.7431, region: "US" },
  { name: "Jacksonville", lat: 30.3322, lng: -81.6557, region: "US" },
  { name: "Fort Worth", lat: 32.7555, lng: -97.3308, region: "US" },
  { name: "Columbus", lat: 39.9612, lng: -82.9988, region: "US" },
  { name: "Charlotte", lat: 35.2271, lng: -80.8431, region: "US" },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, region: "US" },
  { name: "Indianapolis", lat: 39.7684, lng: -86.1581, region: "US" },
  { name: "Seattle", lat: 47.6062, lng: -122.3321, region: "US" },
  { name: "Denver", lat: 39.7392, lng: -104.9903, region: "US" },
  { name: "Washington DC", lat: 38.9072, lng: -77.0369, region: "US" },
];

// Major European cities
const EU_CITIES: City[] = [
  { name: "London", lat: 51.5074, lng: -0.1278, region: "EU" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, region: "EU" },
  { name: "Berlin", lat: 52.5200, lng: 13.4050, region: "EU" },
  { name: "Madrid", lat: 40.4168, lng: -3.7038, region: "EU" },
  { name: "Rome", lat: 41.9028, lng: 12.4964, region: "EU" },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041, region: "EU" },
  { name: "Brussels", lat: 50.8503, lng: 4.3517, region: "EU" },
  { name: "Vienna", lat: 48.2082, lng: 16.3738, region: "EU" },
  { name: "Prague", lat: 50.0755, lng: 14.4378, region: "EU" },
  { name: "Budapest", lat: 47.4979, lng: 19.0402, region: "EU" },
  { name: "Warsaw", lat: 52.2297, lng: 21.0122, region: "EU" },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, region: "EU" },
  { name: "Copenhagen", lat: 55.6761, lng: 12.5683, region: "EU" },
  { name: "Oslo", lat: 59.9139, lng: 10.7522, region: "EU" },
  { name: "Helsinki", lat: 60.1699, lng: 24.9384, region: "EU" },
  { name: "Dublin", lat: 53.3498, lng: -6.2603, region: "EU" },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393, region: "EU" },
  { name: "Barcelona", lat: 41.3851, lng: 2.1734, region: "EU" },
  { name: "Milan", lat: 45.4642, lng: 9.1900, region: "EU" },
  { name: "Munich", lat: 48.1351, lng: 11.5820, region: "EU" },
];

const ALL_CITIES = [...US_CITIES, ...EU_CITIES];

type Props = {
  data: TransactionStatsEntrySchema[];
  scope: "daily" | "weekly" | "monthly";
};

export default function FaultyTransactionsMap(props: Props) {
  const { resolvedTheme } = useTheme();

  const geojson: GeoJSONSourceSpecification["data"] = useMemo(
    () => ({
      type: "FeatureCollection",
      features: props.data.flatMap((entry) => {
        // For each time period, create a point for each transaction
        // We'll use the count of denied and alerted transactions
        const totalTransactions = entry.count.denied + entry.count.alerted;
        if (totalTransactions === 0) return [];

        // Distribute transactions across cities
        return Array.from({ length: totalTransactions }, (_, index) => {
          const cityIndex = index % ALL_CITIES.length;
          const city = ALL_CITIES[cityIndex]!; // We know this is safe because of the modulo
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [city.lng, city.lat],
            },
            properties: {
              timestamp: entry.timestamp,
              count: totalTransactions,
              city: city.name,
              region: city.region,
            },
          };
        });
      }),
    }),
    [props.data],
  );

  const mapStyle =
    resolvedTheme === "dark"
      ? "mapbox://styles/mapbox/dark-v10"
      : "mapbox://styles/mapbox/light-v10";

  return (
    <div className="h-full w-full">
      <Map
        initialViewState={{
          latitude: 48.0,
          longitude: 0.0,
          zoom: 2,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <Source id="faulty-transactions" type="geojson" data={geojson}>
          <Layer {...heatmapLayer} />
        </Source>
      </Map>
    </div>
  );
}
