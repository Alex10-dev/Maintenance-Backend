export interface HashingService {
    hash( input: string ): Promise<String>
    compare( input: string, hashed: string ): Promise<Boolean>;
}