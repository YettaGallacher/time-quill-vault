import { BadgeCheck } from "lucide-react";

interface WaxSealProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const WaxSeal = ({ size = "md", animated = true }: WaxSealProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeClasses[size]} rounded-full bg-wax-seal flex items-center justify-center relative ${
          animated ? "animate-glow-pulse" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary to-wax-seal opacity-80"></div>
        <BadgeCheck className="w-1/2 h-1/2 text-gold relative z-10" />
      </div>
    </div>
  );
};
