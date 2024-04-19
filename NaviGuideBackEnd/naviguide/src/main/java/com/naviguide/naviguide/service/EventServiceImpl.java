package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Events;
import com.naviguide.naviguide.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Events> getEventByUserName(String userName) {
        return eventRepository.findByEventCategory(userName);
    }

    @Override
    public String save(Events event) {
        return eventRepository.save(event).getEventName();
}
}