import { useRef } from "react";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const BgShapes = () => {
  const blobPositions = useRef({
    blob1: { top: getRandomNumber(1, 100), left: getRandomNumber(1, 100) },
    blob2: { top: getRandomNumber(1, 80), left: getRandomNumber(1, 80) },
    blob3: { top: getRandomNumber(1, 60), left: getRandomNumber(1, 60) },
    blobSm1: { top: getRandomNumber(1, 100), left: getRandomNumber(1, 100) },
    blobSm2: { top: getRandomNumber(1, 90), left: getRandomNumber(1, 90) },
    blobSm3: { top: getRandomNumber(1, 80), left: getRandomNumber(1, 80) },
    blobXs1: { top: getRandomNumber(1, 100), left: getRandomNumber(1, 100) },
    blobXs2: { top: getRandomNumber(1, 90), left: getRandomNumber(1, 69) },
    blobXs3: { top: getRandomNumber(1, 80), left: getRandomNumber(1, 68) },
    blobXs4: { top: getRandomNumber(1, 70), left: getRandomNumber(1, 67) },
  });
  const { blob1, blob2, blob3, blobSm1, blobSm2, blobSm3, blobXs1, blobXs2, blobXs3, blobXs4 } = blobPositions.current;

  return (
    <>
      {/* Bg blobs big ones */}
      <div className="absolute inset-0 opacity-6 pointer-events-none overflow-hidden">
        <div
          style={{ top: `${blob1.top}%`, left: `${blob1.left}%` }}
          className="absolute top-20 left-20 size-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse "
        ></div>
        <div
          style={{ top: `${blob2.top}%`, left: `${blob2.left}%` }}
          className="absolute top-40 right-20 size-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
        ></div>
        <div
          style={{ top: `${blob3.top}%`, left: `${blob3.left}%` }}
          className="absolute -bottom-8 left-80 size-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"
        ></div>
      </div>

      {/* Bg blobs small */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div
          style={{ top: `${blobSm1.top}%`, left: `${blobSm1.left}%` }}
          className="bg-shape-small-1 absolute w-24 h-24 bg-blue-700 rounded-full filter blur animate-pulse delay-500"
        ></div>
        <div
          style={{ top: `${blobSm2.top}%`, left: `${blobSm2.left}%` }}
          className="bg-shape-small-1 absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-700 rounded-full filter blur animate-pulse delay-1000"
        ></div>
        <div
          style={{ top: `${blobSm3.top}%`, left: `${blobSm3.left}%` }}
          className="bg-shape-small-1 absolute top-1/2 right-1/3 w-12 h-12 bg-green-700 rounded-full filter blur animate-pulse delay-1500"
        ></div>
      </div>

      {/* Bg blobs tiny */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{ top: `${blobXs1.top}%`, left: `${blobXs1.left}%` }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-80 rounded-full filter blur animate-pulse"
        ></div>
        <div
          style={{ top: `${blobXs2.top}%`, left: `${blobXs2.left}%` }}
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 opacity-30 rounded-full filter blur animate-pulse delay-500"
        ></div>
        <div
          style={{ top: `${blobXs3.top}%`, left: `${blobXs3.left}%` }}
          className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-blue-400 opacity-20 rounded-full filter blur animate-pulse delay-1000"
        ></div>
        <div
          style={{ top: `${blobXs4.top}%`, left: `${blobXs4.left}%` }}
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 opacity-80 rounded-full filter blur animate-pulse delay-1500"
        ></div>
      </div>
    </>
  );
};
