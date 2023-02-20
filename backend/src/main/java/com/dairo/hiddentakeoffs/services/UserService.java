package com.dairo.hiddentakeoffs.services;

import com.dairo.hiddentakeoffs.exceptions.UsernameAlreadyExistsException;
import com.dairo.hiddentakeoffs.model.User;
import com.dairo.hiddentakeoffs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){

        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            //username has to be unique
            newUser.setUsername(newUser.getUsername());

            //make sure that password and confirmpassword match
            //dont persist or shot the confirm password
            return userRepository.save(newUser);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }
}
