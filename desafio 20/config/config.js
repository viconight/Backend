export default {
  dao: {
    target: process.env.DAO_TARGET || "mem",
    file: process.env.FILE_PATH || "db/products.db",
    mongo: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/db_name/",
  },
};