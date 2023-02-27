import {server} from "./server.js";
import {config} from "dotenv";

config();

const port = process.env.API_PORT;
server.listen(port, () => {
    console.log(`Massar listening on port ${port}...`);
});