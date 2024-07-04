import { Priority, Severity } from "../types-temp";

export type WindowsEventCondition = {
  id: string
  conditionName: string
  displayName: string
  enabled: boolean
  severity: Severity
  priority: Priority
  channels: number[]
  scripts: {
    scriptId: number
    runAs: "SYSTEM" | "LOGGED_ON_USER" | "LOCAL_ADMIN" | "DOMAIN_ADMIN" | "PREFERRED_CREDENTIAL_MAC" | "PREFERRED_CREDENTIAL_LINUX"
    scriptParam: string
    scriptVariables: {
      id: string
      value: string
    }[]
  }[]
  notificationAction: "NONE" | "SEND"
  notifyOnReset: boolean
  resetThreshold: number
  inheritance: {
    inherited: boolean
    overridden: boolean
    sourcePolicyId: number
  }
  source: string
  eventIds: number[]
  text: {
    values: string[]
    condition: "CONTAINS" | "NOT_CONTAINS"
    include: "ALL" | "ANY"
  }
  occurrence: {
    enabled: boolean
    threshold: number
    duration: number
  }
}

export type PolicyConditionCustomFields = Omit<WindowsEventCondition, "source" | "eventIds" | "text" | "occurrence"> & {
  matchAll: CustomFieldValue[]
  matchAny: CustomFieldValue[]
}

export type CustomFieldValue = {
  fieldName: string
  operator: "EQUALS" | "NOT_EQUALS" | "LESS_THAN" | "LESS_OR_EQUAL_THAN" | "GREATER_THAN" | "GREATER_OR_EQUAL_THAN" |
    "IS_NOT_NULL" | "CONTAINS" | "CONTAINS_NONE" | "CONTAINS_ANY"
  value: string
}

export type ScriptingOptions = {
  categories: {
    id: number
    name: string
    internal: boolean
  }[]
  scripts: {
    type: "ACTION" | "SCRIPT"
    id: number
    uid: string
    name: string
    language: string
    description: string
    architecture: string[]
    categoryId: number
  }[]
  credentials: {
    roles: string[]
    credentials: {
      id: number
      name: string
      type: "SNMPV12C" | "SNMPV3" | "TELNET_SSH" | "NETWORK_LOCATION" | "ENCRYPTION_KEY" | "BASIC" | "SNMPV1" | "SNMPV2"
    }[]
  }
}

export type InstallerType = "WINDOWS_MSI" | "MAC_DMG" | "MAC_PKG" | "LINUX_DEB" | "LINUX_RPM"