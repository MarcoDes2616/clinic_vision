const Users = require("./Users");
const Role = require("./Roles");
const Patient = require("./Patient");
const Sponsorship = require("./Sponsorship");
const ClinicHistory = require("./ClinicHistory");
const Attention = require("./Attention");
const Location = require("./Location");
const Measurement = require("./Measurement");
const Prescription = require("./Prescription");

const initModels = () => {

  // roles 1 ----- * users
  Role.hasMany(Users, { foreignKey: "roleId" });
  Users.belongsTo(Role, { foreignKey: "roleId" });

  // sponsorship 1 ----- * patients
  Sponsorship.hasMany(Patient, { foreignKey: "sponsorshipId" });
  Patient.belongsTo(Sponsorship, { foreignKey: "sponsorshipId" });
  
  // patients 1 ----- * clinicHistory
  Patient.hasOne(ClinicHistory, { foreignKey: "patientId" });
  ClinicHistory.belongsTo(Patient, { foreignKey: "patientId" });
  
  // locations 1 ----- * attention
  Location.hasMany(Attention, { foreignKey: "locationId" });
  Attention.belongsTo(Location, { foreignKey: "locationId" });
  
  // clinicHistory 1 ----- * attention
  ClinicHistory.hasMany(Attention, { foreignKey: "clinicHistoryId" });
  Attention.belongsTo(ClinicHistory, { foreignKey: "clinicHistoryId" });
  
  // users 1 ----- * attention
  Users.hasMany(Attention, { foreignKey: "userId" });
  Attention.belongsTo(Users, { foreignKey: "userId" });

  // measurements 1 ----- 1 attention
  Attention.hasOne(Measurement, { foreignKey: "attentionId" });
  Measurement.belongsTo(Attention, { foreignKey: "attentionId" });

  // prescription 1 ----- * attention
  Attention.hasOne(Prescription, { foreignKey: "attentionId" });
  Prescription.belongsTo(Attention, { foreignKey: "attentionId" });
};

module.exports = initModels;