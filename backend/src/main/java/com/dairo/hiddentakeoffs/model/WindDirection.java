package com.dairo.hiddentakeoffs.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class WindDirection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String direction;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "takeoff_id", referencedColumnName = "id")
    private Takeoff takeoff;


    public WindDirection() {
    }

    public Takeoff getTakeoff() {
        return takeoff;
    }

    public void setTakeoff(Takeoff takeoff) {
        this.takeoff = takeoff;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

}
