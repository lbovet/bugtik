package li.chee.bugtik;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TicketRepository extends PagingAndSortingRepository<Ticket, Long> {

    List<Ticket> findByOwner(String owner);
}
