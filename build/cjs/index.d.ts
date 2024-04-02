import { TinyEmitter } from 'tiny-emitter';
import type IStorageProvider from './storage-provider';
import InMemoryStorageProvider from './storage-provider-inmemory';
import LocalStorageProvider from './storage-provider-local';
interface IStaticContext {
    appName: string;
    environment?: string;
}
interface IMutableContext {
    userId?: string;
    sessionId?: string;
    remoteAddress?: string;
    currentTime?: string;
    properties?: {
        [key: string]: string;
    };
}
type IContext = IStaticContext & IMutableContext;
interface IConfig extends IStaticContext {
    url: string;
    clientKey: string;
    disableRefresh?: boolean;
    refreshInterval?: number;
    metricsInterval?: number;
    disableMetrics?: boolean;
    storageProvider?: IStorageProvider;
    context?: IMutableContext;
    fetch?: any;
    createAbortController?: () => AbortController;
    bootstrap?: IToggle[];
    bootstrapOverride?: boolean;
    headerName?: string;
    customHeaders?: Record<string, string>;
    impressionDataAll?: boolean;
    usePOSTrequests?: boolean;
}
interface IVariant {
    name: string;
    enabled: boolean;
    feature_enabled?: boolean;
    payload?: {
        type: string;
        value: string;
    };
}
interface IToggle {
    name: string;
    enabled: boolean;
    variant: IVariant;
    impressionData: boolean;
}
export declare const EVENTS: {
    INIT: string;
    ERROR: string;
    READY: string;
    UPDATE: string;
    IMPRESSION: string;
    SENT: string;
    RECOVERED: string;
};
export declare const resolveFetch: () => typeof fetch | undefined;
export declare class UnleashClient extends TinyEmitter {
    private toggles;
    private impressionDataAll;
    private context;
    private timerRef?;
    private storage;
    private refreshInterval;
    private url;
    private clientKey;
    private etag;
    private metrics;
    private ready;
    private fetch;
    private createAbortController?;
    private abortController?;
    private bootstrap?;
    private bootstrapOverride;
    private headerName;
    private eventsHandler;
    private customHeaders;
    private readyEventEmitted;
    private usePOSTrequests;
    private started;
    private sdkState;
    constructor({ storageProvider, url, clientKey, disableRefresh, refreshInterval, metricsInterval, disableMetrics, appName, environment, context, fetch, createAbortController, bootstrap, bootstrapOverride, headerName, customHeaders, impressionDataAll, usePOSTrequests, }: IConfig);
    getAllToggles(): IToggle[];
    isEnabled(toggleName: string): boolean;
    getVariant(toggleName: string): IVariant;
    private updateToggles;
    updateContext(context: IMutableContext): Promise<void>;
    getContext(): {
        appName: string;
        environment?: string | undefined;
        userId?: string | undefined;
        sessionId?: string | undefined;
        remoteAddress?: string | undefined;
        currentTime?: string | undefined;
        properties?: {
            [key: string]: string;
        } | undefined;
    };
    setContextField(field: string, value: string): void;
    removeContextField(field: string): void;
    private init;
    start(): Promise<void>;
    stop(): void;
    private resolveSessionId;
    private getHeaders;
    private storeToggles;
    private fetchToggles;
}
export { InMemoryStorageProvider, LocalStorageProvider, type IStorageProvider };
export type { IConfig, IContext, IMutableContext, IToggle, IVariant };
//# sourceMappingURL=index.d.ts.map