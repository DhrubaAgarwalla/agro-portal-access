import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Package, LogOut, User, ShoppingCart, Truck, History } from "lucide-react";

// Random ID generator
const generateOrderId = () => `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const generateTxId = () => `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const Distributor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connectedAddress } = useAuthStore();

  // Bulk order form state
  const [bulkProduceType, setBulkProduceType] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [expectedDate, setExpectedDate] = useState("");

  // Available produce from farmers
  const [availableProduce] = useState([
    { id: "PRD-001", name: "Wheat", quantity: "20kg", price: "₹500", farmer: "Ramesh Kumar", location: "Cuttack", quality: "Premium" },
    { id: "PRD-002", name: "Rice", quantity: "50kg", price: "₹1200", farmer: "Suresh Patel", location: "Puri", quality: "Grade A" },
    { id: "PRD-003", name: "Vegetables", quantity: "30kg", price: "₹450", farmer: "Anjali Singh", location: "Bhubaneswar", quality: "Fresh" },
    { id: "PRD-004", name: "Pulses", quantity: "25kg", price: "₹800", farmer: "Madhav Rao", location: "Berhampur", quality: "Premium" },
  ]);

  // Current inventory
  const [inventory, setInventory] = useState([
    { id: "INV-001", name: "Wheat", quantity: "100kg", location: "Warehouse A", status: "In Stock" },
    { id: "INV-002", name: "Rice", quantity: "200kg", location: "Warehouse B", status: "In Stock" },
    { id: "INV-003", name: "Vegetables", quantity: "50kg", location: "Cold Storage", status: "Low Stock" },
  ]);

  // Delivery tracking
  const [deliveries, setDeliveries] = useState([
    { id: "DEL-001", produce: "Wheat", quantity: "50kg", from: "Cuttack", to: "Warehouse A", status: "In Transit", eta: "2 hours" },
    { id: "DEL-002", produce: "Rice", quantity: "100kg", from: "Puri", to: "Warehouse B", status: "Delivered", eta: "-" },
  ]);

  // Transaction history
  const [transactions, setTransactions] = useState([
    { id: "TX-001", produce: "Wheat", quantity: "50kg", amount: "₹1250", farmer: "Ramesh Kumar", date: "2025-01-10", hash: "0x7a8b9c..." },
    { id: "TX-002", produce: "Rice", quantity: "100kg", amount: "₹2400", farmer: "Suresh Patel", date: "2025-01-08", hash: "0x4d5e6f..." },
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

  const handlePlaceOrder = (produceItem: any) => {
    const orderId = generateOrderId();
    const txId = generateTxId();
    
    // Add to transactions
    const newTransaction = {
      id: txId,
      produce: produceItem.name,
      quantity: produceItem.quantity,
      amount: produceItem.price,
      farmer: produceItem.farmer,
      date: new Date().toLocaleDateString('en-IN'),
      hash: `0x${Math.random().toString(16).substr(2, 8)}...`
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Add to deliveries
    const newDelivery = {
      id: `DEL-${Date.now()}`,
      produce: produceItem.name,
      quantity: produceItem.quantity,
      from: produceItem.location,
      to: "Main Warehouse",
      status: "Processing",
      eta: "Calculating..."
    };
    
    setDeliveries([newDelivery, ...deliveries]);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Order ID: ${orderId} | Transaction ID: ${txId}`,
    });
  };

  const handleBulkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bulkProduceType || !bulkQuantity || !deliveryLocation || !expectedDate) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    const orderId = generateOrderId();
    
    toast({
      title: "Bulk Order Submitted!",
      description: `Order ID: ${orderId} for ${bulkQuantity} of ${bulkProduceType}`,
    });

    // Reset form
    setBulkProduceType("");
    setBulkQuantity("");
    setDeliveryLocation("");
    setExpectedDate("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Distributor Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="text-right">
                <span className="font-medium block">ABC Distribution Co.</span>
                {connectedAddress && (
                  <p className="text-xs text-muted-foreground font-mono">
                    {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                  </p>
                )}
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Available Produce Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Available Produce from Farmers
            </CardTitle>
            <CardDescription>Browse and purchase produce directly from verified farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Produce</th>
                    <th className="text-left p-3 font-semibold">Quantity</th>
                    <th className="text-left p-3 font-semibold">Price</th>
                    <th className="text-left p-3 font-semibold">Farmer</th>
                    <th className="text-left p-3 font-semibold">Location</th>
                    <th className="text-left p-3 font-semibold">Quality</th>
                    <th className="text-left p-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableProduce.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3 font-semibold text-primary">{item.price}</td>
                      <td className="p-3">{item.farmer}</td>
                      <td className="p-3">{item.location}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {item.quality}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button size="sm" onClick={() => handlePlaceOrder(item)}>
                          Order
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Current Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Current Inventory
            </CardTitle>
            <CardDescription>Manage your warehouse stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Produce</th>
                    <th className="text-left p-3 font-semibold">Quantity</th>
                    <th className="text-left p-3 font-semibold">Location</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{item.location}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === "Low Stock" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Delivery Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Tracking
              </CardTitle>
              <CardDescription>Track ongoing deliveries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{delivery.produce} - {delivery.quantity}</p>
                      <p className="text-sm text-muted-foreground">ID: {delivery.id}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      delivery.status === "Delivered" ? "bg-primary/10 text-primary" : "bg-secondary/50 text-secondary-foreground"
                    }`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">From: {delivery.from}</p>
                    <p className="text-muted-foreground">To: {delivery.to}</p>
                    {delivery.eta !== "-" && <p className="font-medium">ETA: {delivery.eta}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Place Bulk Order */}
          <Card>
            <CardHeader>
              <CardTitle>Place Bulk Order</CardTitle>
              <CardDescription>Request large quantities directly</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="produce-type">Produce Type</Label>
                  <Select value={bulkProduceType} onValueChange={setBulkProduceType}>
                    <SelectTrigger id="produce-type">
                      <SelectValue placeholder="Select produce" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Pulses">Pulses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bulk-quantity">Quantity (kg)</Label>
                  <Input 
                    id="bulk-quantity" 
                    type="number" 
                    placeholder="Enter quantity" 
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-location">Delivery Location</Label>
                  <Input 
                    id="delivery-location" 
                    placeholder="Enter location" 
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected-date">Expected Delivery Date</Label>
                  <Input 
                    id="expected-date" 
                    type="date" 
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">Submit Bulk Order Request</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
            <CardDescription>View all past purchases and blockchain records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Transaction ID</th>
                    <th className="text-left p-3 font-semibold">Produce</th>
                    <th className="text-left p-3 font-semibold">Quantity</th>
                    <th className="text-left p-3 font-semibold">Amount</th>
                    <th className="text-left p-3 font-semibold">Farmer</th>
                    <th className="text-left p-3 font-semibold">Date</th>
                    <th className="text-left p-3 font-semibold">Blockchain Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-mono text-sm">{tx.id}</td>
                      <td className="p-3">{tx.produce}</td>
                      <td className="p-3">{tx.quantity}</td>
                      <td className="p-3 font-semibold text-primary">{tx.amount}</td>
                      <td className="p-3">{tx.farmer}</td>
                      <td className="p-3">{tx.date}</td>
                      <td className="p-3 font-mono text-sm text-muted-foreground">{tx.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="p-3 border rounded-lg bg-muted/50">
                ✅ New produce available: Fresh Vegetables from Bhubaneswar
              </li>
              <li className="p-3 border rounded-lg bg-muted/50">
                📦 Delivery completed: 100kg Rice to Warehouse B
              </li>
              <li className="p-3 border rounded-lg bg-muted/50">
                ⚠️ Low stock alert: Vegetables in Cold Storage below threshold
              </li>
              <li className="p-3 border rounded-lg bg-muted/50">
                ✅ Blockchain verification complete for Transaction TX001
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Distributor;
