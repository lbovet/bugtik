package li.chee.bugtik;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface SeverityRepository extends PagingAndSortingRepository<Severity, String> {
}
