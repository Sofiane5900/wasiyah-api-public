import * as fs from 'fs';
import * as path from 'path';

export const jwtConstants = {
  privateKey: fs.readFileSync(
    path.join(__dirname, '../../jwt/private.pem'),
    'utf8',
  ),
  publicKey: fs.readFileSync(
    path.join(__dirname, '../../jwt/public.pem'),
    'utf8',
  ),
};
