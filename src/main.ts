import * as core from "@actions/core";
import {
  SyncAction,
  Language,
  Platform,
  Scheme,
  RunAction,
  PlasmicAction,
} from "./actions";
import { initSentry, captureException } from "./sentry";
import { setOutputs } from "./util";

async function run(): Promise<void> {
  try {
    // Check for SSL bypass early and set environment variables before any HTTPS requests
    const disableSslVerification = true;
    if (disableSslVerification) {
      console.log("🔓 SSL verification disabled for ngrok compatibility");
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      process.env.HTTPS_PROXY_REJECT_UNAUTHORIZED = "0";
    }

    const options = {
      run: core.getInput("run") as RunAction,
      githubToken: core.getInput("github_token"),
      projectId: core.getInput("project_id"),
      projectApiToken: core.getInput("project_api_token"),
      platform: core.getInput("platform") as Platform,
      language: core.getInput("language") as Language,
      scheme: core.getInput("scheme") as Scheme,
      branch: core.getInput("branch"),
      directory: core.getInput("directory"),
      syncAction: core.getInput("sync_action") as SyncAction,
      title: core.getInput("title"),
      description: core.getInput("description"),
      skipIfPlasmic: !!core.getInput("skip_if_plasmic"),
      disableSslVerification: true,
    };

    initSentry(options);

    console.log("options:", JSON.stringify(options));

    const action = new PlasmicAction(options);
    const outputs = await action.run();
    setOutputs(outputs);
  } catch (error: any) {
    captureException(error);
    core.setFailed(error.message || error);
  }
}

run();
