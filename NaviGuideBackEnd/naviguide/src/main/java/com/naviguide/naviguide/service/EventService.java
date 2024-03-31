package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Events;

import java.util.List;

public interface EventService {
    List<Events> getEventByUserName(String userName);

    String save(Events event);
}