// @ts-check

import * as core from "@actions/core";
import axios from "axios";

async function main() {
  try {
    const vercelToken = core.getInput("vercel_token");
    const projectId = core.getInput("vercel_project_id");

    const { data: json } = await axios.get(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&state=READY&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
      }
    );

    const url = json.deployments[0].url;
    core.setOutput("preview_url", `https://${url}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
