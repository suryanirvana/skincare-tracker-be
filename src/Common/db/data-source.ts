import { DataSource } from "typeorm"
import config from "../config/config"
import Skincare from "../../Skincare/model/skincare.model"
import SkincareBrand from "../../SkincareBrand/model/skincare.brand.model"
import SkincareType from "../../SkincareType/model/skincare.type.model"

const PostgreDB = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.database,
    synchronize: true,
    logging: false,
    entities: [Skincare, SkincareBrand, SkincareType],
    migrations: [],
    subscribers: [],
})

export default PostgreDB