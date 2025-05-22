class AppInitController {
  appInit(req, res) {
    try {
      res.status(200).json({ message: 'Backend cold started' });
    } catch (error) {
      res.status(500).json({ message: "Couldn't start the app.", error });
    }
  }
}

export default new AppInitController();
