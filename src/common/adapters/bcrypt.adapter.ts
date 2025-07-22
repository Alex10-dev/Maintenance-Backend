import { Injectable } from "@nestjs/common";
import { HashingService } from "../interfaces/hashing-adapter.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter implements HashingService {

    private readonly rounds = 10;

    async hash(input: string): Promise<string> {
        return await bcrypt.hashSync(input, this.rounds);
    }

    async compare(input: string, hashed: string): Promise<Boolean> {
        return await bcrypt.compareSync(input, hashed);
    }


}