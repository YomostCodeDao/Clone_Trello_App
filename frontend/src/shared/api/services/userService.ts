import { apiFactory, API_ENDPOINTS } from '../index';
import type { ServiceResponse } from '@/shared/model/service-response';
import type { User } from '@/shared/types';

export const userService = {
    getAllUsers: async (): Promise<ServiceResponse<User[]>> => {
        return apiFactory.get(API_ENDPOINTS.USERS.BASE);
    },

    createUser: async (userData: User): Promise<ServiceResponse<User>> => {
        return apiFactory.post(API_ENDPOINTS.USERS.BASE, userData);
    },

    getUserById: async (userId: string): Promise<ServiceResponse<User>> => {
        return apiFactory.get(`${API_ENDPOINTS.USERS.BASE}/${userId}`);
    },

    getCurrentUser: async (): Promise<ServiceResponse<User>> => {
        return apiFactory.get(API_ENDPOINTS.USERS.ME);
    }
};