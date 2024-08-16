import { NinjaBase } from "../index";
import {
  InstallerType,
  PolicyConditionCustomFields,
  ScriptingOptions,
  WindowsEventCondition
} from "./types";
import { Location, OrganizationDetailed } from "../system/types";
import { Device, NodeClass, Organization, Policy } from "../../../types-temp";
import { WindowsService } from "../devices/types";

export class NinjaManagement extends NinjaBase {
  listWindowsEventConditions(policyId: number) {
    return this.GET<WindowsEventCondition[]>(`/v2/policies/${policyId}/condition/windows-event`);
  }
  createWindowsEventCondition(policyId: number, data: Omit<WindowsEventCondition, "inheritance" | "id" | "conditionName" | "displayName">) {
    return this.BODY<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event`, data);
  }
  deletePolicyCondition(policyId: number, conditionId: number) {
    return this.DELETE(`/v2/policies/${policyId}/condition/${conditionId}`);
  }
  getPolicyConditionCustomFields(policyId: number, conditionId: number) {
    return this.GET<PolicyConditionCustomFields>(`/v2/policies/${policyId}/condition/custom-fields/${conditionId}`);
  }
  getWindowsEventCondition(policyId: number, conditionId: number) {
    return this.GET<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event/${conditionId}`);
  }
  createOrganization(data: Omit<OrganizationDetailed<false>, "id" | "settings">) {
    return this.BODY<OrganizationDetailed>("/v2/organizations", data);
  }
  approveOrRejectDevices(mode: "APPROVE" | "REJECT", devices: number[]) {
    return this.BODY<undefined>(`/v2/devices/approval/${mode}`, devices);
  }
  resetAlert(uid: string, customData?: Record<string, any>) {
    if (customData) {
      return this.BODY<undefined>(`/v2/alert/${uid}/reset`, customData);
    } else {
      return this.DELETE<undefined>(`/v2/alert/${uid}`);
    }
  }
  scheduleMaintenance(deviceId: number, disabledFeatures: ("ALERTS" | "PATCHING" | "AVSCANS" | "TASKS")[], end: number, start: number = new Date().getTime() / 1000) {
    return this.BODY(`/v2/device/${deviceId}/maintenance`, { disabledFeatures, end, start }, "PUT");
  }
  cancelMaintenance(deviceId: number) {
    return this.DELETE(`/v2/device/${deviceId}/maintenance`);
  }
  windowsServiceControl(deviceId: number, serviceId: string, action: "START" | "PAUSE" | "STOP" | "RESTART") {
    return this.BODY<undefined>(`/v2/device/${deviceId}/windows-service/${serviceId}/control`, { action });
  }
  updateDeviceInformation(deviceId: number, data: Pick<Device, "displayName" | "userData" | "nodeRoleId" | "policyId" | "organizationId" | "locationId">) {
    return this.BODY<undefined>(`/v2/device/${deviceId}`, data, "PATCH");
  }
  getDeviceLink(deviceId: number) {
    return this.GET<{ url: URL }>(`/v2/device/${deviceId}/dashboard-url`, { redirect: false });
  }
  resetDevicePolicyOverrides(deviceId: number) {
    return this.DELETE<undefined>(`/v2/device/${deviceId}/policy/overrides`);
  }
  rebootDevice(deviceId: number, mode: "NORMAL" | "FORCED", reason?: string) {
    return this.BODY<undefined>(`/v2/device/${deviceId}/reboot/${mode}`, { reason });
  }
  getDeviceScriptingOptions(deviceId: number, language?: string) {
    return this.GET<ScriptingOptions>(`/v2/device/${deviceId}/scripting/options`, { language });
  }
  /** Run script or built-in action on a device */
  runScript(deviceId: number, data: {
    type: "ACTION" | "SCRIPT"
    id: number
    uid: string
    parameters: string
    runAs: string
  }) {
    return this.BODY<undefined>(`/v2/device/${deviceId}/script/run`, data);
  }
  modifyWindowsServiceConfig(deviceId: number, serviceId: string, data: Pick<WindowsService, "startType" | "userName">) {
    return this.BODY<undefined>(`/v2/device/${deviceId}/windows-service/${serviceId}/configure`, data);
  }
  addLocation(organizationId: number, location: Omit<Location, "id">) {
    return this.BODY<Location>(`/v2/organization/${organizationId}/locations`, location);
  }
  generateInstaller(organizationId: number, locationId: number, installerType: InstallerType) {
    return this.GET<{ url: URL }>(`/v2/organization/${organizationId}/location/${locationId}/installer/${installerType}`);
  }
  generateSpecificInstaller(data: {
    organizationId: number
    locationId: number
    installerType: InstallerType
    content: Record<string, any>
  }) {
    return this.BODY<{ url: URL }>("/v2/organization/generate-installer", data);
  }
  updateOrganization(organizationId: number, data: Omit<Organization, "id">) {
    return this.BODY<undefined>(`/v2/organization/${organizationId}`, data, "PATCH");
  }
  updateLocation(organizationId: number, locationId: number, data: Omit<Location, "id">) {
    return this.BODY<undefined>(`/v2/organization/${organizationId}/locations/${locationId}`, data, "PATCH");
  }
  /** Update policy assignment for node role(s). Returns list of affected device IDs */
  changeOrganizationPolicyMappings(organizationId: number, data: { nodeRoleId: number, policyId: number }[]) {
    return this.BODY<number[]>(`/v2/organization/${organizationId}/policies`, data, "PUT");
  }
  /** Creates new policy using (New Root, Child, Copy) */
  createPolicy(mode: "NEW" | "CHILD" | "COPY", templatePolicyId: number, data: {
    parentPolicyId: number
    name: string
    description: string
    nodeClass: NodeClass,
    enabled: boolean
  }) {
    return this.BODY<Policy>(`/v2/policies?mode=${mode}&templatePolicyId=${templatePolicyId}`, data);
  }
}