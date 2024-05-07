window.crtHeader = () => {
  var session = sessionStorage.getItem("token");
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
  var session = sessionStorage.getItem("token");

  return "bearer " + session;
};
