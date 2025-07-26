// Contains what is needed to launch the server
// - app is imported along with config for port number
const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})