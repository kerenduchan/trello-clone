export const labelService = {
    getLabelColorById,
    getLabelColors,
    getNoLabelColor,
}

function getLabelColorById(id) {
    const noLabelColor = getNoLabelColor()
    if (id === noLabelColor._id) {
        return noLabelColor
    }

    return getLabelColors().find((lc) => lc._id === id)
}

function getLabelColors() {
    return [
        _getLabelColor('s-green', 'subtle green', '#baf3db', '#164b35'),
        _getLabelColor('s-yellow', 'subtle yellow', '#f8e6a0', '#533f04'),
        _getLabelColor('s-orange', 'subtle orange', '#fedec8', '#702e00'),
        _getLabelColor('s-red', 'subtle red', '#ffd5d2', '#5d1f1a'),
        _getLabelColor('s-purple', 'subtle purple', '#dfd8fd', '#352c63'),

        _getLabelColor('green', 'green', '#4bce97', '#164b35'),
        _getLabelColor('yellow', 'yellow', '#f5cd47', '#533f04'),
        _getLabelColor('orange', 'orange', '#fea362', '#702e00'),
        _getLabelColor('red', 'red', '#f87168', '#5d1f1a'),
        _getLabelColor('purple', 'purple', '#9f8fef', '#352c63'),

        _getLabelColor('b-green', 'bold green', '#1f845a', '#ffffff'),
        _getLabelColor('b-yellow', 'bold yellow', '#946f00', '#ffffff'),
        _getLabelColor('b-orange', 'bold orange', '#c25100', '#ffffff'),
        _getLabelColor('b-red', 'bold red', '#c9372c', '#ffffff'),
        _getLabelColor('b-purple', 'bold purple', '#6e5dc6', '#ffffff'),

        _getLabelColor('s-blue', 'subtle blue', '#cce0ff', '#09326c'),
        _getLabelColor('s-sky', 'subtle sky', '#c6edfb', '#164555'),
        _getLabelColor('s-lime', 'subtle lime', '#d3f1a7', '#37471f'),
        _getLabelColor('s-pink', 'subtle pink', '#fdd0ec', '#50253f'),
        _getLabelColor('s-black', 'subtle black', '#dcdfe4', '#091e42'),

        _getLabelColor('blue', 'blue', '#579dff', '#09326c'),
        _getLabelColor('sky', 'sky', '#6cc3e0', '#164555'),
        _getLabelColor('lime', 'lime', '#94c748', '#37471f'),
        _getLabelColor('pink', 'pink', '#e774bb', '#50253f'),
        _getLabelColor('black', 'black', '#8590a2', '#091e42'),

        _getLabelColor('b-blue', 'bold blue', '#0c66e4', '#ffffff'),
        _getLabelColor('b-sky', 'bold sky', '#227d9b', '#ffffff'),
        _getLabelColor('b-lime', 'bold lime', '#5b7f24', '#ffffff'),
        _getLabelColor('b-pink', 'bold pink', '#ae4787', '#ffffff'),
        _getLabelColor('b-black', 'bold black', '#626f86', '#ffffff'),
    ]
}

function getNoLabelColor() {
    return _getLabelColor('none', 'none', '#091e420f', '#172b4d')
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _getLabelColor(_id, name, bgColor, textColor) {
    return { _id, name, bgColor, textColor }
}
