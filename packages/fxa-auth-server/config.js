/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var fs = require('fs')
var path = require('path')

var convict = require('convict')

var conf = convict({
  env: {
    doc: 'The current node.js environment',
    default: 'prod',
    format: [ 'dev', 'test', 'stage', 'prod' ],
    env: 'NODE_ENV'
  },
  port: {
    env: 'MAILER_PORT',
    format: 'port',
    default: 10136
  },
  db: {
    backend: {
      default: 'httpdb',
      env: 'DB_BACKEND'
    }
  },
  httpdb: {
    url: {
      doc: 'database api url',
      default: 'http://127.0.0.1:8000',
      env: 'HTTPDB_URL'
    }
  },
  contentServer: {
    url: {
      doc: 'The url of the corresponding fxa-content-server instance',
      default: 'http://127.0.0.1:3030',
      env: 'CONTENT_SERVER_URL'
    }
  },
  logging: {
    app: {
      default: 'fxa-auth-mailer'
    },
    fmt: {
      format: ['heka', 'pretty'],
      default: 'heka'
    },
    level: {
      env: 'LOG_LEVEL',
      default: 'info'
    },
    debug: {
      env: 'LOG_DEBUG',
      default: false
    }
  },
  locales: {
    default: ['en', 'de'],
    doc: 'Available locales',
    format: Array
  },
  defaultLanguage: {
    doc: 'Default locale language',
    format: String,
    default: 'en'
  },
  mail: {
    host: {
      doc: 'The ip address the server should bind',
      default: '127.0.0.1',
      format: 'ipaddress',
      env: 'IP_ADDRESS'
    },
    port: {
      doc: 'The port the server should bind',
      default: 9999,
      format: 'port',
      env: 'PORT'
    },
    secure: {
      doc: 'set to true to use a secure connection',
      format: Boolean,
      env: 'MAIL_HTTPS_SECURE',
      default: false
    },
    sender: {
      doc: 'email address of the sender',
      default: 'accounts@firefox.com',
      env: 'SMTP_SENDER'
    },
    verificationUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    verifyLoginUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    passwordResetUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    accountUnlockUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    initiatePasswordResetUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    initiatePasswordChangeUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    syncUrl: {
      doc: 'url to Sync product page',
      format: String,
      default: 'https://www.mozilla.org/firefox/sync/'
    },
    androidUrl: {
      doc: 'url to Android product page',
      format: String,
      default: 'https://app.adjust.com/2uo1qc?campaign=fxa-conf-email&adgroup=android&creative=button'
    },
    iosUrl: {
      doc: 'url to IOS product page',
      format: String,
      default: 'https://app.adjust.com/2uo1qc?campaign=fxa-conf-email&adgroup=ios&creative=button&fallback=https%3A%2F%2Fitunes.apple.com%2Fapp%2Fapple-store%2Fid989804926%3Fpt%3D373246%26ct%3Dadjust_tracker%26mt%3D8'
    },
    signInUrl: {
      doc: 'Deprecated. uses contentServer.url',
      format: String,
      default: undefined
    },
    supportUrl: {
      doc: 'url to Mozilla Support product page',
      format: String,
      default: 'https://support.mozilla.org/kb/im-having-problems-with-my-firefox-account'
    }
  }
})

var envConfig = path.join(__dirname, 'config', conf.get('env') + '.json')
var files = (envConfig + ',' + process.env.CONFIG_FILES)
  .split(',').filter(fs.existsSync)
conf.loadFile(files)

process.env.NODE_ENV = conf.get('env')

var options = {
  strict: true
}

conf.validate(options)

var contentServerUrl = conf.get('contentServer.url')
conf.set('mail.signInUrl', contentServerUrl + '/signin')
conf.set('mail.verificationUrl', contentServerUrl + '/v1/verify_email')
conf.set('mail.passwordResetUrl', contentServerUrl + '/v1/complete_reset_password')
conf.set('mail.accountUnlockUrl', contentServerUrl + '/v1/complete_unlock_account')
conf.set('mail.initiatePasswordResetUrl', contentServerUrl + '/reset_password')
conf.set('mail.initiatePasswordChangeUrl', contentServerUrl + '/settings/change_password')
conf.set('mail.verifyLoginUrl', contentServerUrl + '/complete_signin')

module.exports = conf
