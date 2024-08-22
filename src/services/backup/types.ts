import { Result } from "../../types-temp";

export type BackupParams = {
  cursor?: string
  ddf?: string
  df?: string
  include?: "active" | "deleted" | "all"
  pageSize?: number
  ptf?: string
  sf?: string
  stf?: string
}

export type BackupJob = {
  jobId: string
  jobStartTime: number
  jobEndTime: number
  jobStatus: string
  planGuid: string
  planName: string
  planType: string
  totalActualStorageBytes: number
  organizationId: number
  locationId: number
}

export type BackupJobCreated = {
  result: Result
  jobUid: string
  deviceId: number
  planGuid: string
  planName: string
  planType: string
}