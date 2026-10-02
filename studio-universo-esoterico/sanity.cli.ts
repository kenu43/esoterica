import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rx1vv2w8',
    dataset: 'production',
  },
  // `pnpm deploy` publica el panel en https://universo-esoterico.sanity.studio
  studioHost: 'universo-esoterico',
  deployment: { autoUpdates: true, appId: 'qy1k43ux66x5toh22fn1lrtk' },
})
