package BloodCirculationWebS.Web.repo;

import BloodCirculationWebS.Web.models.PerformHistory;
import org.springframework.data.repository.CrudRepository;

public interface PerformHistoryRepository extends CrudRepository<PerformHistory, Long> {
    Iterable<PerformHistory> findAllByUserId(Long aLong);
}
