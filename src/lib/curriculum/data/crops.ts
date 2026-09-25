/**
 * Illustrative maize fields checked for leaf blight. Generated from a fixed
 * seed with a hidden disease model: humidity, recent rain and plant age raise
 * risk, temperature has a sweet spot around 25 °C (non-linear), and the
 * resistant variety cuts risk. Diseased fields show more leaf spots and
 * yellowing. Not real survey data.
 *
 * Deliberate traps for teaching:
 *  - 12 missing humidity values
 *  - fungicide_after is recorded AFTER diagnosis — using it to predict
 *    disease is data leakage
 *  - classes are imbalanced (most fields are healthy)
 */
export const CROPS_CSV = `field_id,county,variety,humidity_pct,temp_c,rain_7d_mm,plant_age_days,leaf_spots,yellowing,fungicide_after,diseased
KB0001,Uasin Gishu,local,88,21.8,94,96,11,0.28,yes,1
KB0002,Kitui,hybrid,73,23.2,17,98,13,0.52,yes,1
KB0003,Kitui,hybrid,69,27.6,75,68,3,0.12,no,0
KB0004,Kakamega,local,80,24.9,90,111,22,0.49,yes,1
KB0005,Machakos,local,78,22.2,46,116,0,0.29,no,0
KB0006,Machakos,hybrid,62,28.6,27,23,5,0,no,0
KB0007,Uasin Gishu,hybrid,71,24.0,82,35,0,0.02,no,0
KB0008,Kakamega,hybrid,83,20.7,48,102,0,0.22,no,0
KB0009,Kakamega,resistant,85,22.1,106,86,0,0.12,no,0
KB0010,Kitui,hybrid,72,27.9,0,91,8,0.21,no,0
KB0011,Uasin Gishu,hybrid,70,15.2,47,43,15,0.27,no,0
KB0012,Kakamega,resistant,71,20.6,76,72,6,0.15,no,0
KB0013,Uasin Gishu,hybrid,77,24.7,77,54,6,0.12,no,0
KB0014,Kitui,hybrid,63,28.9,14,80,14,0.1,no,0
KB0015,Uasin Gishu,hybrid,78,24.7,56,84,7,0.51,yes,1
KB0016,Nakuru,resistant,63,22.6,51,64,15,0.04,yes,0
KB0017,Kitui,local,65,27.9,64,93,12,0.28,no,0
KB0018,Meru,hybrid,87,23.3,89,90,18,0.77,yes,1
KB0019,Nakuru,hybrid,74,21.5,34,36,0,0.24,no,0
KB0020,Trans Nzoia,local,94,24.8,34,74,17,0.34,yes,1
KB0021,Trans Nzoia,local,60,23.1,31,61,7,0.01,no,0
KB0022,Kakamega,resistant,84,23.3,52,31,1,0.06,no,0
KB0023,Trans Nzoia,resistant,73,24.5,26,88,2,0.09,no,0
KB0024,Bungoma,hybrid,73,18.0,47,36,3,0.55,no,0
KB0025,Nakuru,hybrid,73,21.6,27,55,0,0.5,no,0
KB0026,Kakamega,local,88,16.2,90,119,6,0.17,no,0
KB0027,Kakamega,local,75,18.1,84,119,2,0.01,no,0
KB0028,Machakos,local,59,25.6,54,106,0,0,no,0
KB0029,Kakamega,local,88,21.0,63,23,0,0.06,no,0
KB0030,Uasin Gishu,local,88,19.5,65,22,0,0.34,no,0
KB0031,Uasin Gishu,local,77,23.8,21,103,13,0.38,yes,1
KB0032,Machakos,local,71,22.8,37,36,12,0.22,no,0
KB0033,Machakos,resistant,70,22.6,57,73,5,0.04,no,0
KB0034,Trans Nzoia,hybrid,96,18.2,7,85,1,0.33,no,0
KB0035,Nakuru,hybrid,98,24.2,0,106,6,0.32,no,0
KB0036,Meru,resistant,89,23.5,96,63,0,0.3,no,0
KB0037,Kitui,resistant,,22.7,37,82,8,0.44,no,0
KB0038,Machakos,hybrid,64,23.9,23,67,3,0.42,no,0
KB0039,Nakuru,hybrid,82,19.6,43,70,5,0.36,no,0
KB0040,Trans Nzoia,resistant,74,24.4,60,69,4,0.22,no,0
KB0041,Bungoma,local,75,26.3,23,44,14,0,no,0
KB0042,Machakos,local,56,25.6,0,88,1,0.17,no,0
KB0043,Trans Nzoia,local,86,26.2,42,67,6,0.39,yes,1
KB0044,Bungoma,local,89,26.1,58,113,14,0.58,yes,1
KB0045,Kitui,resistant,75,27.9,41,78,0,0.15,no,0
KB0046,Kitui,hybrid,70,24.7,57,41,0,0.17,no,0
KB0047,Kitui,hybrid,74,30.4,31,64,12,0.01,no,0
KB0048,Bungoma,local,92,22.2,28,36,3,0.25,no,0
KB0049,Kitui,local,60,24.5,19,118,16,0.41,yes,1
KB0050,Nakuru,hybrid,83,22.0,65,32,14,0.03,no,0
KB0051,Bungoma,hybrid,77,21.5,49,54,6,0.18,no,0
KB0052,Machakos,resistant,77,26.8,0,81,7,0.2,no,0
KB0053,Kakamega,local,83,16.4,34,67,3,0.11,yes,0
KB0054,Uasin Gishu,local,65,30.7,41,46,6,0.29,no,0
KB0055,Trans Nzoia,local,75,26.3,67,49,11,0.37,no,0
KB0056,Meru,local,70,19.1,58,61,10,0.22,yes,0
KB0057,Meru,local,77,20.7,49,71,14,0,no,0
KB0058,Kakamega,resistant,72,17.3,36,86,0,0.19,no,0
KB0059,Uasin Gishu,resistant,79,21.7,47,87,16,0.13,no,0
KB0060,Bungoma,local,81,22.6,83,87,16,0.74,yes,1
KB0061,Kitui,local,59,19.5,4,88,9,0.1,no,0
KB0062,Trans Nzoia,hybrid,,27.0,82,104,17,0.17,yes,1
KB0063,Kakamega,resistant,83,24.3,45,78,3,0.09,no,0
KB0064,Machakos,hybrid,55,20.8,32,23,0,0.15,no,0
KB0065,Machakos,local,62,29.3,33,32,4,0.31,no,0
KB0066,Meru,hybrid,65,23.9,67,31,0,0.3,no,0
KB0067,Bungoma,hybrid,70,22.5,17,112,2,0.33,no,0
KB0068,Kitui,resistant,56,21.8,16,47,6,0.22,no,0
KB0069,Trans Nzoia,local,79,26.3,99,74,6,0.66,yes,1
KB0070,Kakamega,local,78,21.7,67,86,3,0.32,no,0
KB0071,Uasin Gishu,hybrid,53,20.1,21,95,6,0.12,no,0
KB0072,Uasin Gishu,hybrid,64,19.8,84,87,13,0.09,no,0
KB0073,Uasin Gishu,hybrid,94,26.3,30,102,2,0.38,no,0
KB0074,Trans Nzoia,resistant,73,24.0,60,31,5,0.16,no,0
KB0075,Uasin Gishu,hybrid,61,22.5,62,39,0,0.05,no,0
KB0076,Bungoma,hybrid,80,16.2,56,73,4,0.28,no,0
KB0077,Uasin Gishu,hybrid,66,21.2,103,69,5,0,no,0
KB0078,Meru,local,74,18.1,70,23,6,0.11,no,0
KB0079,Meru,resistant,67,20.7,16,33,6,0,no,0
KB0080,Nakuru,local,86,24.8,20,67,19,0.74,yes,1
KB0081,Uasin Gishu,resistant,73,22.9,109,108,1,0.38,no,0
KB0082,Bungoma,hybrid,74,23.4,59,31,17,0.49,yes,1
KB0083,Nakuru,hybrid,73,30.3,43,101,1,0.01,no,0
KB0084,Meru,local,74,21.7,61,24,12,0.49,yes,1
KB0085,Trans Nzoia,local,79,24.8,53,102,9,0.42,yes,1
KB0086,Trans Nzoia,resistant,76,19.5,42,51,0,0.22,no,0
KB0087,Meru,local,72,22.3,59,109,2,0.01,no,0
KB0088,Meru,local,82,22.5,51,52,11,0.53,yes,1
KB0089,Trans Nzoia,local,52,21.3,33,111,11,0.36,no,0
KB0090,Trans Nzoia,hybrid,84,18.3,52,34,10,0.18,no,0
KB0091,Kakamega,local,63,17.1,42,76,9,0.41,no,0
KB0092,Uasin Gishu,resistant,85,26.5,43,76,6,0.08,no,0
KB0093,Machakos,hybrid,79,20.2,52,46,8,0.11,no,0
KB0094,Machakos,local,55,23.8,12,32,7,0.28,no,0
KB0095,Bungoma,hybrid,75,26.2,93,64,3,0.09,no,0
KB0096,Bungoma,local,80,25.1,33,36,0,0.3,no,0
KB0097,Kakamega,hybrid,83,18.3,26,48,0,0.05,no,0
KB0098,Kakamega,resistant,72,24.2,38,64,1,0.3,no,0
KB0099,Machakos,hybrid,54,29.2,0,51,13,0,no,0
KB0100,Nakuru,local,86,24.4,70,70,16,0.3,yes,1
KB0101,Nakuru,hybrid,78,23.4,26,64,7,0.39,no,0
KB0102,Meru,local,76,29.5,56,117,18,0.62,yes,1
KB0103,Uasin Gishu,resistant,81,28.5,63,43,0,0.13,no,0
KB0104,Uasin Gishu,resistant,79,14.6,31,116,10,0.3,no,0
KB0105,Uasin Gishu,hybrid,85,24.6,49,72,0,0.38,yes,1
KB0106,Bungoma,hybrid,73,21.3,71,38,5,0.07,no,0
KB0107,Uasin Gishu,hybrid,65,27.2,24,93,8,0.17,no,0
KB0108,Kakamega,local,89,23.8,41,87,21,0.49,yes,1
KB0109,Kakamega,hybrid,84,20.0,55,95,0,0.07,no,0
KB0110,Kakamega,local,88,21.8,64,45,2,0.29,no,0
KB0111,Uasin Gishu,hybrid,67,25.1,29,33,5,0.5,no,0
KB0112,Kitui,hybrid,47,22.5,16,117,3,0,no,0
KB0113,Nakuru,local,62,24.5,57,89,1,0.28,no,0
KB0114,Kakamega,resistant,85,24.4,60,46,7,0.22,no,0
KB0115,Kitui,local,59,22.7,12,33,1,0.21,no,0
KB0116,Uasin Gishu,hybrid,89,27.0,63,114,19,0.49,yes,1
KB0117,Nakuru,hybrid,80,21.1,22,76,9,0.3,no,0
KB0118,Trans Nzoia,hybrid,78,22.7,44,93,0,0.21,no,0
KB0119,Nakuru,local,77,18.0,29,114,6,0.11,no,0
KB0120,Kakamega,local,76,24.9,80,29,24,0.39,yes,1
KB0121,Uasin Gishu,local,77,26.1,73,34,7,0.28,no,0
KB0122,Trans Nzoia,local,79,23.8,68,35,9,0.36,yes,1
KB0123,Trans Nzoia,resistant,57,24.2,27,56,0,0.19,no,0
KB0124,Bungoma,hybrid,76,15.3,68,59,0,0.27,no,0
KB0125,Uasin Gishu,local,92,29.1,54,60,12,0.69,yes,1
KB0126,Nakuru,resistant,89,22.7,68,45,5,0.17,no,0
KB0127,Bungoma,local,81,21.2,33,72,4,0,no,0
KB0128,Kitui,resistant,64,21.8,27,100,6,0.11,no,0
KB0129,Meru,hybrid,62,21.5,25,120,6,0.23,yes,1
KB0130,Nakuru,hybrid,77,26.0,27,35,1,0.07,no,0
KB0131,Uasin Gishu,local,76,25.4,74,107,14,0.84,yes,1
KB0132,Trans Nzoia,local,82,24.5,23,45,3,0.3,no,0
KB0133,Machakos,resistant,63,24.1,0,47,10,0.17,no,0
KB0134,Kitui,local,55,23.1,57,113,3,0,no,0
KB0135,Bungoma,hybrid,82,25.7,67,59,12,0.02,no,0
KB0136,Kakamega,hybrid,82,20.2,52,119,3,0.13,no,0
KB0137,Machakos,hybrid,65,25.6,26,27,2,0.43,no,0
KB0138,Meru,resistant,93,22.3,88,21,9,0.08,no,0
KB0139,Kitui,local,82,24.7,34,90,14,0.5,yes,1
KB0140,Uasin Gishu,hybrid,67,19.8,66,20,6,0.18,yes,0
KB0141,Nakuru,hybrid,72,23.1,7,95,5,0.13,no,0
KB0142,Trans Nzoia,hybrid,77,23.9,51,77,20,0.49,yes,1
KB0143,Kitui,hybrid,66,23.8,0,29,8,0.14,no,0
KB0144,Nakuru,local,80,23.7,61,24,12,0.65,yes,1
KB0145,Nakuru,local,62,27.0,89,83,12,0.53,yes,1
KB0146,Nakuru,local,71,26.9,45,25,6,0.23,no,0
KB0147,Kitui,hybrid,78,21.0,14,110,2,0.26,no,0
KB0148,Bungoma,local,95,24.0,64,82,18,0.54,yes,1
KB0149,Uasin Gishu,local,59,19.9,10,82,0,0.09,no,0
KB0150,Kakamega,hybrid,71,20.7,86,49,9,0.28,no,0
KB0151,Trans Nzoia,resistant,81,19.1,62,31,10,0.41,no,0
KB0152,Trans Nzoia,local,89,24.5,116,72,19,0.67,yes,1
KB0153,Trans Nzoia,local,74,18.0,76,39,10,0.3,no,0
KB0154,Bungoma,resistant,80,22.1,55,107,1,0.07,no,0
KB0155,Uasin Gishu,hybrid,62,22.6,32,60,5,0.22,no,0
KB0156,Bungoma,hybrid,77,26.4,95,69,18,0.35,no,1
KB0157,Kitui,hybrid,69,23.6,0,102,6,0.42,no,0
KB0158,Uasin Gishu,local,85,26.2,102,71,17,0.47,yes,1
KB0159,Machakos,resistant,65,21.8,42,48,2,0.14,no,0
KB0160,Meru,local,85,25.1,105,66,12,0.03,yes,1
KB0161,Bungoma,resistant,74,14.2,52,117,0,0.25,no,0
KB0162,Kakamega,local,79,21.1,59,63,14,0.25,no,0
KB0163,Nakuru,hybrid,71,25.6,40,100,5,0.27,no,0
KB0164,Meru,resistant,83,31.6,56,35,1,0.16,no,0
KB0165,Uasin Gishu,resistant,83,23.0,10,37,0,0.33,no,0
KB0166,Bungoma,local,78,23.5,68,112,16,0.54,yes,1
KB0167,Machakos,local,74,17.5,5,25,3,0.31,no,0
KB0168,Machakos,hybrid,69,22.6,60,52,10,0.49,yes,1
KB0169,Trans Nzoia,hybrid,86,20.3,36,100,4,0.08,no,0
KB0170,Kitui,local,71,22.8,11,26,2,0.28,no,0
KB0171,Kitui,local,60,26.7,24,46,8,0.44,no,0
KB0172,Machakos,hybrid,61,23.3,31,99,1,0.11,no,0
KB0173,Kakamega,resistant,86,22.7,73,89,8,0.23,no,0
KB0174,Nakuru,hybrid,70,20.3,64,68,0,0.25,no,0
KB0175,Trans Nzoia,local,82,22.2,16,24,8,0.02,no,0
KB0176,Bungoma,hybrid,76,26.8,59,31,20,0.48,yes,1
KB0177,Kitui,hybrid,73,25.5,14,21,4,0.24,no,0
KB0178,Machakos,resistant,,27.5,54,53,10,0.17,no,0
KB0179,Machakos,hybrid,72,22.4,29,79,6,0.13,no,0
KB0180,Bungoma,local,,23.3,83,80,1,0.21,no,0
KB0181,Meru,resistant,83,32.9,74,102,4,0.33,no,0
KB0182,Meru,resistant,76,29.4,74,93,15,0.54,yes,1
KB0183,Machakos,hybrid,47,24.3,55,79,13,0.2,no,0
KB0184,Trans Nzoia,resistant,82,21.9,103,31,17,0.25,no,0
KB0185,Meru,local,81,26.2,65,61,18,0.28,yes,1
KB0186,Machakos,local,69,23.2,51,24,7,0.11,yes,0
KB0187,Uasin Gishu,local,60,28.8,49,93,5,0.04,no,0
KB0188,Nakuru,local,83,20.2,19,61,3,0.25,yes,0
KB0189,Bungoma,resistant,93,24.6,45,107,16,0.43,yes,1
KB0190,Uasin Gishu,hybrid,69,25.8,16,99,5,0.17,no,0
KB0191,Meru,hybrid,97,20.3,52,33,6,0.31,no,0
KB0192,Trans Nzoia,hybrid,73,24.9,57,57,4,0,no,0
KB0193,Trans Nzoia,resistant,82,19.6,11,114,4,0.06,no,0
KB0194,Kakamega,local,76,19.7,66,102,0,0.11,no,0
KB0195,Uasin Gishu,hybrid,65,30.1,65,53,8,0.05,no,0
KB0196,Nakuru,hybrid,73,21.0,65,65,4,0,no,0
KB0197,Trans Nzoia,hybrid,69,27.9,76,73,7,0.16,no,0
KB0198,Bungoma,local,91,22.6,55,94,8,0.36,no,0
KB0199,Uasin Gishu,hybrid,71,21.2,0,30,7,0.19,no,0
KB0200,Kitui,hybrid,69,27.5,68,91,0,0.29,no,0
KB0201,Kakamega,hybrid,85,20.0,24,49,3,0.15,no,0
KB0202,Machakos,hybrid,67,21.8,79,33,6,0.36,no,0
KB0203,Meru,resistant,73,13.4,61,77,5,0.09,no,0
KB0204,Kitui,local,75,23.4,0,71,5,0.25,no,0
KB0205,Nakuru,local,79,20.1,89,90,24,0.53,yes,1
KB0206,Kitui,hybrid,74,26.7,6,85,4,0.38,no,0
KB0207,Uasin Gishu,hybrid,58,24.9,38,63,1,0.32,no,0
KB0208,Kakamega,hybrid,81,24.2,105,105,21,0.32,yes,1
KB0209,Kitui,local,57,24.1,21,43,6,0.12,no,0
KB0210,Kitui,local,77,26.9,16,101,15,0.38,yes,1
KB0211,Uasin Gishu,hybrid,81,19.4,56,63,8,0.01,no,0
KB0212,Meru,hybrid,75,20.2,78,23,9,0.13,no,0
KB0213,Trans Nzoia,resistant,79,28.1,41,31,3,0.26,no,0
KB0214,Kakamega,local,75,23.0,56,93,10,0.33,yes,1
KB0215,Kitui,hybrid,73,16.0,6,79,4,0.19,no,0
KB0216,Meru,local,82,28.2,52,90,2,0.19,no,0
KB0217,Kitui,local,78,21.2,13,93,13,0.15,no,0
KB0218,Bungoma,resistant,89,28.2,49,45,11,0.33,no,0
KB0219,Bungoma,resistant,84,24.0,45,80,1,0.18,no,0
KB0220,Meru,resistant,69,21.4,64,103,9,0.16,no,0
KB0221,Nakuru,resistant,70,19.2,8,30,10,0.05,no,0
KB0222,Machakos,resistant,52,16.2,0,89,11,0.03,no,0
KB0223,Trans Nzoia,hybrid,98,27.8,35,119,19,0.44,yes,1
KB0224,Meru,local,69,24.4,31,26,15,0.42,yes,1
KB0225,Machakos,local,63,26.9,33,46,0,0,no,0
KB0226,Trans Nzoia,local,75,22.5,36,24,1,0.17,no,0
KB0227,Kakamega,local,82,19.2,78,20,0,0.34,no,0
KB0228,Kitui,local,75,25.5,45,91,5,0.06,no,0
KB0229,Meru,local,88,21.8,87,66,0,0.26,no,0
KB0230,Uasin Gishu,hybrid,87,23.3,36,72,16,0.63,yes,1
KB0231,Bungoma,hybrid,91,27.9,41,86,4,0.41,no,0
KB0232,Bungoma,hybrid,,24.7,41,34,15,0.72,yes,1
KB0233,Trans Nzoia,hybrid,62,23.8,18,80,6,0,no,0
KB0234,Trans Nzoia,hybrid,76,23.5,75,55,1,0.47,yes,1
KB0235,Nakuru,local,79,25.4,36,71,9,0.42,yes,1
KB0236,Uasin Gishu,resistant,71,23.9,57,102,0,0.33,no,0
KB0237,Trans Nzoia,resistant,87,23.5,61,85,3,0,no,0
KB0238,Bungoma,resistant,76,18.0,41,77,1,0.12,no,0
KB0239,Meru,hybrid,94,20.3,76,68,5,0.31,no,0
KB0240,Kitui,hybrid,66,27.4,19,75,0,0,no,0
KB0241,Kitui,hybrid,66,23.2,22,69,7,0.14,no,0
KB0242,Nakuru,local,65,22.5,30,76,4,0.06,no,0
KB0243,Kakamega,hybrid,77,20.1,72,105,8,0,no,0
KB0244,Bungoma,local,85,23.5,43,70,16,0.42,yes,1
KB0245,Bungoma,local,73,22.7,78,105,5,0.06,no,0
KB0246,Trans Nzoia,local,67,21.2,31,79,4,0.06,no,0
KB0247,Bungoma,resistant,76,21.3,64,64,12,0.28,no,0
KB0248,Trans Nzoia,local,90,19.5,27,106,7,0.26,no,0
KB0249,Machakos,resistant,72,25.2,68,69,7,0.26,no,0
KB0250,Kitui,hybrid,78,22.6,40,81,9,0.6,yes,1
KB0251,Uasin Gishu,hybrid,,21.6,20,23,1,0,no,0
KB0252,Kitui,hybrid,58,30.8,11,57,6,0.13,no,0
KB0253,Nakuru,local,52,26.3,15,114,2,0.45,no,0
KB0254,Meru,resistant,80,25.5,51,96,0,0.19,no,0
KB0255,Nakuru,resistant,71,24.8,23,51,7,0.09,no,0
KB0256,Nakuru,local,77,29.0,56,77,8,0,no,0
KB0257,Nakuru,local,75,18.9,3,33,5,0.26,no,0
KB0258,Trans Nzoia,local,75,24.9,82,120,4,0.54,yes,1
KB0259,Kakamega,local,79,26.8,87,100,19,0.55,yes,1
KB0260,Trans Nzoia,local,72,18.4,11,100,5,0.31,no,0
KB0261,Kitui,hybrid,73,25.8,27,76,16,0.73,yes,1
KB0262,Meru,local,86,24.1,51,110,6,0.17,yes,0
KB0263,Uasin Gishu,local,89,20.2,44,66,10,0.22,no,0
KB0264,Kitui,resistant,68,30.3,21,67,0,0.17,no,0
KB0265,Uasin Gishu,local,79,24.2,52,112,15,0.21,no,1
KB0266,Kitui,resistant,74,23.5,25,50,0,0.31,no,0
KB0267,Kitui,resistant,72,24.3,17,51,0,0.32,no,0
KB0268,Uasin Gishu,local,71,23.7,6,44,4,0.15,no,0
KB0269,Trans Nzoia,local,79,22.7,19,34,11,0.31,no,0
KB0270,Bungoma,hybrid,79,19.7,54,22,4,0.13,no,0
KB0271,Meru,hybrid,98,26.0,25,52,7,0.24,no,0
KB0272,Kakamega,hybrid,92,20.7,34,117,16,0.71,yes,1
KB0273,Bungoma,hybrid,70,22.9,70,46,0,0.27,no,0
KB0274,Nakuru,local,80,22.4,74,56,24,0.43,yes,1
KB0275,Bungoma,local,68,23.0,102,90,11,0.19,no,0
KB0276,Machakos,local,83,21.0,8,44,17,0.34,no,1
KB0277,Uasin Gishu,hybrid,77,20.0,38,101,4,0.41,no,0
KB0278,Kitui,local,70,29.6,0,34,5,0.24,no,0
KB0279,Uasin Gishu,resistant,83,20.4,46,100,9,0.33,no,0
KB0280,Kitui,local,58,25.6,8,23,6,0.51,no,0
KB0281,Kakamega,local,88,21.9,34,33,0,0.12,no,0
KB0282,Kakamega,hybrid,80,20.5,60,57,4,0.06,no,0
KB0283,Uasin Gishu,resistant,89,23.9,55,24,24,0.61,yes,1
KB0284,Trans Nzoia,local,83,23.0,71,87,17,0.45,yes,1
KB0285,Kitui,local,71,26.2,0,22,0,0.2,no,0
KB0286,Nakuru,local,82,24.2,45,76,15,0.62,yes,1
KB0287,Nakuru,hybrid,69,21.3,51,32,21,0.14,yes,1
KB0288,Kitui,local,73,24.3,43,94,2,0.48,no,0
KB0289,Meru,local,74,18.3,57,93,2,0.4,no,0
KB0290,Kakamega,hybrid,80,26.0,72,86,12,0.54,yes,1
KB0291,Machakos,resistant,69,23.2,38,112,8,0.08,no,0
KB0292,Machakos,hybrid,75,23.5,3,66,0,0.21,no,0
KB0293,Trans Nzoia,local,,24.5,64,60,3,0.12,no,0
KB0294,Nakuru,local,81,23.7,28,47,13,0.55,yes,1
KB0295,Kitui,resistant,77,26.2,35,55,10,0.1,no,0
KB0296,Uasin Gishu,local,81,16.8,80,114,6,0.29,no,0
KB0297,Kitui,local,77,30.9,20,112,4,0.31,no,0
KB0298,Nakuru,local,64,21.9,56,67,7,0,no,0
KB0299,Meru,hybrid,71,19.8,61,33,5,0.39,no,0
KB0300,Machakos,resistant,61,29.8,31,72,9,0.27,no,0
KB0301,Machakos,hybrid,62,22.9,38,90,19,0.29,yes,1
KB0302,Bungoma,local,80,24.9,79,66,14,0.35,yes,1
KB0303,Machakos,resistant,63,17.8,44,39,9,0.13,no,0
KB0304,Bungoma,local,70,18.0,53,29,6,0.12,no,0
KB0305,Kakamega,hybrid,71,25.3,83,115,3,0.57,yes,1
KB0306,Meru,hybrid,85,18.4,52,111,9,0.03,no,0
KB0307,Nakuru,hybrid,76,24.3,0,111,6,0.31,yes,1
KB0308,Uasin Gishu,resistant,76,24.6,50,53,7,0.25,no,0
KB0309,Meru,hybrid,59,28.7,58,24,0,0.33,no,0
KB0310,Machakos,local,62,26.2,42,113,10,0.31,no,0
KB0311,Machakos,hybrid,81,22.2,22,78,0,0.19,no,0
KB0312,Kakamega,hybrid,74,22.1,104,71,14,0.28,yes,1
KB0313,Nakuru,local,70,26.9,32,75,10,0.36,yes,1
KB0314,Uasin Gishu,hybrid,82,21.9,47,23,3,0.13,no,0
KB0315,Uasin Gishu,local,73,24.8,61,25,0,0.19,no,0
KB0316,Bungoma,local,71,16.2,41,31,6,0.18,no,0
KB0317,Kakamega,local,98,18.4,46,30,8,0.07,no,0
KB0318,Bungoma,local,84,24.6,46,114,13,0.34,yes,1
KB0319,Nakuru,local,72,24.8,60,80,12,0.15,no,0
KB0320,Trans Nzoia,resistant,84,22.0,85,54,0,0.2,yes,0
KB0321,Uasin Gishu,local,,27.0,7,99,15,0.37,yes,1
KB0322,Machakos,hybrid,58,30.3,42,80,4,0,no,0
KB0323,Kakamega,resistant,68,16.9,86,74,3,0.15,no,0
KB0324,Kakamega,hybrid,74,18.8,45,94,12,0.24,no,0
KB0325,Meru,hybrid,68,21.7,41,106,9,0.3,no,0
KB0326,Kakamega,hybrid,84,23.1,88,61,16,0.51,yes,1
KB0327,Bungoma,local,68,24.9,47,111,7,0.3,no,0
KB0328,Machakos,hybrid,54,26.8,28,117,12,0.28,no,0
KB0329,Bungoma,resistant,92,21.2,47,83,2,0.1,no,0
KB0330,Nakuru,local,69,25.0,36,30,0,0.23,no,0
KB0331,Bungoma,resistant,91,30.6,40,99,0,0.39,no,0
KB0332,Nakuru,local,72,24.3,28,112,7,0.67,yes,1
KB0333,Nakuru,hybrid,86,22.9,94,83,12,0.47,no,1
KB0334,Bungoma,hybrid,67,27.5,91,83,4,0,no,0
KB0335,Meru,hybrid,93,21.3,45,73,4,0.11,no,0
KB0336,Meru,local,75,24.7,48,106,15,0.57,yes,1
KB0337,Kakamega,local,67,23.5,57,112,16,0.47,yes,1
KB0338,Kitui,hybrid,73,23.2,27,42,9,0.28,no,0
KB0339,Kakamega,local,81,20.5,56,67,0,0.05,no,0
KB0340,Machakos,local,61,18.7,30,118,11,0.01,no,0
KB0341,Machakos,local,56,23.8,60,39,1,0.23,no,0
KB0342,Bungoma,local,64,21.4,42,73,8,0.18,no,0
KB0343,Kakamega,local,80,27.4,70,109,16,0.53,yes,1
KB0344,Trans Nzoia,hybrid,75,23.3,35,120,7,0.38,no,0
KB0345,Trans Nzoia,local,76,21.1,100,82,0,0.23,no,0
KB0346,Uasin Gishu,local,65,21.4,50,84,0,0.13,no,0
KB0347,Nakuru,local,62,25.4,60,116,20,0.22,yes,1
KB0348,Kakamega,hybrid,73,25.9,73,65,16,0.65,yes,1
KB0349,Nakuru,hybrid,,30.6,30,59,12,0.2,no,0
KB0350,Meru,hybrid,,20.4,69,57,0,0.12,no,0
KB0351,Kitui,resistant,66,30.9,24,56,6,0.31,no,0
KB0352,Uasin Gishu,hybrid,71,24.0,65,120,18,0.54,yes,1
KB0353,Uasin Gishu,local,75,20.3,35,41,0,0.19,no,0
KB0354,Kakamega,local,84,20.0,52,61,4,0,no,0
KB0355,Uasin Gishu,hybrid,69,23.9,78,98,4,0.24,no,0
KB0356,Kakamega,local,92,16.6,129,82,23,0.47,yes,1
KB0357,Nakuru,resistant,78,28.7,53,50,5,0.15,no,0
KB0358,Kitui,resistant,70,25.3,38,69,4,0.28,no,0
KB0359,Machakos,hybrid,57,26.1,29,119,0,0.43,no,0
KB0360,Uasin Gishu,local,81,23.0,54,76,18,0.18,no,0
KB0361,Machakos,local,,24.9,55,106,13,0.3,yes,1
KB0362,Kakamega,hybrid,80,23.4,74,46,6,0.43,no,0
KB0363,Machakos,local,63,26.7,14,45,6,0.24,no,0
KB0364,Nakuru,local,80,23.1,93,59,7,0.03,no,0
KB0365,Meru,resistant,83,18.6,80,23,5,0.33,no,0
KB0366,Kitui,local,66,25.5,31,59,6,0.17,no,0
KB0367,Machakos,hybrid,66,27.4,37,117,6,0.35,yes,1
KB0368,Bungoma,local,71,19.5,47,24,7,0.14,no,0
KB0369,Meru,hybrid,67,23.5,85,101,19,0.44,yes,1
KB0370,Trans Nzoia,resistant,67,29.6,62,118,0,0.17,no,0
KB0371,Meru,local,72,22.6,57,120,16,0.18,no,0
KB0372,Bungoma,hybrid,97,25.0,27,57,2,0.39,no,0
KB0373,Bungoma,local,82,16.5,65,120,10,0.1,no,0
KB0374,Kakamega,local,65,19.6,54,86,2,0.17,no,0
KB0375,Nakuru,resistant,63,26.5,70,31,3,0.02,no,0
KB0376,Meru,local,68,22.7,85,44,4,0.32,no,0
KB0377,Trans Nzoia,local,77,19.4,69,45,17,0.09,no,0
KB0378,Nakuru,local,85,27.9,16,63,0,0.14,no,0
KB0379,Meru,local,87,19.8,38,68,4,0.49,no,0
KB0380,Kakamega,local,72,25.2,49,107,5,0.29,no,0
KB0381,Machakos,local,58,19.5,38,41,2,0.4,no,0
KB0382,Kitui,hybrid,70,27.6,34,87,3,0.09,no,0
KB0383,Bungoma,hybrid,66,22.4,31,38,5,0,no,0
KB0384,Nakuru,hybrid,79,22.7,36,62,1,0.47,no,0
KB0385,Bungoma,resistant,69,16.9,48,28,11,0.05,no,0
KB0386,Machakos,hybrid,71,20.3,47,49,3,0.07,no,0
KB0387,Uasin Gishu,local,61,20.7,53,25,6,0.32,no,0
KB0388,Kakamega,hybrid,84,23.7,64,99,16,0.46,yes,1
KB0389,Meru,hybrid,83,17.5,63,67,14,0.28,no,0
KB0390,Nakuru,local,,21.8,74,55,6,0.42,no,0
KB0391,Bungoma,resistant,82,20.0,83,44,6,0.23,no,0
KB0392,Kakamega,hybrid,73,24.5,49,107,13,0.48,yes,1
KB0393,Bungoma,hybrid,94,22.0,62,58,14,0.12,yes,1
KB0394,Kakamega,resistant,65,20.7,35,55,6,0.34,no,0
KB0395,Meru,hybrid,84,22.2,81,29,4,0.15,no,0
KB0396,Nakuru,resistant,64,23.3,74,41,10,0.43,no,0
KB0397,Kakamega,local,74,21.4,29,88,6,0.2,no,0
KB0398,Trans Nzoia,hybrid,53,28.4,18,76,0,0.04,no,0
KB0399,Kakamega,resistant,84,17.4,72,75,0,0.18,no,0
KB0400,Uasin Gishu,local,80,20.0,51,55,1,0.11,no,0
`;
