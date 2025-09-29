import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import farmBackground from "@/assets/farm-background.jpg";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo credentials
  const demoAccounts = {
    farmer: { email: "farmer@demo.com", password: "farmer123", route: "/farmer" },
    distributor: { email: "distributor@demo.com", password: "dist123", route: "/distributor" }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check demo credentials
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === demoAccounts.farmer.email && password === demoAccounts.farmer.password) {
        toast({
          title: "Welcome Farmer!",
          description: "Successfully signed in to your account.",
        });
        navigate(demoAccounts.farmer.route);
      } else if (email === demoAccounts.distributor.email && password === demoAccounts.distributor.password) {
        toast({
          title: "Welcome Distributor!",
          description: "Successfully signed in to your account.",
        });
        navigate(demoAccounts.distributor.route);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please use demo credentials: farmer@demo.com / farmer123 or distributor@demo.com / dist123",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully!",
        description: "Welcome to the Agricultural Supply Chain Platform.",
      });
      navigate("/farmer");
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${farmBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Government of Odisha</h1>
            <p className="text-sm text-muted-foreground">Electronics & IT Department</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-primary">Agricultural Supply Chain</h2>
            <p className="text-sm text-muted-foreground">Blockchain Transparency Platform</p>
          </div>
        </div>
      </div>

      {/* Auth Card */}
      <Card className="w-full max-w-md relative z-10 shadow-lg border-0" style={{ boxShadow: 'var(--shadow-card)' }}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Welcome</CardTitle>
          <CardDescription className="text-muted-foreground">
            Access the Agricultural Supply Chain Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
                  <p className="font-semibold">Demo Credentials:</p>
                  <p>👨‍🌾 Farmer: farmer@demo.com / farmer123</p>
                  <p>📦 Distributor: distributor@demo.com / dist123</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstname">First Name</Label>
                    <Input
                      id="signup-firstname"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastname">Last Name</Label>
                    <Input
                      id="signup-lastname"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Blockchain-Based Supply Chain Transparency for Agricultural Produce
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ensuring transparency in pricing, quality, and origin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;