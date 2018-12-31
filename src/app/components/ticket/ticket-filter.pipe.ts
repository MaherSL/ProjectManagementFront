import { PipeTransform, Pipe } from '@angular/core';
import { Tticket } from '../../entity/Tticket';

@Pipe({
    name : 'ticketFilter'
})
export class TicketFilterPipe implements PipeTransform{
transform(ticketlist:Tticket[],searchTerm:string) : Tticket[]{
if(!ticketlist || !searchTerm){
    return ticketlist;
}
return ticketlist.filter(ticket =>
    ticket.tproduct.nameproduct.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

}

}