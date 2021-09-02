const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const favicon = require('serve-favicon')
const setupDevServer = require('./build/setup-dev-server')
const {createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
let renderer
let onReady

const server = express()

server.use('/dist', express.static('./dist'))

// set favicon
server.use(favicon('./favicon.png'))


if (isProd) {
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    const template = fs.readFileSync('./index.template.html', 'utf-8')

    //createRenderer ==> createBundleRenderer
    //serverBundle == vue-ssr-server-bundle.json
    renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest
    })
} else {
    onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
        renderer = createBundleRenderer(serverBundle, {
            template,
            clientManifest
        })
    })
}

// add proxy here...
const proxyTable = {
    '/api': {
        target: 'http://xx.xxx.xxx.xxx/',
        changeOrigin: true,
        pathRewrite: {
        '^/api': '/'
        }
    }
}
Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }

    server.use(createProxyMiddleware(options.filter || context, options))
})


const render = async(req, res) => {
    try {
        const html = await renderer.renderToString({
            title: '',
            url: req.url,
            locale:req.headers.cookie
        })

        res.setHeader('Content-Type', 'text/html;charset=utf8')

        res.end(html)

    } catch (err) {
        console.log(err,'serve error')
        return res.status(500).end('Internal server Error')
    }
}


server.get('*', isProd ?
    render : async(req, res) => {
        await onReady
        render(req, res)
    }
)

server.listen(9527, () => {
    console.log('server running port 9527.')
})
