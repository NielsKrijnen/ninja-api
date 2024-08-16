import { Device, NodeClass } from "../../../types-temp";
import { ChassisType } from "../../../types/devices";
import { NodeApprovalMode } from "../../../types";

export type AutomationScript = {
  id: number
  name: string
  description?: string
  active: boolean
  language: string
  architecture: string[]
  operatingSystems: string[]
  scriptParameters: string[]
  scriptVariables?: ScriptVariable[]
}

export type ScriptVariable = {
  id: string
  name: string
  description?: string
  type: ScriptVariableType
  source: "LITERAL" | "OTHER"
  defaultValue?: string
  required: boolean
  valueList?: string[]
}

export type ScriptVariableType = "CHECKBOX" | "DATE" | "DATETIME" | "DECIMAL" | "INTEGER" | "IPADDRESS" | "DROPDOWN" | "TEXT" | "OTHER"

export type DeviceCustomField = {
  entityType: DeviceCustomFieldEntityType
  scope: DeviceCustomFieldScope
  definitionScope: DeviceCustomFieldDefinitionScope
  type: CustomFieldType
  label: string
  description: string
  name: string
  defaultValue?: string
  endUserPermission: DeviceCustomFieldEndUserPermission
  technicianPermission: TechnicianPermission
  scriptPermission: Permission
  apiPermission: Permission
  content: {
    customizeForEndUser: boolean
    endUserCustomization: {
      name: string
      description: string
      label: string
    }
    values: {
      id: string
      name: string
      active: boolean
      system: boolean
    }[]
    required: boolean
    footerText: string
    tooltipText: string
    advancedSettings: {
      fileMaxSize: number
      fileExtensions: string[]
      dateFilters: {
        type: DateFilterType
        selected: string[]
      }
      maxCharacters: number
      complexityRules: {
        mustContainOneInteger: boolean
        mustContainOneLowercaseLetter: boolean
        mustContainOneUppercaseLetter: boolean
        greaterOrEqualThanSixCharacters: boolean
      }
      numericRange: {
        min: number
        max: number
      }
      org: number[]
      nodeClass: NodeClass
      ipAddressType: IPAddressType
      expandLargeValueOnRender: boolean
    }
  }
  system: boolean
  active: boolean
  createTime: number
  updateTime: number
}

export type DeviceCustomFieldEntityType = "USER" | "NODE" | "TICKET" | "DOCUMENT"
export type DeviceCustomFieldScope = "NODE_GLOBAL" | "NODE_ROLE" | "NODE_CLASS"
export type DeviceCustomFieldDefinitionScope = "NODE" | "LOCATION" | "ORGANIZATION"
export type CustomFieldType = "DROPDOWN" | "MULTI_SELECT" | "CHECKBOX" | "TEXT" | "TEXT_MULTILINE" | "TEXT_ENCRYPTED" |
  "NUMERIC" | "DECIMAL" | "DATE" | "DATE_TIME" | "TIME" | "ATTACHMENT" | "NODE_DROPDOWN" | "NODE_MULTI_SELECT" |
  "CLIENT_DROPDOWN" | "CLIENT_MULTI_SELECT" | "CLIENT_LOCATION_DROPDOWN" | "CLIENT_LOCATION_MULTI_SELECT" |
  "CLIENT_DOCUMENT_DROPDOWN" | "CLIENT_DOCUMENT_MULTI_SELECT" | "EMAIL" | "PHONE" | "IP_ADDRESS" | "WYSIWYG" | "URL"
export type DeviceCustomFieldEndUserPermission = "HIDDEN" | "EDITABLE_OPTIONAL" | "EDITABLE_REQUIRED" | "READ_ONLY"

export type Permission = "NONE" | "READ_ONLY" | "WRITE_ONLY" | "READ_WRITE"
export type TechnicianPermission = "NONE" | "EDITABLE" | "READ_ONLY"

export type DateFilterType = "NONE" | "INCLUDE" | "EXCLUDE" | "PAST_DATES_ONLY" | "FUTURE_DATES_ONLY" | "RANGE"

export type IPAddressType = "ALL" | "IPV4" | "IPV6"

export type NotificationChannel = {
  id: number
  name: string
  description: string
  enabled: boolean
  type: NotificationChannelType
}

export type NotificationChannelType = "EMAIL" | "META_CHANNEL" | "PAGER_DUTY" | "SLACK" | "SMS" | "WEBHOOK" | "OTHER"

export type Group = {
  id: number
  name: string
  description: string
  shared: boolean
  created: number
  updated: number
  deviceCount?: number
  lastEvaluated?: number
  tags?: string[]
  fields?: Record<string, string>
}

export type Location<ID extends boolean = true> = {
  name: string
  address?: string
  description?: string
  userData?: Record<string, string>
  tags?: string[]
  fields?: Record<string, string>
  id: ID extends true ? number : undefined
}

export type DeviceRole = {
  id: number
  name: string
  description: string
  nodeClass: NodeClass
  custom: boolean
  chassisType: ChassisType
  created: number
  tags?: string[]
  fields?: Record<string, string>
}

export type OrganizationDetailed<LocationID extends boolean = true> = {
  name: string
  description: string
  userData?: Record<string, any>
  nodeApprovalMode: NodeApprovalMode
  tags?: string[]
  fields?: Record<string, any>
  id: number
  locations: Location<LocationID>[]
  policies: {
    nodeRoleId: number
    policyId: number
  }[]
  settings: {
    trayicon: ConfigurationSettings
    splashtop: ConfigurationSettings
    teamviewer: ConfigurationSettings
    backup: ConfigurationSettings
    psa: ConfigurationSettings
  }
}

export type ConfigurationSettings = {
  product?: string
  enabled: boolean
  targets?: string[]
  options?: Record<string, any>
}

export type Task = {
  id: number
  name: string
  description: string
  enabled: boolean
  created: number
  lastRun: number
  runCount: number
}

export type SoftwareProduct = {
  id: string
  vendorName: string
  productName: string
  installable: boolean
  active: boolean
}

export type User<Roles extends boolean> = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  enabled: boolean
  administrator: boolean
  permitAllClients: boolean
  notifyAllClients: boolean
  mustChangePw: boolean
  mfaConfigured: boolean
  userType: "TECHNICIAN" | "END_USER"
  invitationStatus: "REGISTERED" | "PENDING" | "EXPIRED"
  organizationId?: number
  deviceIds?: number[]
  tags?: string[]
  fields?: Record<string, any>
  roles: Roles extends true ? string[] : undefined
}

export type DevicesSearch = {
  query: string
  devices: (Device & {
    matchAttr: string
    matchAttrValue: string
  })[]
}

export type CustomFields = Record<string, {
  text: string
  html: string
}>