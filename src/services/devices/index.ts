import { NinjaBase } from "../index";
import {
  DeviceDetails,
  DeviceDisk,
  LoggedOnUser,
  NetworkInterface,
  OSPatch, Processor, ServiceState, Software,
  SoftwarePatch, Volume, WindowsService
} from "./types";
import { ActivityList, Alert } from "../../types-temp";
import { CustomFields } from "../system/types";

export class NinjaDevices extends NinjaBase {
  get(id: number) {
    return this.GET<DeviceDetails>(`/v2/device/${id}`);
  }
  listActiveJobs(deviceId: number, params?: { lang?: string, tz?: string }) {
    return this.GET<unknown[]>(`/v2/device/${deviceId}/jobs`, params);
  }
  listActivities(deviceId: number, params?: {
    activityType?: string
    lang?: string
    newerThan?: number
    olderThan?: number
    pageSize?: number
    seriesUid?: string
    status?: string
    tz?: string
  }) {
    return this.GET<ActivityList>(`/v2/device/${deviceId}/activities`, params);
  }
  listAlerts(deviceId: number, params?: { lang?: string, tz?: string }) {
    return this.GET<Alert[]>(`/v2/device/${deviceId}/alerts`, params);
  }
  listDisks(deviceId: number) {
    return this.GET<DeviceDisk[]>(`/v2/device/${deviceId}/disks`);
  }
  listOSPatchInstalls(deviceId: number, params?: {
    installedAfter?: string
    installedBefore?: string
    status?: "FAILED" | "INSTALLED"
  }) {
    return this.GET<OSPatch[]>(`/v2/device/${deviceId}/os-patch-installs`, params);
  }
  listSoftwarePatchInstalls(deviceId: number, params?: {
    impact?: string
    installedAfter?: string
    installedBefore?: string
    productIdentifier?: string
    status?: string
    type?: string
  }) {
    return this.GET<SoftwarePatch[]>(`/v2/device/${deviceId}/software-patch-installs`, params);
  }
  getLastLoggedOnUser(deviceId: number) {
    return this.GET<LoggedOnUser>(`/v2/device/${deviceId}/last-logged-on-user`);
  }
  listNetworkInterfaces(deviceId: number) {
    return this.GET<NetworkInterface[]>(`/v2/device/${deviceId}/network-interfaces`);
  }
  listOSPatches(deviceId: number, params?: {
    severity?: string
    status?: string
    type?: string
  }) {
    return this.GET<OSPatch[]>(`/v2/device/${deviceId}/os-patches`, params);
  }
  listSoftwarePatches(deviceId: number, params?: {
    impact?: string
    productIdentifier?: string
    status?: string
    type?: string
  }) {
    return this.GET<SoftwarePatch[]>(`/v2/device/${deviceId}/software-patches`, params);
  }
  listProcessors(deviceId: number) {
    return this.GET<Processor[]>(`/v2/device/${deviceId}/processors`);
  }
  listWindowsServices(deviceId: number, params?: {
    name?: string,
    state?: ServiceState
  }) {
    return this.GET<WindowsService[]>(`/v2/device/${deviceId}/windows-services`, params);
  }
  listSoftware(deviceId: number) {
    return this.GET<Software[]>(`/v2/device/${deviceId}/software`);
  }
  listVolumes<T extends boolean>(deviceId: number, includeBitlocker?: T) {
    return this.GET<Volume<T>[]>(`/v2/device/${deviceId}/volumes`, includeBitlocker ? { include: 'bl' } : {});
  }
  listCustomFields(deviceId: number, params?: { withInheritance?: boolean }) {
    return this.GET<CustomFields>(`/v2/device/${deviceId}/custom-fields`, params);
  }
  updateFieldValues(deviceId: number, values: Record<string, any>) {
    return this.BODY<{}>(`/v2/device/${deviceId}/custom-fields`, values, "PATCH");
  }
}