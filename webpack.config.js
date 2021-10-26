// ***************************************************************************************
// |docname| - Define the `webpack configuration <https://webpack.js.org/configuration/>`_
// ***************************************************************************************
// .. toctree::
//  :caption: Related contents
//
//  webpack.index.js
//  webpack.server-index.js
//
// Includes
// ========
//
// Node
// ----
const path = require("path");

// NPM packages
// ------------
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");

// Globals
// =======
function definePluginDict(env) {
    return {
        // _`RAND_FUNC`: for testing, use a random function supplied by the test framework if it exists. Otherwise, use the seedable RNG.
        //
        // Implementation: pass webpack the ``--env test`` option (see the `env docs <https://webpack.js.org/api/cli/#environment-options>`_). Using the `DefinePlugin <https://webpack.js.org/plugins/define-plugin/>`_, select the appropriate random function.
        RAND_FUNC: env.test
            ? "(typeof rs_test_rand === 'undefined') ? Math.random : rs_test_rand"
            : "rand",
    };
}

// Webpack configuration
// =====================
module.exports = (env, argv) => {
    // Place commonly-used expressions in consts.
    const is_dev_mode = argv.mode === "development";
    const cache = is_dev_mode
        ? {
              type: "filesystem",
          }
        : false;
    // See `mode <https://webpack.js.org/configuration/mode/>`_ for the conditional statement below.
    const devtool = is_dev_mode ? "inline-source-map" : "source-map";
    const out_path = path.resolve(__dirname, "runestone/dist");

    return [
        // Client-side
        // -----------
        // The primary config: client-side build. This config file contains `multiple targets <https://webpack.js.org/concepts/targets/#multiple-targets>`_.
        {
            // Cache build results between builds in development mode, per the `docs <https://webpack.js.org/configuration/cache/>`__.
            cache: cache,
            devtool: devtool,
            entry: {
                runestone: "./webpack.index.js",
            },
            externals: {
                // Use the jQuery that Sphinx provides for jQuery.ui. See `externals <https://webpack.js.org/configuration/externals/>`_.
                jquery: "jQuery",
            },
            module: {
                rules: [
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader, "css-loader"],
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                        // For more information, see https://webpack.js.org/guides/asset-modules/.
                        type: "asset",
                    },
                ],
            },
            // See https://webpack.js.org/guides/code-splitting/#splitchunksplugin.
            optimization: {
                moduleIds: "deterministic",
                // Collect all the webpack import runtime into a single file, which is named ``runtime.bundle.js``. This must be statically imported by all pages containing Runestone components.
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                },
                // CSS for production was copied from https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production.
                minimizer: [
                    // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line.
                    `...`,
                    new CssMinimizerPlugin(),
                ],
            },
            output: {
                path: out_path,
                // See https://webpack.js.org/guides/caching/. This provides a hash for dynamic imports as well, avoiding caching out-of-date JS.
                filename: "[name].bundle.js?v=[contenthash]",
                // Node 17.0 reports ``Error: error:0308010C:digital envelope routines::unsupported``. Per `SO <https://stackoverflow.com/a/69394785/16038919>`_, this error is produced by using an old, default hash that OpenSSL removed support for. The `webpack docs <https://webpack.js.org/configuration/output/#outputhashfunction>"__ says that ``xxhash64`` is a faster algorithm.
                hashFunction: "xxhash64",
            },
            plugins: [
                // _`webpack_static_imports`: Instead of HTML, produce a list of static imports as JSON. Sphinx will then read this file and inject these imports when creating each page.
                new HtmlWebpackPlugin({
                    filename: "webpack_static_imports.json",
                    // Don't prepend the ``<head>`` tag and data to the output.
                    inject: false,
                    // The template to create JSON.
                    templateContent: ({ htmlWebpackPlugin }) =>
                        JSON.stringify({
                            js: htmlWebpackPlugin.files.js,
                            css: htmlWebpackPlugin.files.css,
                        }),
                }),
                new CopyPlugin({
                    patterns: [
                        {
                            // sql.js support: this wasm file will be fetched dynamically when we initialize sql.js. It is important that we do not change its name, and that it is in the same folder as the js.
                            from: "node_modules/sql.js/dist/sql-wasm.wasm",
                            to: ".",
                        },
                    ],
                }),
                new DefinePlugin(definePluginDict(env)),
                new MiniCssExtractPlugin({
                    filename: "[name].css?v=[contenthash]",
                    chunkFilename: "[id].css",
                }),
                // Copied from the `webpack docs <https://webpack.js.org/plugins/compression-webpack-plugin>`_. This creates ``.gz`` versions of all files. The webserver in use needs to be configured to send this instead of the uncompressed versions.
                new CompressionPlugin(),
            ],
            resolve: {
                fallback: {
                    // ``sql.js`` wants these in case it's running under node.js. They're not needed by JS in the browser.
                    crypto: false,
                    fs: false,
                    path: false,
                },
            },
        },

        // Server-side
        // -----------
        // Config for server-side code.
        {
            // Cache build results between builds in development mode, per the `docs <https://webpack.js.org/configuration/cache/>`__.
            cache: cache,
            // See `mode <https://webpack.js.org/configuration/mode/>`_ for the conditional statement below.
            devtool: devtool,
            entry: {
                server_side: "./webpack.server-index.js",
            },
            module: {
                rules: [
                    {
                        // Use Babel to transpile to ECMAScript 5.1, since the server-side engine supports that.
                        //
                        // Only run ``.js`` files through Babel
                        test: /\.m?js$/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                    },
                ],
            },
            output: {
                // Expose the library as a variable.
                library: {
                    name: "serverSide",
                    type: "var",
                },
                path: out_path,
                // Delete everything in the output directory on each build. Putting these here (in the server-side build) works, while putting it in the client-side build causes it to delete the output from the server-side build.
                clean: true,
            },
            plugins: [new DefinePlugin(definePluginDict(env))],
            resolve: {
                // EJS tries to import these.
                fallback: {
                    fs: false,
                    path: false,
                },
            },
            // The server-side JS engine supports ECMAScript 5.1. See `target <https://webpack.js.org/configuration/target/>`_.
            target: ["es5", "web"],
        },
    ];
};
