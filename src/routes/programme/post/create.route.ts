import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import { ProgrammeService } from '../../../services';

import * as Joi from 'joi';
import {Programme} from '../../../interfaces/programme';

@Route({
    path: '/api/programme',
    method: 'POST',
    config: {
        validate: {
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
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    nom: Joi.string().required(),
                    type: Joi.string().required(),
                    description: Joi.string().required(),
                    tel: Joi.string().required(),
                })
            }
        },
        description: 'Create one people',
        notes: 'Create a new people and return it',
        tags: ['api', 'programme']
    }
})
export class PostCreateProgrammeRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: ProgrammeService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._peopleService.create(request.payload as Programme);
    }
}
