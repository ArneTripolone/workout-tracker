const router = require("express").Router();
const Workout = require("../models/workout.js");
//const { route } = require("./htmlRoutes.js");

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((workout) => {
      res.json(workout)
    })
    .catch((err) => {
      res.json(err)
    })
});
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercise.duration'
        },
      },
    },
  ])
  .then((workout) => {
    console.log('working out', workout);
    res.json(workout)
  })
  .catch((e) => {
    res.json(e)
  })
});

router.put("/api/workouts/:id", (req, res) => {
  console.log('PARAMS', req.params)
    Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercise: req.body } },
      { new: true, runValidators: true }
    )
    .then((workout) => {
      res.json(workout)
    })
    .catch((e) => {
      res.json(e)
    })
});
router.get(`/api/workouts/range`, (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration:
          { $sum: '$exercise.duration' },
        totalWeight:
          { $sum: '$exercises.weight' }
      }
    }
  ])
  .limit(10)
  .then((workout) => {
    console.log('working out!', workout);
      res.json(workout)
    })
    .catch((e) => {
      res.json(e)
    })
});

module.exports = router;

/*
router.get("/workouts", (req, res) => {
  console.log("workouts route")
});

router.get("/stats", (req, res) => {
    console.log("stats router get")
    res.json('workout')
    //res.render("./public/stats")
});

router.get("/exercise", (req, res) => {
    console.log("exercise router")
    res.send("hi")
    //res.render("./public/exercise")
});

module.exports = router;


router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/workouts", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});*/