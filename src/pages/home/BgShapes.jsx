export const BgShapes = () => {
  return (
    <>
      {/* Bg shapes big ones */}
      <div className="absolute inset-0 opacity-7">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-80 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Bg shapes small 1 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300 opacity-20 rounded-full mix-blend-multiply filter blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-300 opacity-30 rounded-full mix-blend-multiply filter blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-green-300 opacity-20 rounded-full mix-blend-multiply filter blur-lg animate-pulse delay-1500"></div>
      </div>

      {/* Bg shapes small 2 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-80 rounded-full filter blur animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 opacity-30 rounded-full filter blur animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-blue-400 opacity-20 rounded-full filter blur animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-400 opacity-80 rounded-full filter blur animate-pulse delay-1500"></div>
      </div>
    </>
  );
};
