import React from "react";
import { Stage, Layer, Star, Text, Circle, Transformer } from "react-konva";
import { useOutletStore } from "../../store/outletStore";
import Konva from "konva";

function CircleGround() {
  const { outletInfo } = useOutletStore();
  const [circles, setCircles] = React.useState([]);
  const circleRefs = React.useRef([]);

  const generateShapes = () => {
    return [...Array(10)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * outletInfo.width,
      y: Math.random() * outletInfo.height,
      rotation: Math.random() * 180,
      isDragging: false,
      color: Konva.Util.getRandomColor(),
    }));
  };

  React.useEffect(() => {
    if (outletInfo.width > 100) {
      setCircles(generateShapes());
    }
  }, [outletInfo]);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setCircles(
      circles.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const newStars = circles.map((star) => {
      if (star.id === id) {
        return {
          ...star,
          isDragging: false,
        };
      }
      return star;
    });
    setCircles(newStars);
  };

  const handleDragMove = (e) => {
    const id = e.target.id();
    const newStars = circles.map((star) => {
      if (star.id === id) {
        return {
          ...star,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return star;
    });
    setCircles(newStars);
  };

  console.log(circleRefs?.current?.[1]?.x());

  return (
    <Stage width={outletInfo.width} height={outletInfo.height}>
      <Layer>
        {circles?.length > 1 &&
          circles.map((circle, index) => (
            <Circle
              ref={(node) => (circleRefs.current[index] = node)} // 設定Circle的ref
              key={circle.id}
              x={circle.x}
              y={circle.y}
              radius={50}
              fill={circle.color}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragMove={handleDragMove}
              draggable
            />
          ))}
      </Layer>
    </Stage>
  );
}

export default CircleGround;
