package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.Events;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Events,String> {
    @Query(value = "{'userName':?0}")
    List<Events> findByEventCategory(String userName);
}