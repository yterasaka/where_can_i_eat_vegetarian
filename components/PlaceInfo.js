import React, { useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
// ドキュメントには書かれてないけど、React 18+ では `Marker` ではなく `MarkerF` と書かないとマーカーが表示されない
// InfoWindowも `InfoWindowsF` と書かないとうまく機能しない

export default function PlaceInfo() {
  // マーカー
  const places = [
    {
      info: "info1",
      location: { lat: 35.710057714926265, lng: 139.81071829999996 },
    },
    {
      info: "info2",
      location: { lat: 35.69731, lng: 139.7747 },
    },
  ];

  // 選択（クリック）したマーカーのステート
  const [selected, setSelected] = useState(null);

  return (
    <>
      {places.map((marker) => (
        <MarkerF
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onClick={() => {
            setSelected(marker);
            // クリックで<InfoWindow>が描画される
            console.log(selected);
          }}
          // `icon` propsでアイコン表示の設定も可能
          // 詳しくはドキュメントを参照
        />
      ))}

      {selected ? (
        // MarkerがクリックされたときにInfoWindowが表示される
        <InfoWindowF
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>{selected.info}</div>
        </InfoWindowF>
      ) : null}
    </>
  );
}
