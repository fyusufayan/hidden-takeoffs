package com.dairo.hiddentakeoffs.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.*;

@Entity
public class Takeoff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Please enter a takeoff name")
    private String name;

    @NotBlank(message = "Please enter a description about takeoff")
    private String description;

    @DecimalMax(value = "90.00000")
    @DecimalMin(value = "-90.00000")
    @Column(precision = 3,scale = 6)
    private Float lat;
    @Column(precision = 3,scale = 6)
    @DecimalMax(value = "180.00000")
    @DecimalMin(value = "-180.00000")
    private Float lng;


    @NotEmpty(message = "Please pick at least 1 suitable Wind Direction")
    @OneToMany(targetEntity = WindDirection.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "takeoff")
    private List<WindDirection> windDirection;


    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updated_At;

    public Takeoff() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public Float getLng() {
        return lng;
    }

    public void setLng(Float lng) {
        this.lng = lng;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public List<WindDirection> getWindDirection() {
        return windDirection;
    }

    public void setWindDirection(List<WindDirection> windDirection) {
        this.windDirection = windDirection;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At=new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At=new Date();
    }
}
