// ===========================
//  Puerto
// ===========================
process.env.PORT = process.env.PORT || 3000;

// ===========================
//  Entorno
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================
//  Entorno
// ===========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/SistemaFarmacia';
} else {
    urlDB = 'mongodb+srv://driosn:driosn@farmabol.qvv2h.mongodb.net/SistemaFarmacia';
}
process.env.URLDB = urlDB;