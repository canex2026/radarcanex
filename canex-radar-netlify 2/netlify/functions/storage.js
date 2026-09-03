const { getStore } = require('@netlify/blobs');

function respond(statusCode, obj) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  };
}

exports.handler = async (event) => {
  const store = getStore('canex-radar');

  try {
    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const action = params.action;

      if (action === 'get') {
        if (!params.key) return respond(400, { error: 'Falta el parámetro key' });
        const value = await store.get(params.key);
        if (value === null) return respond(404, { error: 'No encontrado' });
        return respond(200, { key: params.key, value });
      }

      if (action === 'list') {
        const prefix = params.prefix || '';
        const { blobs } = await store.list({ prefix });
        return respond(200, { keys: blobs.map(b => b.key) });
      }

      return respond(400, { error: 'Acción inválida' });
    }

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body || '{}');
      const { action, key, value } = data;

      if (!key) return respond(400, { error: 'Falta key' });

      if (action === 'set') {
        await store.set(key, value);
        return respond(200, { key, value });
      }

      if (action === 'delete') {
        await store.delete(key);
        return respond(200, { key, deleted: true });
      }

      return respond(400, { error: 'Acción inválida' });
    }

    return respond(405, { error: 'Método no permitido' });
  } catch (err) {
    return respond(500, { error: String(err) });
  }
};
