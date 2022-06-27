const github = require("@actions/github");
const core = require("@actions/core");

async function main() {
  try {
    const context = github.context;
    const vercelToken = core.getInput("vercel_token");
    const projectId = core.getInput("vercel_project_id");

    const response = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&state=READY&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
        method: "GET",
      }
    );
    const json = await response.json();
    const url = json.deployments[0].url;
    core.setOutput("preview_url", url);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
