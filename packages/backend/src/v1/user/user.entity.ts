import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsUUID, IsUrl, Length, Max, Min } from 'class-validator';
import {
  BloodType,
  Education,
  Gender,
  Holiday,
  Income,
  MarryIntention,
  Prefecture,
  Profile,
  Weight,
} from '@prisma/client';

export class UserResponse {
  id!: string;
  email!: string | null;
  nickname!: string;

  @IsIn(Object.keys(Gender))
  gender!: Gender;
  birthday!: string;

  @IsIn(Object.keys(Prefecture))
  prefecture!: Prefecture;

  @ApiProperty({
    properties: {
      description: { type: 'string' },
      avatar: { type: 'string' },
      height: { type: 'number' },
      weight: { type: 'string', enum: Object.keys(Weight) },
      education: { type: 'string', enum: Object.keys(Education) },
      income: { type: 'string', enum: Object.keys(Income) },
      holiday: { type: 'string', enum: Object.keys(Holiday) },
      work_prefecture: { type: 'string', enum: Object.keys(Prefecture) },
      born_prefecture: { type: 'string', enum: Object.keys(Prefecture) },
      blood_type: { type: 'string', enum: Object.keys(BloodType) },
      marry_intention: { type: 'string', enum: Object.keys(MarryIntention) },
    },
  })
  profile!: Profile | null;
  created_at!: Date;
  updated_at!: Date;
}

export class UpdateUserRequest {
  @Length(1, 1000)
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsInt()
  @Min(100)
  @Max(300)
  @IsOptional()
  height?: number;

  @IsIn(Object.keys(Weight))
  @IsOptional()
  weight?: Weight;

  @IsIn(Object.keys(Education))
  @IsOptional()
  education?: Education;

  @IsIn(Object.keys(Income))
  @IsOptional()
  income?: Income;

  @IsIn(Object.keys(Holiday))
  @IsOptional()
  holiday?: Holiday;

  @IsIn(Object.keys(Prefecture))
  @IsOptional()
  prefecture?: Prefecture;

  @IsIn(Object.keys(Prefecture))
  @IsOptional()
  work_prefecture?: Prefecture;

  @IsIn(Object.keys(Prefecture))
  @IsOptional()
  born_prefecture?: Prefecture;

  @IsIn(Object.keys(BloodType))
  @IsOptional()
  blood_type?: BloodType;

  @IsIn(Object.keys(MarryIntention))
  @IsOptional()
  marry_intention?: MarryIntention;

  @IsUUID('4', {
    each: true,
  })
  @IsOptional()
  date_plans?: string[];

  @IsUUID('4', {
    each: true,
  })
  @IsOptional()
  hobbies?: string[];
}
