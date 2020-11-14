class AuthRoutesController {
  async authroutes(request, response) {
    try {
      return response.status(200).json({ auth: "authenticated", userId: request.userId });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const authRoutesController = new AuthRoutesController();
