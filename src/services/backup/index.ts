import { NinjaBase } from "../index";
import { BackupJob, BackupJobCreated, BackupParams } from "../../../types/backup";
import { CursorList } from "../../../types";

export class NinjaBackup extends NinjaBase {
  listIntegrityCheckJobs(params?: BackupParams) {
    return this.GET<CursorList<BackupJob>>("/v2/backup/integrity-check-jobs", params)
  }
  createIntegrityCheckJob(deviceId: number, planUid: string) {
    return this.BODY<BackupJobCreated>("/v2/backup/integrity-check-jobs", { deviceId, planUid });
  }
  listBackupJobs(params?: BackupParams) {
    return this.GET<CursorList<BackupJob>>("/v2/backup/jobs", params);
  }
}