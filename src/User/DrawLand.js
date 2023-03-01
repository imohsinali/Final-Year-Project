import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import "./styles.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
});

export default class App extends Component {
  onDrawCreate = ({ features }) => {
    console.log(features);
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };

  render() {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            text: "Fort Greene",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-73.97777080535889, 40.69336192556367],
                [-73.97704124450682, 40.68986390865585],
                [-73.97315740585327, 40.68970120572578],
                [-73.97388696670532, 40.69323177008439],
                [-73.97777080535889, 40.69336192556367],
              ],
            ],
          },
        },
      ],
    };

    const geojsonStyles = {
      lineLayout: {
        "line-join": "round",
        "line-cap": "round",
      },
      linePaint: {
        "line-color": "#ff11ff",
        "line-width": 4,
        "line-opacity": 1,
      },
      symbolLayout: {
        "text-field": "{text}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
        "text-size": {
          base: 1,
          stops: [
            [9, 9],
            [14, 12],
          ],
        },
      },
      symbolPaint: {
        "text-color": "rgba(0, 0, 0, 1)",
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 2,
      },
    };

    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          zoom={[16]}
          center={[-73.9757752418518, 40.69144210646147]}
        >
          <DrawControl
            position="top-left"
            onDrawCreate={this.onDrawCreate}
            onDrawUpdate={this.onDrawUpdate}
          />
          <GeoJSONLayer {...geojsonStyles} data={geojson} />
        </Map>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
