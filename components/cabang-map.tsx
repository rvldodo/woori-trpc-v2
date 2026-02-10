import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { MapMarkerProps } from "@/types";
import CardContent from "@mui/material/CardContent";

type Props = {
  locations: Array<MapMarkerProps>;
  zoom?: number;
};

export default function CabangKamiMap({ locations, zoom = 8 }: Props) {
  // Create a unique key based on the map state to force re-render
  const mapKey = `${locations.length === 1 ? locations[0]?.id : "all"}-${zoom}`;

  return (
    <Card className="w-full bg-none bg-transparent shadow-none p-0">
      <CardContent className="overflow-hidden bg-none w-full h-[600px] rounded-lg p-0 m-0">
        <Map
          interactive={false}
          key={mapKey}
          center={
            locations.length === 1
              ? [
                  Number(locations[0]?.lng.toFixed(4)),
                  Number(locations[0]?.lat.toFixed(4)),
                ]
              : [118.0148, -2.5489]
          }
          zoom={zoom}
        >
          <MapControls
            position="bottom-right"
            showZoom
            showCompass
            showFullscreen
          />
          {locations.map((location) => (
            <MapMarker
              key={location.id}
              longitude={location.lng}
              latitude={location.lat}
            >
              <MarkerContent>
                <div className="size-4 rounded-full bg-[#007bc7] border-2 border-white shadow-lg" />
              </MarkerContent>
              <MarkerTooltip>{location.name}</MarkerTooltip>
              <MarkerPopup>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{location.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      </CardContent>
    </Card>
  );
}
