import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../../modules/users/user.entity';
import { hashPassword } from '../../common/utils/hash';

async function main() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(User);

    const email = 'demo@example.com';
    const existed = await repo.findOne({ where: { email } });
    if (existed) {
        console.log('User existed, skip');
    } else {
        const u = repo.create({
            email,
            passwordHash: await hashPassword('12345678'),
            name: 'Demo',
            provider: 'local',
        });
        await repo.save(u);
        console.log('Seeded user:', email, '/ password: 12345678');
    }
    await AppDataSource.destroy();
}
main().catch((e) => { console.error(e); process.exit(1); });
