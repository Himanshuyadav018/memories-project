import mongoose from 'mongoose'
import app from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => { console.log('listening on port ' + PORT)}))
.catch(err => console.log(err))


export default mongoose