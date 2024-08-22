import { NinjaBase } from "../index";
import { ActivityList, Alert, Device, Job, JobType, Organization, Policy, SourceType } from "../../types-temp";
import {
  AutomationScript,
  DeviceCustomField,
  DeviceRole, DevicesSearch,
  Group,
  NotificationChannel,
  OrganizationDetailed, SoftwareProduct, Task, User
} from "./types";
import { DeviceDetails } from "../devices/types";

export class NinjaSystem extends NinjaBase {
  listOrganizations(params?: { after?: number, of?: string, pageSize?: number }) {
    return this.GET<Organization[]>("/v2/organizations", params);
  }
  listPolicies() {
    return this.GET<Policy[]>("/v2/policies");
  }
  listJobs(params?: { df?: string, jobType?: JobType, lang?: string, tz?: string }) {
    return this.GET<Job[]>("/v2/jobs", params);
  }
  listActivities(params?: {
    after?: string
    before?: string
    class?: "SYSTEM" | "DEVICE" | "USER" | "ALL"
    df?: string
    lang?: string
    newerThan?: number
    olderThan?: number
    pageSize?: number
    seriesUid?: string
    sourceConfigUid?: string
    status?: string
    type?: string
    tz?: string
    user?: string
  }) {
    return this.GET<ActivityList>("/v2/activities", params);
  }
  listAlerts(params?: { df?: string, lang?: string, sourceType?: SourceType, tz?: string }) {
    return this.GET<Alert[]>("/v2/alerts", params);
  }
  listAutomationScripts(lang?: string) {
    return this.GET<AutomationScript[]>("/v2/automation/scripts", { lang });
  }
  listDeviceCustomFields(scopes?: ("all" | "node" | "location" | "organization")[]) {
    return this.GET<DeviceCustomField[]>("/v2/device-custom-fields", { scopes });
  }
  listDevices(params?: { after?: number, df?: string, pageSize?: number }) {
    return this.GET<Device[]>("/v2/devices", params);
  }
  listDevicesDetailed(params?: { after?: number, df?: string, pageSize?: number }) {
    return this.GET<DeviceDetails[]>("/v2/devices-detailed", params);
  }
  listEnabledNotificationChannels() {
    return this.GET<NotificationChannel[]>("/v2/notification-channels/enabled");
  }
  listGroups() {
    return this.GET<Group[]>("/v2/groups");
  }
  listLocations(params?: { after?: number, pageSize?: number }) {
    return this.GET<Location[]>("/v2/locations", params);
  }
  listDeviceRoles() {
    return this.GET<DeviceRole[]>("/v2/roles");
  }
  listNotificationChannels() {
    return this.GET<NotificationChannel[]>("/v2/notification-channels");
  }
  listOrganizationsDetailed(params?: { after?: number, of?: string, pageSize?: number }) {
    return this.GET<OrganizationDetailed[]>("/v2/organizations-detailed", params);
  }
  listTasks() {
    return this.GET<Task[]>("/v2/tasks");
  }
  listSoftwareProducts() {
    return this.GET<SoftwareProduct[]>("/v2/software-products");
  }
  listUsers<T extends boolean>(params?: { includeRoles?: T, userType?: User<T>["userType"] }) {
    return this.GET<User<T>[]>("/v2/users", params);
  }
  findDevices(query: string, limit?: number) {
    return this.GET<DevicesSearch>("/v2/devices/search", { q: query, limit });
  }
}