import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from '../plugins/timestamp-plugin';

export interface CoffeePod extends ITimeStampedDocument {
    /** Reference ID */
    refID: string;

    /** Description */
    description: string;

    /** Product Type */
    // eslint-disable-next-line camelcase
    product_type: string;

    /** Coffee Flavor */
    // eslint-disable-next-line camelcase
    coffee_flavor: string;

    /** Pack Size */
    // eslint-disable-next-line camelcase
    pack_size: number;
}

interface CoffeePodModel extends Model<CoffeePod> { }

const schema = new Schema<CoffeePod>({
  refID: {
    type: String, index: true, required: true
  },
  description: {
    type: String, index: true, required: false
  },
  product_type: {
    type: String, index: true, required: true, enum: ['COFFEE_POD_LARGE', 'COFFEE_POD_SMALL', 'ESPRESSO_POD']
  },
  coffee_flavor: {
    type: String, index: true, required: true, enum: ['COFFEE_FLAVOR_VANILLA', 'COFFEE_FLAVOR_CARAMEL', 'COFFEE_FLAVOR_PSL', 'COFFEE_FLAVOR_MOCHA', 'COFFEE_FLAVOR_HAZELNUT']
  },
  pack_size: {
    type: Number, index: true, required: true, enum: [12, 36, 60, 84]
  }
});

// Add timestamp plugin for createdAt and updatedAt in millisecond from epoch
schema.plugin(TimeStampPlugin);

const Pod: CoffeePodModel = model<CoffeePod, CoffeePodModel>('CoffeePod', schema);

export default Pod;
