import { IsEnum } from "class-validator";
import { Role } from "../../enums.js";

export class UpdateUserRoleDto{
    @IsEnum(Role)
    role: Role;
}