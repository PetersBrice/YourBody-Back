import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { ProgrammeService } from '../../../services';

import * as Joi from 'joi';
import {Programme} from '../../../interfaces/programme';

@Route({
    path: '/api/programme/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete people',
        notes: 'Delete one people for the given id in path parameter',
        tags: ['api', 'programme']
    }
})
export class DeleteOneProgrammeRoute implements OnDelete {
    /**
     * Class constructor
     * @param programmeService
     */
    constructor(private programmeService: ProgrammeService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable< void > {
        return this.programmeService.delete(request.params.id);
    }
}
