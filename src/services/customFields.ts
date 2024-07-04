import { GET } from "../index";

export function createCustomFieldsClient(GET: GET) {
  return {
    getSignedURL(entityId: number, entityType: "NODE" | "LOCATION" | "ORGANIZATION") {
      return GET<string>(`/v2/custom-fields/entity-type/${entityType}/${entityId}/signed-urls`);
    }
  } as const;
}