module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "10",
          node: "6",
        },
      },
    ],
  ]
}
