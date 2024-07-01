import { BODY, GET } from "../index";

export function createLocationClient(GET: GET, BODY: BODY) {
  return {
    listCustomFields(organizationId: number, locationId: number) {
      return GET<Record<string, any>>(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`);
    },
    updateFieldValues(organizationId: number, locationId: number, values: Record<string, any>) {
      return BODY(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`, values, "PATCH");
    }
  } as const;
}