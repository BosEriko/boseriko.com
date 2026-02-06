"use client";
import React, { useState, Fragment } from "react";

interface MasonryProps {
  images: string[];
  maxWidth?: number | 1000;
}

const Masonry: React.FC<MasonryProps> = ({ images, maxWidth = 1000 }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          maxWidth: `${maxWidth}px`,
          aspectRatio: "1 / 1",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "4px",
          margin: "0 auto",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(src)}
            style={{
              gridColumn: index === 0 ? "span 2" : "span 1",
              gridRow: index === 0 ? "span 2" : "span 1",
              overflow: "hidden",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            className="shadow-lg hover:scale-105 transition"
          >
            <img
              src={src}
              alt={`Masonry ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Masonry;
