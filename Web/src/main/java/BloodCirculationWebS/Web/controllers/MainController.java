package BloodCirculationWebS.Web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/calc")
    public String calc(Model model) {
        model.addAttribute("calc", "Калькулятор");
        return "html/calc";
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("home", "Главная");
        return "html/index";
    }
}