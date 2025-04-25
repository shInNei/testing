import {Injectable} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class PrimService extends PrismaClient {
    constructor() {
        super({
            datasource: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            console.log('Prisma connected to the database successfully!');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1);
        }
    }
}