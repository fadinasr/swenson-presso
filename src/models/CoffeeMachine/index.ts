import { Model, Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from '../plugins/timestamp-plugin';

export interface CoffeeMachine extends ITimeStampedDocument {

    /** Reference ID */
    refID: string;

    /** Description */
    description: string;

    /** Product Type */
    // eslint-disable-next-line camelcase
    product_type: string;

    /** Water Line */
    // eslint-disable-next-line camelcase
    water_line_compatible: boolean;
}

interface CoffeeMachineModel extends Model<CoffeeMachine> { }

const schema = new Schema<CoffeeMachine>({
  refID: {
    type: String, index: true, required: true
  },
  description: {
    type: String, index: true, required: false
  },
  product_type: {
    type: String, index: true, required: true, enum: ['COFFEE_MACHINE_LARGE', 'COFFEE_MACHINE_SMALL', 'ESPRESSO_MACHINE'], default: 'ESPRESSO_MACHINE'
  },
  water_line_compatible: {
    type: Boolean, index: true, required: true, default: false
  }
});

// Add timestamp plugin for createdAt and updatedAt in millisecond from epoch
schema.plugin(TimeStampPlugin);

const Machine: CoffeeMachineModel = model<CoffeeMachine, CoffeeMachineModel>('CoffeeMachine', schema);

export default Machine;

// Example of Coffee Machine
/* {
    "product_type": "COFFEE_MACHINE_LARGE",
    "water_line_compatible": false,
    "_id": "607a0065a029af002f177d17",
    "refID": "CM001",
    "description": "small machine, base model"
}*/
