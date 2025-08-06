import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { DeviceType } from "src/common/enums/device-type.enum";

export class CreateIssueDto {
    @IsString()
    @IsNotEmpty({message: `description must not be empty`})
    @MinLength(10, {message: 'description length must be greater than or equal to 10'})
    description: string;

    @IsString()
    @IsNotEmpty({message: 'deviceType mut not be empty'})
    @IsEnum(DeviceType, {message: 'deviceType is not a valid value'})
    deviceType: string;   
}
