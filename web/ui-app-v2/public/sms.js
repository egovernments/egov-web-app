// SMS recieved
function messageReceieved(otp) {
  const otpElement = document.getElementById("otp");

  // check the browser compatibility
  const smsReceievedEvent = new CustomEvent("smsReceived", {
    detail: {
      otp,
    },
  });
  otpElement.dispatchEvent(smsReceievedEvent);
}

try {
  if (typeof androidAppProxy !== "undefined") {
    let location = window.androidAppProxy.requestLocation();
    window.localStorage.setItem("location", location);
  }
} catch (error) {}
