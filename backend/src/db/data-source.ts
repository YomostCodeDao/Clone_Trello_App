import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Import tất cả các entity
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

// Load biến môi trường từ file .env
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,               // Sử dụng process.env thay vì env
    port: parseInt(process.env.DB_PORT || '5432', 10),  // Chuyển đổi DB_PORT từ string sang số
    username: process.env.DB_USER,           // Sử dụng process.env thay vì env
    password: process.env.DB_PASS,           // Sử dụng process.env thay vì env
    database: process.env.DB_NAME,           // Sử dụng process.env thay vì env
    ssl: false,                              // Chỉ cần false trừ khi bạn dùng SSL
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
    migrations: ['src/db/migrations/*.ts'],  // Đảm bảo đường dẫn đúng
    synchronize: false,                      // Đừng sử dụng synchronize=true trên production
    logging: true,                           // Bật logging khi cần thiết
});
