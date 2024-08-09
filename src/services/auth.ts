export function createAuthClient(clientId: string, clientSecret: string, BASE_URL: string, accessToken?: string) {
  return {
    getAuthorizationURL(redirectUri: string, refreshToken: boolean = true, scope?: string, state?: string) {
      return `${BASE_URL}/ws/oauth/authorize?response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope ? scope : 'monitoring management control'}${state ? `&state=${state} ${refreshToken ? "offline_access" : ''}` : '' }`;
    },
    async getTokenFromAuthorization<Refresh extends boolean = true>(code: string, redirectUri: string) {
      const response = await fetch(BASE_URL + "/ws/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        })
      }).then(response => response.json());

      if (response.error) {
        throw response as { error: string };
      } else {
        accessToken = response.access_token;
        return response as {
          access_token: string,
          expires_in: number,
          scope: string,
          token_type: string,
          refresh_token: Refresh extends true ? string : undefined
        };
      }
    },
    async getTokenFromRefresh(refreshToken: string) {
      const response = await fetch(BASE_URL + "/ws/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        })
      }).then(response => response.json());

      if (response.error) {
        throw response as { error: string };
      } else {
        accessToken = response.access_token;
        return response as {
          access_token: string,
          expires_in: number,
          scope: string,
          token_type: string,
          refresh_token: string
        };
      }
    }
  } as const;
}