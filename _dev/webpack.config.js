/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const LicensePlugin = require('webpack-license-plugin');


let config = {
  performance: {
    maxEntrypointSize: 500 * 1024, // 500 KiB
    hints: 'warning',
  },
  entry: {
    theme: ['./js/theme.js', './css/theme.scss'],
    error: ['./css/error.scss'],
  },
  output: {
    path: path.resolve(__dirname, '../assets/js'),
    filename: '[name].js',
  },
  resolve: {
    preferRelative: true,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'esbuild-loader',
      },
      {
        test: /\.scss$/,
        use:[
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
      },
      {
        test: /.(png|woff(2)?|eot|otf|ttf|svg|gif)(\?[a-z0-9=\.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: '../css/[hash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery: 'jQuery',
  },
  plugins: [
    new MiniCssExtractPlugin({filename: path.join('..', 'css', '[name].css')}),
    new CssoWebpackPlugin({
      forceMediaMerge: true,
    }),
    new LicensePlugin({ 
      outputFilename: 'thirdPartyNotice.json',
      licenseOverrides: {
        'bootstrap-touchspin@3.1.1': 'Apache-2.0',
      },
      replenishDefaultLicenseTexts: true,
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
      new CssoWebpackPlugin(),
    ],
  };
}

module.exports = config;
