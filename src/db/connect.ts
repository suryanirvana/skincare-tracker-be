import log from "../logger";
import PostgreDB from "./data-source";

function connect() {
    return PostgreDB.initialize()
        .then(() => {
            log.info("Database connected")
        })
        .catch((error) => {
            log.error("Failed to connect to database", error)
            process.exit(1)
        })
}

export default connect