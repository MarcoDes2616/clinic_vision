const Users = require("./Users");
const Role = require("./Roles");
const Patient = require("./Patient");
const Enlistment = require("./Enlistment");
const ClinicHistory = require("./ClinicHistory");
const Attention = require("./Attention");
const Location = require("./Location");
const Measurement = require("./Measurement");
const RxUse = require("./RxUse");

const initModels = () => {

  // roles 1 ----- * users
  Role.hasMany(Users);

  // enlistment 1 ----- * patients
  Enlistment.hasMany(Patient);
  // Patient.belongsTo(Enlistment, { foreignKey: "enlistmentId" });
  
  // patients 1 ----- 1 clinicHistory
  Patient.hasOne(ClinicHistory);
  // ClinicHistory.belongsTo(Patient, { foreignKey: "patientId" });
  
  // measurements 1 ----- 1 attention
  Attention.hasOne(Measurement);
  // Measurement.belongsTo(Attention, { foreignKey: "attentionId" });
  
  // prescription 1 ----- 1 attention
  Attention.hasOne(RxUse);
  // RxUse.belongsTo(Attention, { foreignKey: "attentionId" });
  
  // locations 1 ----- * attention
  Location.hasMany(Attention);
  // Attention.belongsTo(Location, { foreignKey: "locationId" });

  // enlistment 1 ----- * locations
  Enlistment.hasMany(Location);
  // Location.belongsTo(Enlistment, { foreignKey: "enlistmentId" });
  
  // clinicHistory 1 ----- * attention
  ClinicHistory.hasMany(Attention);
  // Attention.belongsTo(ClinicHistory, { foreignKey: "clinicHistoryId" });
  
  // users 1 ----- * attention
  Users.hasMany(Attention);
  // Attention.belongsTo(Users, { foreignKey: "userId" });

  // Attention.hasMany("diagnosis_atention", {foreignKey: "attentionId"})

};

module.exports = initModels;