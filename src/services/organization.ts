import { BODY, GET } from "../index";
import { Location, OrganizationDetailed, User } from "../types/system";
import { Device, DeviceBackupUsage } from "../types-temp";

export function createOrganizationClient(GET: GET, BODY: BODY) {
  return {
    listLocations(organizationId: number) {
      return GET<Location[]>(`/v2/organization/${organizationId}/locations`);
    },
    listEndUsers<T extends boolean = false>(organizationId: number, includeRoles?: T) {
      return GET<User<T>[]>(`/v2/organization/${organizationId}/end-users`, { includeRoles });
    },
    getLocationBackupUsage(organizationId: number, locationId: number) {
      return GET<DeviceBackupUsage & {
        locationId: number
        locationName: string
        locationDescription: string
        organizationId: number
        organizationName: string
      }>(`/v2/organization/${organizationId}/locations/${locationId}/backup/usage`);
    },
    listCustomFields(organizationId: number) {
      return GET<Record<string, any>>(`/v2/organization/${organizationId}/custom-fields`);
    },
    updateFieldValues(organizationId: number, data: Record<string, any>) {
      return BODY<{}>(`/v2/organization/${organizationId}/custom-fields`, data, "PATCH");
    },
    get(organizationId: number) {
      return GET<OrganizationDetailed>(`/v2/organization/${organizationId}`)
    },
    listDevices(organizationId: number, params?: { after?: number, pageSize?: number }) {
      return GET<Device[]>(`/v2/organization/${organizationId}/devices`, params);
    },
    listLocationBackupUsage(organizationId: number) {
      return GET<(DeviceBackupUsage & {
        locationId: number
        locationName: string
        locationDescription: string
        organizationId: number
        organizationName: string
      })[]>(`/v2/organization/${organizationId}/locations/backup/usage`);
    }
  } as const;
}