import { controller, httpGet, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { RenderProcessor } from "../processors/templates/RenderProcessor";
import { inject } from "inversify";
import { TYPES_PROCESSORS } from "../config/ioc/Inversify.type.defs";
import { EventProcessor } from "../processors/EventProcessor";
import { Event } from "../data/entities/Event";

interface IEvent {
    id:any, 
    name:any
}

@controller("/template")
export class TemplateController {

    @inject(TYPES_PROCESSORS.RenderProcessor)
    private readonly _renderer : RenderProcessor;

    @inject(TYPES_PROCESSORS.EventProcessor)
    private readonly _eventProcessor:EventProcessor;

    @httpGet('/test')
    public async  getTemplate(@request() req: Request, @response() res: Response){
        const events :Event[] =  await this._eventProcessor.getAllEventsDB();
        const eventsData : IEvent[] = new Array<IEvent>();
        events.forEach(event => {
            const e : IEvent = {
                id : event.id,
                name: event.name
            }
            eventsData.push(e)
        })

        console.log(eventsData);
        return this._renderer.render(res, 'home', eventsData)
    }
}