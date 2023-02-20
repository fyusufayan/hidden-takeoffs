package com.dairo.hiddentakeoffs.controllers;


import com.dairo.hiddentakeoffs.model.User;
import com.dairo.hiddentakeoffs.payload.JWTLoginSuccessResponse;
import com.dairo.hiddentakeoffs.payload.LoginRequest;
import com.dairo.hiddentakeoffs.security.JwtTokenProvider;
import com.dairo.hiddentakeoffs.services.MapValidationErrorService;
import com.dairo.hiddentakeoffs.services.UserService;
import com.dairo.hiddentakeoffs.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.dairo.hiddentakeoffs.security.SecurityConstants.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {


    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
        if (errorMap!=null){
            return errorMap;
        }

        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt=TOKEN_PREFIX+tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        //validate password match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap=mapValidationErrorService.MapValidationService(result);
        if (errorMap!=null){
            return errorMap;
        }

        User newUser=userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);

    }

}
