export default function VideoHero() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/crackers-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay for better text contrast if needed */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
}
