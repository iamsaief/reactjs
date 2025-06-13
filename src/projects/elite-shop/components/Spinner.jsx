export const Spinner = ({ size = "24px", color = "black" }) => {
  return (
    <div
      className="size-5 animate-spin rounded-full border-2 border-t-(--primary) border-l-(--primary) border-r-(--primary)/20 border-b-(--primary)/20"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: `${color} ${color} color-mix(in oklab, ${color} 20%, transparent) color-mix(in oklab, ${color} 20%, transparent)`,
      }}
    />
  );
};
