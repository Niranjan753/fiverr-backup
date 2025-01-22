interface PlaceholderProps {
  width: number;
  height: number;
  text: string;
  className?: string;
}

export default function Placeholder({ width, height, text, className = '' }: PlaceholderProps) {
  return (
    <div 
      className={`bg-[#e31837] text-white flex items-center justify-center ${className}`}
      style={{ 
        width: width, 
        height: height,
        fontSize: Math.min(width, height) * 0.2
      }}
    >
      {text}
    </div>
  );
}
