import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

const config = {
    ...publicRuntimeConfig
};

export default config;