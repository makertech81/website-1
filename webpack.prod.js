const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

<<<<<<< HEAD

=======
>>>>>>> reformatted webpack config files
module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/prod"),
    filename: "build.js"
  }
});
<<<<<<< HEAD

=======
>>>>>>> reformatted webpack config files
