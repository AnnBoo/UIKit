module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { node: '10' },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: ['react-native-reanimated/plugin'],
};
