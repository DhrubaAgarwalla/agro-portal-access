import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  TrendingUp, 
  Users, 
  Wheat, 
  BarChart3, 
  Plus,
  LogOut,
  Settings,
  Bell
} from "lucide-react";

const Farmer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications] = useState(3);

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const produceData = [
    { id: 1, name: "Organic Rice", quantity: "500 kg", status: "In Transit", price: "₹30,000" },
    { id: 2, name: "Wheat Grain", quantity: "300 kg", status: "Delivered", price: "₹18,000" },
    { id: 3, name: "Fresh Vegetables", quantity: "200 kg", status: "Processing", price: "₹12,000" },
  ];

  const stats = [
    { label: "Total Produce", value: "1,000 kg", icon: Wheat, color: "text-farm-green" },
    { label: "Active Orders", value: "12", icon: Package, color: "text-primary" },
    { label: "Revenue (Month)", value: "₹60,000", icon: TrendingUp, color: "text-farm-harvest" },
    { label: "Customers", value: "45", icon: Users, color: "text-farm-brown" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-primary">Government of Odisha</h1>
                <p className="text-sm text-muted-foreground">Agricultural Supply Chain Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-muted-foreground">Farmer ID: F001</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Rajesh!</h2>
          <p className="text-muted-foreground">
            Manage your agricultural produce and track your supply chain transactions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Produce */}
          <Card className="lg:col-span-2 border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Produce</CardTitle>
                <CardDescription>Your latest agricultural produce records</CardDescription>
              </div>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Produce
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {produceData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Wheat className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{item.price}</p>
                      <Badge 
                        variant={item.status === "Delivered" ? "default" : 
                               item.status === "In Transit" ? "secondary" : "outline"}
                        className="mt-1"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription>Common farming operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-3" />
                Register New Produce
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-3" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-3" />
                Manage Buyers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-3" />
                Price Tracker
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
          <CardHeader>
            <CardTitle className="text-foreground">Blockchain Transparency</CardTitle>
            <CardDescription>
              Track your produce through the entire supply chain with blockchain technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Farm to Fork</h4>
                <p className="text-sm text-muted-foreground">
                  Complete traceability from your farm to the consumer's table
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-farm-harvest/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-farm-harvest" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Fair Pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing ensures you get fair value for your produce
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-farm-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-farm-green" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Quality Assurance</h4>
                <p className="text-sm text-muted-foreground">
                  Verify and maintain the quality of your agricultural products
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Farmer;