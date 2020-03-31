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
            "./runestone/dragndrop/js/dragndrop.js",
            "./runestone/timed/js/timed.js",
            "./runestone/parsons/js/parsons.js",
            "./runestone/poll/js/poll.js",
            "./runestone/common/js/user-highlights.js",
            "./runestone/spreadsheet/js/spreadsheet.js",
            "./runestone/tabbedStuff/js/tabbedstuff.js",
            "./runestone/reveal/js/reveal.js",
            "./runestone/datafile/js/datafile.js",
            "./runestone/showeval/js/showEval.js",
            "./runestone/video/js/runestonevideo.js",
            "./runestone/lp/js/lp.js",
            "./runestone/codelens/js/codelens.js"
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
        watch: true,
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
