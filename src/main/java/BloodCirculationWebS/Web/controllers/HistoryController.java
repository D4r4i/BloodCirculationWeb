package BloodCirculationWebS.Web.controllers;

import BloodCirculationWebS.Web.models.PerformHistory;
import BloodCirculationWebS.Web.models.UserInfoService;
import BloodCirculationWebS.Web.repo.PerformHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Controller
public class HistoryController {

    @Autowired
    private PerformHistoryRepository performHistoryRepository;

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/history")
    public String history(Model model) {
        Long user_id = userInfoService.getCurrentUserId();
        Iterable<PerformHistory> performHistories = performHistoryRepository.findAllByUserId(user_id);
        ArrayList<PerformHistory> performHistoriesList = new ArrayList<>((Collection) performHistories);
        performHistories = performHistoriesList.reversed();
        model.addAttribute("performHistories", performHistories);
        return "html/history";
    }

    @PostMapping(value = "/history", consumes = "application/json")
    public ResponseEntity<PerformHistory> saveHis(@RequestBody PerformHistory history, Model model) {
        System.out.println("saveHis");
        Long user_id = userInfoService.getCurrentUserId();
        history.setUserId(user_id);

        String[] currentDate = String.valueOf(LocalDate.now()).split("-");
        String temp = currentDate[0];
        currentDate[0] = currentDate[2];
        currentDate[2] = temp;
        String currentDateStr = String.join(".", currentDate);

        String currentTime = String.valueOf(LocalTime.now()).split("\\.")[0];
        String str = currentDateStr + " | " + currentTime;

        history.setData(str);
        PerformHistory savedHistory = performHistoryRepository.save(history);
        return ResponseEntity.ok(savedHistory);
    }
}
