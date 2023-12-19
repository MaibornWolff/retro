import { describe, expect, test } from "@jest/globals";
import { getConfiguration } from "./configuration";

describe("iceurls parsing", () => {
  test("valid example", () => {
    process.env.ICE_SERVER_URLS =
      "stun:stun.l.google.com:19302,admin:ghbn:@@turn:test.turn.server:1914";

    const configuration = getConfiguration();
    const awaitedResult = [
      { url: "stun:stun.l.google.com:19302" },
      { url: "turn:test.turn.server:1914", credential: "ghbn:@", username: "admin" },
    ];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("only url", () => {
    process.env.ICE_SERVER_URLS = "stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("empty string", () => {
    process.env.ICE_SERVER_URLS = "";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("undefined value", () => {
    process.env.ICE_SERVER_URLS = undefined;

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("single credential", () => {
    process.env.ICE_SERVER_URLS = "admin@stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302", username: "admin" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("whitespaces", () => {
    process.env.ICE_SERVER_URLS = " admin : pwST34d @ stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [
      { url: "stun:stun.l.google.com:19302", credential: "pwST34d", username: "admin" },
    ];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
});
