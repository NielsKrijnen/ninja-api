import { NinjaBase } from "./index";

export class NinjaLocation extends NinjaBase {
  listCustomFields(organizationId: number, locationId: number) {
    return this.GET<Record<string, any>>(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`);
  }
  updateFieldValues(organizationId: number, locationId: number, values: Record<string, any>) {
    return this.BODY(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`, values, "PATCH");
  }
}