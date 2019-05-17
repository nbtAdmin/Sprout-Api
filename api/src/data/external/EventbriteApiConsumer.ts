import { injectable } from "inversify";
import { EVENTBRITE_CONFIG } from "../../config/properties/Properties";
import { HTTP_METHOD } from "../../util/HttpMethod";
import fetch from "node-fetch";

export interface EventbriteApiFilers {
    location?: string;
    searchType?: string;
    categories?: string;
    startDate?: string;
    endDate?: string;
}

@injectable()
export class EventbriteApiConsumer {
    private readonly _apiBaseUrl = EVENTBRITE_CONFIG.API_BASE_URL;
    private readonly _oauthToken = EVENTBRITE_CONFIG.APP_OAUTH_TOKEN;

    private buildGetRequestOption(): any {
        return {
            method: HTTP_METHOD.GET,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._oauthToken}`
            }
        };
    }

    private async makeEventbriteApiRequest(
        queryString: String,
        context: String
    ) {
        try {
            const requestOptions = this.buildGetRequestOption();
            const res = await fetch(
                `${this._apiBaseUrl}${context}${queryString}`,
                requestOptions
            );
            const json = await res.json();
            //console.log(json)
            return json;
        } catch (err) {
            return err;
        }
    }

    public async getEVentsByLocation(location: String, seartType: String) {
        const queryString = `location.address=${location}&search_type=${seartType}`;
        const context = `/events/search?`;
        return await this.makeEventbriteApiRequest(queryString, context);
    }

    public async getEventsByFilters(filters: EventbriteApiFilers) {
        const queryString = `location.address=${filters.location}&search_type=${
            filters.searchType
        }&categories=${filters.categories}&start_date.range_start=${
            filters.startDate
        }&start_date.range_end=${filters.endDate}`;
        const context = `/events/search?`;
        return await this.makeEventbriteApiRequest(queryString, context);
    }
}
