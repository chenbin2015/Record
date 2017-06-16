/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'

import configureStore from './store/configureStore'
import routes from './client/routes'
import App from './containers/App'
import { fetchCounter } from './api/counter'

const app = new Express()
const port = 3000

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
		      text: '我是服务端返回的值'
		    }
		  }
      const initialState = { helloChan }
      const store = configureStore(initialState);
      const html = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps}/>
        </Provider>
      )
      const finalState = store.getState();
      res.end(renderFullPage(html, finalState));
    } else {
      res.status(404).end('404 not found')
    }
  })
}

app.use('*', handleRender);

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Ben's react server side render</title>
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script async src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
