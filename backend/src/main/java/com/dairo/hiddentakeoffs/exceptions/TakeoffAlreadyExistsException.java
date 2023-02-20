package com.dairo.hiddentakeoffs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TakeoffAlreadyExistsException extends RuntimeException{

    public TakeoffAlreadyExistsException(String message) {
        super(message);
    }
}
