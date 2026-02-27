module.exports = {
    apps: [
        {
            name: "alibi-corporativo",
            script: ".next/standalone/server.js",
            env: {
                NODE_ENV: "production",
                PORT: 3001,
                HOSTNAME: "0.0.0.0",
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3001,
                HOSTNAME: "0.0.0.0",
            },
            watch: false,
            max_memory_restart: "512M",
        },
    ],
};
