# Cloudflare AI Prompt Summarizer

A usable agent-style API that accepts a textual LLM prompt (such as those found at (AWS Startups)[https://aws.amazon.com/startups/prompt-library?lang=en-US]) and produces
JSON output containing a `name` and `description`.

For example, the output would resemble:

```json
{
  "name": "AWS DevOps Assistant for Startups",
  "description": "A comprehensive guide for early-stage startup founders to implement AWS best practices and DevOps principles."
}
```

## Deployment

1. Create a Cloudflare AI Worker application.
2. Copy the worker.js code into the application.
3. Define one or more API keys in the `apiKeys` array.
4. Deploy the worker.

## Testing

Making API calls to the deployed AI Worker should now return a response.

```curl
curl -i -H "Authorization: <your api key>" -d @full_aws_deployment_agent.prompt https://prompt-summarizer.<your-domain>.workers.dev/
```
