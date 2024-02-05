import React from "react";
import { Stage, Layer, Star, Text } from "react-konva";
import { Html } from "react-konva-utils";
import logo from "./logo.svg";
import "./App.css";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

function App() {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const newStars = stars.map((star) => {
      if (star.id === id) {
        return {
          ...star,
          isDragging: false,
        };
      }
      return star;
    });
    setStars(newStars);
  };

  const handleDragMove = (e) => {
    const id = e.target.id();
    const newStars = stars.map((star) => {
      if (star.id === id) {
        return {
          ...star,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return star;
    });
    setStars(newStars);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Try to drag a star" />
            {stars.map((star) => (
              <>
                <Html
                  divProps={{
                    style: {
                      position: "absolute",
                      top: `${star.y}px`,
                      left: `${star.x}px`,
                    },
                  }}
                >
                  <button
                    placeholder="DOM"
                    style={{
                      width: 50,
                    }}
                    onClick={() =>
                      setStars(stars.filter((s) => s.id !== star.id))
                    }
                  >
                    Delete
                  </button>
                </Html>
                <Star
                  key={star.id}
                  id={star.id}
                  x={star.x}
                  y={star.y}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="#89b717"
                  opacity={0.8}
                  draggable
                  rotation={star.rotation}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOpacity={0.6}
                  shadowOffsetX={star.isDragging ? 10 : 5}
                  shadowOffsetY={star.isDragging ? 10 : 5}
                  scaleX={star.isDragging ? 1.2 : 1}
                  scaleY={star.isDragging ? 1.2 : 1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragMove={handleDragMove}
                />
              </>
            ))}
          </Layer>
        </Stage>
      </header>
    </div>
  );
}

export default App;
