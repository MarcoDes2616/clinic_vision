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

const initModels = () => {

  // roles 1 ----- * users
  Role.hasMany(Users);

  // enlistment 1 ----- * patients
  Enlistment.hasMany(Patient);
  
  // patients 1 ----- 1 clinicHistory
  Patient.hasOne(ClinicHistory);
  
  // measurements 1 ----- 1 attention
  Attention.hasOne(Measurement);
  
  // prescription 1 ----- 1 attention
  Attention.hasOne(RxUse);
  
  // locations 1 ----- * attention
  Location.hasMany(Attention);

  // enlistment 1 ----- * locations
  Enlistment.hasMany(Location);
  
  // clinicHistory 1 ----- * attention
  ClinicHistory.hasMany(Attention);
  
  // users 1 ----- * attention
  Users.hasMany(Attention);

  // attention * ----- * diagnosisList
  Attention.belongsToMany(DiagnosisList, { through: 'diagnosis_attention' })
};

module.exports = initModels;