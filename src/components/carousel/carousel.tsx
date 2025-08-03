import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right");
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleDotClick = (idx: number) => {
    setDirection(idx > current ? "right" : "left");
    setCurrent(idx);
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: 600 }}>
      {images.map((img, idx) => {
        let position = "translate-x-full opacity-0";
        if (idx === current) {
          position = "translate-x-0 opacity-100 z-10";
        } else if (
          idx === (current - 1 + images.length) % images.length &&
          direction === "right"
        ) {
          position = "-translate-x-full opacity-0";
        } else if (
          idx === (current + 1) % images.length &&
          direction === "left"
        ) {
          position = "translate-x-full opacity-0";
        }

        return (
          <img
            key={img}
            src={img}
            alt={`slide-${idx}`}
            className={`absolute top-0 left-0 rounded-xl shadow-lg transition-all duration-700 ease-in-out ${position}`}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;