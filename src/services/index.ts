import { NinjaClientConfig } from "../client";
import { rebuildDocument } from "../utils";

export class NinjaBase {
  protected readonly BASE_URL: string;
  private readonly headers: HeadersInit;

  constructor(protected readonly config: NinjaClientConfig) {
    this.BASE_URL = `https://${config.prefix}.ninjarmm.com`;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "*/*"
    }
    if (config.sessionToken) this.headers["Authorization"] = `Bearer ${config.sessionToken}`;
  }

  protected async GET<T extends any>(path: string, params?: Record<string, any>) {
    const url = new URL(this.BASE_URL + path);

    if (params) {
      for (const param of Object.keys(params)) {
        if (params[param]) url.searchParams.append(param, params[param].toString());
      }
    }

    const response = await fetch(url, { headers: this.headers });

    const json = await response.json();

    if (response.ok) {
      return rebuildDocument(json) as T;
    } else {
      throw json as { resultCode: string, errorMessage: string, incidentId: string };
    }
  }

  protected async BODY<T extends any>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") {
    const response = await fetch(this.BASE_URL + path, {
      method: method ? method : "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })

    try {
      const json = await response.json();
      return rebuildDocument(json) as T;
    } catch {
      return await response.text() as unknown as T;
    }
  }

  protected async DELETE<T extends any = {}>(path: string) {
    const response = await fetch(this.BASE_URL + path, {
      method: "DELETE",
      headers: this.headers
    })

    const json = await response.json();

    return rebuildDocument(json) as T;
  }
}