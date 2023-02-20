package com.dairo.hiddentakeoffs.controllers;

import com.dairo.hiddentakeoffs.model.Takeoff;
import com.dairo.hiddentakeoffs.services.MapValidationErrorService;
import com.dairo.hiddentakeoffs.services.TakeoffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/takeoff")
@CrossOrigin
public class TakeoffController {

    @Autowired
    private TakeoffService takeoffService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;



    @GetMapping("/")
    public ResponseEntity<?>getTakeoffs(BindingResult result,Principal principal){

        ResponseEntity<?> errorMap= mapValidationErrorService.MapValidationService(result);
        if (errorMap!=null){
            System.out.println("yes problem");
            return errorMap;
        }

        return new ResponseEntity<String>("ok", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?>getAllTakeoffs(Principal principal){


        return new ResponseEntity<Iterable>(takeoffService.findAllTakeoffs(), HttpStatus.OK);
    }

    @GetMapping("/{takeoffName}")
    public ResponseEntity<?> getTakeoffByName(@PathVariable String takeoffName){

        Takeoff takeoff=takeoffService.findTakeoffByName(takeoffName);

        return new ResponseEntity<Takeoff>(takeoff,HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createNewTakeoff(@Valid @RequestBody Takeoff takeoff, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap= mapValidationErrorService.MapValidationService(result);
        if (errorMap!=null){
            return errorMap;
        }

        Takeoff takeoff1= takeoffService.saveTakeoff(takeoff,principal.getName());

        return new ResponseEntity<Takeoff>(takeoff1,HttpStatus.CREATED);
    }

    @DeleteMapping("/{takeoffName}")
    public ResponseEntity<?> deleteTakeoff(@PathVariable String takeoffName){

        takeoffService.deleteTakeoffByIdentifier(takeoffName);

        return new ResponseEntity<String>("Project with name "+takeoffName+" was deleted",HttpStatus.OK);
    }

}
