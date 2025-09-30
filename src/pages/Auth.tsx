import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import farmBackground from "@/assets/farm-background.jpg";
import { walletRoutes } from "@/config/wallets";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [kycData, setKycData] = useState<any>({});
  const { toast } = useToast();
  const { connectWallet, isLoggingIn, connectedAddress } = useAuthStore();

  // Demo wallet addresses for routing (you can update these later)
  

  const handleWalletConnect = async () => {
  try {
    await connectWallet();
    
    // Get the connected address from the store
    const address = useAuthStore.getState().connectedAddress;
    
    if (address) {
      const lowerAddress = address.toLowerCase();
      
      // Check if address is in farmer array
      if (walletRoutes.farmer.some(wallet => wallet.toLowerCase() === lowerAddress)) {
        toast({
          title: "Welcome Farmer!",
          description: "Wallet connected successfully. Redirecting to farmer dashboard...",
        });
        navigate("/farmer");
      } 
      // Check if address is in distributor array
      else if (walletRoutes.distributor.some(wallet => wallet.toLowerCase() === lowerAddress)) {
        toast({
          title: "Welcome Distributor!",
          description: "Wallet connected successfully. Redirecting to distributor dashboard...",
        });
        navigate("/distributor");
      } 
      // Unregistered wallet
      else {
        toast({
          title: "Access Granted",
          description: "Wallet connected successfully. Redirecting to home page...",
        });
        navigate("/home");
      }
    }
  } catch (error) {
    console.error("Wallet connection failed:", error);
  }
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

  const getRoleSpecificFields = () => {
    switch (selectedRole) {
      case "farmer":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                id="farmName"
                placeholder="Enter your farm name"
                value={kycData.farmName || ""}
                onChange={e => setKycData({ ...kycData, farmName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="Enter farm size"
                value={kycData.farmSize || ""}
                onChange={e => setKycData({ ...kycData, farmSize: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cropTypes">Primary Crop Types</Label>
              <Input
                id="cropTypes"
                placeholder="e.g., Rice, Wheat"
                value={kycData.cropTypes || ""}
                onChange={e => setKycData({ ...kycData, cropTypes: e.target.value })}
                required
              />
            </div>
          </>
        );
      case "distributor":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                value={kycData.companyName || ""}
                onChange={e => setKycData({ ...kycData, companyName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warehouseCapacity">Warehouse Capacity (tons)</Label>
              <Input
                id="warehouseCapacity"
                type="number"
                placeholder="Enter warehouse capacity"
                value={kycData.warehouseCapacity || ""}
                onChange={e => setKycData({ ...kycData, warehouseCapacity: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transportLicense">Transport License Number</Label>
              <Input
                id="transportLicense"
                placeholder="Enter transport license number"
                value={kycData.transportLicense || ""}
                onChange={e => setKycData({ ...kycData, transportLicense: e.target.value })}
                required
              />
            </div>
          </>
        );
      case "inspector":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="certification">Certification Number</Label>
              <Input
                id="certification"
                placeholder="Enter certification number"
                value={kycData.certification || ""}
                onChange={e => setKycData({ ...kycData, certification: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                placeholder="Enter years of experience"
                value={kycData.yearsExperience || ""}
                onChange={e => setKycData({ ...kycData, yearsExperience: e.target.value })}
                required
              />
            </div>
          </>
        );
      case "retailer":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                placeholder="Enter your store name"
                value={kycData.storeName || ""}
                onChange={e => setKycData({ ...kycData, storeName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retailLicense">Retail License Number</Label>
              <Input
                id="retailLicense"
                placeholder="Enter retail license number"
                value={kycData.retailLicense || ""}
                onChange={e => setKycData({ ...kycData, retailLicense: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeLocation">Store Location</Label>
              <Input
                id="storeLocation"
                placeholder="Enter store address"
                value={kycData.storeLocation || ""}
                onChange={e => setKycData({ ...kycData, storeLocation: e.target.value })}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
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
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
                  <p className="font-semibold text-center">🔗 Connect Your Wallet</p>
                  <p className="text-center text-muted-foreground">
                    Connect your MetaMask wallet to access the platform
                  </p>
                  {connectedAddress && (
                    <p className="text-xs text-center text-green-600 break-all">
                      Connected: {connectedAddress}
                    </p>
                  )}
                </div>
                
                <Button 
                  onClick={handleWalletConnect}
                  className="w-full" 
                  disabled={isLoggingIn}
                  variant="default"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Connecting Wallet...
                    </>
                  ) : (
                    <>
                      🦊 Connect MetaMask Wallet
                    </>
                  )}
                </Button>

                
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-select">Select Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole} required>
                    <SelectTrigger id="role-select">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">🌾 Farmer</SelectItem>
                      <SelectItem value="distributor">🚚 Distributor</SelectItem>
                      <SelectItem value="inspector">🔍 Inspector</SelectItem>
                      <SelectItem value="retailer">🏪 Retailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstname">First Name</Label>
                    <Input
                      id="signup-firstname"
                      placeholder="First name"
                      value={kycData.firstName || ""}
                      onChange={e => setKycData({ ...kycData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastname">Last Name</Label>
                    <Input
                      id="signup-lastname"
                      placeholder="Last name"
                      value={kycData.lastName || ""}
                      onChange={e => setKycData({ ...kycData, lastName: e.target.value })}
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
                    value={kycData.email || ""}
                    onChange={e => setKycData({ ...kycData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={kycData.phone || ""}
                    onChange={e => setKycData({ ...kycData, phone: e.target.value })}
                    required
                  />
                </div>
                {/* Role-specific fields */}
                {getRoleSpecificFields()}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? "Submitting KYC..." : "Submit KYC"}
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