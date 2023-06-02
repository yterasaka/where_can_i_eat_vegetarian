import AppContext from "@/context/AppContext";
import { MarkerF } from "@react-google-maps/api";
import { useContext } from "react";

const ActiveMarker = ({ businessList }) => {
  const { selectedIndex } = useContext(AppContext);

  return (
    <MarkerF
      key={selectedIndex}
      position={{
        lat: businessList[selectedIndex - 1]?.coordinates.latitude,
        lng: businessList[selectedIndex - 1]?.coordinates.longitude,
      }}
      label={{
        text: `${selectedIndex}`,
        color: "#ff0000",
      }}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#fff",
        fillOpacity: 1,
        scale: 14,
        strokeColor: "#ff0000",
        strokeWeight: 1,
      }}
      zIndex={999}
    />
  );
};

export default ActiveMarker;
