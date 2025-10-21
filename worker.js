export default {
  async fetch(request, env) {
    // Keep these secret... Include as Authorization header for API Key usage.
    var apiKeys = [
      // Enter your API keys here. UUIDs suggested.
      "your_api_key_1",
      "your_api_key_2"
    ];

    if (!request.headers.has('Authorization')) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!apiKeys.includes(request.headers.get('Authorization'))) {
      return new Response("Invalid token", { status: 401 });
    }

    if (request.method === 'POST') return handlePost(request, env);

    let response = Response.json({ error: "Only POST is supported" });
    return new Response(response.body, {
      status: 405
    });
  }
};

async function handlePost(request, env) {
  let response = {};
  if (request.headers.has('Content-Length') && parseInt(request.headers.get('Content-Length')) > 0) {
    const prompt = await request.text();

    // messages - chat style input
    let system = `You are a prompt summarizing expert. Summarize the user's prompt to derive a \`name\` and \`description\`, returned in JSON format conforming to the following JSON Schema:
    '''
    {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 128,
          "description": "A descriptive, human-readable name for the prompt."
        },
        "description": {
          "type": "string",
          "maxLength": 1024,
          "description": "A detailed description of what the prompt does."
        }
      },
      "required": [
        "name",
        "description"
      ],
      "additionalProperties": false
    }
    '''
    Provide no other details: just the JSON output.`;

    let messages = [
      { role: 'system', content: '' + system + ''},
      { role: 'user', content: '' + prompt + '' }
    ];
    var r = await callAI(messages, env);
    return new Response(r.response);
  } else {
      response = {
        error: "Prompt required.",
      };
      return Response.json(response);
    }
}

async function callAI(messages, env) {
  let chat = {
    messages
  };
  var model = "@cf/meta/llama-3.2-3b-instruct";
  // var model = "@cf/meta/llama-3-8b-instruct";
  let response = await env.AI.run(model, chat);
  return response;
}