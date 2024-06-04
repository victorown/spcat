window.crtHeader = () => {
  var session = localStorage.getItem("token");
  console.log(session);
  var auth = "bearer " + session;
  var config = {
    headers: {
      Authorization: auth,
    },
  };

  console.log(config);

  return config;
};

window.getToken = () => {
  var session = localStorage.getItem("token");

  return "bearer " + session;
};
