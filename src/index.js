import 'dotenv/config'
import { app } from "./app.js";
import connectDB from "./db/index.js";

await connectDB().then(() => {
    app.listen(process.env.PORT || 9000 , () => {console.log(`app is listening on PORT ${process.env.PORT}`)})
}).catch((err) => {console.log(err)});
