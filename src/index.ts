import { rebuildDocument } from "./utils";
import { ActivityList, Alert, Job, JobType, Organization, Policy, SourceType } from "./types-temp";
import { CursorList } from "./types";
import { BackupJob, BackupJobCreated, BackupParams } from "./types/backup";
import {
  DeviceDetails,
  DeviceDisk,
  LoggedOnUser,
  NetworkInterface,
  OSPatch,
  Processor,
  ServiceState,
  Software,
  SoftwarePatch,
  Volume,
  WindowsService,
} from "./types/devices";

export function createNinjaClient(prefix: "app" | "eu" | "oc", accessToken?: string) {
  const BASE_URL = `https://${prefix}.ninjarmm.com`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${accessToken}`,
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

  async function BODY<T extends Record<string, any>>(path: string, body: Record<string, any>, method?: "POST" | "PUT" | "PATCH") {
    const response = await fetch(BASE_URL + path, {
      method: method ? method : "POST",
      headers,
      body: JSON.stringify(body)
    })

    if (method === "PATCH") {
      return await response.text();
    } else {
      const json = await response.json();
      return rebuildDocument(json) as T;
    }
  }

  async function DELETE(path: string, body: Record<string, any>) {
    const response = await fetch(BASE_URL + path, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body)
    })

    const json = await response.json();

    return rebuildDocument(json) as {};
  }

  return {
    auth(clientId: string, clientSecret: string) {
      return {
        getAuthorizationURL(redirectUri: string, scope?: string, state?: string) {
          return `${BASE_URL}/ws/oauth/authorize?response_type=code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope ? scope : 'monitoring management control'}${state ? `&state=${state}` : '' }`;
        },
        async getTokenFromAuthorization(code: string, redirectUri: string) {
          const response = await fetch(BASE_URL + "/ws/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: clientId,
              client_secret: clientSecret,
              code,
              redirect_uri: redirectUri,
            })
          }).then(response => response.json());

          if (response.error) {
            return {
              error: response.error as string,
              data: null
            }
          } else {
            accessToken = response.access_token;
            return {
              error: null,
              data: response as { access_token: string, expires_in: number, scope: string, token_type: string }
            }
          }
        }
      } as const;
    },
    system: {
      listOrganizations(params?: { after?: number, of?: string, pageSize?: number }) {
        return GET<Organization[]>("/v2/organizations", params);
      },
      getAttachment(id: string) {
        return GET<unknown>(`/v2/attachment/${id}`);
      },
      listPolicies() {
        return GET<Policy[]>("/v2/policies");
      },
      listJobs(params?: { df?: string, jobType?: JobType, lang?: string, tz?: string }) {
        return GET<Job[]>("/v2/jobs", params);
      },
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
        return GET<ActivityList>("/v2/activities", params);
      },
      listAlerts(params?: { df?: string, lang?: string, sourceType?: SourceType, tz?: string }) {
        return GET<Alert[]>("/v2/alerts", params);
      }
    },
    organization: {

    },
    devices: {
      get(id: number) {
        return GET<DeviceDetails>(`/v2/device/${id}`);
      },
      listActiveJobs(deviceId: number, params?: { lang?: string, tz?: string }) {
        return GET<unknown[]>(`/v2/device/${deviceId}/jobs`, params);
      },
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
        return GET<ActivityList>(`/v2/device/${deviceId}/activities`, params);
      },
      listAlerts(deviceId: number, params?: { lang?: string, tz?: string }) {
        return GET<Alert[]>(`/v2/device/${deviceId}/alerts`, params);
      },
      listDisks(deviceId: number) {
        return GET<DeviceDisk[]>(`/v2/device/${deviceId}/disks`);
      },
      listOSPatchInstalls(deviceId: number, params?: {
        installedAfter?: string
        installedBefore?: string
        status?: "FAILED" | "INSTALLED"
      }) {
        return GET<OSPatch[]>(`/v2/device/${deviceId}/os-patch-installs`, params);
      },
      listSoftwarePatchInstalls(deviceId: number, params?: {
        impact?: string
        installedAfter?: string
        installedBefore?: string
        productIdentifier?: string
        status?: string
        type?: string
      }) {
        return GET<SoftwarePatch[]>(`/v2/device/${deviceId}/software-patch-installs`, params);
      },
      getLastLoggedOnUser(deviceId: number) {
        return GET<LoggedOnUser>(`/v2/device/${deviceId}/last-logged-on-user`);
      },
      listNetworkInterfaces(deviceId: number) {
        return GET<NetworkInterface[]>(`/v2/device/${deviceId}/network-interfaces`);
      },
      listOSPatches(deviceId: number, params?: {
        severity?: string
        status?: string
        type?: string
      }) {
        return GET<OSPatch>(`/v2/device/${deviceId}/os-patches`, params);
      },
      listSoftwarePatches(deviceId: number, params?: {
        impact?: string
        productIdentifier?: string
        status?: string
        type?: string
      }) {
        return GET<SoftwarePatch[]>(`/v2/device/${deviceId}/software-patches`, params);
      },
      listProcessors(deviceId: number) {
        return GET<Processor[]>(`/v2/device/${deviceId}/processors`);
      },
      listWindowsServices(deviceId: number, params?: {
        name?: string,
        state?: ServiceState
      }) {
        return GET<WindowsService[]>(`/v2/device/${deviceId}/windows-services`, params);
      },
      listSoftware(deviceId: number) {
        return GET<Software[]>(`/v2/device/${deviceId}/software`);
      },
      listVolumes<T extends boolean>(deviceId: number, includeBitlocker?: T) {
        return GET<Volume<T>[]>(`/v2/device/${deviceId}/volumes`, includeBitlocker ? { include: 'bl' } : {});
      },
      listCustomFields(deviceId: number, params?: { withInheritance?: boolean }) {
        return GET<Record<string, any>>(`/v2/device/${deviceId}/custom-fields`, params);
      },
      updateFieldValues(deviceId: number, values: Record<string, any>) {
        return BODY<{}>(`/v2/device/${deviceId}/custom-fields`, values, "PATCH");
      }
    },
    groups: {

    },
    queries: {

    },
    management: {

    },
    ticketing: {

    },
    webhooks: {

    },
    relatedItems: {

    },
    location: {
      listCustomFields(organizationId: number, locationId: number) {
        return GET<Record<string, any>>(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`);
      },
      updateFieldValues(organizationId: number, locationId: number, values: Record<string, any>) {
        return BODY(`/v2/organization/${organizationId}/location/${locationId}/custom-fields`, values, "PATCH");
      }
    },
    backup: {
      listIntegrityCheckJobs(params?: BackupParams) {
        return GET<CursorList<BackupJob>>("/v2/backup/integrity-check-jobs", params)
      },
      createIntegrityCheckJob(deviceId: number, planUid: string) {
        return BODY<BackupJobCreated>("/v2/backup/integrity-check-jobs", { deviceId, planUid });
      },
      listBackupJobs(params?: BackupParams) {
        return GET<CursorList<BackupJob>>("/v2/backup/jobs", params);
      }
    },
    knowledgeBaseArticles: {

    },
    organizationDocuments: {

    },
    documentTemplates: {

    }
  } as const;
}