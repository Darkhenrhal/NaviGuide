import React from "react";


const ContactForm =()=>{
    return(
        <section> 
            <div id="eventcardnew">
            

                            {/* <form onSubmit={(e) => EventFormSubmit(e)}> */}
                            <form>
                            
                            <div id="newcontactform">
                            <h1 className="pveventstopics" id="contactheading">Contact username</h1>
                                <div id="formdivevent">
                                <div id="content" className="content">
                                            <div className="closebtnevent">
                                                <button className="devbtn" id="closebtnevent">Close</button>
                                            </div>
                                        <div>
                                        <div className="row">
                                            
                                            <div className="cardreg">
                                                <label htmlFor="eventName">Your Email</label>
                                                <input
                                                    type="text"
                                                    className="inputssingleevd"
                                                    name="eventName"
                                                    id="eventName"
                                                    // value="{eventName}"
                                                    // onChange={(e) => setEventName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            
                                            <div className="cardreg">
                                                <label htmlFor="eventName">Heading</label>
                                                <input
                                                    type="text"
                                                    className="inputssingleevd"
                                                    name="eventName"
                                                    id="eventName"
                                                    // value="{eventName}"
                                                    // onChange={(e) => setEventName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventDescription">Message</label>
                                                <textarea
                                                    id="eventDescription"
                                                    name="eventDescription"
                                                    className="inputssingleevd"
                                                    // value={eventDescription}
                                                    // onChange={(e) => setEventDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                                                                         
                                </div>
                                <div id="btnsaveevent">
                                        <button type="submit" className="devbtn" id="sebtn">Send Email</button>
                                    </div>
          
                            </div>
                        
                        </form>
                    </div>
        </section>
    );
}

export default ContactForm;