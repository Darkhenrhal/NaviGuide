package com.naviguide.naviguide.controller;
import com.naviguide.naviguide.model.Events;
import com.naviguide.naviguide.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/event")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping(value = "/getevents/{userName}")
    public List<Events> getAllEventsByUserName(@PathVariable String userName){
        return eventService.getEventByUserName(userName);
    }

    @PostMapping(value = "/save")
    private String saveEvent(@RequestBody Events event){
        return eventService.save(event);
    }
}