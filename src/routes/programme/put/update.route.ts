import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { ProgrammeService } from '../../../services';

import * as Joi from 'joi';
import {Programme} from '../../../interfaces/programme';

@Route({
    path: '/api/programme/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                nom: Joi.string().required(),
                type: Joi.string().required(),
                description: Joi.string().required(),
                tel: Joi.string().required(),
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    nom: Joi.string().required(),
                    type: Joi.string().required(),
                    description: Joi.string().required(),
                    tel: Joi.string().required(),
                })
            }
        },
        description: 'Update one people',
        notes: 'Update the people for the given id in path parameter and return it',
        tags: ['api', 'programme']
    }
})
export class PutUpdateProgrammeRoute implements OnPut {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: ProgrammeService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Programme> {
        return this._peopleService.update(request.params.id, request.payload);
    }
}
