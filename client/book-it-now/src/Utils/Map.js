import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function MapLoc({cnt}) {
  const [position, setPostion] = useState()
  const [open, setOpen] = useState(false);


  return (
    <APIProvider apiKey="AIzaSyDH8N8vq9YnaetZp_J8XH0eSCtrRt0b4E8">
      <div style={{width: "100%", height: '200px' }}>
        <Map zoom={15} center={cnt} >
          <AdvancedMarker position={position}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}