import { NinjaBase } from "../index";
import { CursorList } from "../types";
import { AntivirusStatus, AntivirusThreat } from "./types";

export class NinjaQueries extends NinjaBase {
  antivirusStatus(params?: {
    /** Device filter **/
    df?: string
    /** Monitoring timestamp filter **/
    ts?: string
    /** Product State filter **/
    productState?: string
    /** Product Name filter **/
    productName?: string
    /** Cursor name **/
    cursor?: string
    /** Limit number of records per page **/
    pageSize?: number
  }) {
    return this.GET<CursorList<AntivirusStatus>>("/v2/queries/antivirus-status", params);
  }
  /** Returns list of antivirus threats **/
  antivirusThreats(params?: {
    /** Device filter **/
    df?: string
    /** Monitoring timestamp filter **/
    ts?: string
    /** Cursor name **/
    cursor?: string
    /** Limit number of records per page **/
    pageSize?: number
  }) {
    return this.GET<CursorList<AntivirusThreat>>("/v2/queries/antivirus-threats", params);
  }
  computerSystems() {

  }
  customFieldsDetailed() {

  }
  customFields() {

  }
  deviceHealth() {

  }
  backupUsage() {

  }
  disks() {

  }
  osPatchInstalls() {

  }
  softwarePatchInstalls() {

  }
  loggedOnUsers() {

  }
  networkInterfaces() {

  }
  operatingSystems() {

  }
  osPatches() {

  }
  softwarePatches() {

  }
  policyOverrides() {

  }
  processors() {

  }
  raidControllers() {

  }
  raidDrives() {

  }
  scopedCustomFieldsDetailed() {

  }
  scopedCustomFields() {

  }
  software() {

  }
  volumes() {

  }
  windowsServices() {

  }
}