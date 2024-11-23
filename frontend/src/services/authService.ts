export class AuthService {
  static getToken() {
    return localStorage.getItem("murree_jwt_token");
  }

  static setToken(token: string) {
    localStorage.setItem("murree_jwt_token", token);
  }

  static removeToken() {
    localStorage.removeItem("murree_jwt_token");
  }

  static decodeToken() {
    const token = this.getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  }

  static isAuthenticated() {
    try {
      const payload = this.decodeToken();
      if (!payload.exp) {
        return true;
      }
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}
