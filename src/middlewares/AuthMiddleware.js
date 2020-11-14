import jwt from "jsonwebtoken";

export function AuthMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ error: "no token provided" });

  const headerParts = authHeader.split(" ");

  if (!headerParts.length === 2) return response.status(401).json({ error: "token error" });

  const [bearer, token] = headerParts;

  const bearerRegex = /^Bearer$/i.test(bearer);

  if (!bearerRegex) return response.status(401).json({ error: "token syntax error" });

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) return response.status(401).json({ error: "token invalid" });

    request.userId = decoded.id;
  });

  return next();
}
