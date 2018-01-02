/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack/webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
var fs = require('fs')

import configureStore from '../store/configureStore'
import routes from '../client/routes'
import App from '../containers/App'
import { fetchCounter } from '../api/counter'

const app = new Express()
const port = 3300

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, hot: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

function handleRender(req, res) {
  match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`server error: ${err}`)
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const helloChan = {
        config: {
          text: 'I come from serve side'
        }
      }
     // console.log('req.url:',req.url)
      fs.readFile(__dirname + '/test.data', { flag: 'r+', encoding: 'utf8' }, function(err, data) {
        if (err) {
          console.error(err);
          return;
        }
        helloChan.config.text = data
        const initialState = { helloChan }
        const store = configureStore(initialState)
        const html = renderToString(
          <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
        )
        const finalState = store.getState();
        console.log(Math.random())
       // console.log('--------------------------------------------------------------------------------------')
       // console.log('html:', html)
        res.end(renderFullPage(html, finalState));
      });
      //fs.readFileSync(fileUrl)


    } else {
      res.status(404).end('404 not found')
    }
  })
}

app.use('/favicon.ico',(req, res, next)=>{res.json({a: 1})})
app.use('/', handleRender);

function renderFullPage(html, initialState) {
  var html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" /> 
        <title>Ben's react server side render</title>
        <meta name="viewport" content="initial-scale=1,width=device-width" />
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script async src="/static/bundle.js"></script>
      </body>
    </html>`
  return html
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
