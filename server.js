import { connect } from "mongoose";
import app from "./app";

const MONGO_CONN_STRING =
  "mongodb+srv://HMS_Rahul:AttainU123@cluster0-sjhiu.mongodb.net/TestAUG?retryWrites=true&w=majority";

connect(MONGO_CONN_STRING, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database Connection established");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
