export default function handler(req, res) {
  global.__coverage__ = {};
  res.status(200).json({ message: "global coverage reset!" });
}
