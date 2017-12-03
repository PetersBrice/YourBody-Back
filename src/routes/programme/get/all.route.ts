import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {Programme} from '../../../interfaces/programme';
import {ProgrammeService} from '../../../services/programme/programme.service';

@Route({
    path: '/api/programme',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),

                        nom: Joi.string().required(),
                        type: Joi.string().required(),
                        description: Joi.string().required(),
                        tel: Joi.string().required(),

                    })
                ).unique().min(1)
            }
        },
        description: 'Get all people',
        notes: 'Returns an array of people or 204',
        tags: ['api', 'programme']
    }
})
export class GetAllProgrammeRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _peopleService: ProgrammeService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Programme[] | void> {
        return this._peopleService.listAll();
    }
}
