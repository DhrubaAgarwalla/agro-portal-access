import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import farmBackground from "@/assets/farm-background.jpg";
import { Shield, Users, Package, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${farmBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gov-primary rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Agricultural Supply Chain</h1>
                <p className="text-sm text-muted-foreground">Government of Odisha</p>
              </div>
            </div>
            <Button onClick={() => navigate("/auth")} variant="outline">
              Sign In
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-foreground mb-6">
                Blockchain-Based Supply Chain
                <span className="block text-gov-primary">Transparency for Agriculture</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Ensuring transparency, traceability, and trust in agricultural produce 
                from farm to table through cutting-edge blockchain technology.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/auth")}
                  className="bg-gov-primary hover:bg-gov-primary/90"
                >
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="bg-card/80 backdrop-blur-sm border-border/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-gov-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Secure & Transparent</h3>
                  <p className="text-muted-foreground text-sm">
                    Immutable blockchain records ensure data integrity and transparency
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-gov-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Farmer Empowerment</h3>
                  <p className="text-muted-foreground text-sm">
                    Direct access to markets and fair pricing for agricultural produce
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/20">
                <CardContent className="p-6 text-center">
                  <Package className="w-12 h-12 text-gov-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Full Traceability</h3>
                  <p className="text-muted-foreground text-sm">
                    Track produce from farm origin to final consumer destination
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-gov-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
                  <p className="text-muted-foreground text-sm">
                    Real-time market data and analytics for informed decisions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="bg-gov-primary/10 backdrop-blur-sm border-gov-primary/20 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Ready to Transform Agriculture?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of farmers already using our platform to ensure 
                    transparency and get fair prices for their produce.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/auth")}
                    className="bg-gov-primary hover:bg-gov-primary/90"
                  >
                    Start Your Journey
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-border/20 backdrop-blur-sm mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 Government of Odisha - Electronics & IT Department. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;