import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { DEFAULT_PHOTO_URL } from '../../../config/constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop()
  isBlocked: boolean;

  @Prop()
  profilePhoto: string;

  @Prop()
  gotAchievements: string[];

  @Prop()
  discount: number;

  @Prop()
  date: Date;
}

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Role, default: Role.USER },
  isBlocked: { type: Boolean, default: false },
  profilePhoto: { type: String, default: DEFAULT_PHOTO_URL },
  gotAchievements: [{ type: String, default: [] }],
  discount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
