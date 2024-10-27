import { NinjaBase } from "../index";
import { EntityType } from "./types";

export class NinjaRelatedItems extends NinjaBase {
  /** Delete related item **/
  deleteItem(id: number) {
    return this.DELETE(`/v2/related-items/${id}`);
  }
  /** Delete related items **/
  deleteItems(type: EntityType, id: number) {
    return this.DELETE(`/v2/related-items/${type}/${id}`)
  }
}