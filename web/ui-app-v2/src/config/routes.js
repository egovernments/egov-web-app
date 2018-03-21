const privateWithHideBottomNavigation = {
  hideBottomNavigation: true,
  isPrivate: true,
};

const employeeRoutes = [
  {
    path: "/employee/all-complaints",
    component: require("../screens/employee/AllComplaints").default,
    ...privateWithHideBottomNavigation,
  },
];

const routes = [
  {
    path: "/citizen",
    component: require("../screens/citizen/Home").default,
    title: "Home",
    isPrivate: true,
  },
  {
    path: "/citizen/register",
    title: "Register",
    component: require("../screens/citizen/User/Register").default,
  },
  {
    path: "/citizen/login",
    title: "Login",
    component: require("../screens/citizen/User/Login").default,
  },
  {
    path: "/citizen/otp",
    title: "Otp",
    component: require("../screens/citizen/User/OTP").default,
  },
  {
    path: "/citizen/language-selection",
    title: "Language Selection",
    component: require("../screens/citizen/User/LanguageSelection").default,
  },
  {
    path: "/citizen/contact-us",
    title: "Contact Us",
    component: require("../screens/citizen/ContactUs").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/my-complaints",
    title: "My Complaints",
    component: require("../screens/citizen/MyComplaints").default,
    isPrivate: true,
  },
  {
    path: "/citizen/complaint-details/:status?",
    title: "Complaint Details",
    component: require("../screens/citizen/ComplaintDetails").default,
    isPrivate: true,
  },
  {
    path: "/citizen/map",
    title: "Map",
    component: require("../screens/common/TrackLocation").default,
    ...privateWithHideBottomNavigation,
    hideAppBar: true,
  },
  {
    path: "/citizen/complaint-submitted",
    title: "Complaint Submitted",
    component: require("../screens/citizen/ComplaintSubmited").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/profile",
    title: "Profile",
    component: require("../screens/citizen/Profile").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/feedback",
    title: "Feedback",
    component: require("../screens/citizen/Feedback").default,
    isPrivate: true,
  },
  {
    path: "/citizen/reopen-complaint",
    title: "Reopen Complaint",
    component: require("../screens/citizen/ReOpenComplaint").default,
    isPrivate: true,
  },
  {
    path: "/citizen/complaint-type",
    title: "Complaint Type",
    component: require("../screens/citizen/ComplaintType").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/how-it-works",
    title: "How It Works",
    component: require("../screens/citizen/HowItWorks").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/add-complaint",
    title: "Add Complaint",
    component: require("../screens/citizen/AddComplaint").default,
    ...privateWithHideBottomNavigation,
  },
  ...employeeRoutes,
];

export default routes;
