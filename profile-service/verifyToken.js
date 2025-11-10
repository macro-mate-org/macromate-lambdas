import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: process.env.COGNITO_JWKS_URL,
  cache: true,
  rateLimit: true
});

export async function verifyToken(authHeader) {
  if (!authHeader) throw new Error("Missing Authorization header");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Invalid Authorization header format");

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          if (err) return callback(err);
          callback(null, key.getPublicKey());
        });
      },
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) reject(new Error("Invalid token"));
        else resolve(decoded);
      }
    );
  });
}
