const express = require('express')
const Route = express.Router()

const accountRouter = require('./routes/account')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const purchaseRouter = require('./routes/purchase')
const subcityRouter = require('./routes/sub_city')

Route
    .use('/account/', accountRouter)
    .use('/product/', productRouter)
    .use('/category/', categoryRouter)
    .use('/purchase/', purchaseRouter)
    .use('/subcity/', subcityRouter)
    .use('/upload', express.static('./upload'))

module.exports = Route