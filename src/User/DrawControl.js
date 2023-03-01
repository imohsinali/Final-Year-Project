import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

export default function DrawControl(props) {
  const {
    position,
    onCreate = () => {},
    onUpdate = () => {},
    onDelete = () => {},
  } = props;

  useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position,
    }
  );

  return (
    <div>
        hello
    </div>
  );
}
