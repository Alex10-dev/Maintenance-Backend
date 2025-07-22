import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";

export interface JwtService {
    generateToken( payload: JwtPayload ): string
}