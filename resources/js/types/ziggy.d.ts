import { Config } from 'ziggy-js';

declare global {
    function route<T extends string>(
        name: T,
        params?: Record<string, string | number | boolean> | string | number,
        absolute?: boolean,
        config?: Config
    ): string;
} 