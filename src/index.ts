import { rebuildDocument } from "./utils";
import { createAuthClient } from "./services/auth";
import { createSystemClient } from "./services/system";
import { createDevices } from "./services/devices";
import { createOrganizationClient } from "./services/organization";
import { createGroupsClient } from "./services/groups";
import { createBackupClient } from "./services/backup";
import { createTicketingClient } from "./services/ticketing";
import { createLocationClient } from "./services/location";
import { createQueriesClient } from "./services/queries";
import { createManagementClient } from "./services/management";
import { createWebhooksClient } from "./services/webhooks";
import { createRelatedItemsClient } from "./services/relatedItems";
import { createKnowledgeBaseArticlesClient } from "./services/knowledgeBaseArticles";
import { createDocumentTemplatesClient } from "./services/documentTemplates";
import { createOrganizationDocumentsClient } from "./services/organizationDocuments";
import { createCustomFieldsClient } from "./services/customFields";
import {
  ActivityList,
  Alert,
  Device,
  DeviceBackupUsage,
  Job,
  JobType,
  NodeClass,
  Organization,
  Policy,
  SourceType
} from "./types-temp";
import {
  AutomationScript,
  Location,
  DeviceCustomField,
  Group,
  NotificationChannel,
  DeviceRole,
  OrganizationDetailed, Task, SoftwareProduct, User, DevicesSearch, CustomFields
} from "./types/system";
import {
  DeviceDetails,
  DeviceDisk,
  LoggedOnUser,
  NetworkInterface,
  OSPatch,
  Processor, ServiceState, Software,
  SoftwarePatch, Volume, WindowsService
} from "./types/devices";
import {
  InstallerType,
  PolicyConditionCustomFields,
  ScriptingOptions,
  WindowsEventCondition
} from "./types/management";
import { CreateTicket, Ticket, Comment, UpdateTicket, LogEntryType, LogEntry } from "./types/ticketing";
import { BackupJob, BackupJobCreated, BackupParams } from "./types/backup";
import { CursorList } from "./types";
import { DocumentTemplate } from "./types/documentTemplates";

export type GET = <T>(path: string, params?: Record<string, any>) => Promise<T>;
export type BODY = <T>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") => Promise<T>;
export type DELETE = <T extends any = {}>(path: string) => Promise<T>;

export type NinjaClient = {
  auth(clientId: string, clientSecret: string): {
    getAuthorizationURL: (redirectUri: string, refreshToken: boolean, scope?: string, state?: string) => string;
    getTokenFromAuthorization: (code: string, redirectUri: string) => Promise<{ access_token: string; expires_in: number; scope: string; token_type: string; }>
  },
  system: {
    listOrganizations: (params?: { after?: number, of?: string, pageSize?: number }) => Promise<Organization[]>
    listPolicies: () => Promise<Policy[]>
    listJobs: (params?: { df?: string, jobType?: JobType, lang?: string, tz?: string }) => Promise<Job[]>
    listActivities: (params?: {
      after?: string
      before?: string
      class?: "SYSTEM" | "DEVICE" | "USER" | "ALL"
      df?: string
      lang?: string
      newerThan?: number
      olderThan?: number
      pageSize?: number
      seriesUis?: string
      sourceConfigUid?: string
      status?: string
      type?: string
      tz?: string
      user?: string
    }) => Promise<ActivityList>
    listAlerts: (params?: { df?: string, lang?: string, sourceType?: SourceType, tz?: string }) => Promise<Alert[]>
    listAutomationScripts: (lang?: string) => Promise<AutomationScript[]>;
    listDeviceCustomFields: (scopes?: ("all" | "node" | "location")[]) => Promise<DeviceCustomField[]>;
    listDevices: (params?: { after?: number, df?: string, pageSize?: number }) => Promise<Device[]>
    listDevicesDetailed: (params?: { after?: number, df?: string, pageSize?: number }) => Promise<DeviceDetails[]>
    listEnabledNotificationChannels: () => Promise<NotificationChannel[]>
    listGroups: () => Promise<Group[]>
    listLocations: (params?: { after?: number, pageSize?: number }) => Promise<Location[]>
    listDeviceRoles: () => Promise<DeviceRole[]>
    listNotificationChannels: () => Promise<NotificationChannel[]>
    listOrganizationsDetailed: (params?: { after?: number, of?: string, pageSize?: number }) => Promise<OrganizationDetailed[]>
    listTasks: () => Promise<Task[]>
    listSoftwareProducts: () => Promise<SoftwareProduct[]>
    listUsers: <T extends boolean>(params?: { includeRoles?: T, userType?: User<T>["userType"]}) => Promise<User<T>[]>
    findDevices: (query: string, limit?: number) => Promise<DevicesSearch>
  }
  organization: {
    listLocations: (organizationId: number) => Promise<Location[]>
    listEndUsers: <T extends boolean = false>(organizationId: number, includeRoles?: T) => Promise<User<T>[]>
    getLocationBackupUsage: (organizationId: number, locationId: number) => Promise<DeviceBackupUsage & {
      locationId: number
      locationName: string
      locationDescription: string
      organizationId: number
      organizationName: string
    }>
    listCustomFields: (organizationId: number) => Promise<Record<string, any>>
    updateFieldValues: (organizationId: number, data: Record<string, any>) => Promise<{}>
    get: (organizationId: number) => Promise<OrganizationDetailed>
    listDevices: (organizationId: number, params?: { after?: number, pageSize?: number }) => Promise<Device[]>
    listLocationBackupUsage: (organizationId: number) => Promise<(DeviceBackupUsage & {
      locationId: number
      locationName: string
      locationDescription: string
      organizationId: number
      organizationName: string
    })[]>
  }
  devices: {
    get: (id: number) => Promise<DeviceDetails>,
    listActiveJobs: (deviceId: number, params?: { lang?: string, tz?: string }) => Promise<unknown[]>
    listActivities: (deviceId: number, params?: {
      activityType?: string
      lang?: string
      newerThan?: number
      olderThan?: number
      pageSize?: number
      seriesUid?: string
      status?: string
      tz?: string
    }) => Promise<ActivityList>
    listAlerts: (deviceId: number, params?: { lang?: string, tz?: string }) => Promise<Alert[]>
    listDisks: (deviceId: number) => Promise<DeviceDisk[]>
    listOSPatchInstalls: (deviceId: number, params?: {
      installedAfter?: string
      installedBefore?: string
      status?: "FAILED" | "INSTALLED"
    }) => Promise<OSPatch[]>
    listSoftwarePatchInstalls: (deviceId: number, params?: {
      impact?: string
      installedAfter?: string
      installedBefore?: string
      productIdentifier?: string
      status?: string
      type?: string
    }) => Promise<SoftwarePatch[]>
    getLastLoggedOnUser: (deviceId: number) => Promise<LoggedOnUser>
    listNetworkInterfaces: (deviceId: number) => Promise<NetworkInterface[]>
    listOSPatches: (deviceId: number, params?: {
      severity?: string
      status?: string
      type?: string
    }) => Promise<OSPatch[]>
    listSoftwarePatches: (deviceId: number, params?: {
      impact?: string
      productIdentifier?: string
      status?: string
      type?: string
    }) => Promise<SoftwarePatch[]>
    listProcessors: (deviceId: number) => Promise<Processor[]>
    listWindowsServices: (deviceId: number, params?: {
      name?: string,
      state?: ServiceState
    }) => Promise<WindowsService[]>
    listSoftware: (deviceId: number) => Promise<Software[]>
    listVolumes: <T extends boolean>(deviceId: number, includeBitlocker?: T) => Promise<Volume<T>[]>
    listCustomFields: (deviceId: number, params?: { withInheritance?: boolean }) => Promise<CustomFields>
    updateFieldValues: (deviceId: number, values: Record<string, any>) => Promise<{}>
  }
  groups: {
    listDevices: (groupId: number) => Promise<number[]>
  }
  queries: {}
  management: {
    listWindowsEventConditions: (policyId: number) => Promise<WindowsEventCondition[]>
    createWindowsEventCondition: (policyId: number, data: Omit<WindowsEventCondition, "inheritance" | "id" | "conditionName" | "displayName">) => Promise<WindowsEventCondition>
    deletePolicyCondition: (policyId: number, conditionId: number) => Promise<{}>
    getPolicyConditionCustomFields: (policyId: number, conditionId: number) => Promise<PolicyConditionCustomFields>
    getWindowsEventCondition: (policyId: number, conditionId: number) => Promise<WindowsEventCondition>
    createOrganization: (data: Omit<OrganizationDetailed<false>, "id" | "settings">) => Promise<OrganizationDetailed>
    approveOrRejectDevices: (mode: "APPROVE" | "REJECT", devices: number[]) => Promise<undefined>
    resetAlert: (uid: string, customData?: Record<string, any>) => Promise<undefined>
    scheduleMaintenance: (deviceId: number, disabledFeatures: ("ALERTS" | "PATCHING" | "AVSCANS" | "TASKS")[], end: number, start: number) => Promise<unknown>
    cancelMaintenance: (deviceId: number) => Promise<{}>
    windowsServiceControl: (deviceId: number, serviceId: string, action: "START" | "PAUSE" | "STOP" | "RESTART") => Promise<undefined>
    updateDeviceInformation: (deviceId: number, data: Pick<Device, "displayName" | "userData" | "nodeRoleId" | "policyId" | "organizationId" | "locationId">) => Promise<undefined>
    getDeviceLink: (deviceId: number) => Promise<{ url: URL }>
    resetDevicePolicyOverrides: (deviceId: number) => Promise<undefined>
    rebootDevice: (deviceId: number, mode: "NORMAL" | "FORCED", reason?: string) => Promise<undefined>
    getDeviceScriptingOptions: (deviceId: number, language?: string) => Promise<ScriptingOptions>
    runScript: (deviceId: number, data: {
      type: "ACTION" | "SCRIPT"
      id: number
      uid: string
      parameters: string
      runAs: string
    }) => Promise<undefined>
    modifyWindowsServiceConfig: (deviceId: number, serviceId: string, data: Pick<WindowsService, "startType" | "userName">) => Promise<undefined>
    addLocation: (organizationId: number, location: Omit<Location, "id">) => Promise<Location>
    generateInstaller: (organizationId: number, locationId: number, installerType: InstallerType) => Promise<{ url: URL }>
    generateSpecificInstaller: (data: {
      organizationId: number
      locationId: number
      installerType: InstallerType
      content: Record<string, any>
    }) => Promise<{ url: URL }>
    updateOrganization: (organizationId: number, data: Omit<Organization, "id">) => Promise<undefined>
    updateLocation: (organizationId: number, locationId: number, data: Omit<Location, "id">) => Promise<undefined>
    changeOrganizationPolicyMappings: (organizationId: number, data: { nodeRoleId: number, policyId: number }[]) => Promise<number[]>
    createPolicy: (mode: "NEW" | "CHILD" | "COPY", templatePolicyId: number, data: {
      parentPolicyId: number
      name: string
      description: string
      nodeClass: NodeClass,
      enabled: boolean
    }) => Promise<Policy>
  }
  ticketing: {
    create: (data: CreateTicket) => Promise<Ticket>
    comment: (ticketId: number, data: Comment) => Promise<string>
    get: (ticketId: number) => Promise<Ticket>
    update: (ticketId: number, data: UpdateTicket) => Promise<Ticket>
    listLogEntries: (ticketId: number, params?: {
      anchorId?: number
      createTime?: string
      pageSize?: number
      type?: LogEntryType
    }) => Promise<LogEntry[]>
  }
  webhooks: {}
  relatedItems: {}
  location: {
    listCustomFields: (organizationId: number, locationId: number) => Promise<Record<string, any>>
    updateFieldValues: (organizationId: number, locationId: number, values: Record<string, any>) => Promise<unknown>
  }
  backup: {
    listIntegrityCheckJobs: (params?: BackupParams) => Promise<CursorList<BackupJob>>
    createIntegrityCheckJob: (deviceId: number, planUid: string) => Promise<BackupJobCreated>
    listBackupJobs: (params?: BackupParams) => Promise<CursorList<BackupJob>>
  }
  knowledgeBaseArticles: {}
  organizationDocuments: {}
  documentTemplates: {
    list: (params?: { includeTechnicianRoles?: boolean, templateName?: string }) => Promise<DocumentTemplate[]>
    create: (data: Omit<DocumentTemplate, "createTime" | "updateTime" | "id">) => Promise<DocumentTemplate>
    get: (id: number, includeTechnicianRoles?: boolean) => Promise<DocumentTemplate>
    update: (id: number, data: Omit<DocumentTemplate<false>, "id">) => Promise<DocumentTemplate>
    delete: (id: number) => Promise<{}>
  }
  customFields: {
    getSignedURL: (entityId: number, entityType: "NODE" | "LOCATION" | "ORGANIZATION") => Promise<string>
  }
}

export function createNinjaClient(prefix: "app" | "eu" | "oc", token?: string): NinjaClient {
  const BASE_URL = `https://${prefix}.ninjarmm.com`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${token}`
  }

  async function GET<T extends any>(path: string, params?: Record<string, any>) {
    const url = new URL(BASE_URL + path);

    if (params) {
      for (const param of Object.keys(params)) {
        if (params[param]) url.searchParams.append(param, params[param].toString());
      }
    }

    const response = await fetch(url, { headers });

    const json = await response.json();

    if (response.ok) {
      return rebuildDocument(json) as T;
    } else {
      throw json as { resultCode: string, errorMessage: string, incidentId: string };
    }
  }

  async function BODY<T extends any>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") {
    const response = await fetch(BASE_URL + path, {
      method: method ? method : "POST",
      headers,
      body: JSON.stringify(body),
    })

    try {
      const json = await response.json();
      return rebuildDocument(json) as T;
    } catch {
      return await response.text() as unknown as T;
    }
  }

  async function DELETE<T extends any = {}>(path: string) {
    const response = await fetch(BASE_URL + path, {
      method: "DELETE",
      headers
    })

    const json = await response.json();

    return rebuildDocument(json) as T;
  }

  return {
    auth(clientId: string, clientSecret: string) {
      return createAuthClient(clientId, clientSecret, BASE_URL, token);
    },
    system: createSystemClient(GET),
    organization: createOrganizationClient(GET, BODY),
    devices: createDevices(GET, BODY),
    groups: createGroupsClient(GET),
    queries: createQueriesClient(GET),
    management: createManagementClient(GET, BODY, DELETE),
    ticketing: createTicketingClient(GET, BODY),
    webhooks: createWebhooksClient(BODY, DELETE),
    relatedItems: createRelatedItemsClient(GET, BODY, DELETE),
    location: createLocationClient(GET, BODY),
    backup: createBackupClient(GET, BODY),
    knowledgeBaseArticles: createKnowledgeBaseArticlesClient(GET, BODY),
    organizationDocuments: createOrganizationDocumentsClient(GET, BODY, DELETE),
    documentTemplates: createDocumentTemplatesClient(GET, BODY, DELETE),
    customFields: createCustomFieldsClient(GET)
  } as const;
}