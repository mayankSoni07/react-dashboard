const __BASE_URL__ =
  process.env.BASE_URL ||
  "https://onlineservice-prod-5qqfpyg6ua-el.a.run.app" ||
  window.location.origin;
//process.env.BASE_URL || "http://localhost:8080" || window.location.origin;

// const __origin__ = window.location.origin;

const config = {
  apiPath: {
    login: `${__BASE_URL__}/v1/users/login`,
    customer: `${__BASE_URL__}/v1/customer`,
    service: `/service`,
    // Mock
    serviceMock: `http://localhost:3000/serviceMock.json`,
  },
};

export default config;
