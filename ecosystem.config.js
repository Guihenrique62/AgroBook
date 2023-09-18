module.exports = {
  apps: [
    {
      name: "Server | AgroBook",
      script: "./server/api/main.js",
      instances: 1,
      log_date_format: "YYYY-MM-DD HH:mm",
      out_file: "/dev/null",
      restart: true,
      watch: true,
      namespace: "Servidor da AgroBook Dev",
    },
    {
      script: './service-worker/',
      watch: ['./service-worker']
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
