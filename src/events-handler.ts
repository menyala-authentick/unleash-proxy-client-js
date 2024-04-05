import { IContext } from '.';

/** Generates UUID v4
 *
 * @node There is a bug in Chrome's Math.random() according to http://devoluk.com/google-chrome-math-random-issue.html
 *       For that reason we use Date.now() as well.
 */
function uuid(): string {
    function s(n: number) { return h((Math.random() * (1<<(n<<2)))^Date.now()).slice(-n); }
    function h(n: number) { return (n|0).toString(16); }
    return  [
        s(4) + s(4), s(4),
        '4' + s(3),                    // UUID version 4
        h(8|(Math.random()*4)) + s(3), // {8|9|A|B}xxx
        // s(4) + s(4) + s(4),
        Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
    ].join('-');
}

class EventsHandler {
    private generateEventId() {
        return uuid();
    }

    public createImpressionEvent(
        context: IContext,
        enabled: boolean,
        featureName: string,
        eventType: string,
        impressionData?: boolean,
        variant?: string
    ) {
        const baseEvent = this.createBaseEvent(
            context,
            enabled,
            featureName,
            eventType,
            impressionData
        );

        if (variant) {
            return {
                ...baseEvent,
                variant,
            };
        }
        return baseEvent;
    }

    private createBaseEvent(
        context: IContext,
        enabled: boolean,
        featureName: string,
        eventType: string,
        impressionData?: boolean
    ) {
        return {
            eventType,
            eventId: this.generateEventId(),
            context,
            enabled,
            featureName,
            impressionData,
        };
    }
}

export default EventsHandler;
