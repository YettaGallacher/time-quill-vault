import { WaxSeal } from "./WaxSeal";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 paper-texture opacity-50"></div>
      <div className="absolute top-10 left-10 opacity-10">
        <WaxSeal size="lg" animated={false} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <WaxSeal size="lg" animated={false} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-ink leading-tight">
            Messages That Wait for the{" "}
            <span className="text-gold">Right Moment</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-garamond italic max-w-2xl mx-auto">
            Write digital wills and time-locked letters, encrypted until the perfect moment arrives
          </p>

          <div className="flex justify-center">
            <WaxSeal size="lg" animated={true} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="gap-2 font-garamond text-lg"
              onClick={() => navigate('/create')}
            >
              <Lock className="w-5 h-5" />
              Create Your First Letter
            </Button>
            <Button size="lg" variant="outline" className="gap-2 font-garamond text-lg">
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
