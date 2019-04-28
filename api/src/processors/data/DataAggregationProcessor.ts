import { injectable, inject } from "inversify";
import { TYPES_EXTERNAL_API } from "../../config/ioc/Inversify.type.defs";
import { YelpApiConsumer } from "../../data/external/YelpApiConsumer";
import {
    EventbriteApiConsumer,
    EventbriteApiFilers
} from "../../data/external/EventbriteApiConsumer";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../util/HttpStatus";
import { ERRORS } from "../../util/ErrorMessages";
import {
    YelpDataFormatter,
    EventbriteDataFormatter
} from "../../util/dataFormatter/Formatter";

const moment = require("moment");

const EVENTBRITE_DATE_FORMAT = "YYYY-MM-DDThh:mm:ss";

@injectable()
export class DataAggregationProcessor {
    @inject(TYPES_EXTERNAL_API.YelpApiConsumer)
    private readonly _yelpApiConsumer: YelpApiConsumer;

    @inject(TYPES_EXTERNAL_API.EventbriteApiConsumer)
    private readonly _eventbriteApiConsumer: EventbriteApiConsumer;

    private async eb_getFilteredData(req: Request) {
        const eventbriteFilers: EventbriteApiFilers = {
            location: req.body.location,
            searchType: "promoted",
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            categories: req.body.categories_eb
        };
        const eventbriteData = await this._eventbriteApiConsumer.getEventsByFilters(
            eventbriteFilers
        );
        return eventbriteData;
    }

    private async yelp_getFilteredDate(req: Request) {
        const date = new Date(req.body.startDate);
        const req_date = (date.getTime() / 1000).toString();
        const yelpData = await this._yelpApiConsumer.getEventsByLocationStartTime(
            req.body.location,
            req_date,
            "1000"
        );
        return yelpData;
    }

    public async getFilteredEventData(req: Request, res: Response) {
        const eventbriteData = await this.eb_getFilteredData(req);

        const yelpData = await this.yelp_getFilteredDate(req);

        let formattedEventbriteData;
        let formattedYelpData;

        if (eventbriteData) {
            formattedEventbriteData = EventbriteDataFormatter(eventbriteData);
        }
        console.log(formattedEventbriteData)

        if (yelpData) {
            formattedYelpData = YelpDataFormatter(yelpData);
        }

        if (eventbriteData && yelpData) {
            return res.status(HTTP_STATUS.OK).json({
                eventbrite: formattedEventbriteData,
                yelp: formattedYelpData
            });
        }
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
            .json({ err: ERRORS.SEARCH_ERR });
    }
}
