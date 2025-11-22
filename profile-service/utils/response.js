export const success = (statusCode, data) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});

export const error = (statusCode, message, details = null) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ error: message, details })
});
