import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { ProgrammeService } from '../../../services';

import * as Joi from 'joi';

@Route({
    path: '/api/programme/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete program',
        notes: 'Delete a program for the given id in path parameter',
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
