import React, { useEffect } from "react";
import { Loader2, AlertCircle, Home, Key, IndianRupee, UserPlus, ChefHat } from "lucide-react";
import { Users, FolderOpen, ShoppingCart, Plus, Settings, FileText } from "lucide-react";

const Card = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className || ""}`} {...props} />);
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`p-6 ${className || ""}`} {...props} />);
CardContent.displayName = "CardContent";

const Badge = ({ variant = "default", className, children, ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        variants[variant]
      } ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${variant === "destructive" ? "border-destructive/50 text-destructive dark:border-destructive" : "border-border"} ${className || ""}`}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className || ""}`} {...props} />);
AlertDescription.displayName = "AlertDescription";

const DashboardContents = ({ onMenuChange }) => {
  const isLoading = false;
  const anyError = null;

  const dashboardItems = [
    {
      title: "Total Customers",
      value: 2,
      icon: Users,
      loading: false,
      error: null,
      menuKey: "customers",
      iconColor: "bg-blue-500",
      growth: "+12%",
    },
    {
      title: "Rooms Occupied",
      value: 22,
      icon: Home,
      loading: false,
      error: null,
      menuKey: "rooms",
      iconColor: "bg-green-500",
      growth: "+5%",
    },
    {
      title: "Vacant Rooms",
      value: 12,
      icon: Key,
      loading: false,
      error: null,
      menuKey: "vacantRooms",
      iconColor: "bg-red-500",
      growth: "-3%",
    },
    {
      title: "Payments Received",
      value: 2.6,
      icon: IndianRupee,
      loading: false,
      error: null,
      menuKey: "payments",
      iconColor: "bg-slate-600",
      growth: "+8%",
      isCurrency: true,
    },
  ];

  const quickActions = [
    {
      title: "Add Customer",
      description: "Onboard new customers and manage their details efficiently",
      icon: UserPlus,
      iconColor: "bg-blue-500",
      action: () => onMenuChange("customers"),
    },
    {
      title: "Add Room",
      description: "Create new room entries and manage room allocations",
      icon: Plus,
      iconColor: "bg-green-500",
      action: () => onMenuChange("rooms"),
    },
    {
      title: "Menu Planning",
      description: "Update and manage daily food menu for residents",
      icon: ChefHat,
      iconColor: "bg-slate-600",
      action: () => onMenuChange("menu"),
    },
    {
      title: "Payment Records",
      description: "View and manage all payment transactions and history",
      icon: FileText,
      iconColor: "bg-red-500",
      action: () => onMenuChange("payments"),
    },
  ];

  if (anyError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{`Error loading dashboard data: ${anyError}`}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-lg">Loading dashboard metrics...</span>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardItems.map((item) => {
              const IconComponent = item.icon;
              const isPositiveGrowth = item.growth.startsWith("+");
              const isNegativeGrowth = item.growth.startsWith("-");

              return (
                <Card
                  key={item.title}
                  className="relative cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200 shadow-sm"
                  onClick={() => item.menuKey && onMenuChange(item.menuKey)}
                >
                  <CardContent className="p-6">
                    {item.loading ? (
                      <div className="flex items-center justify-center h-24">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    ) : item.error ? (
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <p className="text-sm text-red-500">Error</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${item.iconColor}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <Badge
                            variant={isPositiveGrowth ? "default" : isNegativeGrowth ? "destructive" : "secondary"}
                            className={`text-xs font-medium ${
                              isPositiveGrowth ? "bg-green-100 text-green-700 hover:bg-green-100" : isNegativeGrowth ? "bg-red-100 text-red-700 hover:bg-red-100" : ""
                            }`}
                          >
                            {item.growth}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">{item.isCurrency ? `₹${item.value}L` : item.value.toLocaleString()}</div>
                          <p className="text-sm text-gray-600">{item.title}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Card key={action.title} className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200 shadow-sm" onClick={action.action}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className={`p-3 rounded-xl ${action.iconColor} w-fit`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContents;
