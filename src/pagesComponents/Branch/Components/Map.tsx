import React, { useRef, useEffect, useCallback, useState } from "react";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-geosearch/dist/geosearch.css";
import { handleAddress } from "@/libs/commons";
import { GeoSearchLocationEvent, MapBranchProps, SearchControlBranchProps } from "../Branch.types";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const SearchControl: React.FC<SearchControlBranchProps> = ({ setSelected }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        "accept-language": "id-ID",
        countrycodes: "ID",
      },
    });

    const searchControl = GeoSearchControl({
      provider,
      style: "bar",
      retainZoomLevel: false,
      showMarker: false,
      autoClose: true,
      searchLabel: "Cari lokasi...",
      notFoundMessage: "Lokasi tidak ditemukan",
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", async (e) => {
      const event = e as unknown;

      if ((event as GeoSearchLocationEvent).location) {
        const geoEvent = event as GeoSearchLocationEvent;
        setSelected({
          address: geoEvent.location.label,
          coords: [geoEvent.location.y, geoEvent.location.x],
        });
      }
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
};

const MarkerControl: React.FC<SearchControlBranchProps> = ({ setSelected }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const getDisplayAddress = await handleAddress(lat, lng);
      setSelected({
        address: getDisplayAddress,
        coords: [lat, lng],
      });
    },
  });
  return null;
};

const MapComponent: React.FC<MapBranchProps> = ({ type, branch, setBranch }) => {
  const editableFGRef = useRef<L.FeatureGroup | null>(null);

  const [selected, setSelected] = useState<{ coords: L.LatLngExpression; address: string } | undefined>(undefined);

  const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    if (type === "edited" && editableFGRef.current) {
      const defaultPolygon = L.polygon(
        branch.cabangMapPointings.map((point) => [+point.latitude, +point.longitude]),
        {
          color: "#36597D",
          fillColor: "#36597D",
          weight: 3,
          fillOpacity: 0.3,
        },
      );
      editableFGRef.current.clearLayers();
      editableFGRef.current.addLayer(defaultPolygon);
    }
  }, [type, branch]);

  const onCreated = useCallback(
    (e: L.DrawEvents.Created) => {
      const layer = e.layer;

      if (layer instanceof L.Polygon) {
        layer.setStyle({
          color: "#36597D",
          fillColor: "#36597D",
          weight: 3,
          fillOpacity: 0.3,
        });

        const latLngs = layer.getLatLngs()[0] as L.LatLng[];

        const limitedLatLngs = latLngs.slice(0, 4);

        const mapPoints = limitedLatLngs.map((point) => ({
          latitude: point.lat.toString(),
          longitude: point.lng.toString(),
        }));

        layer.setLatLngs(limitedLatLngs);

        setBranch((prev) => {
          if (!prev) {
            return {
              cabangMapPointings: mapPoints,
            };
          }
          return {
            ...prev,
            cabangMapPointings: mapPoints,
          };
        });
      }

      if (editableFGRef.current) {
        editableFGRef.current.addLayer(layer);
      }
    },
    [setBranch],
  );

  const onEdited = useCallback(
    (e: L.DrawEvents.Edited) => {
      const layers = e.layers;

      layers.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          const mapPoints = (layer.getLatLngs()[0] as L.LatLng[]).map((point) => ({
            latitude: point.lat.toString(),
            longitude: point.lng.toString(),
          }));

          setBranch((prev) => {
            if (prev) {
              return {
                ...prev,
                cabangMapPointings:
                  type === "created"
                    ? mapPoints
                    : prev.cabangMapPointings.map((point, index) => ({
                        id: point.id,
                        latitude: mapPoints[index].latitude,
                        longitude: mapPoints[index].longitude,
                      })),
              };
            }
            return null;
          });
        }
      });
    },
    [type, setBranch],
  );

  const onDeleted = useCallback(() => {
    if (type === "created") {
      setBranch(null);
    }
    if (type === "edited") {
      setBranch((prev) => {
        if (prev) {
          return {
            ...prev,
            cabangMapPointings: [],
          };
        }
        return null;
      });
    }
  }, [type, setBranch]);

  const getBounds = () => {
    if (branch.cabangMapPointings.length > 0) {
      return branch.cabangMapPointings.map((point) => [+point.latitude, +point.longitude] as [number, number]);
    }
    return L.latLngBounds([
      [-6.5, 106.5],
      [-6.1, 107.0],
    ]);
  };

  return (
    <MapContainer scrollWheelZoom={false} bounds={getBounds()} style={{ width: "100%", height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selected && (
        <Marker position={selected.coords} draggable={false} icon={DefaultIcon}>
          <Popup offset={[0, -25]}>{selected.address}</Popup>
        </Marker>
      )}
      <MarkerControl setSelected={setSelected} />
      <SearchControl setSelected={setSelected} />
      <FeatureGroup ref={editableFGRef}>
        <EditControl
          position="bottomleft"
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
          draw={{
            polygon: type === "created" || branch.cabangMapPointings.length === 0,
            rectangle: false,
            polyline: false,
            circle: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;
