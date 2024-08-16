import { NinjaBase } from "../index";
import { AccessTokenResponse } from "./types";

export class NinjaAuth extends NinjaBase {
  getAuthURL(redirectUri: string, scope?: string, state?: string) {
    return `${this.BASE_URL}/ws/oauth/authorize` +
      '?response_type=code' +
      `&client_id=${this.config.clientId}` +
      `&client_secret=${this.config.clientSecret}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=${scope ? scope : `monitoring management control`}` +
      `${state ? `&state=${state} ` : '' }`
  }

  async getTokenFromCode(code: string, redirectUri: string) {
    const response = await fetch(this.BASE_URL + "/ws/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: redirectUri,
      })
    }).then(response => response.json());

    if (response.error) {
      throw response as { error: string };
    } else {
      this.config.sessionToken = response.access_token;
      return response as AccessTokenResponse;
    }
  }
}