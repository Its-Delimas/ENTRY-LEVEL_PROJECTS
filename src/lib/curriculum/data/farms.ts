/**
 * Illustrative smallholder maize farms across eight Kenyan counties.
 * Generated from a fixed seed with realistic relationships (rainfall,
 * fertiliser, soil and irrigation all raise yield, plus noise), four
 * missing fertiliser values and one data-entry error (a 95-bag yield) left
 * in on purpose for cleaning practice. Not real survey data.
 *
 * Columns: farm_id, county, acres, rainfall_mm, fertilizer_kg (per acre),
 * soil (loam / clay / sandy), irrigated (yes / no), yield_bags (per acre).
 */
export const FARMS_CSV = `farm_id,county,acres,rainfall_mm,fertilizer_kg,soil,irrigated,yield_bags
F001,Nakuru,2,711,41,loam,no,20.9
F002,Uasin Gishu,4,969,65,loam,no,24.2
F003,Trans Nzoia,1.5,981,45,clay,no,17.5
F004,Bungoma,2,1348,46,sandy,no,20.7
F005,Kakamega,2,1469,56,loam,no,26.4
F006,Meru,2,1164,58,clay,no,19.5
F007,Machakos,5,527,,sandy,no,13.9
F008,Kitui,1.5,545,54,sandy,no,6.5
F009,Nakuru,2,672,62,loam,no,17.8
F010,Uasin Gishu,1,805,35,clay,no,16.0
F011,Trans Nzoia,4,824,91,loam,no,23.8
F012,Bungoma,0.5,1270,53,loam,no,23.1
F013,Kakamega,1.5,1355,31,clay,no,24.6
F014,Meru,2,1049,68,clay,no,25.3
F015,Machakos,2,505,58,loam,no,16.3
F016,Kitui,0.5,518,53,loam,no,16.0
F017,Nakuru,5,671,33,sandy,no,16.6
F018,Uasin Gishu,0.5,875,40,sandy,no,14.2
F019,Trans Nzoia,2,1009,25,loam,no,24.2
F020,Bungoma,2,1247,82,clay,yes,28.2
F021,Kakamega,4,1364,15,clay,no,21.4
F022,Meru,4,988,71,loam,yes,25.3
F023,Machakos,2,449,93,loam,yes,22.0
F024,Kitui,3,508,,clay,yes,14.0
F025,Nakuru,1,642,0,loam,no,12.2
F026,Uasin Gishu,4,922,46,clay,no,15.7
F027,Trans Nzoia,4,963,26,loam,no,19.9
F028,Bungoma,4,1307,47,loam,no,26.6
F029,Kakamega,2,1529,92,loam,no,30.9
F030,Meru,1,1045,37,clay,no,15.1
F031,Machakos,1,519,49,loam,no,14.4
F032,Kitui,0.5,556,16,loam,no,8.4
F033,Nakuru,1.5,656,82,loam,no,22.0
F034,Uasin Gishu,3,934,45,loam,no,25.8
F035,Trans Nzoia,4,976,43,sandy,no,20.4
F036,Bungoma,1,1222,24,sandy,no,19.0
F037,Kakamega,2.5,1503,46,loam,no,25.0
F038,Meru,4,1126,32,loam,no,19.6
F039,Machakos,0.5,722,58,clay,yes,18.7
F040,Kitui,4,478,76,loam,yes,26.3
F041,Nakuru,1.5,646,26,loam,no,13.3
F042,Uasin Gishu,0.5,861,,clay,no,15.2
F043,Trans Nzoia,2,1050,39,loam,no,20.7
F044,Bungoma,2,1233,92,loam,no,26.1
F045,Kakamega,4,1458,41,loam,no,30.4
F046,Meru,1.5,1024,36,sandy,no,17.4
F047,Machakos,4,420,3,loam,no,10.4
F048,Kitui,1,618,41,clay,yes,22.9
F049,Nakuru,2,712,60,loam,no,19.5
F050,Uasin Gishu,0.5,981,64,loam,yes,27.3
F051,Trans Nzoia,2,1015,14,loam,no,18.1
F052,Bungoma,1,1189,86,sandy,no,24.9
F053,Kakamega,1,1567,20,loam,yes,95.0
F054,Meru,0.5,1257,57,loam,yes,27.6
F055,Machakos,2.5,631,0,sandy,no,10.4
F056,Kitui,1,497,85,sandy,yes,17.5
F057,Nakuru,2.5,715,25,sandy,no,12.8
F058,Uasin Gishu,1,849,40,loam,no,19.9
F059,Trans Nzoia,1.5,1065,35,loam,no,19.9
F060,Bungoma,1,1343,62,clay,no,24.8
F061,Kakamega,0.5,1623,42,loam,no,30.6
F062,Meru,2,1308,74,loam,no,28.3
F063,Machakos,1,388,70,loam,no,17.0
F064,Kitui,0.5,630,5,clay,no,11.7
F065,Nakuru,2.5,717,30,loam,no,16.2
F066,Uasin Gishu,1,953,41,loam,no,18.8
F067,Trans Nzoia,1,945,56,loam,no,19.3
F068,Bungoma,1,1403,,clay,yes,24.8
F069,Kakamega,5,1476,68,clay,no,24.1
F070,Meru,4,1148,0,clay,no,18.2
F071,Machakos,5,683,58,loam,no,19.3
F072,Kitui,1.5,415,49,loam,no,14.3
F073,Nakuru,3,641,21,loam,no,16.6
F074,Uasin Gishu,3,1002,35,clay,no,19.7
F075,Trans Nzoia,2.5,1107,10,loam,no,18.8
F076,Bungoma,4,1205,45,loam,no,28.1
F077,Kakamega,5,1353,0,loam,no,17.6
F078,Meru,4,1158,2,loam,no,21.5
F079,Machakos,1.5,656,27,sandy,yes,15.1
F080,Kitui,1.5,441,44,loam,yes,19.2
`;
