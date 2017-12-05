import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';



import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import {map, catchError, flatMap} from 'rxjs/operators';
import {ProgrammeDocumentService} from '../programme-document/programme-document.service';
import {Programme} from '../../interfaces/programme';


@Injectable()
export class ProgrammeService {
    /**
     * Class constructor
     */
    constructor(private _programmeDocumentService: ProgrammeDocumentService) {
       // this._programme = PROGRAMME as Programme[];
    }

    /**
     *
     *
     * @returns {Observable<Programme[]>}
     */
    listAll(): Observable<Programme[] | void> {
        return this._programmeDocumentService.find();
    }

    /**
     *
     *
     * @param {string} id of the program
     *
     * @returns {Observable<Programme>}
     */
    one(id: string): Observable<Programme> {
        return this._programmeDocumentService.findById(id)
            .pipe(
                catchError(e =>  _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Programme with id '${id}' not found`))
                )
            );
    }

    /**
     * C
     *
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(programme: Programme): Observable<HapinessHTTPHandlerResponse> {
        return this._programmeDocumentService.create(programme)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }


    /**
     *
     *
     * @returns {Observable<Programme>}
     */
    update(id: string, programme: Programme): Observable<Programme> {
        return this._programmeDocumentService.findByIdAndUpdate(id, programme)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Programme with id '${id}' not found`))
                )
            );
    }

    /**
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._programmeDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Programme with id '${id}' not found`))
                )
            );
    }


}
