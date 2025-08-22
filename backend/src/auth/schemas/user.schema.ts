import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @Prop({ required: true, unique: [true, 'Email already exists'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last account update date',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
