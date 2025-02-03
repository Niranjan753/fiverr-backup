export default function VideoHero() {
  return (
    <div className="relative w-full h-[45vh] md:h-[350px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160%] md:w-[110%] h-auto object-cover"
      >
        <source src="/cra.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay for better text contrast if needed */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Black fade gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 70%,
              rgba(0, 0, 0, 0.8) 90%,
              rgba(0, 0, 0, 1) 100%
            )
          `
        }}
      />
    </div>
  );
}
