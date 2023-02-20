package com.dairo.hiddentakeoffs.services;

import com.dairo.hiddentakeoffs.exceptions.TakeoffAlreadyExistsException;
import com.dairo.hiddentakeoffs.model.Takeoff;
import com.dairo.hiddentakeoffs.model.User;
import com.dairo.hiddentakeoffs.model.WindDirection;
import com.dairo.hiddentakeoffs.repositories.TakeoffRepository;
import com.dairo.hiddentakeoffs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
public class TakeoffService {

    @Autowired
    private TakeoffRepository takeoffRepository;

    @Autowired
    private UserRepository userRepository;

    public Iterable<Takeoff> findAllTakeoffs(){
        return takeoffRepository.findAll();
    }

    public Takeoff saveTakeoff(Takeoff takeoff,String username){
        System.out.println("lat"+takeoff.getLat());
        System.out.println("lng"+takeoff.getLng());

        try {
            User user=userRepository.findByUsername(username);
            takeoff.setUser(user);

            if (takeoff.getId()==null){
                for (WindDirection wd : takeoff.getWindDirection()){
                    wd.setTakeoff(takeoff);
                }
            }

            return takeoffRepository.save(takeoff);
        }catch (Exception e){
            throw new TakeoffAlreadyExistsException("Takeoff with lat= "+takeoff.getLat()+"and lng= "+takeoff.getLng()+" already exists.");
        }
    }



    public Takeoff findTakeoffByName(String takeoffName){

        Takeoff takeoff=takeoffRepository.findByName(takeoffName);

        if (takeoff==null){

        }

        return takeoff;
    }

    public void deleteTakeoffByIdentifier(String takeoffName){
        takeoffRepository.delete(findTakeoffByName(takeoffName));
    }
}
