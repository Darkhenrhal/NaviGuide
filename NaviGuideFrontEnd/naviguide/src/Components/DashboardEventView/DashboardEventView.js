import React, { useState } from "react";
import "./DashboardEventView.css";
import axios from "axios";
import { useEffect } from "react";

const DashboardEventView = ({user}) => {
    const [error, setError] = useState(null);
    const [userName,setUserName]=useState(user.userName);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventAudiance, setEventAudiance] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [newEvent,setNewEvent]=useState(null);
    const [doneEventForm,setDoneEventForm]=useState(null);
    const [events,setEvents]=useState(null);
    const [img1url,setImg1Url]=useState("");
    const [eventStatus,setEventStatus]=useState("");
    const [eventStakeHolder, setEventStakeHolder] = useState(""); 
    const [epic, setEpic] = useState([]);
    const [completeEvent, setCompleteEvent] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);

    const [completeEventFormData,setcompleteEventFormData]=useState({
        eventName:completeEvent,
        eventDate:"",
        eventStatus:"completed",
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        img5:"",
        img6:"",
    });

    const geteventdata =async (userName,eventName,eventDate)=>{

    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setEpic((prevEpic) => [...prevEpic, ...files]);
    };
    
    const newEventClicked =()=>{
        setNewEvent(true);
    };

    const handleNewEventClose=()=>{
        setNewEvent(false);
    };

    const handleCompleteFormInputChange=(e)=>{
        const { name, value } = e.target;
        setcompleteEventFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    };

    const deleteevent=()=>{
        alert("Delete pressed");
    };

    const EventFormSubmit =async (e) => {
        e.preventDefault();
        setUserName(user.userName);
        try{
            const response = await axios.post("/api/event/save",{
                userName:userName,
                eventName:eventName,
                eventDate:eventDate,
                eventAudiance:eventAudiance,
                eventDescription:eventDescription,
                eventVenue:eventVenue,
                eventStakeHolder: eventStakeHolder,                
                eventStatus:"scheduled"
            });

            if(response.status===200){
                alert("Event Scheduled");
                setEventName("");
                setEventDate(null);
                setEventAudiance("");
                setEventDescription("");
                setEventVenue("");
                setNewEvent(false);
                setEventStatus("");
                setEventStakeHolder(""); 

            }else{
                alert('Unexpected response status :',response.status);

            }
        }catch(err){
            alert("Event Creation Failed : "+err.toString());
          }

        
    };

    const handleCompleteFormSubmit=async(e)=>{
        e.preventDefault();
        setUserName(user.userName);
        try{
            const response = await axios.post(`/api/event/updateevent/`,{
                userName:userName,
                eventName:eventName,
                eventDate:eventDate,
                eventAudiance:eventAudiance,
                eventDescription:eventDescription,
                eventVenue:eventVenue,
                eventStakeHolder: eventStakeHolder,                
                eventStatus:"scheduled"
            });

            if(response.status===200){
                alert("Event Scheduled");
                setEventName("");
                setEventDate(null);
                setEventAudiance("");
                setEventDescription("");
                setEventVenue("");
                setNewEvent(false);
                setEventStatus("");
                setEventStakeHolder(""); 

            }else{
                alert('Unexpected response status :',response.status);

            }

        }catch(err){
            alert("Event Completion Failed : "+err.toString());
        }
    }


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const responseEvents = await axios.get(`/api/event/getevents/${user.userName}`);
                setEvents(responseEvents.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch user data: ', error);
            }
        };
        fetchEventData();    
        
    }, [user]);




    const divideEventsByStatus = (events) => {
        const scheduledEvents = events.filter(event => event.eventStatus === 'scheduled');
        const otherEvents = events.filter(event => event.eventStatus !== 'scheduled');
        return { scheduledEvents, otherEvents };
    };

    const { scheduledEvents, otherEvents } = events ? divideEventsByStatus(events) : { scheduledEvents: [], otherEvents: [] };


    const [mainImage, setMainImage] = useState(epic[0]);

    const changeMainImage = (src) => {
        setMainImage(src);
    };

    const handleDeleteEvent = (eventName) => {
        setEventToDelete(eventName);
    };

    const handleCompleteEvent = (eventName) => {
        setCompleteEvent(eventName);
    };

    const handleEditEvent = (eventName) => {
        setEventToEdit(eventName);
    };

    const handleCancelDelete=()=>{
        setEventToDelete(null);
    }

    const handleCancelEdit = () => {
        setEventToEdit(null);
    };

    const handleCancelComplete = () => {
        setCompleteEvent(null);
    };
    const handleCancelNewEvent = () => {
        setNewEvent(null);
    };

    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTJ9PiXYRPBIWO2maHbR9UZHFId3Jj0aDTYR6uXROOA&s",
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80",
        "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31Bl0Kw-9otKWU3Ra_kobJ1ihRvsB7D0v94cx5r5UfA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpiwSWPOKWqmYBYJav8qfHvMYr-Xzzkq4OaonNwMeUBVDhttTr9Yrn6UPlRQxgfXgObI&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVAsfrdcyyQyryoJe4-qHSqFRn05vGkpHCXn1bLrLhAw&s"
    ];
    const Gallery = () => {
        const [mainImage, setMainImage] = useState(images[0]);
    
        const changeMainImage = (image) => {
            setMainImage(image);
        };
    };


    return (
        <section id="events">
            <section>
                    <h1 className="pveventstopics">Manage Events</h1>
                    <div id="devbtndiv">
                        <button className="devbtn" onClick={newEventClicked}>Schedule new event</button>
                    </div>
                    {newEvent && (

                            <div id="eventcardnew">
                            <form onSubmit={(e) => EventFormSubmit(e)}>
                            <div id="neweventform">
                                
                                <div id="formdivevent">
                                <div id="content" className="content">
                                            <div className="closebtnevent">
                                                <button className="devbtn" id="closebtnevent" onClick={handleCancelNewEvent}>Close</button>
                                            </div>
                                        <div>
                                        <div className="row">
                                            
                                            <div className="cardreg">
                                                <label htmlFor="eventName">Event Name</label>
                                                <input
                                                    type="text"
                                                    className="inputssingleevd"
                                                    name="eventName"
                                                    id="eventName"
                                                    value={eventName}
                                                    onChange={(e) => setEventName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventDescription">Event Description</label>
                                                <textarea
                                                    id="eventDescription"
                                                    name="eventDescription"
                                                    className="inputssingleevd"
                                                    value={eventDescription}
                                                    onChange={(e) => setEventDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventDate">Event Date</label>
                                                <input
                                                    id="eventDate"
                                                    className="inputssingleevd"
                                                    type="date"
                                                    name="eventDate"
                                                    value={eventDate}
                                                    onChange={(e) => setEventDate(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventAudiance">Audiance</label>
                                                <input
                                                    id="eventAudiance"
                                                    className="inputssingleevd"
                                                    type="text"
                                                    name="eventAudiance"
                                                    value={eventAudiance}
                                                    onChange={(e) => setEventAudiance(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventStakeholder">Event Stakeholder</label>
                                                <input
                                                    type="text"
                                                    name="eventStakeholder"
                                                    id="eventStakeholder"
                                                    className="inputssingleevd"
                                                    value={eventStakeHolder}
                                                    onChange={(e) => setEventStakeHolder(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventVenue">Event Venue</label>
                                                <input
                                                    type="text"
                                                    name="eventVenue"
                                                    id="eventVenue"
                                                    className="inputssingleevd"
                                                    value={eventVenue}
                                                    onChange={(e) => setEventVenue(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                        
                                    
                                    
                                </div>
                                <div id="btnsaveevent">
                                        <button type="submit" className="devbtn" id="sebtn">Schedule Event</button>
                                    </div>
                                
                                
                            </div>
                        
                        </form>
                    </div>
                    )}
            <hr/>

            </section>
            <section>
                    <div id="scheduledEvents">
                    <h1 className="pveventstopics">Scheduled Events</h1>
                    <ul>
                         {scheduledEvents.map(event => (
                            <li key={event.eventName}>
                                {completeEvent === event.eventName ? (
                                <div id="eventcardnew">
                                    
                                <form onSubmit={(e) => handleCompleteFormSubmit(e)}>
                                <div id="neweventform">
                                    
                                    <div id="formdivevent">
                                    <div id="content" className="content">
                                                <div className="closebtnevent">
                                                    
                                                    <button className="devbtn" id="closebtnevent" onClick={handleCancelComplete}>Close</button>
                                                </div>
                                            <div>
                                            <div className="row">
                                                
                                                <div className="cardreg">
                                                    <label htmlFor="eventName">Event Name</label>
                                                    <input
                                                        type="text"
                                                        className="inputssingleevd"
                                                        name="eventName"
                                                        id="eventName"
                                                        value={completeEventFormData.eventName}
                                                        onChange={handleCompleteFormInputChange}
                                                        
                                                    />
                                                </div>
                                            </div>
    
                                            <div className="row">
                                                <div className="cardreg">
                                                    <label htmlFor="eventDescription">Event Description</label>
                                                    <textarea
                                                        id="eventDescription"
                                                        name="eventDescription"
                                                        className="inputssingleevd"
                                                        value={completeEventFormData.eventDescription}
                                                        onChange={handleCompleteFormInputChange}
                                                    ></textarea>
                                                </div>
                                            </div>
    
                                            <div className="row">
                                                <div className="cardreg">
                                                    <label htmlFor="eventDate">Event Date</label>
                                                    <input
                                                        id="eventDate"
                                                        className="inputssingleevd"
                                                        type="date"
                                                        name="eventDate"
                                                        value={event.eventDate}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
    
                                            <div className="row">
                                                <div className="cardreg">
                                                    <label htmlFor="eventAudiance">Event Audiance</label>
                                                    <input
                                                        id="eventAudiance"
                                                        className="inputssingleevd"
                                                        type="text"
                                                        name="eventAudiance"
                                                        value={completeEventFormData.eventAudiance}
                                                        onChange={handleCompleteFormInputChange}
                                                    />
                                                </div>
                                            </div>
    
                                            <div className="row">
                                                <div className="cardreg">
                                                    <label htmlFor="eventVenue">Event Venue</label>
                                                    <input
                                                        type="text"
                                                        name="eventVenue"
                                                        id="eventVenue"
                                                        className="inputssingleevd"
                                                        value={completeEventFormData.eventVenue}
                                                        onChange={handleCompleteFormInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="rowimagesevent">
                                                <div className="neweventform">
                                                <label htmlFor="eventVenue">Pictures (Max : 6 pictures)</label>
                                                    <div className="pics">
                                                        <div className="picdiv">
                                                            {selectedImages.map((epic, index) => (
                                                                <img key={index} className="pictures" alt={`Image ${index + 1}`} src={URL.createObjectURL(epic)} />
                                                                
                                                            ))}
                                                            {epic.map((image, index) => (
                                                                <img
                                                                    key={index}
                                                                    className="pictures"
                                                                    src={URL.createObjectURL(image)}
                                                                    alt={`Image ${index + 1}`}
                                                                />
                                                            ))}

                                                        </div>
                                                        <div className=""picdiv>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                name="epic1"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />

                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                name="epic2"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                name="epic3"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />
                                                            <input
                                                                type="file"
                                                                name="epic4"
                                                                accept="image/*"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />

                                                            <input
                                                                type="file"
                                                                name="epic5"
                                                                accept="image/*"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />

                                                            <input
                                                                type="file"
                                                                name="epic6"
                                                                accept="image/*"
                                                                className="eventImages"
                                                                multiple
                                                                onChange={handleImageChange}
                                                            />

                                                        </div>

                                         
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                        </div>
                                            
                                        
                                        
                                    </div>
                                    <div id="btnsaveevent">
                                            <button type="submit" className="devbtn" id="sebtn">Complete Event</button>
                                        </div>
                                    
                                        
                                    </div>
                                    
                                    </form>
                                </div>

                            ) : eventToEdit === event.eventName ?(
                                <div id="eventcardnew">
                                    <form onSubmit={(e) => EventFormSubmit(e)}>
                                    <div id="neweventform">
                                        
                                        <div id="formdivevent">
                                        <div id="content" className="content">
                                                    <div className="closebtnevent">
                                                        
                                                        <button className="devbtn" id="closebtnevent" onClick={handleCancelEdit}>Close</button>
                                                    </div>
                                                <div>
                                                <div className="row">
                                                    
                                                    <div className="cardreg">
                                                        <label htmlFor="eventName">Event Name</label>
                                                        <input
                                                            type="text"
                                                            className="inputssingleevd"
                                                            name="eventName"
                                                            id="eventName"
                                                            value={event.eventName}
                                                            onChange={(e) => setEventName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="cardreg">
                                                        <label htmlFor="eventDescription">Event Description</label>
                                                        <textarea
                                                            id="eventDescription"
                                                            name="eventDescription"
                                                            className="inputssingleevd"
                                                            value={event.eventDescription}
                                                            onChange={(e) => setEventDescription(e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="cardreg">
                                                        <label htmlFor="eventDate">Event Date</label>
                                                        <input
                                                            id="eventDate"
                                                            className="inputssingleevd"
                                                            type="date"
                                                            name="eventDate"
                                                            value={event.eventDate}
                                                            onChange={(e) => setEventDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="cardreg">
                                                        <label htmlFor="eventAudiance">Audiance</label>
                                                        <input
                                                            id="eventAudiance"
                                                            className="inputssingleevd"
                                                            type="text"
                                                            name="eventAudiance"
                                                            value={event.eventAudiance}
                                                            onChange={(e) => setEventAudiance(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="cardreg">
                                                        <label htmlFor="eventStakeholder">Event Stakeholder</label>
                                                        <input
                                                            type="text"
                                                            name="eventStakeholder"
                                                            id="eventStakeholder"
                                                            className="inputssingleevd"
                                                            value={event.eventStakeHolder}
                                                            onChange={(e) => setEventStakeHolder(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="cardreg">
                                                        <label htmlFor="eventVenue">Event Venue</label>
                                                        <input
                                                            type="text"
                                                            name="eventVenue"
                                                            id="eventVenue"
                                                            className="inputssingleevd"
                                                            value={event.eventVenue}
                                                            onChange={(e) => setEventVenue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                                
                                            
                                            
                                        </div>
                                        <div id="btnsaveevent">
                                                <button type="submit" className="devbtn" id="sebtn">Update Event</button>
                                            </div>
                                        
                                        
                                    </div>
        
                                    </form>
                                </div>
                            ):eventToDelete===event.eventName? (
                                <div>
                                    <div className="eventcard">
                                    <div id="eventNameSchedule">
                                        <div id="namesandbtn">
                                            <h1 className="eventnameheduled">{event.eventName}</h1>
                                            <h5>{event.eventDate}</h5>
                                        </div>
                                        <div id="eventDetails">
                                            
                                        </div>
                                        
                                    </div>
                                    <div id="completeevent">                    
                                            <p>Do you want to delete this Event ?</p>
                                            
                                    </div>
                                    <div className="yesnodiv">
                                            <button className="devbtn" id="yesbtn" onClick={handleDeleteEvent}>Yes</button>
                                            <button className="devbtn" id="nobtn" onClick={handleCancelDelete}>No</button>
                                    </div>
                                         
                                </div>
                                </div>
                            ):(
                                <div className="eventcard">
                                    <div id="eventNameSchedule">
                                    <div id="namesandbtn">
                                        <h1 className="eventnameheduled">{event.eventName}</h1>
                                        <h5>{event.eventDate}</h5>
                                        <button className="editeventbtn" onClick={() => handleEditEvent(event.eventName)}>Edit Event</button>
                                    </div>
                                    <div id="completeevent">                    
                                        <button className="devbtn" id="completebtnevent" onClick={() => handleCompleteEvent(event.eventName)}>Complete</button>
                                        <button className="devbtn" id="deletebtnevent" onClick={() => handleDeleteEvent(event.eventName)}>Delete</button>
                                    </div>
                                    </div>
                                    <div id="eventDetails">
                                            <p>
                                                {event.eventDescription}
                                            </p>
                                    </div>
        
                                </div>
                            )}
                            </li>
                        ))}
                    </ul>
  
                        

                    </div>
                    <hr/>

            </section>
            <section>

            <div id="completedEvents">
                <h1 className="pveventstopics">Completed Events</h1>
                        <ul>
                         {otherEvents.map(event => (
                            <li key={event.eventName}>
                                    <div className="eventcard">
                                        <div id="eventNameSchedule">
                                            <div id="namesandbtn">
                                                <h1 className="eventnameheduled">{event.eventName}</h1>
                                                <h5>2022/05/10</h5>
                                                <button className="editeventbtn">Edit Event</button>
                                            </div>
                                            
                                        </div>
                                        <div id="completeevent">                    
                                            {/* <button className="devbtn" id="completebtnevent" onClick={() => handleCompleteEvent(event.eventName)}>Complete</button>
                                            <button className="devbtn" id="deletebtnevent" onClick={() => handleDeleteEvent(event.eventName)}>Delete</button> */}
                                        </div>
                                        <div id="eventDetails">
                                            <p>
                                                {event.eventDescription}
                                            </p>
                                        </div>
                                        {/* Gallery component */}
                                        <div className="containerimg">
                                            <div className="main_view">
                                                <img src={mainImage} id="main" alt="image" />
                                            </div>

                                            <div className="side_view">
                                                {epic.map((epic, index) => (
                                                    <img
                                                        key={index}
                                                        src={epic}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        onClick={() => changeMainImage(epic)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                
                            </li>

                                    
                         ))}
                         </ul>   

                         {/* //for show */}
                    <div className="eventcard">
                        <div id="eventNameSchedule">
                            <div id="namesandbtn">
                                <h1 className="eventnameheduled">Event Name</h1>
                                <h5>2022/05/10</h5>
                                <button className="editeventbtn">Edit Event</button>
                            </div>
                        <div id="completeeventbtndeletediv">                    
                            <button className="devbtn" id="deletebtneventcompleted" >Delete</button>
                        </div>
                    </div>
                    <div id="eventDetails">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="containerimg">
                        <div className="main_view">
                            <img src={mainImage} id="main" alt="Main" />
                        </div>
                            <div className="side_view">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => changeMainImage(image)}
                            />
                            ))}
                            </div>
                    </div>
                </div>
                
            </div>

            <hr />
        </section>
            
            <hr/>
   
        </section>
    );
};

export default DashboardEventView;
