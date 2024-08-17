package BloodCirculationWebS.Web.controllers;

import BloodCirculationWebS.Web.models.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ContentController {
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("login", "Вход");
        return "/html/login";
    }
    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("registration", "Регистрация");
        return "/html/registration";
    }
    @GetMapping("/logout")
    public String logout(Model model) {
        return "/";
    }
    @GetMapping("/check-auth")
    public ResponseEntity<Map<String, Boolean>> checkAuthStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAuthenticated = authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken);

        Map<String, Boolean> response = new HashMap<>();
        response.put("authenticated", isAuthenticated);

        return ResponseEntity.ok(response);
    }
}
