

import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import { Button, Input } from "antd";
import "antd/dist/antd.css";

const MAPBOX_TOKEN =   "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA"


const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "600px",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
  });

  const [geojson, setGeojson] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleSave = () => {
    const canvas = document.getElementsByClassName("mapboxgl-canvas")[0];
    const dataURL = canvas.toDataURL("image/png");
    FileDownload(dataURL, `${imageName}.png`);
  };
const handleSearch = (value) => {
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    value
  )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

  fetch(geocodingUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.features.length > 0) {
        const feature = data.features[0];
        setViewport({
          ...viewport,
          latitude: feature.center[1],
          longitude: feature.center[0],
          zoom: 14,
        });
      }
    })
    .catch((error) => console.log(error));
};


  return (
    <div>
      <Input.Search
        placeholder="Search for a location"
        onSearch={handleSearch}
        enterButton
      />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <NavigationControl />
        {geojson && (
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer
              id="my-layer"
              type="fill"
              paint={{
                "fill-color": "#f00",
                "fill-opacity": "1",
              }}
            />
          </Source>
        )}
        <MapboxDraw
          data={geojson}
          onChange={(data) => setGeojson(data)}
          mode="draw_polygon"
        />
      </ReactMapGL>
      <div style={{ marginTop: "10px" }}>
        <Input
          placeholder="Image name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Map;
 
