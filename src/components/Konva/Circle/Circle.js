import React from "react";
import { Circle as KonvaCircle } from "react-konva";

const Circle = (props) => {
  const {
    x = 100,
    y = 100,
    radis = 50,
    color = "green",
    isDragging = false,
  } = props;

  const [property, setProperty] = React.useState({
    x,
    y,
    radis,
    color,
    isDragging,
  });

  return (
    <KonvaCircle
      x={property.x}
      y={property.y}
      radius={property.radis}
      fill={property.color}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.2}
      shadowOffsetX={property.isDragging ? 10 : 5}
      shadowOffsetY={property.isDragging ? 10 : 5}
      scaleX={property.isDragging ? 1.2 : 1}
      scaleY={property.isDragging ? 1.2 : 1}
    />
  );
};

export default Circle;
