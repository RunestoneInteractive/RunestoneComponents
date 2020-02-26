const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = env => {
    return {
        entry: [
            "./runestone/shortanswer/js/shortanswer.js",
            "./runestone/activecode/js/acfactory.js",
            "./runestone/mchoice/js/mchoice.js",
            "./runestone/fitb/js/fitb.js",
            "./runestone/clickableArea/js/clickable.js",
            // "./src/dragndrop/dragndrop.js",
            "./runestone/timed/js/timed.js"
            // "./src/parsons/parsons.js",
            // "./src/poll/poll.js"
        ],
        mode: env.MODE,
        devtool: env.MODE === "development" ? "inline-source-map" : "none",
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    use: {
                        loader: "html-loader",
                        options: {
                            attrs: false
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    loader: "url-loader"
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, "runestone/dist"),
            filename: "runestone.js",
            library: "runestone",
            libraryTarget: "umd"
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin([
                {
                    from: "static"
                }
            ]),
            new HtmlWebpackPlugin({
                inject: "head",
                template: "public/index.html"
            })
        ]
    };
};
