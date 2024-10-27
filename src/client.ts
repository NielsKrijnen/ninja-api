import { NinjaAuth } from "./services/auth";
import { NinjaSystem } from "./services/system";
import { NinjaOrganization } from "./services/organization";
import { NinjaDevices } from "./services/devices";
import { NinjaGroups } from "./services/groups";
import { NinjaQueries } from "./services/queries";
import { NinjaManagement } from "./services/management";
import { NinjaTicketing } from "./services/ticketing";
import { NinjaWebhooks } from "./services/webhooks";
import { NinjaRelatedItems } from "./services/relatedItems";
import { NinjaLocation } from "./services/location";
import { NinjaBackup } from "./services/backup";
import { NinjaKnowledgeBaseArticles } from "./services/knowledgeBaseArticles";
import { NinjaOrganizationDocuments } from "./services/organizationDocuments";
import { NinjaDocumentTemplates } from "./services/documentTemplates";
import { NinjaCustomFields } from "./services/customFields";

export type NinjaClientConfig = {
  prefix: "eu" | "app" | "oc"
  clientId: string
  clientSecret: string
  sessionToken?: string
}

export class NinjaClient {
  constructor(private readonly config: NinjaClientConfig) {}

  get auth() {
    return new NinjaAuth(this.config);
  }
  get system() {
    return new NinjaSystem(this.config);
  }
  get organization() {
    return new NinjaOrganization(this.config);
  }
  get devices() {
    return new NinjaDevices(this.config);
  }
  get groups() {
    return new NinjaGroups(this.config);
  }
  get queries() {
    return new NinjaQueries(this.config);
  }
  get management() {
    return new NinjaManagement(this.config);
  }
  get ticketing() {
    return new NinjaTicketing(this.config);
  }
  /** Webhook Endpoints **/
  get webhooks() {
    return new NinjaWebhooks(this.config);
  }
  /** Related Items **/
  get relatedItems() {
    return new NinjaRelatedItems(this.config);
  }
  get location() {
    return new NinjaLocation(this.config);
  }
  get backup() {
    return new NinjaBackup(this.config);
  }
  get knowledgeBaseArticles() {
    return new NinjaKnowledgeBaseArticles(this.config);
  }
  get organizationDocuments() {
    return new NinjaOrganizationDocuments(this.config);
  }
  get documentTemplates() {
    return new NinjaDocumentTemplates(this.config);
  }
  get customFields() {
    return new NinjaCustomFields(this.config);
  }
}