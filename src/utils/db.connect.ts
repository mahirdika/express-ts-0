import mongoose from "mongoose";
import CONFIG from "../config/environment.js";

mongoose.connect(`${CONFIG.db}`).then(async () => {
    console.log("Terhubung dengan MongoDB")
    //const collections = await mongoose.connection.db?.listCollections().toArray();
    //console.log("Collections:", collections?.map(c => c.name));
}).catch((error) => {
    console.log("Tidak berhasil terhubung dengan MongoDB")
    console.log(error)
    process.exit(1)
})