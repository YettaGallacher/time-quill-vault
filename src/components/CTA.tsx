import { Button } from "./ui/button";
import { WaxSeal } from "./WaxSeal";
import { ScrollText, Wallet } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-30"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-12 text-center space-y-8 shadow-xl">
          <div className="flex justify-center">
            <WaxSeal size="md" animated={true} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-ink">
            Ready to Send a Message to the Future?
          </h2>
          
          <p className="text-xl text-muted-foreground font-garamond italic max-w-2xl mx-auto">
            Create your first encrypted letter today. Connect your Rainbow Wallet to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2 font-garamond text-lg">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </Button>
            <Button size="lg" variant="outline" className="gap-2 font-garamond text-lg">
              <ScrollText className="w-5 h-5" />
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
