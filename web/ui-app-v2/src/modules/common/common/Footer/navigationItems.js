export const navigationItems = [
  {
    label: "COMMON_BOTTOM_NAVIGATION_HOME",
    icon: { action: "action", name: "home" },
    route: "/citizen",
    id: "home",
  },
  {
    label: "COMMON_BOTTOM_NAVIGATION_INFORMATION",
    icon: { action: "action", name: "info" },
    route: "",
    id: "information-button",
  },
  {
    label: "COMMON_BOTTOM_NAVIGATION_PAYMENTS",
    icon: { action: "custom", name: "rupee" },
    route: "",
    id: "payments-button",
  },
  {
    label: "COMMON_BOTTOM_NAVIGATION_COMPLAINTS",
    icon: { action: "alert", name: "warning" },
    route: "/citizen/my-complaints",
    id: "complaints-button",
  },
];
