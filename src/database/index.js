import mongoose from "mongoose";
// import mongoose, { connect } from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/nodeapirest", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

export default mongoose;
