export { getMaterialSymbol }

function getMaterialSymbol(type) {
    const symbol = _typeToMaterialSymbol[type]
    return symbol ? symbol : type
}

// translate krello's type to the corresponding material symbol
const _typeToMaterialSymbol = {
    member: 'person',
    label: 'sell',
    checklist: 'checklist',
    date: 'schedule',
    attachment: 'attachment',
    cover: 'keyboard_full',
    customField: 'variables',
    move: 'arrow_right_alt',
    copy: 'content_copy',
    template: 'copy_all',
    archive: 'archive',
    share: 'share',
    close: 'close',
    activity: 'list',
    description: 'subject',
    card: 'credit_card',
}
