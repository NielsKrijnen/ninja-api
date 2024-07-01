export function createAuthClient(clientId: string, clientSecret: string, BASE_URL: string, accessToken?: string) {
  return {
    getAuthorizationURL(redirectUri: string, scope?: string, state?: string) {
      return `${BASE_URL}/ws/oauth/authorize?response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope ? scope : 'monitoring management control'}${state ? `&state=${state}` : '' }`;
    },
    async getTokenFromAuthorization(code: string, redirectUri: string) {
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
        return {
          error: response.error as string,
          data: null
        }
      } else {
        accessToken = response.access_token;
        return {
          error: null,
          data: response as { access_token: string, expires_in: number, scope: string, token_type: string }
        }
      }
    }
  } as const;
}