import moment from 'moment';
import 'moment-timezone';
import { Schema, model } from 'mongoose';

import { CustomerType, Customers, Status } from '@app/types';
import { TIME_ZONE_VIET_NAME } from '@app/utils/date.util';

const CustomerSchema = new Schema<Customers>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minlength: 6,
    },
    birthday: {
      type: Date,
    },
    customerAddressId: {
      type: Schema.Types.ObjectId,
      ref: 'CustomerAddress',
    },
    orderIds: {
      type: [String],
    },
    status: {
      type: String,
      enum: Status,
      default: Status.ACTIVE,
    },
    customerType: {
      type: String,
      enum: CustomerType,
      default: CustomerType.NEW,
    },
    otp: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime() {
        const now = new Date();
        const strictUTC = moment(now).utc(true);
        const dayAdjustment = strictUTC.clone().tz(TIME_ZONE_VIET_NAME);
        return Number(dayAdjustment);
      },
    },
  },
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
