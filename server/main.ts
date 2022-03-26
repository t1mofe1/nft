import "reflect-metadata";
import mongoose from "mongoose";
import server from "./src/server";

(async () => {
  await mongoose
    .connect(process.env.MONGODB_URI as string, {
      dbName: "nft-marketplace",
      ignoreUndefined: true,
    })
    .then((instance) =>
      console.log(
        `The connection to db has been established on port ${instance.connection.port}`
      )
    )
    .catch((e) => console.log(`Connection to db failed, error: ${e.message}`));

  const port = parseInt(process.env.PORT || "8080");

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.syscall !== "listen") {
      throw err;
    }

    const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

    switch (err.code) {
      case "EACCES":
        console.log(bind + "requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.log(bind + "is already in use");
        process.exit(1);
      default:
        throw err;
    }
  });

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;

    console.log(`Server has been started and listening on ${bind}`);
  });

  server.listen(port);
})();
