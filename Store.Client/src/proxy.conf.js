const PROXY_CONFIG = [
  {
    context: [
      "/products",
    ],
    target: "https://localhost:7098",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
