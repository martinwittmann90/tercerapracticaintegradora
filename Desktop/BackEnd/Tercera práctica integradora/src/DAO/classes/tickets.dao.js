import TicketModel from "../models/ticket.model.js"
class TicketsDAO {
    async addTicket(newTicket) {
        try {
        const ticket = await TicketModel.create(newTicket);
        ticket.code = ticket._id.toString();
        await TicketModel.findByIdAndUpdate(ticket._id, { code: ticket.code });
        return ticket;
        } catch (error) {
          throw (`Something gone wrong with the ticket`);
        }
      }
}

export default TicketsDAO;
