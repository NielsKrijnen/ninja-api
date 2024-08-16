import { NinjaBase } from "./index";

export class NinjaCustomFields extends NinjaBase {
  getSignedURL(entityId: number, entityType: "NODE" | "LOCATION" | "ORGANIZATION") {
    return this.GET<string>(`/v2/custom-fields/entity-type/${entityType}/${entityId}/signed-urls`);
  }
}