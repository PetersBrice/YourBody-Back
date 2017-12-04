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
        description: 'Update one program',
        notes: 'Update the program for the given id in path parameter and return it',
        tags: ['api', 'programme']
    }
})
export class PutUpdateProgrammeRoute implements OnPut {
    /**
     * Class constructor
     * @param _programService
     */
    constructor(private _programService: ProgrammeService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Programme> {
        return this._programService.update(request.params.id, request.payload);
    }
}
