const CryptoJS = require('crypto-js');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

export function differenceMinute(oldTimestamp) {
  try {
    const currentDate = new Date();
    const now = currentDate.getTime();
    const diff = (now - oldTimestamp) / 1000 / 60; // calculate to get minute
    return Math.abs(Math.round(diff));
  } catch (e) {
    return null;
  }
}

export function encodePayload(payload) {
  try {
    const buff = Buffer.from(payload);
    return buff.toString('base64');
  } catch (e) {
    return null;
  }
}

export function decodePayload(payload) {
  try {
    const buff = Buffer.from(payload, 'base64');
    return buff.toString('ascii');
  } catch (e) {
    return null;
  }
}

export function createNonce() {
  try {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return encodePayload(timestamp);
  } catch (e) {
    return null;
  }
}

export function createSignature(payload) {
  try {
    const hash = CryptoJS.HmacSHA256(payload, process.env.SSO_CLIENT_SECRET);
    return CryptoJS.enc.Hex.stringify(hash);
  } catch (e) {
    return null;
  }
}
