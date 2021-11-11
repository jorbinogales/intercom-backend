import { Body, Controller, Post } from "@nestjs/common";
import { ForgotPasswordDto } from "./dto/forgotPassword.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post('forgot')
    async ForgotPassowrd(
        @Body() forgotPasswordDto: ForgotPasswordDto
    ): Promise<any>{
        return await this.userService.forgotPassword(forgotPasswordDto);
    }
}