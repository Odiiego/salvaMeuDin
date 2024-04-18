import crypto from 'crypto';

export function random() {
  return crypto.randomBytes(128).toString('base64');
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(process.env.SECRET!)
    .digest('hex');
}
