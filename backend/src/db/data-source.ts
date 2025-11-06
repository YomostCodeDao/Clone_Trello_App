import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

// Import các entity 
import { User } from '../modules/users/user.entity';
import { Profile } from '../modules/profiles/profile.entity';
import { Project } from '../modules/projects/project.entity';
import { Membership } from '../modules/projects/membership.entity';
import { Board } from '../modules/boards/board.entity';
import { List } from '../modules/lists/list.entity';
import { Card } from '../modules/cards/card.entity';
import { Comment } from '../modules/comments/comment.entity';
import { Notification } from '../modules/notifications/notification.entity';
import { AuditLog } from '../modules/auditLogs/auditLog.entity';
import { OAuthAccount } from '../modules/oauth/oauthAccount.entity';
import { RefreshToken } from '../modules/refreshTokens/refreshToken.entity';
import { CardLabel } from '../modules/cardLabels/cardLabel.entity';
import { CardLabelMap } from '../modules/cardLabels/cardLabelMap.entity';

dotenv.config();  

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: false,
    logging: true,
    synchronize: true,
    entities: [
        User,
        Profile,
        Project,
        Membership,
        Board,
        List,
        Card,
        Comment,
        Notification,
        AuditLog,
        OAuthAccount,
        RefreshToken,
        CardLabel,
        CardLabelMap,
    ],
    migrations: ['src/db/migrations/*.ts'], // đường dẫn tới migration
    
});
export default AppDataSource;