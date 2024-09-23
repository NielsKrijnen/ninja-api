export type AccessTokenResponse<Refresh extends boolean = false> = {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  refresh_token: Refresh extends true ? string : undefined
}