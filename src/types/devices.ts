import { NodeClass } from "../types-temp";

export type ChassisType = "UNKNOWN" | "DESKTOP" | "LAPTOP" | "MOBILE"

export type DeviceDetails = {
  id: number
  parentDeviceId?: number
  organizationId: number
  locationId: number
  nodeClass: NodeClass
  nodeRoleId: number
  rolePolicyId: number
  policyId?: number
  approvalStatus: "PENDING" | "APPROVED"
  offline: true
  displayName?: string
  systemName: string
  dnsName: string
  netbiosName?: string
  created: number
  lastContact: number
  lastUpdate: number
  tags?: string[]
  fields?: Record<string, any>
  ipAddresses: Record<string, string>[]
  macAddresses: Record<string, string>[]
  publicIP: string
  os: {
    manufacturer: string
    name: string
    architecture: string
    lastBootTime: number
    buildNumber: string
    releaseId: string
    servicePackMajorVersion: number
    servicePackMinorVersion: number
    locale: string
    language: string
    needsReboot: boolean
  },
  system: {
    name: string
    manufacturer: string
    model: string
    biosSerialNumber: string
    serialNumber: string
    domain: string
    domainRole: string
    numberOfProcessors: number
    totalPhysicalMemory: number
    virtualMachine: boolean
    chassisType: ChassisType
  },
  memory: {
    capacity: number
  },
  processors: Processor[],
  volumes: Volume<false>[],
  lastLoggedInUser: string
  notes: { text: string }[]
  deviceType: string
}

export type Processor = {
  architecture: string
  maxClockSpeed: number
  clockSpeed: number
  name: string
  numCores: number
  numLogicalCores: number
}

export type Volume<BitLocker extends boolean> = {
  name: string
  label: string
  deviceType: string
  fileSystem: string
  autoMount: boolean
  compressed: boolean
  capacity: number
  freeSpace: number
  serialNumber: string
  bitLockerStatus: BitLocker extends true ? BitLockerStatus : undefined
}

export type BitLockerStatus = {
  conversionStatus: "FULLY_DECRYPTED" | "FULLY_ENCRYPTED" | "ENCRYPTION_IN_PROGRESS" | "DECRYPTION_IN_PROGRESS" |
    "ENCRYPTION_PAUSED" | "DECRYPTION_PAUSED" | "UNKNOWN"
  encryptionMethod: "NONE" | "AES_128_WITH_DIFFUSER" | "AES_256_WITH_DIFFUSER" | "AES_128" | "AES_256" |
    "HARDWARE_ENCRYPTION" | "XTS_AES_128" | "XTS_AES_256" | "UNKNOWN"
  protectionStatus: "UNPROTECTED" | "PROTECTED" | "UNKNOWN" | "PENDING"
  lockStatus: "UNKNOWN" | "UNLOCKED" | "LOCKED"
  initializedForProtection: boolean
}

export type DeviceDisk = {
  bytesPerSector: number
  description: string
  interfaceType: string
  manufacturer: string
  mediaType: string
  model: string
  name: string
  partitionCount: number
  serialNumber: string
  size: number
  smartCapable: boolean
  status: string
}

export type OSPatch = {
  id: string
  name: string
  severity: string
  status: string
  type: string
  installedAt: number
  kbNumber: string
}

export type SoftwarePatch = {
  id: string
  productIdentifier: string
  title: string
  impact: string
  status: string
  type: string
  installedAt: number
}

export type LoggedOnUser = {
  userName: string
  logonTime: number
}

export type NetworkInterface = {
  adapterName: string
  defaultGateway: string
  interfaceType: string
  dnsHostName: string
  dnsServers: string
  interfaceIndex: string
  interfaceName: string
  ipAddress: Record<string, string>[]
  linkSpeed: string
  macAddress: Record<string, string>[]
  mtu: string
  status: string
  subnetMask: string
}

export type WindowsService = {
  name: string
  displayName: string
  description: string
  startType: ServiceStartType
  userName: string
  state: ServiceState
}

export type ServiceStartType = "AUTO_START" | "AUTO_START_DELAYED" | "BOOT_START" | "DEMAND_START" | "DISABLED" | "SYSTEM_START"
export type ServiceState = "UNKNOWN" | "STOPPED" | "START_PENDING" | "RUNNING" | "STOP_PENDING" | "PAUSE_PENDING" |
  "PAUSED" | "CONTINUE_PENDING"

export type Software = {
  installDate: string
  location: string
  name: string
  publisher: string
  size: number
  version: string
  productCode: string
}