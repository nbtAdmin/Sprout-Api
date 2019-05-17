import { injectable } from "inversify";
import { YELP_CONFIG } from "../../config/properties/Properties";
import { HTTP_METHOD } from "../../util/HttpMethod";
import fetch from "node-fetch";

@injectable()
export class YelpApiConsumer {
  private readonly _apiKey = YELP_CONFIG.API_KEY;
  private readonly _apiBaseUrl = YELP_CONFIG.API_BASE_URL;

  private buildGetRequestOption(): any {
    return {
      method: HTTP_METHOD.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._apiKey}`
      }
    };
  }

  private async makeYelpApiRequest(queryString: String, context: String) {
    const requestOptions = this.buildGetRequestOption();
    const res = await fetch(
      `${this._apiBaseUrl}${context}${queryString}`,
      requestOptions
    );
    const json = await res.json();
    return json;
  }

  public async getEventsByLocation(location: String, limit: String) {
    const queryString = `location=${location}&limit=${limit}`;
    const context = `/events?`;
    return await this.makeYelpApiRequest(queryString, context);
  }

  public async getEventsByLocationStartTime(
    location: String,
    startTimeISO: String,
    limit: String
  ) {
    const queryString = `location=${location}&start_date=${startTimeISO}&limit=${limit}`;
    const context = `/events?`;
    return await this.makeYelpApiRequest(queryString, context);
  }
}
