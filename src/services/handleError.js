function handleError(statusCode) {

  if ([401, 403].includes(statusCode)) {
    console.log("statusCodestatusCodestatusCode",statusCode)
    location.reload();
    localStorage.removeItem("userToken");
    console.log("Logging out...");
  }
}

export default handleError;
