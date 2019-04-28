import { isEmpty } from "../validation/isEmpty";

export interface FormattedResponse {
    id?:any;
    eventName?: any;
    eventDescription?: any;
    eventImageUrl?: any;
    eventLocation?: any;
    eventSiteUrl?: any;
    eventCategory?: any;
    additionalInfo?: any;
    eventStartTime?: any;
}

export const YelpDataFormatter = apiResponse => {
    try {
        const events: [] = apiResponse.events;
        const formattedResponses = new Array<FormattedResponse>();
        
        events.forEach((event: any) => {
            const formatedEvent: FormattedResponse = {
                eventName: event.name || null,
                eventDescription: event.description || null,
                eventImageUrl: event.image_url || null,
                eventLocation: event.location || null,
                eventStartTime: event.time_start || null,
                eventCategory: event.category || null,
                eventSiteUrl: event.event_site_url || null
            };
            formattedResponses.push(formatedEvent);
        });
        //console.log(formattedResponses);
        return formattedResponses;
    } catch (err) {
        return err;
    }
};

export const EventbriteDataFormatter = (apiResponse: any) => {
    try {
        //console.log(apiResponse)
        const events: [] = apiResponse.events;
        console.log(events);
        const formattedResponses = new Array<FormattedResponse>();

        for(let i = 0; i < events.length; i++){
           const event:any = events[i];

           let imageUrl;
           if(event.logo){imageUrl = event.logo.url } else { imageUrl = ""} 

           const formattedEvent: FormattedResponse = {
                id:i+1,
                eventName: event.name.text || null,
                eventDescription: event.description.text || null,
                eventImageUrl: imageUrl,
                eventStartTime: event.start || null,
                eventLocation: event.location || null,
                eventCategory: event.category || null,
                eventSiteUrl: event.url || null,
                additionalInfo: {
                        fromEB: true,
                        EB_CategoryId: event.category_id,
                        EB_VenueId: event.venue_id
                    }
             };
             formattedResponses.push(formattedEvent);
            
        };

        //console.log(formattedResponses);
        return formattedResponses;
    } catch (err) {
        return err;
    }
};
