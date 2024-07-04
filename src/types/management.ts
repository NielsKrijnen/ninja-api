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