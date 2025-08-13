import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle, Home, Phone } from "lucide-react";

import { fetchBookings, selectAllBookings, selectBookingsStatus } from "../../redux/booking/bookingSlice";

import { fetchContacts, selectContacts, selectContactsStatus } from "../../redux/contact/contactSlice";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Card = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className || ""}`} {...props} />);
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`p-6 ${className || ""}`} {...props} />);
CardContent.displayName = "CardContent";

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${variant === "destructive" ? "border-destructive/50 text-destructive" : "border-border"} ${className || ""}`}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`text-sm [&_p]:leading-relaxed ${className || ""}`} {...props} />);
AlertDescription.displayName = "AlertDescription";

const DashboardContents = ({ onMenuChange }) => {
  const dispatch = useDispatch();

  const bookings = useSelector(selectAllBookings);
  const contacts = useSelector(selectContacts);
  const bookingsStatus = useSelector(selectBookingsStatus);
  const contactsStatus = useSelector(selectContactsStatus);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
    }
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, bookingsStatus, contactsStatus]);

  const isLoading = bookingsStatus === "loading" || contactsStatus === "loading";
  const anyError = bookingsStatus === "failed" ? "Failed to load bookings" : contactsStatus === "failed" ? "Failed to load contacts" : null;

  const dashboardItems = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: Home,
      loading: bookingsStatus === "loading",
      error: bookingsStatus === "failed",
      menuKey: "bookings",
      iconColor: "bg-blue-500",
    },
    {
      title: "Total Contacts",
      value: contacts.length,
      icon: Phone,
      loading: contactsStatus === "loading",
      error: contactsStatus === "failed",
      menuKey: "contacts",
      iconColor: "bg-green-500",
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
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 mb-1">{item.value.toLocaleString()}</div>
                          <p className="text-sm text-gray-600">{item.title}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Link to="/launch" className='w-full flex justify-center items-center'>
            <Button className="w-full px-3 mx-auto md:w-1/2 bg-green-600! text-white! font-bold!">Launch Ruts N Rides</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardContents;
