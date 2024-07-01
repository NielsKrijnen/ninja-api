import { ActivityList, Alert, Job, JobType, Organization, Policy, SourceType } from "../types-temp";

export function createSystemClient(GET: <T>(path: string, params?: Record<string, any>) => Promise<T>) {
  return {
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
  } as const;
}