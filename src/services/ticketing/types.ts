import { Priority, Severity } from "../../../types-temp";

export type Ticket = {
  id: number
  version: number
  nodeId: number
  clientId: number
  locationId: number
  assignedAppUserId: number
  requesterUid: string
  subject: string
  status: {
    name: string
    displayName: string
    parentId: number
    statusId: number
  }
  type: TicketType
  priority: Priority
  severity: Severity
  ticketFormId: number
  source: TicketSource
  tags: string[]
  ccList: {
    uids: string[]
    emails: string[]
  }
  createTime: number
  deleted: boolean
  attributeValues: {
    id: number
    attributeId: number
    value: Record<string, any>
  }[]
}

export type CreateTicket = {
  clientId: number
  ticketFormId: number
  locationId: number
  nodeId: number
  subject: string
  description: {
    public: boolean
    body?: string
    htmlBody?: string
    timeTracked?: number
    duplicateInIncidents: boolean
  }
  status: string
  type: TicketType
  cc?: {
    uids?: string[]
    emails?: string[]
  }
  assignedAppUserId: number
  requesterUid: string
  severity: Severity
  priority: Priority
  parentTicketId: number
  tags: string[]
  attributes: {
    id?: number
    attributeId: number
    value: string
  }[]
}

export type UpdateTicket = {
  version: number
  clientId: number
  ticketFormId: number
  locationId: number
  nodeId: number
  subject: string
  status: string
  type: TicketType
  cc?: {
    uids?: string[]
    emails?: string[]
  }
  assignedAppUserId: number
  requesterUid: string
  severity: Severity
  priority: Priority
  parentTicketId: number
  tags: string[]
  attributes: {
    id?: number
    attributeId: number
    value: string
  }[]
}

export type TicketType = "PROBLEM" | "QUESTION" | "INCIDENT" | "TASK"

export type TicketSource = "TECHNICIAN" | "EMAIL" | "WEB_FORM" | "HELP_REQUEST" | "END_USER" | "CONDITION" | "SCHEDULED_SCRIPT" | "ACTIVITY"

export type Comment = {
  comment: {
    public: boolean
    body?: string
    htmlBody?: string
    timeTracked?: number
    duplicateInIncidents: boolean
  }
  files: string[]
}

export type LogEntry = {
  id: number
  appUserContactUid: string
  appUserContactId: number
  appUserContactType: "TECHNICIAN" | "END_USER" | "CONTACT"
  type: LogEntryType
  body: string
  htmlBody: string
  fullEmailBody: string
  publicEntry: boolean
  system: boolean
  createTime: number
  changeDiff: Record<string, any>
  activityId: number
  timeTracked: number
  technicianTagged: number[]
  techniciansTaggedMetadata: {
    id: number
    email: string
    displayName: string
    deleted: boolean
    permitted: boolean
  }[]
  automation: {
    id: number
    name: string
    system: boolean
    type: string
  }
  blockedByInvoice: boolean
  emailResponse: boolean
}

export type LogEntryType = "DESCRIPTION" | "COMMENT" | "CONDITION" | "SAVE" | "DELETE"