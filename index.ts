import axios, { AxiosInstance } from 'axios';

interface Config {
    url: string | undefined;
    api: {
        key: string | undefined;
        location: string|undefined;
    };
    userAgent?: string
}

interface User {
    id?: number | any;
    name?: string | any;
    role?: string;
    credits?: any;
    server_limit?: number;
    pterodactyl_id?: number;
    email?: string | any;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    ip?: string;
    last_seen?: any;
    discord_verified_at?: string;
    suspended?: boolean | null;
    referral_code?: string;
    servers_count?: number;
    vouchers_count?: number;
    discord_user?: DiscordUser;
    servers?: Server[]|any;
}
interface DiscordUser {
    id: string;
    user_id: number;
    username: string;
    avatar: string;
    discriminator: string;
    email: string;
    verified: boolean;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    created_at: string;
    updated_at: string;
}

interface Server {
    id: string;
    suspended: boolean | null;
    product: any;
    user: User;
}

class Ctrlpanel {
    private config: Config;
    private axiosInstance: AxiosInstance;

    constructor(config: Config) {
        this.config = config;
        this.axiosInstance = axios.create({
            timeout: 10000,
            baseURL: `${config.url}/${config.api.location}`,
            headers: {
                Authorization: `Bearer ${config.api.key}`,
                'User-Agent': `${config.userAgent??'CaligoService-Calipay'}`,
            }
        });
    }

    public async getUser(userid: string): Promise<User> {
        try {
            const result = await this.axiosInstance.get<User>(`/users/${userid}?include=serversCount,vouchersCount,servers`);
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    public async addCGO(userid: string, nominal: number): Promise<User> {
        try {
            const result = await this.axiosInstance.patch<User>(`/users/${userid}/increment`, { credits: nominal });
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    public async addServerSlot(userid: string, amount: number): Promise<User> {
        try {
            const result = await this.axiosInstance.patch<User>(`/users/${userid}/increment`, { server_limit: amount });
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    public async sendNotif(userid: string, via: 'database'|'email', title: string, content: string): Promise<any> {
        try {
            const result = await this.axiosInstance.post(`/notifications`, { via, users: userid, title, content });
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    public async changeRole(userid: string, role: string, email: string, name: string): Promise<User> {
        // role di dashboard bukan di discord
        try {
            const result = await this.axiosInstance.patch<User>(`/users/${userid}`, { role, email, name });
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }

    public async activityLog(user_id: string, description: string, event: string) {
        try {
            const result = await this.axiosInstance.post(`/activity-logs`, {
                user_id,description,event
            });
            return result.data;
        } catch (error) {
            // Handle error
            throw error;
        }
    }
}

export default Ctrlpanel;