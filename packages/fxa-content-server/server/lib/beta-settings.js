/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./configuration');

// Inject Beta Settings meta content
function swapBetaMeta(html, metaContent = {}) {
  let result = html;

  Object.keys(metaContent).forEach((key) => {
    result = result.replace(
      key,
      encodeURIComponent(JSON.stringify(metaContent[key]))
    );
  });

  return result;
}

// Conditionally modify the response
function modifyResponse(proxyRes, req, res) {
  const bodyChunks = [];

  proxyRes.on('data', (chunk) => {
    bodyChunks.push(chunk);
  });

  proxyRes.on('end', () => {
    const body = Buffer.concat(bodyChunks);

    // forward existing response data
    res.status(proxyRes.statusCode);
    Object.keys(proxyRes.headers).forEach((key) => {
      res.append(key, proxyRes.headers[key]);
    });

    // if it's an html content type, inject server config
    if (
      proxyRes.headers['content-type'] &&
      proxyRes.headers['content-type'].includes('text/html')
    ) {
      let html = body.toString();
      html = swapBetaMeta(html, {
        __SERVER_CONFIG__: config,
      });
      res.send(new Buffer.from(html));
    } else {
      res.send(body);
    }

    res.end();
  });
}

const settingsMiddleware = createProxyMiddleware({
  target: 'http://localhost:3000',
  ws: true,
  selfHandleResponse: true, // ensure res.end is not called early
  onProxyRes: modifyResponse,
});

module.exports = {
  settingsMiddleware,
  swapBetaMeta,
  modifyResponse,
};