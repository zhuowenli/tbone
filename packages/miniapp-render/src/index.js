import tool from './util/tool';
import cache from './util/cache';
import { createWindow } from './window';
import Document from './document';
import EventTarget from './event/event-target';
import Event from './event/event';

export default {
    createPage(route, config) {
        if (config) cache.setConfig(config);

        const nodeIdMap = {};
        const pageId = `p-${tool.getId()}-/${route}`;
        const window = createWindow(pageId);
        const document = new Document(pageId, nodeIdMap);

        cache.setWindow(window);
        cache.init(pageId, {
            document,
            nodeIdMap
        });

        return {
            pageId,
            window,
            document
        };
    },

    destroyPage(pageId) {
        cache.destroy(pageId);
    },

    // For miniprogram-element
    $$adapter: {
        cache,
        EventTarget,
        Event,
        tool
    }
};
