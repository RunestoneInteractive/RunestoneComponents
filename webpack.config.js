// ***************************************************************************************
// |docname| - Define the `webpack configuration <https://webpack.js.org/configuration/>`_
// ***************************************************************************************
// .. toctree::
//  :caption: Related contents
//
//  webpack.index.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = (env) => {
    return {
        entry: {
            // See `webpack.index.js`. Therefore, the file ``webpack.bundle.js`` must be included on every page containing Runestone components.
            webpack: "./webpack.index.js"
        },
        mode: env.MODE,
        devtool: env.MODE === "development" ? "inline-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    use: {
                        loader: "html-loader",
                        options: {
                            attrs: false,
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|svg)$/,
                    loader: "url-loader",
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, "runestone/dist"),
            // See https://webpack.js.org/guides/caching/. This provides a hash for dynamic imports as well, avoiding caching out-of-date JS.
            filename: '[name].bundle.js?v=[contenthash]',
            // Delete everything in the output directory on each build.
            clean: true,
        },
        // See https://webpack.js.org/guides/caching/.
        optimization: {
            moduleIds: 'deterministic',
            // Collect all the webpack import runtime into a single file, which is named ``runtime.bundle.js``. This must be statically imported by all pages containing Runestone components.
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
            },
        },
        plugins: [
            // _`webpack_static_imports`: Instead of HTML, produce a list of static imports as JSON. Sphinx will then read this file and inject these imports when creating each page. webpack_static_imports_.
            new HtmlWebpackPlugin({
                filename: 'webpack_static_imports.json',
                // Don't prepend the ``<head>`` tag and data to the output.
                inject: false,
                // The template to create JSON.
                templateContent: ({htmlWebpackPlugin}) => `["${htmlWebpackPlugin.files.js.join('", "')}"]`,
            }),
        ],
    };
};
