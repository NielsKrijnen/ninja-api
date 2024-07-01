import { BODY, GET } from "../index";
import { BackupJob, BackupJobCreated, BackupParams } from "../types/backup";
import { CursorList } from "../types";

export function createBackupClient(GET: GET, BODY: BODY) {
  return {
    listIntegrityCheckJobs(params?: BackupParams) {
      return GET<CursorList<BackupJob>>("/v2/backup/integrity-check-jobs", params)
    },
    createIntegrityCheckJob(deviceId: number, planUid: string) {
      return BODY<BackupJobCreated>("/v2/backup/integrity-check-jobs", { deviceId, planUid });
    },
    listBackupJobs(params?: BackupParams) {
      return GET<CursorList<BackupJob>>("/v2/backup/jobs", params);
    }
  } as const;
}