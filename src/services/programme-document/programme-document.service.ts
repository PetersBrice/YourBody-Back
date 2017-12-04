import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { flatMap, filter, map } from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';

import { ProgrammeModel } from '../../models';
import { Config } from '@hapiness/config';
import {Programme} from '../../interfaces/programme';
import {_throw} from 'rxjs/observable/throw';

@Injectable()
export class ProgrammeDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose', options: Config.get('mongodb') }, ProgrammeModel);
    }

    /**
     *
     * @return {Observable<Programme[] | void>}
     */
    find(): Observable<Programme[] | void> {
        return fromPromise(this._document.find({}))
            .pipe(
                flatMap((docs: MongooseDocument[]) =>
                    of(of(docs))
                        .pipe(
                            flatMap(_ =>
                                mergeStatic(
                                    _.pipe(
                                        filter(__ => !!__ && __.length > 0),
                                        map(__ => __.map(doc => doc.toJSON())),
                                    ),
                                    _.pipe(
                                        filter(__ => !__ || __.length === 0),
                                        map(__ => undefined)
                                    )
                                )
                            )
                        )
                )
            );
    }
    findById(id: string): Observable<Programme | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Programme) :
                        of(undefined)
                )
            )
    }
    create(programme: Programme): Observable<Programme> {
        return fromPromise(this._document.findOne({
            nom: { $regex: new RegExp(programme.nom, 'i') },
            description: { $regex: new RegExp(programme.description, 'i') }
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`Programme with nom '${programme.nom}' and description '${programme.description}' already exists`)
                    ) :
                    fromPromise(this._document.create(programme))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Programme)
            );
    }
    findByIdAndUpdate(id: string, programme: Programme): Observable<Programme> {
        return fromPromise(this._document.findByIdAndUpdate(id, programme, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Programme) :
                        of(undefined)
                )
            )
    }
    findByIdAndRemove(id: string): Observable<Programme> {
        return fromPromise(this._document.findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Programme) :
                        of(undefined)
                )
            )
    }
}
