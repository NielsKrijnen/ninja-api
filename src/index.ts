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

export type GET = <T>(path: string, params?: Record<string, any>) => Promise<T>;
export type BODY = <T>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") => Promise<T>;
export type DELETE = (path: string) => Promise<{}>;

export function createNinjaClient(prefix: "app" | "eu" | "oc", accessToken?: string) {
  const BASE_URL = `https://${prefix}.ninjarmm.com`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${accessToken}`,
  }

  async function GET<T extends any>(path: string, params?: Record<string, any>) {
    const url = new URL(BASE_URL + path);

    if (params) {
      for (const param of Object.keys(params)) {
        if (params[param]) url.searchParams.append(param, params[param].toString());
      }
    }

    const response = await fetch(url, { headers });

    const json = await response.json();

    if (response.ok) {
      return rebuildDocument(json) as T;
    } else {
      throw json as { resultCode: string, errorMessage: string, incidentId: string };
    }
  }

  async function BODY<T extends any>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") {
    const response = await fetch(BASE_URL + path, {
      method: method ? method : "POST",
      headers,
      body: JSON.stringify(body)
    })

    try {
      const json = await response.json();
      return rebuildDocument(json) as T;
    } catch {
      return await response.text() as unknown as T;
    }
  }

  async function DELETE(path: string) {
    const response = await fetch(BASE_URL + path, {
      method: "DELETE",
      headers
    })

    const json = await response.json();

    return rebuildDocument(json) as {};
  }

  return {
    auth(clientId: string, clientSecret: string) {
      return createAuthClient(clientId, clientSecret, BASE_URL, accessToken);
    },
    system: createSystemClient(GET),
    organization: createOrganizationClient(GET, BODY),
    devices: createDevices(GET, BODY),
    groups: createGroupsClient(GET),
    queries: createQueriesClient(GET),
    management: createManagementClient(GET, BODY, DELETE),
    ticketing: createTicketingClient(GET, BODY),
    webhooks: createWebhooksClient(BODY, DELETE),
    relatedItems: createRelatedItemsClient(GET, BODY, DELETE),
    location: createLocationClient(GET, BODY),
    backup: createBackupClient(GET, BODY),
    knowledgeBaseArticles: createKnowledgeBaseArticlesClient(GET, BODY),
    organizationDocuments: createOrganizationDocumentsClient(GET, BODY, DELETE),
    documentTemplates: createDocumentTemplatesClient(GET, BODY, DELETE),
    customFields: createCustomFieldsClient(GET)
  } as const;
}