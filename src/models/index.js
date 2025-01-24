const Users = require("./Users");
const Role = require("./Roles");
const Patient = require("./Patient");
const Enlistment = require("./Enlistment");
const ClinicHistory = require("./ClinicHistory");
const Attention = require("./Attention");
const Location = require("./Location");
const Measurement = require("./Measurement");
const RxUse = require("./RxUse");
const DiagnosisList = require("./DiagnosisList");
const NextAttention = require("./NextAttention");

const initModels = () => {

  // roles 1 ----- * users
  Role.hasMany(Users);
  Users.belongsTo(Role);

  // enlistment 1 ----- * patients
  Enlistment.hasMany(Patient);
  Patient.belongsTo(Enlistment)
  
  // patients 1 ----- 1 clinicHistory
  Patient.hasOne(ClinicHistory);
  ClinicHistory.belongsTo(Patient)
  
  // measurements 1 ----- 1 attention
  Attention.hasOne(Measurement);
  Measurement.belongsTo(Attention)
  
  // prescription 1 ----- 1 attention
  Attention.hasOne(RxUse);
  RxUse.belongsTo(Attention)
  
  // locations 1 ----- * attention
  Location.hasMany(Attention);
  Attention.belongsTo(Location)

  // enlistment 1 ----- * locations
  Enlistment.hasMany(Location);
  Location.belongsTo(Enlistment)
  
  // clinicHistory 1 ----- * attention
  ClinicHistory.hasMany(Attention);
  Attention.belongsTo(ClinicHistory)
  
  // users 1 ----- * attention
  Users.hasMany(Attention);
  Attention.belongsTo(Users)

  // attention * ----- * diagnosisList
  Attention.belongsToMany(DiagnosisList, { through: 'diagnosis_attention' })
  DiagnosisList.belongsToMany(Attention, { through: 'diagnosis_attention' })

  Patient.hasMany(NextAttention)
  NextAttention.belongsTo(Patient)
};

module.exports = initModels;