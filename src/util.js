export { getMaterialSymbol, buildClassName }

function getMaterialSymbol(type) {
    const symbol = _typeToMaterialSymbol[type]
    return symbol ? symbol : type
}

// translate krello's type to the corresponding material symbol
const _typeToMaterialSymbol = {
    member: 'person',
    label: 'sell',
    checklist: 'select_check_box',
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
    star: 'star',
    more: 'more_horiz',
    back: 'arrow_back_ios_new',
}

function buildClassName(...names) {
    return names.reduce((acc, name) => {
        if (name) {
            acc += ' ' + name
        }
        return acc
    })
}