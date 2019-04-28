import {
    controller,
    httpGet,
    request,
    response,
    httpPost
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES_PROCESSORS } from "../config/ioc/Inversify.type.defs";
import { DataAggregationProcessor } from "../processors/data/DataAggregationProcessor";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../util/HttpStatus";
import { ERRORS } from "../util/ErrorMessages";

@controller("/search")
export class SearchController {
    @inject(TYPES_PROCESSORS.DataAggregationProcessor)
    private readonly dataAggregator: DataAggregationProcessor;

    @httpPost("/events")
    public async getAllFilteredEvents(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            return await this.dataAggregator.getFilteredEventData(req, res);
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.INTERNAL_SERVER_ERR });
        }
    }

    @httpPost("/restaurants")
    public async getRestaurantData(
        @request() req: Request,
        @response() res: Response
    ) {
        try {
            return res
                .status(HTTP_STATUS.OK)
                .json({ msg: "Restaurants Search to be implemented" });
        } catch (err) {
            return res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERR)
                .json({ err: ERRORS.INTERNAL_SERVER_ERR });
        }
    }
}
