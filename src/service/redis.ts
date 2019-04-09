import Redis from 'ioredis'
import config from '../config'

export default class RedisService {

    public static instance: Redis.Redis;

    public static init() {
        this.getInstance()
    }

    public static getInstance() {
        this.instance = this.instance || new Redis(config.db.redis);
        return this.instance;
    }
}

