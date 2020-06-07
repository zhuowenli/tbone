export default {
    name: 'label',
    props: [{
        name: 'animation',
        get(domNode) {
            return domNode.getAttribute('animation')
        }
    }, {
        name: 'for',
        get(domNode) {
            return domNode.getAttribute('for')
        }
    }],
    handles: {},
}
