import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceActivityService {

  constructor(private httpClient: HttpClient) { }

  public getOrStartActivityForResource(resourceId: number): Promise<ResourceActivity> {
    return this.httpClient.get<ResourceActivity>(Constants.getUrl(`activity/${resourceId}`)).toPromise();
  }

  public notifyUpdatedPausedAt(activity: ResourceActivity): Promise<ResourceActivity> {
    return this.httpClient
      .post<ResourceActivity>(Constants.getUrl(`activity/${activity.id}/pause/${activity.pausedAt}`), null)
      .toPromise()
  }
}

export interface ResourceActivity {
  id: number,
  pausedAt: number
}