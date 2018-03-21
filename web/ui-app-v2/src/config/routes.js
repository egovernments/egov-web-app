const privateWithHideBottomNavigation = {
  hideBottomNavigation: true,
  isPrivate: true,
};

const routes = [
  {
    path: "/citizen",
    component: require("../screens/citizen/Home").default,
    isPrivate: true,
  },
  {
    path: "/citizen/register",
    component: require("../screens/citizen/User/Register").default,
  },
  {
    path: "/citizen/login",
    component: require("../screens/citizen/User/Login").default,
  },
  {
    path: "/citizen/otp",
    component: require("../screens/citizen/User/OTP").default,
  },
  {
    path: "/citizen/language-selection",
    component: require("../screens/citizen/User/LanguageSelection").default,
  },
  {
    path: "/citizen/contact-us",
    component: require("../screens/citizen/ContactUs").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/my-complaints",
    component: require("../screens/citizen/MyComplaints").default,
    isPrivate: true,
  },
  {
    path: "/citizen/complaint-details/:status?",
    component: require("../screens/citizen/ComplaintDetails").default,
    isPrivate: true,
  },
  {
    path: "/citizen/map",
    component: require("../screens/common/TrackLocation").default,
    ...privateWithHideBottomNavigation,
    hideAppBar: true,
  },
  {
    path: "/citizen/complaint-submitted",
    component: require("../screens/citizen/ComplaintSubmited").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/profile",
    component: require("../screens/citizen/Profile").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/feedback",
    component: require("../screens/citizen/Feedback").default,
    isPrivate: true,
  },
  {
    path: "/citizen/reopen-complaint",
    component: require("../screens/citizen/ReOpenComplaint").default,
    isPrivate: true,
  },
  {
    path: "/citizen/complaint-type",
    component: require("../screens/citizen/ComplaintType").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/how-it-works",
    component: require("../screens/citizen/HowItWorks").default,
    ...privateWithHideBottomNavigation,
  },
  {
    path: "/citizen/add-complaint",
    component: require("../screens/citizen/AddComplaint").default,
    ...privateWithHideBottomNavigation,
  },
];

export default routes;
