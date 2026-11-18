# cdk-utilities

> 🎯 Target runtime: es2024 ([Node >= 24](https://node.green/#ES2024))

Reusable Constructs and CustomResources for IAC with [aws-cdk-lib](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib-readme.html).

## AlarmingConstruct

`AlarmingConstruct` posts CloudWatch alarm state changes and structured `ERROR` log lines to Slack. The bundled lambdas
POST to a Slack **incoming webhook** whose URL is read from an SSM `SecureString` parameter
(`slackWebhookEndpointSsmParamKey`). If those lambdas fail themselves, a fallback alarm notifies `fallbackAlarmEmail`
directly.

```ts
const alarming = new AlarmingConstruct(this, 'Alarming', {
  slackWebhookEndpointSsmParamKey: `/my/project/${isProd ? 'prod' : 'nonProd'}/slack/alarm-webhook-endpoint`,
  fallbackAlarmEmail: isProd
    ? 'my-project-operations-aaaa@shiftcoders.slack.com'
    : 'my-project-operations-dev-bbbb@shiftcoders.slack.com',
})
alarming.setupAlarmForLambda(this, myLambda)
```

### Slack app (shared by all projects)

> The app already exists in the `shiftcoders` workspace (created 2026-11-18), so projects only need to add their
> webhooks (see below). The manifest is the reference for updating the app or re-creating it.

All projects post through **one** shared Slack app, `shiftcode operations`, defined in [`slack-app-manifest.json`](./slack-app-manifest.json).
It only requests the `incoming-webhook` scope: the bundled lambdas only POST JSON payloads (`attachments` / Block Kit
`blocks`) to a webhook URL, so no events, slash commands, interactivity or socket mode are needed. The manifest is not
part of the npm package (only `dist/` is published). To re-create it:

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From an app manifest**.
2. Select the workspace `shiftcoders`, switch to the **JSON** tab, paste the content of `slack-app-manifest.json` and create the app.
3. Changes to the manifest are applied via the app's **App Manifest** page (edit and save).

### Per project: one webhook per operations channel

1. Create the operations channel(s), e.g. `#<project>-operations` (prod) and `#<project>-operations-dev` (non-prod).
2. In the Slack app: **Features → Incoming Webhooks → Add New Webhook** (to Workspace), pick the channel and authorize.
   Repeat for every channel. Each webhook URL posts to exactly one channel.
3. Store each URL as SSM `SecureString` in the project's AWS account(s), one per stage, using the key convention
   `/<project>/<prod|nonProd>/slack/alarm-webhook-endpoint`:

   ```sh
   aws ssm put-parameter --type SecureString \
     --name /<project>/prod/slack/alarm-webhook-endpoint \
     --value 'https://hooks.slack.com/services/...'
   ```

4. Pass that key as `slackWebhookEndpointSsmParamKey` (resolved per stage).

### Fallback e-mail

Use the Slack e-mail address of the stage's operations channel as `fallbackAlarmEmail` (channel details →
**Integrations → Send emails to this channel**), so fallback alarms end up in the same channel. The SNS e-mail
subscription has to be **confirmed once after the first deploy**: AWS sends a confirmation mail to that address, which
appears in the channel — click _Confirm subscription_ there.
