import app from "flarum/forum/app"
export function triggerCondition(key: string, value: number) {
    return triggerConditions({
        [key]: value
    })
}
export function triggerConditions(records: Record<string, number>) {
    const rec = Object.keys(records).map(key => {
        return {
            name: key,
            value: records[key]
        }
    });
    return app.request({
        url: app.forum.attribute('apiUrl') + "/quest-condition",
        method: "POST",
        body: { data: rec }
    });
}