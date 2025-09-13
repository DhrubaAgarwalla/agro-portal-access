import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut, QrCode, Upload } from "lucide-react";

const Farmer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const produceListings = [
    { id: 1, produce: "Wheat", quantity: "20kg", date: "01-09", status: "Verified" },
    { id: 2, produce: "Rice", quantity: "50kg", date: "03-09", status: "Pending" },
  ];

  const transactions = [
    { id: 1, produce: "Wheat", date: "01-09", amount: "₹5,000", hash: "0x123...abc" },
    { id: 2, produce: "Rice", date: "02-09", amount: "₹8,000", hash: "0x456...def" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-primary">Gov. Odisha Agriculture</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Rajesh Kumar</span>
            <Avatar>
              <AvatarFallback>RK</AvatarFallback>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Produce Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Quantity" />
            <Input placeholder="Expected Price" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Grade A</SelectItem>
                <SelectItem value="b">Grade B</SelectItem>
                <SelectItem value="c">Grade C</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Location" />
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
          <Button className="mt-4">Submit</Button>
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