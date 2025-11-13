import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <Button variant="outline" className="gap-2 font-garamond">
          <Wallet className="w-4 h-4" />
          Connect Rainbow Wallet
        </Button>
      </div>
    </header>
  );
};
