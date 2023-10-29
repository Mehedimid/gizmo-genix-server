const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// =======middlewares======
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hello server asflkjf')
})

app.listen(port, () => {
    console.log(`running port on: ${port} ` )
})