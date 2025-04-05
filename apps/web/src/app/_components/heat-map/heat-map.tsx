"use client";

import React, { useMemo } from "react";
import Map, {
  Source,
  Layer,
  GeoJSONSourceSpecification,
} from "react-map-gl/mapbox";
import { faultyTransactions } from "./heat-map.mock";
import { heatmapLayer } from "./map-style";
import { useTheme } from "next-themes";
import { filterTransactionsWithValidLocation } from "~/app/_lib/filter-transation-locations";

export default function FaultyTransactionsMap() {
  const { resolvedTheme } = useTheme();

  const geojson: GeoJSONSourceSpecification["data"] = useMemo(
    () => ({
      type: "FeatureCollection",
      features: filterTransactionsWithValidLocation(faultyTransactions).map(
        (tx) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [tx.metadata.location.lng, tx.metadata.location.lat],
          },
          properties: {
            id: tx.id,
            amount: tx.amount,
          },
        }),
      ),
    }),
    [],
  );

  const mapStyle =
    resolvedTheme === "dark"
      ? "mapbox://styles/mapbox/dark-v10"
      : "mapbox://styles/mapbox/light-v10";

  return (
    <div className="h-full w-full">
      <Map
        initialViewState={{
          latitude: 39.5,
          longitude: -98.35,
          zoom: 3,
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
