import { NinjaBase } from "./index";
import { Webhook } from "./types";

export class NinjaWebhooks extends NinjaBase {
  /** Update API Webhook configuration **/
  update(webhook: Webhook) {
    return this.BODY<void>("/v2/webhook", webhook, "PUT");
  }
  /** Remove Webhook API channel **/
  disable() {
    return this.DELETE<void>("/v2/webhook");
  }
}