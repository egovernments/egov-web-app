const privateWithHideBottomNavigation = {
  hideBottomNavigation: true,
  isPrivate: true,
};

const routes = [
  {
    path: "/",
    component: require("../screens/Home").default,
    isPrivate: true,
  },
  {
    path: "/register",
    component: require("../screens/User/Register").default,
  },
  {
    path: "/login",
    component: require("../screens/User/Login").default,
  },
  {
    path: "/otp",
    component: require("../screens/User/OTP").default,
  },
  {
    path: "/language-selection",
    component: require("../screens/User/LanguageSelection").default,
  },
  {
    path: "/contact-us",
    component: require("../screens/ContactUs").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/my-complaints",
    component: require("../screens/MyComplaints").default,
    isPrivate: true,
  },
  {
    path: "/complaint-details/:status?",
    component: require("../screens/ComplaintDetails").default,
    isPrivate: true,
  },
  {
    path: "/map",
    component: require("../screens/common/TrackLocation").default,
    ...privateWithHideBottomNavigation,
    hideAppBar: true,
  },
  {
    path: "/complaint-submitted",
    component: require("../screens/ComplaintSubmited").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/profile",
    component: require("../screens/Profile").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/feedback",
    component: require("../screens/Feedback").default,
    isPrivate: true,
  },
  {
    path: "/reopen-complaint",
    component: require("../screens/ReOpenComplaint").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/complaint-type",
    component: require("../screens/ComplaintType").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/how-it-works",
    component: require("../screens/HowItWorks").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/add-complaint",
    component: require("../screens/AddComplaint").default,
    ...privateWithHideBottomNavigation,
  },
];

export default routes;
