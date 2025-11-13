import { Lock, Feather } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <Feather className="w-8 h-8 text-ink transition-transform group-hover:rotate-12" />
        <Lock className="w-4 h-4 text-gold absolute -bottom-1 -right-1 transition-all group-hover:scale-110" />
      </div>
      <span className="font-playfair text-2xl font-bold text-ink tracking-tight">
        LastKey Letters
      </span>
    </div>
  );
};
