import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UrlConstants } from '../../../shared/constants/app.constants';
import { environment } from '../../../../environments/environment';
import { TreeNode } from 'primeng/api/treenode';


@Injectable()
export class HeaderService {

  public _loadNumber: any;

  /**
   * Default Constructer Invoked.
   */
  constructor(private http: HttpClient) { }


/**
   * Method to get the Statistics for all businesses
   * @returns {Observable<Object>}
   * @memberof HeaderService
   */
  public getFiles():Observable<any> {
    let requisitionDetails = this.http.get<TreeNode[]>("./assets/data/tree-table/tree-table.json");
    return requisitionDetails.pipe(
      map(resp=><TreeNode[]>resp[0]),
      catchError(error => this.handleError(error))
    );
  }


  private handleError(error) {
    return throwError(error);
  }
}