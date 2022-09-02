import fs from 'fs';
import path from 'path';
import { buildSchemaSync } from 'type-graphql';
import { authChecker } from '../auth-checker';

const pathBase = '../../api';
if (!fs.existsSync(path.join(__dirname, pathBase))) {
	console.log(`There is no such directory ${pathBase}`);
}

export const gqlSchema = buildSchemaSync({
	authChecker,
	resolvers: [path.join(__dirname, pathBase, '**', '*.ts')],
});
