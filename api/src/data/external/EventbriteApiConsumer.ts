import { injectable } from "inversify";
import { EVENTBRITE_CONFIG } from "../../config/properties/Properties";
import { HTTP_METHOD } from "../../util/HttpMethod";
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

  private async makeEventbriteApiRequest(queryString: String, context: String) {
    const requestOptions = this.buildGetRequestOption();
    const res = await fetch(
      `${this._apiBaseUrl}${context}${queryString}`,
      requestOptions
    );
    const json = await res.json();
    return json;
  }

  public async getEVentsByLocation(location: String, seartType: String) {
    const queryString = `location.address=${location}&search_type=${seartType}`;
    const context = `/search?`;
    return await this.makeEventbriteApiRequest(queryString, context);
  }
}
