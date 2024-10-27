export type CursorList<T extends Record<string, any>> = {
  cursor: {
    name: string
    offset: number
    count: number
    expires: number
  }
  results: T[]
}

export type NodeApprovalMode = "AUTOMATIC" | "MANUAL" | "REJECT"

export type ActivityList = {
  lastActivityId: number
  activities: Activity[]
}
export type Activity = {
  id: number
  activityTime: number
  deviceId?: number
  severity?: Severity
  priority?: Priority
  seriesUid?: string
  activityType: unknown
  statusCode: unknown
  status: string
  activityResult: Result
  sourceConfigUid?: string
  sourceName?: string
  subject?: string
  userId?: number
  message: string
  type: string
  data: Record<string, string>
}

export type Organization = {
  name: string
  description: string
  userData?: Record<string, string>
  nodeApprovalMode: "AUTOMATIC" | "MANUAL" | "REJECT"
  tags?: string[]
  fields?: Record<string, Record<string, string>>
  id: number
}

export type Policy = {
  id: number
  parentPolicyId: number
  name: string
  description: string
  nodeClass: NodeClass
  updated: number
  nodeClassDefault: boolean
  tags?: string[]
  fields?: Record<string, string>
}

export type NodeClass = "WINDOWS_SERVER" | "WINDOWS_WORKSTATION" | "LINUX_WORKSTATION" | "MAC" | "ANDROID" | "APPLE_IOS" |
  "APPLE_IPADOS" | "VMWARE_VM_HOST" | "VMWARE_VM_GUEST" | "HYPERV_VMM_HOST" | "HYPERV_VMM_GUEST" | "LINUX_SERVER" |
  "MAC_SERVER" | "CLOUD_MONITOR_TARGET" | "NMS_SWITCH" | "NMS_ROUTER" | "NMS_FIREWALL" | "NMS_PRIVATE_NETWORK_GATEWAY" |
  "NMS_PRINTER" | "NMS_SCANNER" | "NMS_DIAL_MANAGER" | "NMS_WAP" | "NMS_IPSLA" | "NMS_COMPUTER" | "NMS_VM_HOST" |
  "NMS_APPLIANCE" | "NMS_OTHER" | "NMS_SERVER" | "NMS_PHONE" | "NMS_VIRTUAL_MACHINE" | "NMS_NETWORK_MANAGEMENT_AGENT"

export type Job = {
  uid: string
  deviceId: number
  message: string
  createTime: number
  updateTime: number
  sourceType: SourceType
  sourceConfigUid: string
  sourceName: string
  subject: string
  userId: number
  psaTicketId: number
  ticketTemplateId: number
  data: Record<string, string>
  device: Device
  jobStatus: JobStatus
  jobResult: JobResult
  jobType: JobType
}

export type Device = {
  id: number
  parentDeviceId?: number
  organizationId: number
  locationId: number
  nodeClass: NodeClass
  nodeRoleId: number
  rolePolicyId: number
  policyId?: number
  approvalStatus: "PENDING" | "APPROVED"
  offline: boolean
  displayName: string
  systemName: string
  dnsName: string
  netbiosName?: string
  created: number
  lastContact: number
  lastUpdate: number
  userData?: Record<string, string>
  tags?: string[]
  fields?: Record<string, string>
}

export type JobStatus = "START_REQUESTED" | "STARTED" | "IN_PROCESS" | "COMPLETED" | "CANCEL_REQUESTED" | "CANCELLED" |
  "TRIGGERED" | "RESET" | "ACKNOWLEDGED" | "DISABLED"

export type JobResult = "SUCCESS" | "FAILURE" | "UNSUPPORTED" | "UNCOMPLETED"

export type JobType = "ACTIONSET" | "ACTION" | "CONDITION" | "CONDITION_ACTIONSET" | "CONDITION_ACTION" | "ANTIVIRUS" |
  "PATCH_MANAGEMENT" | "TEAMVIEWER" | "MONITOR" | "SYSTEM" | "COMMENT" | "SHADOWPROTECT" | "IMAGEMANAGER" | "HELP_REQUEST" |
  "SOFTWARE_PATCH_MANAGEMENT" | "SPLASHTOP" | "CLOUDBERRY" | "CLOUDBERRY_BACKUP" | "SCHEDULED_TASK" | "RDP" | "SCRIPTING" |
  "SECURITY" | "REMOTE_TOOLS" | "VIRTUALIZATION" | "PSA" | "MDM" | "NINJA_REMOTE" | "NINJA_QUICK_CONNECT" |
  "NINJA_NETWORK_DISCOVERY" | "NINJA_BACKUP"

export type SourceType = "AGENT_OFFLINE" | "CONDITION_AGENT_CPU" | "CONDITION_AGENT_MEMORY" | "CONDITION_AGENT_NETWORK" |
  "CONDITION_AGENT_DISK_IO" | "CONDITION_AGENT_DISK_FREE_SPACE" | "CONDITION_AGENT_DISK_USAGE" | "CONDITION_AGENT_CVSS_SCORE" |
  "CONDITION_AGENT_PATCH_LAST_INSTALLED" | "CONDITION_NMS_CPU" | "CONDITION_NMS_MEMORY" | "CONDITION_NMS_NETWORK_TRAFFIC_BITS" |
  "CONDITION_NMS_NETWORK_TRAFFIC_PERCENT" | "CONDITION_NMS_NETWORK_STATUS" | "CONDITION_NMS_NETWORK_STATUS_CHANGE" |
  "CONDITION_PING" | "CONDITION_PING_LATENCY" | "CONDITION_PING_PACKET_LOSS" | "CONDITION_PING_RESPONSE" |
  "CONDITION_SYSTEM_UPTIME" | "CONDITION_SMART_STATUS_DEGRATED" | "CONDITION_RAID_HEALTH_STATUS" | "CONDITION_SCRIPT_RESULT" |
  "CONDITION_HTTP" | "CONDITION_HTTP_RESPONSE" | "CONDITION_PORT" | "CONDITION_PORT_SCAN" | "CONDITION_SYSLOG" |
  "CONDITION_CONFIGURATION_FILE" | "CONDITION_SNMPTRAP" | "CONDITION_CRITICAL_EVENT" | "CONDITION_DNS" | "CONDITION_EMAIL" |
  "CONDITION_CUSTOM_SNMP" | "CONDITION_COMPOUND" | "SHADOWPROTECT_BACKUPJOB_CREATE" | "SHADOWPROTECT_BACKUPJOB_UPDATE" |
  "SHADOWPROTECT_BACKUPJOB_DELETE" | "SHADOWPROTECT_BACKUPJOB_EXECUTE" | "IMAGEMANAGER_MANAGEDFOLDER_CREATE" |
  "IMAGEMANAGER_MANAGEDFOLDER_UPDATE" | "IMAGEMANAGER_MANAGEDFOLDER_DELETE" | "IMAGEMANAGER_MANAGEDFOLDER_EXECUTE" |
  "TEAMVIEWER_CONNECTION" | "RETRIEVE_AGENT_LOGS" | "SCHEDULED_TASK" | "CONDITION_WINDOWS_EVENT_LOG_TRIGGERED" |
  "CONDITION_WINDOWS_SERVICE_STATE_CHANGED" | "UI_MESSAGE_ACTION_REBOOT" | "UI_MESSAGE_BD_INSTALLATION_ISSUES" |
  "GRAVITYZONE_UI_MESSAGE_INSTALLATION_ISSUES" | "AV_QUARANTINE_THREAT" | "AV_RESTORE_THREAT" | "AV_DELETE_THREAT" |
  "AV_REMOVE_THREAT" | "BITDEFENDER_RESTORE_THREAT" | "BITDEFENDER_DELETE_THREAT" | "CONDITION_BITLOCKER_STATUS" |
  "CONDITION_FILEVAULT_STATUS" | "CONDITION_LINUX_PROCESS" | "CONDITION_LINUX_DAEMON" | "CONDITION_LINUX_PROCESS_RESOURCE" |
  "CONDITION_LINUX_PROCESS_RESOURCE_CPU" | "CONDITION_LINUX_PROCESS_RESOURCE_MEMORY" | "CONDITION_LINUX_DISK_FREE_SPACE" |
  "CONDITION_LINUX_DISK_USAGE" | "CONDITION_VM_AGGREGATE_CPU_USAGE" | "CONDITION_VM_DISK_USAGE" | "CONDITION_VM_HOST_DATASTORE" |
  "CONDITION_VM_HOST_UPTIME" | "CONDITION_VM_HOST_DEVICE_DOWN" | "CONDITION_VM_HOST_BAD_SENSORS" | "CONDITION_VM_HOST_SENSOR_HEALTH" |
  "CONDITION_VM_GUEST_GUEST_OPERATIONAL_MODE" | "CONDITION_VM_GUEST_SNAPSHOT_SIZE" | "CONDITION_VM_GUEST_SNAPSHOT_LIFESPAN" |
  "CONDITION_VM_GUEST_TOOLS_NOT_RUNNING" | "CONDITION_HV_GUEST_CHECKPOINT_SIZE" | "CONDITION_HV_GUEST_CHECKPOINT_LIFESPAN" |
  "CONDITION_SOFTWARE" | "CONDITION_WINDOWS_PROCESS_STATE" | "CONDITION_WINDOWS_PROCESS_RESOURCE_CPU" |
  "CONDITION_WINDOWS_PROCESS_RESOURCE_MEMORY" | "CONDITION_MAC_PROCESS_STATE" | "CONDITION_MAC_PROCESS_RESOURCE_CPU" |
  "CONDITION_MAC_PROCESS_RESOURCE_MEMORY" | "CONDITION_MAC_DAEMON" | "CONDITION_CUSTOM_FIELD" | "CONDITION_PENDING_REBOOT"

export type Location = {
  name: string
  address: string
  description: string
  userData: Record<string, string>
  tags: string[]
  fields: Record<string, string>
  id: number
}

export type DeviceBackupUsage = {
  revisionsCurrentSize: number
  revisionsPreviousSize: number
  revisionsDeletedSize: number
  localFileFolderSize: number
  localImageSize: number
  cloudFileFolderSize: number
  cloudImageSize: number
  revisionsTotalSize: number
  cloudTotalSize: number
  localTotalSize: number
}

export type Result = "SUCCESS" | "FAILURE" | "UNSUPPORTED" | "UNCOMPLETED"

export type Severity = "NONE" | "MINOR" | "MODERATE" | "MAJOR" | "CRITICAL"
export type Priority = "NONE" | "LOW" | "MEDIUM" | "HIGH"

export type Alert = {
  uid: string
  deviceId: number
  message: string
  createTime: number
  updateTime: number
  sourceType: SourceType
  sourceConfigUid: string
  sourceName: string
  subject: string
  userId: number
  psaTicketId: Record<string, string>
  ticketTemplateId: number
  data: Record<string, string>
  device: Device
}