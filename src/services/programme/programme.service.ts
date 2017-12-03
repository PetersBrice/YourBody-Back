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
    // private property to store all people
   // private _programme: Programme[];

    /**
     * Class constructor
     */
    constructor(private _programmeDocumentService: ProgrammeDocumentService) {
       // this._programme = PROGRAMME as Programme[];
    }

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<Programme[]>}
     */
    listAll(): Observable<Programme[] | void> {
        return this._programmeDocumentService.find();
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
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
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(person: Programme): Observable<HapinessHTTPHandlerResponse> {
        return this._programmeDocumentService.create(person)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }


    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<Programme>}
     */
    update(id: string, person: Programme): Observable<Programme> {
        return this._programmeDocumentService.findByIdAndUpdate(id, person)
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
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
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

    /**
     * Add person with good data in people list
     *
     * @param person to add
     *
     * @returns {Observable<People>}
     *
     * @private
     */
  /*  private _addPerson(person: People): Observable<HapinessHTTPHandlerResponse> {
        person.id = this._createId();
        this._programme = this._programme.concat(person);

        return of({ response: person, statusCode: 201 });
    }*/

    /**
     * Finds index of array for current person
     *
     * @param {string} id of the person to find
     *
     * @returns {Observable<number>}
     *
     * @private

    private _findPeopleIndexOfList(id: string): Observable<number> {
        return from(this._programme)
            .pipe(
                findIndex(_ => _.id === id),
                flatMap(_ => _ > -1 ?
                    of(_) :
                    _throw(Biim.notFound(`People with id '${id}' not found`))
                )
            );
    }

    /**
     * Creates a new id
     *
     * @returns {string}
     *
     * @private
     */
   /* private _createId(): string {
        return `${new Date().getTime()}`;
    }*/
}
