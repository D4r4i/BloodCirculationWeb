package BloodCirculationWebS.Web.controllers;

import BloodCirculationWebS.Web.models.UserInfo;
import BloodCirculationWebS.Web.repo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value = "/registration", consumes = "application/json")
    public ResponseEntity<?> createUser(@RequestBody UserInfo user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            UserInfo createdUser = userInfoRepository.save(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            // Вернуть HTTP 500 в случае ошибки
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not created");
        }
    }
}
