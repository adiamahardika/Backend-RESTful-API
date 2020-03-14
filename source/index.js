const express = require('express')
const Route = express.Router()

const accountRouter = require('./routes/account')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const purchaseRouter = require('./routes/purchase')
const provinceRouter = require('./routes/province')
const cityRouter = require('./routes/city')

Route
    .use('/account/', accountRouter)
    .use('/product/', productRouter)
    .use('/category/', categoryRouter)
    .use('/purchase/', purchaseRouter)
    .use('/upload', express.static('./upload'))
    .use('/province', provinceRouter)
    .use('/city/', cityRouter)

module.exports = Route