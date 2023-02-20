package com.dairo.hiddentakeoffs.repositories;

import com.dairo.hiddentakeoffs.model.Takeoff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TakeoffRepository extends CrudRepository<Takeoff,Long> {

    Takeoff findByName(String TakeoffName);

    @Override
    Iterable<Takeoff> findAll();
}
