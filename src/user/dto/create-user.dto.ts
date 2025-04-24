import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  
  export enum Gender {
    Female = 'f',
    Male = 'm',
    Unknown = 'u',
  }
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have at least 3 characters.' })
    @IsAlphanumeric(undefined, {
      message: 'Username can only contain letters and numbers.',
    })
    username: string;
  
    @IsNotEmpty()
    @IsEmail(undefined, { message: 'Please provide a valid email.' })
    email: string;
  
    @IsInt({ message: 'Age must be an integer.' })
    age: number;
  
    @IsNotEmpty()
    @IsEnum(Gender, { message: 'Gender must be one of: f, m, or u.' })
    gender: Gender;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must be 8–20 characters long, 
      and include at least one uppercase letter, 
      one lowercase letter, one number, and one special character.`,
    })
    password: string;
  }
  