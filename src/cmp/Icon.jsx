export function Icon({ type, size }) {
    // translate krello's type to the corresponding material symbol
    const typeToMaterialSymbol = {
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
    }

    function getMaterialSymbol() {
        const symbol = typeToMaterialSymbol[type]
        return symbol ? symbol : type
    }

    return (
        <span
            className={
                'material-symbols-outlined' + (size ? ` icon-${size}` : '')
            }
        >
            {getMaterialSymbol()}
        </span>
    )
}
