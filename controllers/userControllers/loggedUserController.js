class LoggedUserController {
  static loggedUser = async (req, res) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "failed", message: "User not authenticated" });
      }

      return res.status(200).json({
        status: "success",
        user: req.user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "An error occurred" });
    }
  };
}

export default LoggedUserController;
