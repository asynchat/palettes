type Configuration = {
  // http://host:port 非 / 结尾
  host?: string;
  tokenKeyName?: string;
  loginUrl?: string;
  tokenValueCallback?: () => {};
  authProvider: string;
};

export class Conf {
  private static _items: Configuration = { authProvider: "pocketbase" };
  public static jwtTokenKey: string = "jwt-token";
  public static load() {
    // @ts-ignore
    const ngxConf = window.ngxConf;
    if (ngxConf) {
      Conf._items = ngxConf;
    }
  }

  public static items() {
    return Conf._items;
  }

  public static getHost() {
    return Conf._items.host ?? "http://localhost:8080";
  }

  public static endpoint(flowId: string) {
    return `${Conf.getHost()}/share/api/v1/graphx/flow/run?share=${flowId}`;
  }

  public static getJwtToken() {
    Conf.load();
    const callback = Conf._items.tokenValueCallback;
    if (callback) {
      return callback();
    }
    const tokenKeyName = Conf._items.tokenKeyName ?? Conf.jwtTokenKey;
    const token = localStorage.getItem(tokenKeyName);
    if (token === null || token.trim().length === 0) {
      return "{}";
    }
    const t = JSON.parse(token);
    t["provider"] = Conf._items.authProvider ?? "pocketbase";
    return JSON.stringify(t);
  }

  public static isLogin(enableAuth: boolean) {
    const token = localStorage.getItem(Conf.jwtTokenKey);
    if (token !== null && enableAuth) {
      return true;
    }
    return false;
  }
}
