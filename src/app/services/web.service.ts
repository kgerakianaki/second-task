import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class WebService {
  private baseUrl: string = "https://testapiserver.com"; // Server base URL
  private apiKey: string = "9f02f499-cd68-4ede-a3e8-fbb00c3bcde8"; // API Key

  constructor(private http: HttpClient) {}

  // Helper method to create headers
  private createHeaders(additionalHeaders?: HttpHeaders): HttpHeaders {
    let headers = new HttpHeaders({
      ApiKey: this.apiKey,
      "Content-Type": "application/json" // Default content type
    });

    // If additional headers are passed, add them
    if (additionalHeaders) {
      additionalHeaders.keys().forEach(key => {
        headers = headers.set(key, additionalHeaders.get(key)!);
      });
    }

    return headers;
  }

  // GET request method that returns a Promise
  get(endpoint: string, additionalHeaders?: HttpHeaders): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.createHeaders(additionalHeaders);
    return this.http.get<any>(url, { headers }).toPromise();
  }

  // POST request method that returns a Promise
  post(
    endpoint: string,
    data: any,
    additionalHeaders?: HttpHeaders
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.createHeaders(additionalHeaders);
    return this.http.post<any>(url, data, { headers }).toPromise();
  }

  // PATCH request method that returns a Promise
  patch(
    endpoint: string,
    data: any,
    additionalHeaders?: HttpHeaders
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.createHeaders(additionalHeaders);
    return this.http.patch<any>(url, data, { headers }).toPromise();
  }

  // DELETE request method that returns a Promise
  delete(endpoint: string, additionalHeaders?: HttpHeaders): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.createHeaders(additionalHeaders);
    return this.http.delete<any>(url, { headers }).toPromise();
  }
}
