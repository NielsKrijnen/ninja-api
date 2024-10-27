export type EntityType =
  "ORGANIZATION"
  | "DOCUMENT"
  | "LOCATION"
  | "NODE"
  | "ATTACHMENT"
  | "TECHNICIAN"
  | "CREDENTIAL"
  | "CHECKLIST"
  | "END_USER"
  | "CONTACT"
  | "KB_DOCUMENT"

export type HostEntityType = Exclude<EntityType, "CONTACT" | "END_USER" | "CREDENTIAL" | "TECHNICIAN" | "ATTACHMENT">

export type RelatedItem = {
  /** Identifier **/
  id: number
  /** Type of Relation **/
  type: "VALUE" | "ENTITY"
  /** Entity **/
  entity: Record<string, any>
  /** Entity Identifier **/
  entityId: number
  /** Entity Type **/
  entityType: HostEntityType
  /** Related Entity **/
  relEntity: Record<string, any>
  /** Related Entity Identifier **/
  relEntityId: number
  /** Related Entity Type **/
  relEntityType: EntityType
  /** Related item value (Attachment meta data / Secure information) **/
  value: Record<string, any>
  /** Creation time **/
  createTime: number
  /** Last update time **/
  updateTime: number
  /** The identifier of the user who created the related item **/
  createdByAppUserId: number
  /** The identifier of the last user to update the related item **/
  updatedByAppUserId: number
}

export type RelatedEntity = {
  relEntityType: EntityType,
  relEntityId: number
}

export type SecureValue = {
  /** Name **/
  name: string
  /** URL **/
  url: string
  /** Notes **/
  notes: string
  /** Username **/
  username: string
  /** Password **/
  password: string
  /** TOTP Secret **/
  totpSecret: string
}