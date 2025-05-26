import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Calculator, Database, Brain, Cog, FileText } from "lucide-react";

const features = [
  {
    icon: <Calculator className="h-10 w-10 text-primary" />,
    title: "Solves Complex Problems",
    description: "Get step-by-step solutions to challenging mechanical engineering calculations and problems."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Explains Core Concepts",
    description: "Receive clear explanations of fundamental theories and principles in mechanical engineering."
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Provides Material Data",
    description: "Access information about various materials, their properties, and appropriate applications."
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "AI-Powered Insights",
    description: "Leverage advanced AI specifically trained on mechanical engineering knowledge."
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Design Assistance",
    description: "Get guidance on mechanical design principles, constraints, and optimization strategies."
  },
  {
    icon: <Cog className="h-10 w-10 text-primary" />,
    title: "ME-Focused",
    description: "An assistant that strictly focuses on mechanical engineering, providing relevant and accurate information."
  }
];

export function FeaturesSection() {
  return (
    <section id="features\" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Engineered for Engineers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI assistant is specifically designed to help mechanical engineers with their day-to-day challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 h-full">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}