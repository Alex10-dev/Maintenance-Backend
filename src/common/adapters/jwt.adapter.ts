import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtService as jwtAdapterService } from "../interfaces/jwt-adapter.interface";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAdapter implements jwtAdapterService{

    constructor(
        private readonly jwtService: JwtService
    ){}
    generateToken(payload: JwtPayload ): string {
        // console.log(this.jwtService.sign(payload))
        return this.jwtService.sign(payload, { expiresIn: '2h'});
    }

}