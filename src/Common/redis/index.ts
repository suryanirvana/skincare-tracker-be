import { createClient } from 'redis';
import log from '../logger';

function connectRedis() {
    const client = createClient({ url: 'redis://localhost:6379' })

    client.on('connect', () => log.info('Redis Connected'))

    client.on('error', () => log.error('Redis Client Error'))

    client.connect()

    client.set('key', 'value')
    client.expire('key', 10)
    
    const value = client.get('key')
    log.info(value)
}

export { connectRedis }