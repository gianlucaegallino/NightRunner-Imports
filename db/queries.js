const pool = require("./pool");

// --------------- SELECT ALL queries ---------------

async function getAllAspirations() {
  let contents = pool.query("SELECT * FROM aspirations");
  return contents;
}

async function getAllBrands() {
  let contents = pool.query("SELECT * FROM brands");
  return contents;
}

async function getAllCars() {
  let contents = pool.query("SELECT * FROM cars");
  return contents;
}

async function getAllColors() {
  let contents = pool.query("SELECT * FROM colors");
  return contents;
}

async function getAllDrivetrains() {
  let contents = pool.query("SELECT * FROM drivetrains");
  return contents;
}

async function getAllEngines() {
  let contents = pool.query("SELECT * FROM engines");
  return contents;
}

async function getAllTransmissions() {
  let contents = pool.query("SELECT * FROM transmissions");
  return contents;
}

// --------------- Individual SELECT queries ---------------

async function getAspiration(id) {
  let contents = pool.query("SELECT * FROM aspirations WHERE id = $1", [id]);
  return contents;
}

async function getBrand(id) {
  let contents = pool.query("SELECT * FROM brands WHERE id = $1", [id]);
  return contents;
}

async function getCar(id) {
  let contents = pool.query("SELECT * FROM cars WHERE id = $1", [id]);
  return contents;
}

async function getColor(id) {
  let contents = pool.query("SELECT * FROM colors WHERE id = $1", [id]);
  return contents;
}

async function getDrivetrain(id) {
  let contents = pool.query("SELECT * FROM drivetrains WHERE id = $1", [id]);
  return contents;
}

async function getEngine(id) {
  let contents = pool.query("SELECT * FROM engines WHERE id = $1", [id]);
  return contents;
}

async function getTransmission(id) {
  let contents = pool.query("SELECT * FROM transmissions WHERE id = $1", [id]);
  return contents;
}

// --------------- DELETE queries ---------------

async function deleteAspiration(id) {
  let contents = pool.query("DELETE FROM aspirations WHERE id = $1", [id]);
  return contents;
}

async function deleteBrand(id) {
  let contents = pool.query("DELETE FROM brands WHERE id = $1", [id]);
  return contents;
}

async function deleteCar(id) {
  let contents = pool.query("DELETE FROM cars WHERE id = $1", [id]);
  return contents;
}

async function deleteColor(id) {
  let contents = pool.query("DELETE FROM colors WHERE id = $1", [id]);
  return contents;
}

async function deleteDrivetrain(id) {
  let contents = pool.query("DELETE FROM drivetrains WHERE id = $1", [id]);
  return contents;
}

async function deleteEngine(id) {
  let contents = pool.query("DELETE FROM engines WHERE id = $1", [id]);
  return contents;
}

async function deleteTransmission(id) {
  let contents = pool.query("DELETE FROM transmissions WHERE id = $1", [id]);
  return contents;
}

// --------------- UPDATE queries ---------------

async function updateAspiration(id, type) {
  let contents = pool.query("UPDATE aspirations SET type = $2 WHERE id = $1", [
    id,
    type,
  ]);
  return contents;
}

async function updateBrand(id, name, year, founder) {
  let contents = pool.query(
    "UPDATE brands SET name = $2, year_est = $3, founder = $4 WHERE id = $1",
    [id, name, year, founder]
  );
  return contents;
}

async function updateCar(id, carData) {
  //Destructure the car data object
  const {
    name,
    brand,
    engine_type,
    engine_size,
    hp,
    torque,
    top_speed,
    weight,
    year,
    color,
    mileage,
    drivetrain,
    transmission,
    aspiration,
  } = carData;

  let contents = pool.query(
    "UPDATE cars SET name = $1, brand = $2, engine_type = $3, engine_size = $4, hp = $5, torque = $6,  top_speed = $7, weight = $8, year = $9, color = $10, mileage = $11, drivetrain = $12, transmission = $13, aspiration = $14 WHERE id = $15",
    [
      name,
      brand,
      engine_type,
      engine_size,
      hp,
      torque,
      top_speed,
      weight,
      year,
      color,
      mileage,
      drivetrain,
      transmission,
      aspiration,
      id,
    ]
  );
  return contents;
}

async function updateColor(id, name) {
  let contents = pool.query("UPDATE colors SET name = $2 WHERE id = $1", [
    id,
    name,
  ]);
  return contents;
}

async function updateDrivetrain(id, type) {
  let contents = pool.query("UPDATE drivetrains SET type = $2 WHERE id = $1", [
    id,
    type,
  ]);
  return contents;
}

async function updateEngine(id, type) {
  let contents = pool.query("UPDATE engines SET type = $2 WHERE id = $1", [
    id,
    type,
  ]);
  return contents;
}

async function updateTransmission(id, type) {
  let contents = pool.query(
    "UPDATE transmissions SET type = $2 WHERE id = $1",
    [id, type]
  );
  return contents;
}

// --------------- INSERT queries ---------------

async function insertAspiration(type) {
  let contents = pool.query("INSERT INTO aspirations (type) VALUES ($1)", [
    type,
  ]);
  return contents;
}

async function insertBrand(name, year, founder) {
  let contents = pool.query(
    "INSERT INTO brands (name, year_est, founder) VALUES ($1, $2, $3)",
    [name, year, founder]
  );
  return contents;
}

async function insertCar(carData) {
  //Destructure the car data object
  const {
    name,
    brand,
    engine_type,
    engine_size,
    hp,
    torque,
    top_speed,
    weight,
    year,
    color,
    mileage,
    drivetrain,
    transmission,
    aspiration,
  } = carData;

  let contents = pool.query(
    "INSERT INTO cars (name, brand, engine_type, engine_size, hp, torque, top_speed, weight, year, color mileage, drivetrain, transmission, aspiration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
    [
      name,
      brand,
      engine_type,
      engine_size,
      hp,
      torque,
      top_speed,
      weight,
      year,
      color,
      mileage,
      drivetrain,
      transmission,
      aspiration,
    ]
  );
  return contents;
}

async function insertColor(name) {
  let contents = pool.query("INSERT INTO colors (name) VALUES ($1)", [name]);
  return contents;
}

async function insertDrivetrain(type) {
  let contents = pool.query("INSERT INTO drivetrains (type) VALUES ($1) ", [
    type,
  ]);
  return contents;
}

async function insertEngine(type) {
  let contents = pool.query("INSERT INTO engines(type) VALUES ($1)", [type]);
  return contents;
}

async function insertTransmission(type) {
  let contents = pool.query("INSERT INTO transmissions (type) VALUES ($1)", [
    type,
  ]);
  return contents;
}

module.exports = {
  getAllAspirations,
  getAllBrands,
  getAllCars,
  getAllColors,
  getAllDrivetrains,
  getAllEngines,
  getAllTransmissions,
  getAspiration,
  getBrand,
  getCar,
  getColor,
  getDrivetrain,
  getEngine,
  getTransmission,
  deleteAspiration,
  deleteBrand,
  deleteCar,
  deleteColor,
  deleteDrivetrain,
  deleteEngine,
  deleteTransmission,
  updateAspiration,
  updateBrand,
  updateCar,
  updateColor,
  updateDrivetrain,
  updateEngine,
  updateTransmission,
  insertAspiration,
  insertBrand,
  insertCar,
  insertColor,
  insertDrivetrain,
  insertEngine,
  insertTransmission
};
