import { rebuildDocument } from "./utils";
import { createAuthClient } from "./services/auth";
import { createSystemClient } from "./services/system";
import { createDevices } from "./services/devices";
import { createOrganizationClient } from "./services/organization";
import { createGroupsClient } from "./services/groups";
import { createBackupClient } from "./services/backup";
import { createTicketingClient } from "./services/ticketing";
import { createLocationClient } from "./services/location";
import { createQueriesClient } from "./services/queries";
import { createManagementClient } from "./services/management";
import { createWebhooksClient } from "./services/webhooks";
import { createRelatedItemsClient } from "./services/relatedItems";
import { createKnowledgeBaseArticlesClient } from "./services/knowledgeBaseArticles";
import { createDocumentTemplatesClient } from "./services/documentTemplates";
import { createOrganizationDocumentsClient } from "./services/organizationDocuments";
import { createCustomFieldsClient } from "./services/customFields";

export * as Backup from "./types/backup";
export * as Devices from "./types/devices";
export * as DocumentTemplates from "./types/documentTemplates";
export * as Main from "./types/index";
export * as Management from "./types/management";
export * as System from "./types/system";
export * as Ticketing from "./types/ticketing";
export * as Temp from "./types-temp";

export type GET = <T>(path: string, params?: Record<string, any>) => Promise<T>;
export type BODY = <T>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") => Promise<T>;
export type DELETE = <T extends any = {}>(path: string) => Promise<T>;

export class NinjaClient {
  private readonly BASE_URL: string;
  private readonly headers: HeadersInit;
  private readonly token: string | undefined;

  constructor(prefix: "app" | "eu" | "oc", token?: string) {
    this.BASE_URL = `https://${prefix}.ninjarmm.com`;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`
    }
    this.token = token;
  }

  private async GET<T extends any>(path: string, params?: Record<string, any>) {
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

  private async BODY<T extends any>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") {
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

  private async DELETE<T extends any = {}>(path: string) {
    const response = await fetch(this.BASE_URL + path, {
      method: "DELETE",
      headers: this.headers
    })

    const json = await response.json();

    return rebuildDocument(json) as T;
  }

  auth(clientId: string, clientSecret: string) {
    return createAuthClient(clientId, clientSecret, this.BASE_URL, this.token);
  }
  system = createSystemClient(this.GET)
  organization = createOrganizationClient(this.GET, this.BODY)
  devices = createDevices(this.GET, this.BODY)
  groups = createGroupsClient(this.GET)
  queries = createQueriesClient(this.GET)
  management = createManagementClient(this.GET, this.BODY, this.DELETE)
  ticketing = createTicketingClient(this.GET, this.BODY)
  webhooks = createWebhooksClient(this.BODY, this.DELETE)
  relatedItems = createRelatedItemsClient(this.GET, this.BODY, this.DELETE)
  location = createLocationClient(this.GET, this.BODY)
  backup = createBackupClient(this.GET, this.BODY)
  knowledgeBaseArticles = createKnowledgeBaseArticlesClient(this.GET, this.BODY)
  organizationDocuments = createOrganizationDocumentsClient(this.GET, this.BODY, this.DELETE)
  documentTemplates = createDocumentTemplatesClient(this.GET, this.BODY, this.DELETE)
  customFields = createCustomFieldsClient(this.GET)
}