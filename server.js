import app from "./src/app.js";

app({ logger: process.env.NODE_ENV === "development" ? { prettyPrint: true } : false }).listen(process.env.PORT || 4000);
