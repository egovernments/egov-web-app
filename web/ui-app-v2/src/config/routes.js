import withAuthorization from "hocs/withAuthorization";

const loadComponent = (path) => {
  const Component = require(path).default;
  return Component;
};

const wrapWithAuthorizationHoc = (path) => {};

const routes = [
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
    path: "/citizen",
    component: require("../screens/citizen/Home").default,
    title: "Home",
  },
  {
    path: "/citizen/contact-us",
    title: "Contact Us",
    component: require("../screens/citizen/ContactUs").default,
  },
  {
    path: "/citizen/my-complaints",
    title: "My Complaints",
    component: require("../screens/citizen/MyComplaints").default,
  },
  {
    path: "/citizen/complaint-details/:status?",
    title: "Complaint Details",
    component: require("../screens/citizen/ComplaintDetails").default,
  },
  {
    path: "/citizen/map",
    title: "Map",
    component: require("../screens/common/TrackLocation").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/complaint-submitted",
    title: "Complaint Submitted",
    component: require("../screens/citizen/ComplaintSubmited").default,
  },
  {
    path: "/citizen/profile",
    title: "Profile",
    component: require("../screens/citizen/Profile").default,
  },
  {
    path: "/citizen/feedback",
    title: "Feedback",
    component: require("../screens/citizen/Feedback").default,
  },
  {
    path: "/citizen/reopen-complaint",
    title: "Reopen Complaint",
    component: require("../screens/citizen/ReOpenComplaint").default,
  },
  {
    path: "/citizen/complaint-type",
    title: "Complaint Type",
    component: require("../screens/citizen/ComplaintType").default,
  },
  {
    path: "/citizen/how-it-works",
    title: "How It Works",
    component: require("../screens/citizen/HowItWorks").default,
  },
  {
    path: "/citizen/add-complaint",
    title: "Add Complaint",
    component: require("../screens/citizen/AddComplaint").default,
  },
];

export default routes;
