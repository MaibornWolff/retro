interface URLProperties {
  protocol: string;
  host: string;
  port: string;
}

export class RetroAppUrl {
  public readonly protocol: "http" | "https";
  public readonly host: string;
  public readonly port: number;
  public readonly url: string;

  constructor({ protocol, host, port }: URLProperties) {
    this.protocol = RetroAppUrl.getValidatedProtocol(protocol);
    this.host = RetroAppUrl.trimHost(host);
    this.port = RetroAppUrl.getValidatedPort(port);
    this.url = `${this.protocol}://${this.host}:${this.port}`;
  }

  private static getValidatedProtocol(protocol: string) {
    if (protocol.startsWith("http")) return "http";
    if (protocol.startsWith("https")) return "https";
    throw new Error("Invalid protocol. Must be 'http' or 'https'.");
  }

  private static trimHost(host?: string): string {
    if (!host) throw new Error("Host must not be empty.");
    if (host.endsWith("/")) return host.slice(0, -1);
    return host;
  }

  private static getValidatedPort(port?: string): number {
    if (!port) throw new Error("Port must not be empty.");
    return Number(port);
  }
}
