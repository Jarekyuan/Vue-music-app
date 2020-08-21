module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    // vant ui
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}