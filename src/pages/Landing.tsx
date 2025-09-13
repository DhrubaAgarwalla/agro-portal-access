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

        {/* Main Content */}
        <main className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Blockchain-Based Supply Chain Transparency for Agricultural Produce
              </h2>
              <Card className="bg-card/90 backdrop-blur-sm border-border/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Welcome</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The Government of Odisha presents a transparent and decentralized platform to track agricultural produce from farm to consumer. Our platform ensures fair pricing, verifies produce quality and origin, and protects stakeholders in the supply chain.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Guidelines Section */}
            <div className="mb-16">
              <Card className="bg-card/90 backdrop-blur-sm border-border/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Guidelines for Users</h3>
                  <ul className="text-muted-foreground space-y-3 text-left">
                    <li className="flex items-start">
                      <span className="text-gov-primary mr-2">•</span>
                      Scan QR codes on packaging or produce labels to access full details.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gov-primary mr-2">•</span>
                      Verify transaction records before making purchases.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gov-primary mr-2">•</span>
                      Report suspicious activity through the complaint section.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gov-primary mr-2">•</span>
                      Ensure your device is connected to the internet while accessing the platform.
                    </li>
                    <li className="flex items-start">
                      <span className="text-gov-primary mr-2">•</span>
                      Follow data privacy and usage guidelines as provided during registration.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Section */}
            <div className="mb-16">
              <Card className="bg-card/90 backdrop-blur-sm border-border/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Us</h3>
                  <div className="text-muted-foreground text-left space-y-2">
                    <p className="font-semibold text-foreground">Electronics & IT Department, Government of Odisha</p>
                    <p>📍 Bhubaneswar, Odisha, India</p>
                    <p>📞 Helpline: +91-12345-67890</p>
                    <p>📧 Email: support@odishaagri.gov.in</p>
                    <p>🌐 Website: www.odishaagri.gov.in</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Access Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="bg-gov-primary hover:bg-gov-primary/90"
              >
                Access Platform
              </Button>
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