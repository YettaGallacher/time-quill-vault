import { Clock, Lock, Shield, Key, Mail, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Clock,
    title: "Time-Locked Messages",
    description: "Set precise dates or conditions for when your message should be revealed",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption ensures your messages remain private until unlocked",
  },
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Leveraging blockchain technology for tamper-proof message storage",
  },
  {
    icon: Key,
    title: "Executor Verification",
    description: "Designate trusted executors who can verify and trigger message delivery",
  },
  {
    icon: Mail,
    title: "Digital Wills",
    description: "Create legally binding digital wills with secure inheritance instructions",
  },
  {
    icon: Users,
    title: "Multi-Recipient",
    description: "Send encrypted messages to multiple recipients with individual unlock conditions",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-parchment-dark/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-ink">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 font-garamond italic">
          Secure, encrypted messages that reveal themselves at just the right time
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
                <p className="text-muted-foreground font-garamond">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
