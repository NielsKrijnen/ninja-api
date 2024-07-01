import { BODY, DELETE, GET } from "../index";

export function createDocumentTemplatesClient(GET: GET, BODY: BODY, DELETE: DELETE) {
  return {
    list(templateName?: string) {
      return GET("/v2/document-templates", { templateName });
    }
  } as const;
}