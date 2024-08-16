import { NinjaBase } from "./index";
import { Location, OrganizationDetailed, User } from "./system/types";
import { Device, DeviceBackupUsage } from "../../types-temp";

export class NinjaOrganization extends NinjaBase {
  listLocations(organizationId: number) {
    return this.GET<Location[]>(`/v2/organization/${organizationId}/locations`);
  }
  listEndUsers<T extends boolean = false>(organizationId: number, includeRoles?: T) {
    return this.GET<User<T>[]>(`/v2/organization/${organizationId}/end-users`, { includeRoles });
  }
  getLocationBackupUsage(organizationId: number, locationId: number) {
    return this.GET<DeviceBackupUsage & {
      locationId: number
      locationName: string
      locationDescription: string
      organizationId: number
      organizationName: string
    }>(`/v2/organization/${organizationId}/locations/${locationId}/backup/usage`);
  }
  listCustomFields(organizationId: number) {
    return this.GET<Record<string, any>>(`/v2/organization/${organizationId}/custom-fields`);
  }
  updateFieldValues(organizationId: number, data: Record<string, any>) {
    return this.BODY<{}>(`/v2/organization/${organizationId}/custom-fields`, data, "PATCH");
  }
  get(organizationId: number) {
    return this.GET<OrganizationDetailed>(`/v2/organization/${organizationId}`)
  }
  listDevices(organizationId: number, params?: { after?: number, pageSize?: number }) {
    return this.GET<Device[]>(`/v2/organization/${organizationId}/devices`, params);
  }
  listLocationBackupUsage(organizationId: number) {
    return this.GET<(DeviceBackupUsage & {
      locationId: number
      locationName: string
      locationDescription: string
      organizationId: number
      organizationName: string
    })[]>(`/v2/organization/${organizationId}/locations/backup/usage`);
  }
}