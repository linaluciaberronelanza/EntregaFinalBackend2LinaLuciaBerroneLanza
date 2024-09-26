import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://linaberrone:coderhouse@cluster0.rk0c8.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch(() => console.log("No fue posible conectarse"));
