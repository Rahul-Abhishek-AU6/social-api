import { sign, verify } from "jsonwebtoken";

import { join } from "path";
import { config } from "dotenv";

config({
  path: join("./", "config.env"),
});

const JWT_SECRET_KEY = "augdwjajbdwabiudnawuodnawodijm";

export const generateJWToken = (payload, expiresIn = "24h") => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      JWT_SECRET_KEY,
      expiresIn === "infinite"
        ? {}
        : {
            algorithm: "HS256",
            expiresIn,
          },
      (err, encoded) => {
        if (err) reject(err);
        resolve(encoded);
      }
    );
  });
};

export const verifyJWToken = (token) => {
  return new Promise((resolve, reject) => {
    const verifyStatus = verify(token, JWT_SECRET_KEY);
    if (verifyStatus) return resolve(verifyStatus);
    reject("Token is Invalid");
  });
};
