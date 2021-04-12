const Ads = require("../models/ads");

exports.getAllAds = async (req, res, next) => {
  try {
    const ads = await Ads.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addAds = async (req, res, next) => {
  const ads = new Ads({
    picture: req.files[0].filename,
    pricing: req.body.pricing,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const savedAd = await ads.save();
    res.status(201).send(savedAd);
  } catch (error) {
    res.send(400).send({ message: error.message });
  }
};

exports.deleteAds = async (req, res, next) => {
  try {
    const deletedAds = await Ads.deleteOne({ _id: req.params.id });
    res.send(deletedAds);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getRandomAdd = async (req, res, next) => {
  try {
    const ads = await Ads.aggregate([{$sample:{size:1}}]);
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};