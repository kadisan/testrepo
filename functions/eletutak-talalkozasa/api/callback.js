import { handleCallbackRequest } from '../../../src/callback-api.js';

export function onRequest({ request, env }) {
  return handleCallbackRequest(request, env);
}
