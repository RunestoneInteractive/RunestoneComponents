// ***************************************************************************************
// |docname| - Define the `webpack configuration <https://webpack.js.org/configuration/>`_
// ***************************************************************************************
// .. toctree::
//  :caption: Related contents
//
//  webpack.index.js

const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const is_dev_mode = argv.mode === "development";
    const bundleFormatString = is_dev_mode
        ? "[name].bundle.js"
        : "[name].[contenthash].bundle.js";

    return {
        // Cache build results between builds in development mode, per the `docs <https://webpack.js.org/configuration/cache/>`__.
        cache: is_dev_mode
            ? {
                  type: "filesystem",
              }
            : false,
        entry: {
            runestone: "./webpack.index.js",
        },
        // See `mode <https://webpack.js.org/configuration/mode/>`_ for the conditional statement below.
        devtool: is_dev_mode ? "inline-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.less$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "less-loader",
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                    // For more information, see `Asset Modules <https://webpack.js.org/guides/asset-modules/>`_.
                    type: "asset",
                },
            ],
        },
        resolve: {
            fallback: {
                // ``sql.js`` wants these in case it's running under node.js. They're not needed by JS in the browser.
                crypto: false,
                fs: false,
                path: false,
            },
        },
        externals: {
            // Use the jQuery that Sphinx provides for jQuery.ui. See `externals <https://webpack.js.org/configuration/externals/>`_.
            jquery: "jQuery",
        },
        output: {
            path: path.resolve(__dirname, "runestone/dist"),
            // _`Output file naming`: see the `caching guide <https://webpack.js.org/guides/caching/>`_. This provides a hash for dynamic imports as well, avoiding caching out-of-date JS. Putting the hash in a query parameter (such as ``[name].js?v=[contenthash]``) causes the compression plugin to not update zipped files.
            filename: bundleFormatString,
            // Node 17.0 reports ``Error: error:0308010C:digital envelope routines::unsupported``. Per `SO <https://stackoverflow.com/a/69394785/16038919>`_, this error is produced by using an old, default hash that OpenSSL removed support for. The `webpack docs <https://webpack.js.org/configuration/output/#outputhashfunction>`__ say that ``xxhash64`` is a faster algorithm.
            hashFunction: "xxhash64",
            // Delete everything in the output directory on each build.
            clean: true,
        },
        // See the `SplitChunksPlugin docs <https://webpack.js.org/guides/code-splitting/#splitchunksplugin>`_.
        optimization: {
            moduleIds: "deterministic",
            // Collect all the webpack import runtime into a single file, which is named ``runtime.bundle.js``. This must be statically imported by all pages containing Runestone components.
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all",
            },
            // CSS for production was copied from `Minimizing For Production <https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production>`_.
            minimizer: [
                // For webpack@5 you can use the ``...`` syntax to extend existing minimizers (i.e. ``terser-webpack-plugin``), uncomment the next line.
                `...`,
                new CssMinimizerPlugin(),
            ],
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
            new MiniCssExtractPlugin({
                // See `output file naming`_.
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].css",
            }),
            // Copied from the `webpack docs <https://webpack.js.org/plugins/compression-webpack-plugin>`_. This creates ``.gz`` versions of all files. The webserver in use needs to be configured to send this instead of the uncompressed versions.
            new CompressionPlugin(),
        ],
    };
};
