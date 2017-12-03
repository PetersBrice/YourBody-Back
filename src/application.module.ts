import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { SwagModule } from '@hapiness/swag';
import { Config } from '@hapiness/config';
import { MongoClientService, MongoModule } from '@hapiness/mongo';
import { Observable } from 'rxjs/Observable';
import {
    GetHelloWorldRoute,
    GetAllProgrammeRoute,
    GetOneProgrammeRoute,
    PostCreateProgrammeRoute,
    PutUpdateProgrammeRoute,
    DeleteOneProgrammeRoute
} from './routes';
import {ProgrammeDocumentService} from './services/programme-document/programme-document.service';
import {ProgrammeModel} from './models/programme/programme.model';
import {ProgrammeService} from './services/programme/programme.service';

// factory to declare dependency between PeopleDocumentService and MongoClientService
// we use it to be sure that MongoClientService will be loaded before PeopleDocumentService
const programmeDocumentFactory = (mongoClientService: MongoClientService) => new ProgrammeDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ], declarations: [GetHelloWorldRoute, GetAllProgrammeRoute, GetOneProgrammeRoute, PostCreateProgrammeRoute, PutUpdateProgrammeRoute, DeleteOneProgrammeRoute,
        ProgrammeModel
    ],
    providers: [
        HttpServerService,
        ProgrammeService,
        { provide: ProgrammeDocumentService, useFactory: programmeDocumentFactory, deps: [MongoClientService] }
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param {HttpServerService} _httpServer wrapper for instance of original Hapi server
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
