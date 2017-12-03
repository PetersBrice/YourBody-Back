import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { ProgrammeService } from '../../../services';

import * as Joi from 'joi';
import {Programme} from '../../../interfaces/programme';

@Route({
    path: '/api/programme/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
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
        description: 'Get one people',
        notes: 'Returns one people for the given id in path parameter',
        tags: ['api', 'programme']
    }
})
export class GetOneProgrammeRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: ProgrammeService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Programme> {
        return this._peopleService.one(request.params.id);
    }
}
