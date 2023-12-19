import { describe, expect, test } from "@jest/globals";
import { getConfiguration } from "./configuration";

describe("Configuration - IceServers", () => {
  test("ValidString_shouldParseTwoUrls", () => {
    process.env.ICE_SERVER_URLS =
      "stun:stun.l.google.com:19302,admin:ghbn:@@turn:test.turn.server:1914";

    const configuration = getConfiguration();
    const awaitedResult = [
      { url: "stun:stun.l.google.com:19302" },
      { url: "turn:test.turn.server:1914", credential: "ghbn:@", username: "admin" },
    ];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("ValidString_shouldParseSimpleUrl", () => {
    process.env.ICE_SERVER_URLS = "stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("EmptyString_ShouldUseDefaultValue", () => {
    process.env.ICE_SERVER_URLS = "";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("Undefined_ShouldUseDefaultValue", () => {
    process.env.ICE_SERVER_URLS = undefined;

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("ValidString_ShouldParseOnlyUser", () => {
    process.env.ICE_SERVER_URLS = "admin@stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [{ url: "stun:stun.l.google.com:19302", username: "admin" }];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
  test("ValidWithWhitespaces_ShouldTrimCorrectly", () => {
    process.env.ICE_SERVER_URLS = " admin : pwST34d @ stun:stun.l.google.com:19302";

    const configuration = getConfiguration();
    const awaitedResult = [
      { url: "stun:stun.l.google.com:19302", credential: "pwST34d", username: "admin" },
    ];

    expect(configuration.iceServerUrls).toStrictEqual(awaitedResult);
  });
});
