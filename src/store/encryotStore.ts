import * as Aes from "crypto-js/aes";
import * as CryptoJsCore from "crypto-js/core";
import stringify from "json-stringify-safe";
import { createTransform } from "redux-persist";
import type { TransformConfig } from "redux-persist/lib/createTransform";

export interface EncryptTransformConfig {
    secretKey: string;
}

const makeError = (message: string) => new Error(`redux-encryption-err: ${message}`);

export const encryptStore = <HSS, S = any, RS = any>(
    config: EncryptTransformConfig,
    transformConfig?: TransformConfig
) => {
    if (typeof config === "undefined") {
        throw makeError("No configuration provided.");
    }

    const { secretKey } = config;
    if (!secretKey) {
        throw makeError("No secret key provided.");
    }

    const onError = console.warn;

    return createTransform<HSS, string, S, RS>(
        (inboundState, _key) => Aes.encrypt(stringify(inboundState), secretKey).toString(),
        (outboundState, _key) => {
            if (typeof outboundState !== "string") {
                return onError(makeError("Expected outbound state to be a string."));
            }

            try {
                const decryptedString = Aes.decrypt(outboundState, secretKey).toString(CryptoJsCore.enc.Utf8);
                if (!decryptedString) {
                    throw new Error("Decrypted string is empty.");
                }

                try {
                    return JSON.parse(decryptedString);
                } catch {
                    return onError(makeError("Failed to parse state as JSON."));
                }
            } catch {
                return onError(
                    makeError("Could not decrypt state. Please verify that you are using the correct secret key.")
                );
            }
        },
        transformConfig
    );
};