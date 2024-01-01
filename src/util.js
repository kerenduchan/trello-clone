export { getMaterialSymbol }

function getMaterialSymbol(type) {
    const symbol = _typeToMaterialSymbol[type]
    return symbol ? symbol : type
}

// translate krello's type to the corresponding material symbol
const _typeToMaterialSymbol = {
    member: 'person',
    add_member: 'person_add',
    label: 'sell',
    checklist: 'select_check_box',
    date: 'schedule',
    attachment: 'attachment',
    cover: 'keyboard_full',
    customField: 'variables',
    move: 'arrow_right_alt',
    copy: 'content_copy',
    template: 'copy_all',
    archive: 'inventory_2',
    share: 'share',
    close: 'close',
    activity: 'list',
    description: 'subject',
    card: 'credit_card',
    star: 'star',
    more: 'more_horiz',
    back: 'arrow_back_ios_new',
    emoji: 'sentiment_satisfied',
    mention: 'alternate_email',
    comment: 'chat_bubble',
    archived: 'inventory_2',
    'checkbox-unchecked': 'check_box_outline_blank',
    'checkbox-checked': 'select_check_box',
}
