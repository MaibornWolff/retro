import { getConfiguration } from "./configuration";

describe("Configuration - IceUrls", () => {
  test("should parse multiple urls when multiple urls are valid", () => {
    process.env = {
      ...process.env,
      ICE_SERVER_URLS: "stun:stun.l.google.com:19302,admin:ghbn:@@turn:test.turn.server:1914",
    };

    const expectedUrls = [
      { url: "stun:stun.l.google.com:19302" },
      { url: "turn:test.turn.server:1914", credential: "ghbn:@", username: "admin" },
    ];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toStrictEqual(expectedUrls);
  });
  test("should parse url when a single url is given", () => {
    process.env = { ...process.env, ICE_SERVER_URLS: "stun:stun.l.google.com:19302" };

    const expectedUrls = [{ url: "stun:stun.l.google.com:19302" }];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toStrictEqual(expectedUrls);
  });
  test("should return default url when a empty string is given", () => {
    process.env = { ...process.env, ICE_SERVER_URLS: "" };

    const expectedUrls = [{ url: "stun:stun.l.google.com:19302" }];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toStrictEqual(expectedUrls);
  });
  test("should return default url when undefined is given", () => {
    process.env = { ...process.env, ICE_SERVER_URLS: undefined };

    const expectedUrls = [{ url: "stun:stun.l.google.com:19302" }];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toEqual(expectedUrls);
  });
  test("should return url with set username when url with single parameter given", () => {
    process.env = { ...process.env, ICE_SERVER_URLS: "admin@stun:stun.l.google.com:19302" };
    const expectedUrls = [{ url: "stun:stun.l.google.com:19302", username: "admin" }];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toStrictEqual(expectedUrls);
  });
  test("should return trimmed url when url with whitespaces is given", () => {
    process.env = {
      ...process.env,
      ICE_SERVER_URLS:
        "stun:stun.l.google.com:19302, adm in :g hbn :@ @turn:test.turn.server:1914 ",
    };

    const expectedUrls = [
      { url: "stun:stun.l.google.com:19302" },
      { url: "turn:test.turn.server:1914", credential: "g hbn :@ ", username: "adm in " },
    ];

    const { iceServerUrls } = getConfiguration();

    expect(iceServerUrls).toStrictEqual(expectedUrls);
  });
});
