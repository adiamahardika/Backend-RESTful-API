const express = require('express')
const Route = express.Router()

const accountRouter = require('./routes/account')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const purchaseRouter = require('./routes/purchase')
const provinceRouter = require('./routes/province')
const cityRouter = require('./routes/city')
const subcityRouter = require('./routes/sub_city')

Route
    .use('/account/', accountRouter)
    .use('/product/', productRouter)
    .use('/category/', categoryRouter)
    .use('/purchase/', purchaseRouter)
    .use('/upload', express.static('./upload'))
<<<<<<< HEAD
    .use('/province', provinceRouter)
    .use('/city/', cityRouter)
    .use('/subcity/', subcityRouter)
=======
    .use('/province/', provinceRouter)
>>>>>>> province

module.exports = Route