import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const getAuthUser = createParamDecorator(
    ( data, context: ExecutionContext ) => {
        
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if( !user ) throw new InternalServerErrorException(`Auth user not found`);
        return user;
    }
);