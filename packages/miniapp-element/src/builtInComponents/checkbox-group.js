import callEvent from '../events/callEvent';

export default {
    name: 'checkbox-group',
    props: [{
        name: 'name',
        get(domNode) {
            return domNode.getAttribute('name') || '';
        },
    }],
    handles: {
        onCheckboxChange(evt) {
            const domNode = this.getDomNodeFromEvt('change', evt);
            if (!domNode) return;
            const value = evt.detail.value || [];
            if (value.indexOf(domNode.value) >= 0) {
                domNode.$$setAttributeWithoutUpdate('checked', true);

                domNode.__oldValues = domNode.__oldValues || {};
                domNode.__oldValues.checked = true;
            } else {
                domNode.$$setAttributeWithoutUpdate('checked', false);

                domNode.__oldValues = domNode.__oldValues || {};
                domNode.__oldValues.checked = false;
            }
            callEvent('change', evt, null, this.pageId, this.nodeId);
        },
    },
};
