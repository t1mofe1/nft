import fs from "fs";
import path from "path";
import { buildSchemaSync } from "type-graphql";

const pathBase = "../../api";
if (!fs.existsSync(path.join(__dirname, pathBase))) {
  console.log(`There is no such directory ${pathBase}`);
}

export const gqlSchema = buildSchemaSync({
  resolvers: [path.join(__dirname, pathBase, "**", "*.ts")],
});
