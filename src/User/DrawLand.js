import "./styles.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { Container, TextField, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { TransactionContext } from "../StateMangement/Context";


mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYWluYmFsdGkiLCJhIjoiY2xhNGE2ZWd0MHg4ZTNwbXpiN2Q3a2ZsYiJ9.2J8OizwcJnm4U0Idhsu5IA";

export default function DrawLand() {
      const { setCoordinates } = React.useContext(TransactionContext);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(65);
  const [lat, setLat] = useState(30);
  const [zoom, setZoom] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [polygon, setPolygon] = useState([]);
  const coordinatesString = polygon.map((point) => point.join(",")).join(";");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: zoom,
      height: "calc(100vh - 130px)",
      width: "100%",
    });
    handleDraw();
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const handleSearch = () => {
    if (!searchText) return;
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchText
      )}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        const [lng, lat] = data.features[0].center;
        map.current.setCenter([lng, lat]);
        map.current.setZoom(14);
      });
  };

  const handleDraw = () => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    map.current.addControl(draw);

    map.current.on("draw.create", (e) => {
      setPolygon(e.features[0].geometry.coordinates[0]);
    });

    map.current.on("draw.delete", () => {
      setPolygon([]);
    });
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        mt: 2,
        mb: 4,
      }}
    >
      <div className="search-bar">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <Button onClick={() => setCoordinates(coordinatesString)}>Save Land</Button>
    </Container>
  );
}

