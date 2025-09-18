"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketController = void 0;
const client_1 = require("@prisma/client");
const pagination_1 = require("utils/pagination");
const prisma = new client_1.PrismaClient();
const serializeTicket = (ticket, includeDates = false) => (Object.assign(Object.assign({ id: Number(ticket.id), ticket_number: ticket.ticket_number, customer_id: ticket.customer_id, assigned_agent_id: ticket.assigned_agent_id, category_id: ticket.category_id, subject: ticket.subject, description: ticket.description, priority: ticket.priority, status: ticket.status, source: ticket.source, sla_deadline: ticket.sla_deadline, sla_status: ticket.sla_status, first_response_at: ticket.first_response_at, resolved_at: ticket.resolved_at, closed_at: ticket.closed_at, assigned_by: ticket.assigned_by, is_merged: ticket.is_merged, reopen_count: ticket.reopen_count, time_spent_minutes: ticket.time_spent_minutes, last_reopened_at: ticket.last_reopened_at, customer_satisfaction_rating: ticket.customer_satisfaction_rating, customer_feedback: ticket.customer_feedback, tags: ticket.tags, merged_into_ticket_id: ticket.merged_into_ticket_id }, (includeDates && {
    created_at: ticket.created_at,
    updated_at: ticket.updated_at,
})), { users: ticket.users
        ? {
            username: ticket.username,
            email: ticket.email,
        }
        : undefined, customers: ticket.customers
        ? {
            id: ticket.id,
            company_id: ticket.company_id,
            first_name: ticket.first_name,
            last_name: ticket.last_name,
        }
        : undefined, agents: ticket.agents
        ? {
            id: ticket.id,
            first_name: ticket.first_name,
            last_name: ticket.last_name,
        }
        : undefined }));
exports.ticketController = {
    createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ticket_number, customer_id, assigned_agent_id, category_id, subject, description, priority, status, source, sla_deadline, sla_status, first_response_at, resolved_at, closed_at, assigned_by, is_merged, reopen_count, time_spent_minutes, last_reopened_at, customer_satisfaction_rating, customer_feedback, tags, merged_into_ticket_id, } = req.body;
                const ticket = yield prisma.tickets.create({
                    data: {
                        ticket_number,
                        customer_id,
                        assigned_agent_id,
                        category_id,
                        subject,
                        description,
                        priority: priority !== null && priority !== void 0 ? priority : "Medium",
                        status: status !== null && status !== void 0 ? status : "Open",
                        source: source !== null && source !== void 0 ? source : "Email",
                        sla_deadline,
                        sla_status: sla_status !== null && sla_status !== void 0 ? sla_status : "Within",
                        first_response_at,
                        resolved_at,
                        closed_at,
                        assigned_by,
                        is_merged: is_merged !== null && is_merged !== void 0 ? is_merged : false,
                        reopen_count: reopen_count !== null && reopen_count !== void 0 ? reopen_count : 0,
                        time_spent_minutes: time_spent_minutes !== null && time_spent_minutes !== void 0 ? time_spent_minutes : 0,
                        last_reopened_at,
                        customer_satisfaction_rating,
                        customer_feedback,
                        tags,
                        merged_into_ticket_id,
                    },
                    include: {
                        users: true,
                        customers: true,
                        agents: true,
                    },
                });
                res.success("Ticket created successfully", serializeTicket(ticket, true), 201);
            }
            catch (error) {
                console.error(error);
                res.error(error.message);
            }
        });
    },
    updateTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const existing = yield prisma.tickets.findUnique({ where: { id } });
                if (!existing) {
                    res.error("Ticket not found", 404);
                }
                const { ticket_number, customer_id, assigned_agent_id, category_id, subject, description, priority, status, source, sla_deadline, sla_status, first_response_at, resolved_at, closed_at, assigned_by, is_merged, reopen_count, time_spent_minutes, last_reopened_at, customer_satisfaction_rating, customer_feedback, tags, merged_into_ticket_id, } = req.body;
                const ticket = yield prisma.tickets.update({
                    where: { id },
                    data: {
                        ticket_number,
                        customer_id,
                        assigned_agent_id,
                        category_id,
                        subject,
                        description,
                        priority,
                        status,
                        source,
                        sla_deadline,
                        sla_status,
                        first_response_at,
                        resolved_at,
                        closed_at,
                        assigned_by,
                        is_merged,
                        reopen_count,
                        time_spent_minutes,
                        last_reopened_at,
                        customer_satisfaction_rating,
                        customer_feedback,
                        tags,
                        merged_into_ticket_id,
                        updated_at: new Date(),
                    },
                    include: {
                        users: true,
                        customers: true,
                        agents: true,
                    },
                });
                res.success("Ticket updated successfully", serializeTicket(ticket, true), 200);
            }
            catch (error) {
                console.error(error);
                res.error(error.message);
            }
        });
    },
    getTicketById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const ticket = yield prisma.tickets.findUnique({
                    where: { id },
                    include: {
                        agents: true,
                        users: true,
                        categories: true,
                        customers: true,
                    },
                });
                if (!ticket)
                    res.error("Ticket not found", 404);
                res.success("Ticket fetched successfully", serializeTicket(ticket, true), 200);
            }
            catch (error) {
                res.error(error.message);
            }
        });
    },
    deleteTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, ids } = req.body;
                if (id && !isNaN(Number(id))) {
                    const ticket = yield prisma.tickets.findUnique({
                        where: { id: Number(id) },
                    });
                    if (!ticket) {
                        res.error("Ticket not found", 404);
                        return;
                    }
                    yield prisma.tickets.delete({ where: { id: Number(id) } });
                    res.success(`Ticket with id ${id} deleted successfully`, 200);
                    return;
                }
                if (Array.isArray(ids) && ids.length > 0) {
                    const deletedTickets = yield prisma.tickets.deleteMany({
                        where: { id: { in: ids } },
                    });
                    if (deletedTickets.count === 0) {
                        res.error("No matching tickets found for deletion", 404);
                        return;
                    }
                    res.success(`${deletedTickets.count} tickets deleted successfully`, 200);
                    return;
                }
                res.error("Please provide a valid 'id' or 'ids[]' in the request body", 400);
            }
            catch (error) {
                res.error(error.message, 500);
            }
        });
    },
    getAllTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = "1", limit = "10", search = "" } = req.query;
                const page_num = parseInt(page, 10);
                const limit_num = parseInt(limit, 10);
                const searchLower = search.toLowerCase();
                const filters = search
                    ? {
                        subject: {
                            contains: searchLower,
                        },
                        ticket_number: {
                            contains: searchLower,
                        },
                        status: {
                            contains: searchLower,
                        },
                    }
                    : {};
                const { data, pagination } = yield (0, pagination_1.paginate)({
                    model: prisma.tickets,
                    filters,
                    page: page_num,
                    limit: limit_num,
                    orderBy: { created_at: "desc" },
                    include: {
                        users: true,
                        customers: true,
                        agents: true,
                    },
                });
                res.success("Tickets fetched successfully", data.map((ticket) => serializeTicket(ticket, true)), 200, pagination);
            }
            catch (error) {
                res.error(error.message);
            }
        });
    },
};
