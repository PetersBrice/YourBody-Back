import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';

@MongoModel({
    adapter: 'mongoose',
    collection: 'peoples',
    options: Config.get('mongodb')
})
export class ProgrammeModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(ProgrammeModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            nom: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            tel: {
                type: String,
                required: true
            }
        }, {
            versionKey: false
        });

        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    return ret;
                }
            }
        );
    }
}
