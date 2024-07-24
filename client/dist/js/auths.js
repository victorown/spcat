window.crtHeader = () => {
  var session = localStorage.getItem("token");
  var auth = "bearer " + session;
  var config = {
    headers: {
      Authorization: auth,
    },
  };

  return config;
};

window.getToken = () => {
  var session = localStorage.getItem("token");

  return {
    bearerToken: "bearer " + session,
    plainToken: session
  };
};

// component vue

