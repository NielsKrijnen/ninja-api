import { BODY, GET } from "../index";
import { Comment, CreateTicket, LogEntry, LogEntryType, Ticket, UpdateTicket } from "../types/ticketing";

export function createTicketingClient(GET: GET, BODY: BODY) {
  return {
    create(data: CreateTicket) {
      return BODY<Ticket>("/v2/ticketing/ticket", data);
    },
    comment(ticketId: number, data: Comment) {
      return BODY<string>(`/v2/ticketing/ticket/${ticketId}/comment`, data);
    },
    get(ticketId: number) {
      return GET<Ticket>(`/v2/ticketing/ticket/${ticketId}`);
    },
    update(ticketId: number, data: UpdateTicket) {
      return BODY<Ticket>(`/v2/ticketing/ticket/${ticketId}`, data, "PUT");
    },
    listLogEntries(ticketId: number, params?: {
      anchorId?: number
      createTime?: string
      pageSize?: number
      type?: LogEntryType
    }) {
      return GET<LogEntry[]>(`/v2/ticketing/ticket/${ticketId}/log-entry`, params);
    }
  } as const;
}