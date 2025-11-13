import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { WaxSeal } from "@/components/WaxSeal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Lock, Mail } from "lucide-react";

const formSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  unlockDate: z.string().min(1, "Unlock date is required"),
});

const CreateLetter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      message: "",
      unlockDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Letter Created",
      description: "Your encrypted letter has been sealed and will unlock on the specified date.",
    });
    // Here you would integrate with your backend/blockchain to store the encrypted letter
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 space-y-4">
            <div className="flex justify-center">
              <WaxSeal size="sm" animated={true} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-ink font-playfair">
              Create Your Letter
            </h1>
            <p className="text-lg text-muted-foreground font-garamond italic">
              Compose a message that will be sealed until the right moment
            </p>
          </div>

          <Card className="p-8 bg-card/90 backdrop-blur-sm border-border/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-garamond text-ink">
                        <Mail className="w-4 h-4" />
                        Recipient Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0x..."
                          className="font-garamond"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-garamond text-ink">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What is this letter about?"
                          className="font-garamond"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-garamond text-ink">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          className="min-h-[200px] font-garamond"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unlockDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-garamond text-ink">
                        <Calendar className="w-4 h-4" />
                        Unlock Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          className="font-garamond"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 font-garamond"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2 font-garamond"
                  >
                    <Lock className="w-4 h-4" />
                    Seal & Encrypt Letter
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateLetter;
