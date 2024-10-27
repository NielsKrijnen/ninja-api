import { NinjaBase } from "../index";
import { EntityType, HostEntityType, RelatedEntity, RelatedItem, SecureValue } from "./types";

export class NinjaRelatedItems extends NinjaBase {
  /** Relate an attachment to an entity **/
  createAttachment(type: HostEntityType, id: number, file: File) {
    return this.BODY<RelatedItem>(`/v2/related-items/entity/${type}/${id}/attachment`, file, "POST", true)
  }
  /** Create a relation between two entities **/
  createRelation(type: HostEntityType, id: number, relatedEntity: RelatedEntity) {
    return this.BODY<RelatedItem>(`/v2/related-items/entity/${type}/${id}/relation`, relatedEntity)
  }
  /** Create multiple relations between two entities **/
  createRelations(type: HostEntityType, id: number, relatedEntities: RelatedEntity[]) {
    return this.BODY<RelatedItem>(`/v2/related-items/entity/${type}/${id}/relations`, relatedEntities);
  }
  /** Create a relation to a secure value **/
  createSecureRelation(type: HostEntityType, id: number, secureValue: SecureValue) {
    return this.BODY<RelatedItem>(`/v2/related-items/entity/${type}/${id}/secure`, secureValue);
  }
  /** Delete related item **/
  deleteItem(id: number) {
    return this.DELETE(`/v2/related-items/${id}`);
  }
  /** Delete related items **/
  deleteItems(type: EntityType, id: number) {
    return this.DELETE(`/v2/related-items/${type}/${id}`)
  }
  /** List all related items **/
  list() {
    return this.GET<RelatedItem[]>("/v2/related-items");
  }
  /** List host entity related items by scope **/
  listEntity(type: HostEntityType, id: number, params?: { scope?: "ALL" | "RELATIONS" | "REFERENCES" }) {
    return this.GET<RelatedItem[]>(`/v2/related-items/with-entity/${type}/${id}`, params);
  }
  /** List related items for a specific related entity **/
  listRelatedEntity(type: EntityType, id: number) {
    return this.GET<RelatedItem[]>(`/v2/related-items/with-related-entity/${type}/${id}`);
  }
  /** List related entities for a related entity type **/
  listByRelatedType(type: EntityType) {
    return this.GET<RelatedItem[]>(`/v2/related-items/with-related-entity-type/${type}`);
  }
  /** List relations and references for a host entity type **/
  listByType(type: HostEntityType) {
    return this.GET<RelatedItem[]>(`/v2/related-items/with-entity-type/${type}`);
  }
}