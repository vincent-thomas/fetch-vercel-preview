// @ts-check
const github = require("@actions/github");
const core = require("@actions/core");
const { default: axios } = require("axios");

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
    core.setOutput("preview_url", url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
