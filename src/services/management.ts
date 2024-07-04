import { BODY, GET, DELETE } from "../index";
import {
  InstallerType,
  PolicyConditionCustomFields,
  ScriptingOptions,
  WindowsEventCondition
} from "../types/management";
import { OrganizationDetailed } from "../types/system";
import { Device, Location, NodeClass, Organization, Policy } from "../types-temp";
import { WindowsService } from "../types/devices";

export function createManagementClient(GET: GET, BODY: BODY, DELETE: DELETE) {
  return {
    listWindowsEventConditions(policyId: number) {
      return GET<WindowsEventCondition[]>(`/v2/policies/${policyId}/condition/windows-event`);
    },
    createWindowsEventCondition(policyId: number, data: Omit<WindowsEventCondition, "inheritance" | "id" | "conditionName" | "displayName">) {
      return BODY<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event`, data);
    },
    deletePolicyCondition(policyId: number, conditionId: number) {
      return DELETE(`/v2/policies/${policyId}/condition/${conditionId}`);
    },
    getPolicyConditionCustomFields(policyId: number, conditionId: number) {
      return GET<PolicyConditionCustomFields>(`/v2/policies/${policyId}/condition/custom-fields/${conditionId}`);
    },
    getWindowsEventCondition(policyId: number, conditionId: number) {
      return GET<WindowsEventCondition>(`/v2/policies/${policyId}/condition/windows-event/${conditionId}`);
    },
    createOrganization(data: Omit<OrganizationDetailed<false>, "id" | "settings">) {
      return BODY<OrganizationDetailed>("/v2/organizations", data);
    },
    approveOrRejectDevices(mode: "APPROVE" | "REJECT", devices: number[]) {
      return BODY<undefined>(`/v2/devices/approval/${mode}`, devices);
    },
    resetAlert(uid: string, customData?: Record<string, any>) {
      if (customData) {
        return BODY<undefined>(`/v2/alert/${uid}/reset`, customData);
      } else {
        return DELETE<undefined>(`/v2/alert/${uid}`);
      }
    },
    scheduleMaintenance(deviceId: number, disabledFeatures: ("ALERTS" | "PATCHING" | "AVSCANS" | "TASKS")[], end: number, start: number = new Date().getTime() / 1000) {
      return BODY(`/v2/device/${deviceId}/maintenance`, { disabledFeatures, end, start }, "PUT");
    },
    cancelMaintenance(deviceId: number) {
      return DELETE(`/v2/device/${deviceId}/maintenance`);
    },
    windowsServiceControl(deviceId: number, serviceId: string, action: "START" | "PAUSE" | "STOP" | "RESTART") {
      return BODY<undefined>(`/v2/device/${deviceId}/windows-service/${serviceId}/control`, { action });
    },
    updateDeviceInformation(deviceId: number, data: Pick<Device, "displayName" | "userData" | "nodeRoleId" | "policyId" | "organizationId" | "locationId">) {
      return BODY<undefined>(`/v2/device/${deviceId}`, data, "PATCH");
    },
    getDeviceLink(deviceId: number) {
      return GET<{ url: URL }>(`/v2/device/${deviceId}/dashboard-url`, { redirect: false });
    },
    resetDevicePolicyOverrides(deviceId: number) {
      return DELETE<undefined>(`/v2/device/${deviceId}/policy/overrides`);
    },
    rebootDevice(deviceId: number, mode: "NORMAL" | "FORCED", reason?: string) {
      return BODY<undefined>(`/v2/device/${deviceId}/reboot/${mode}`, { reason });
    },
    getDeviceScriptingOptions(deviceId: number, language?: string) {
      return GET<ScriptingOptions>(`/v2/device/${deviceId}/scripting/options`, { language });
    },
    /** Run script or built-in action on a device */
    runScript(deviceId: number, data: {
      type: "ACTION" | "SCRIPT"
      id: number
      uid: string
      parameters: string
      runAs: string
    }) {
      return BODY<undefined>(`/v2/device/${deviceId}/script/run`, data);
    },
    modifyWindowsServiceConfig(deviceId: number, serviceId: string, data: Pick<WindowsService, "startType" | "userName">) {
      return BODY<undefined>(`/v2/device/${deviceId}/windows-service/${serviceId}/configure`, data);
    },
    addLocation(organizationId: number, location: Omit<Location, "id">) {
      return BODY<Location>(`/v2/organization/${organizationId}/locations`, location);
    },
    generateInstaller(organizationId: number, locationId: number, installerType: InstallerType) {
      return GET<{ url: URL }>(`/v2/organization/${organizationId}/location/${locationId}/installer/${installerType}`);
    },
    generateSpecificInstaller(data: {
      organizationId: number
      locationId: number
      installerType: InstallerType
      content: Record<string, any>
    }) {
      return BODY<{ url: URL }>("/v2/organization/generate-installer", data);
    },
    updateOrganization(organizationId: number, data: Omit<Organization, "id">) {
      return BODY<undefined>(`/v2/organization/${organizationId}`, data, "PATCH");
    },
    updateLocation(organizationId: number, locationId: number, data: Omit<Location, "id">) {
      return BODY<undefined>(`/v2/organization/${organizationId}/locations/${locationId}`, data, "PATCH");
    },
    /** Update policy assignment for node role(s). Returns list of affected device IDs */
    changeOrganizationPolicyMappings(organizationId: number, data: { nodeRoleId: number, policyId: number }[]) {
      return BODY<number[]>(`/v2/organization/${organizationId}/policies`, data, "PUT");
    },
    /** Creates new policy using (New Root, Child, Copy) */
    createPolicy(mode: "NEW" | "CHILD" | "COPY", templatePolicyId: number, data: {
      parentPolicyId: number
      name: string
      description: string
      nodeClass: NodeClass,
      enabled: boolean
    }) {
      return BODY<Policy>(`/v2/policies?mode=${mode}&templatePolicyId=${templatePolicyId}`, data);
    }
  } as const;
}