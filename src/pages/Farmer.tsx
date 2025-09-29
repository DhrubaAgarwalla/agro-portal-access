import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, QrCode, Upload, UserCircle } from "lucide-react";

// Random ID generator
const generateId = () => `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Farmer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connectedAddress } = useAuthStore();

  // Form state
  const [produceName, setProduceName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [quality, setQuality] = useState("");
  const [location, setLocation] = useState("");

  // Local data state
  const [produceListings, setProduceListings] = useState([
    { id: "PRD-001", produce: "Wheat", quantity: "20kg", date: "01-09", status: "Verified" },
    { id: "PRD-002", produce: "Rice", quantity: "50kg", date: "03-09", status: "Pending" },
  ]);

  const [transactions] = useState([
    { id: "TX-001", produce: "Wheat", date: "01-09", amount: "₹5,000", hash: "0x123...abc" },
    { id: "TX-002", produce: "Rice", date: "02-09", amount: "₹8,000", hash: "0x456...def" },
  ]);

  const handleSignOut = () => {
    // Clear the auth store
    useAuthStore.setState({
      authUser: false,
      connectedAddress: null,
      contractInstance: null
    });

    toast({
      title: "Signed out successfully",
      description: "Wallet disconnected. You have been logged out.",
    });
    
    // Navigate to login page
    navigate("/");
  };

  const handleAddProduce = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!produceName || !quantity || !expectedPrice || !quality || !location) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    const newProduce = {
      id: generateId(),
      produce: produceName,
      quantity: quantity,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }),
      status: "Pending"
    };

    setProduceListings([newProduce, ...produceListings]);
    
    // Reset form
    setProduceName("");
    setQuantity("");
    setExpectedPrice("");
    setQuality("");
    setLocation("");

    toast({
      title: "Produce added!",
      description: `${produceName} (${quantity}) has been added with ID: ${newProduce.id}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-primary">Gov. Odisha Agriculture</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              
              {connectedAddress && (
                <p className="text-xs text-muted-foreground font-mono">
                  {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                </p>
              )}
            </div>
            <Avatar>
              <AvatarFallback>
                <UserCircle className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Add New Produce */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Add New Produce</h2>
          <form onSubmit={handleAddProduce}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={produceName} onValueChange={setProduceName}>
                <SelectTrigger>
                  <SelectValue placeholder="Produce Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Corn">Corn</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Pulses">Pulses</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Quantity (e.g., 20kg)" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Input 
                placeholder="Expected Price (e.g., ₹500)" 
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
              />
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Grade A">Grade A</SelectItem>
                  <SelectItem value="Grade B">Grade B</SelectItem>
                  <SelectItem value="Grade C">Grade C</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
            <Button type="submit" className="mt-4">Submit</Button>
          </form>
        </div>

        {/* My Produce Listings */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">My Produce Listings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Produce</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">QR Code</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {produceListings.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.produce}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">
                      <Button variant="outline" size="sm">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="p-2">
                      <Badge variant={item.status === "Verified" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Produce</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="p-2">{tx.produce}</td>
                    <td className="p-2">{tx.date}</td>
                    <td className="p-2">{tx.amount}</td>
                    <td className="p-2 font-mono text-sm">{tx.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Generate QR Code */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Generate QR Code</h2>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Produce" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm">New buyer request for Rice.</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm">Blockchain verification complete for Wheat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;