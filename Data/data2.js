const data2 = [
    //Romania
    { country: "Romania", y: 35600, year: 2000, group: "red", x: 1659},
    { country: "Romania", y: 35800, year: 2001, group: "red", x: 1825},
    { country: "Romania", y: 36100, year: 2002, group: "red", x: 2119},
    { country: "Romania", y: 36650, year: 2003, group: "red", x: 2679},
    { country: "Romania", y: 37000, year: 2004, group: "red", x: 3495},
    { country: "Romania", y: 37400, year: 2005, group: "red", x: 4618},
    { country: "Romania", y: 39300, year: 2006, group: "red", x: 5757},
    { country: "Romania", y: 39400, year: 2007, group: "red", x: 8360},
    { country: "Romania", y: 39600, year: 2008, group: "red", x: 10435},
    { country: "Romania", y: 39800, year: 2009, group: "red", x: 8548},
    { country: "Romania", y: 40000, year: 2010, group: "red", x: 8397},
    { country: "Romania", y: 39300, year: 2011, group: "red", x: 9560},
    { country: "Romania", y: 38800, year: 2012, group: "red", x: 8930},
    { country: "Romania", y: 38000, year: 2013, group: "red", x: 9497},
    { country: "Romania", y: 37300, year: 2014, group: "red", x: 10031},
    { country: "Romania", y: 36300, year: 2015, group: "red", x: 8977},
    { country: "Romania", y: 37700, year: 2016, group: "red", x: 9404},
    { country: "Romania", y: 37900, year: 2017, group: "red", x: 10728},
    { country: "Romania", y: 36400, year: 2018, group: "red", x: 12494},
    { country: "Romania", y: 35900, year: 2019, group: "red", x: 12958},
    { country: "Romania", y: 35000, year: 2020, group: "red", x: 13047},
    //Serbia
    { country: "Serbia", y: 28000, year: 2000, group: "red", x: 914},
    { country: "Serbia", y: 27400, year: 2001, group: "red", x: 1727},
    { country: "Serbia", y: 26500, year: 2002, group: "red", x: 2283},
    { country: "Serbia", y: 25400, year: 2003, group: "red", x: 3005},
    { country: "Serbia", y: 24600, year: 2004, group: "red", x: 3502},
    { country: "Serbia", y: 23100, year: 2005, group: "red", x: 3720},
    { country: "Serbia", y: 22800, year: 2006, group: "red", x: 4382},
    { country: "Serbia", y: 22300, year: 2007, group: "red", x: 5848},
    { country: "Serbia", y: 22000, year: 2008, group: "red", x: 7101},
    { country: "Serbia", y: 21700, year: 2009, group: "red", x: 6169},
    { country: "Serbia", y: 20000, year: 2010, group: "red", x: 5735},
    { country: "Serbia", y: 19000, year: 2011, group: "red", x: 6809},
    { country: "Serbia", y: 19200, year: 2012, group: "red", x: 6015},
    { country: "Serbia", y: 18100, year: 2013, group: "red", x: 6755},
    { country: "Serbia", y: 17900, year: 2014,  group: "red", x: 6600},
    { country: "Serbia", y: 16400, year: 2015,  group: "red", x: 5589},
    { country: "Serbia", y: 15300, year: 2016,  group: "red", x: 5765},
    { country: "Serbia", y: 15200, year: 2017,  group: "red", x: 6292},
    { country: "Serbia", y: 14000, year: 2018,  group: "red", x: 7252},
    { country: "Serbia", y: 13600, year: 2019,  group: "red", x: 7417},
    { country: "Serbia", y: 13600, year: 2020,  group: "red", x: 7733},
    //Albania
    { country: "Albania", y: 13500, year: 2000, group: "red", x: 1126},
    { country: "Albania", y: 13650, year: 2001, group: "red", x: 1281},
    { country: "Albania", y: 13800, year: 2002, group: "red", x: 1425},
    { country: "Albania", y: 15900, year: 2003, group: "red", x: 1846},
    { country: "Albania", y: 16300, year: 2004, group: "red", x: 2373},
    { country: "Albania", y: 16600, year: 2005, group: "red", x: 2673},
    { country: "Albania", y: 17700, year: 2006, group: "red", x: 2972},
    { country: "Albania", y: 17900, year: 2007, group: "red", x: 3595},
    { country: "Albania", y: 18400, year: 2008, group: "red", x: 4370},
    { country: "Albania", y: 19000, year: 2009, group: "red", x: 4114},
    { country: "Albania", y: 19400, year: 2010, group: "red", x: 4094},
    { country: "Albania", y: 20600, year: 2011, group: "red", x: 4437},
    { country: "Albania", y: 21000, year: 2012, group: "red", x: 4247},
    { country: "Albania", y: 20400, year: 2013, group: "red", x: 4413},
    { country: "Albania", y: 20200, year: 2014, group: "red", x: 4578},
    { country: "Albania", y: 20000, year: 2015, group: "red", x: 3952},
    { country: "Albania", y: 17400, year: 2016, group: "red", x: 4124},
    { country: "Albania", y: 16000, year: 2017, group: "red", x: 4531},
    { country: "Albania", y: 14300, year: 2018, group: "red", x: 5287},
    { country: "Albania", y: 14000, year: 2019, group: "red", x: 5396},
    { country: "Albania", y: 13200, year: 2020, group: "red", x: 5343},
    //Bosnia and Herzegovina
    { country: "Bosnia and Herzegovina", y: 14400, year: 2000, group: "red", x: 1332},
    { country: "Bosnia and Herzegovina", y: 15000, year: 2001, group: "red", x: 1382},
    { country: "Bosnia and Herzegovina", y: 13700, year: 2002, group: "red", x: 1602},
    { country: "Bosnia and Herzegovina", y: 13700, year: 2003, group: "red", x: 2031},
    { country: "Bosnia and Herzegovina", y: 13700, year: 2004, group: "red", x: 2451},
    { country: "Bosnia and Herzegovina", y: 13700, year: 2005, group: "red", x: 2741},
    { country: "Bosnia and Herzegovina", y: 14100, year: 2006, group: "red", x: 3170},
    { country: "Bosnia and Herzegovina", y: 14500, year: 2007, group: "red", x: 3936},
    { country: "Bosnia and Herzegovina", y: 14400, year: 2008, group: "red", x: 4846},
    { country: "Bosnia and Herzegovina", y: 14300, year: 2009, group: "red", x: 4542},
    { country: "Bosnia and Herzegovina", y: 14000, year: 2010, group: "red", x: 4506},
    { country: "Bosnia and Herzegovina", y: 13700, year: 2011, group: "red", x: 4980},
    { country: "Bosnia and Herzegovina", y: 13400, year: 2012, group: "red", x: 4688},
    { country: "Bosnia and Herzegovina", y: 12800, year: 2013, group: "red", x: 5025},
    { country: "Bosnia and Herzegovina", y: 12200, year: 2014, group: "red", x: 5197},
    { country: "Bosnia and Herzegovina", y: 11500, year: 2015, group: "red", x: 4654},
    { country: "Bosnia and Herzegovina", y: 10600, year: 2016, group: "red", x: 4917},
    { country: "Bosnia and Herzegovina", y: 10200, year: 2017, group: "red", x: 5327},
    { country: "Bosnia and Herzegovina", y: 9900, year: 2018, group: "red", x: 6024},
    { country: "Bosnia and Herzegovina", y: 9700, year: 2019, group: "red", x: 6094},
    { country: "Bosnia and Herzegovina", y: 9500, year: 2020, group: "red", x: 6095},
    //Bulgaria
    { country: "Bulgaria", y: 44000, year: 2000, group: "red", x: 1621},
    { country: "Bulgaria", y: 43100, year: 2001, group: "red", x: 1770},
    { country: "Bulgaria", y: 40400, year: 2002, group: "red", x: 2093},
    { country: "Bulgaria", y: 40700, year: 2003, group: "red", x: 2719},
    { country: "Bulgaria", y: 40800, year: 2004, group: "red", x: 3389},
    { country: "Bulgaria", y: 40900, year: 2005, group: "red", x: 3899},
    { country: "Bulgaria", y: 41000, year: 2006, group: "red", x: 4523},
    { country: "Bulgaria", y: 41200, year: 2007, group: "red", x: 5888},
    { country: "Bulgaria", y: 43400, year: 2008, group: "red", x: 7271},
    { country: "Bulgaria", y: 42800, year: 2009, group: "red", x: 6988},
    { country: "Bulgaria", y: 42000, year: 2010, group: "red", x: 6863},
    { country: "Bulgaria", y: 41700, year: 2011, group: "red", x: 7857},
    { country: "Bulgaria", y: 42500, year: 2012, group: "red", x: 7430},
    { country: "Bulgaria", y: 42000, year: 2013, group: "red", x: 7687},
    { country: "Bulgaria", y: 41300, year: 2014, group: "red", x: 7912},
    { country: "Bulgaria", y: 39400, year: 2015, group: "red", x: 7078},
    { country: "Bulgaria", y: 38700, year: 2016, group: "red", x: 7570},
    { country: "Bulgaria", y: 38200, year: 2017, group: "red", x: 8381},
    { country: "Bulgaria", y: 38900, year: 2018, group: "red", x: 9447},
    { country: "Bulgaria", y: 39300, year: 2019, group: "red", x: 9874},
    { country: "Bulgaria", y: 37900, year: 2020, group: "red", x: 10148},
    // Croatia
    { country: "Croatia", y: 16000, year: 2000,  group: "red", x: 4952},
    { country: "Croatia", y: 15800, year: 2001,  group: "red", x: 5364},
    { country: "Croatia", y: 15600, year: 2002,  group: "red", x: 6219},
    { country: "Croatia", y: 15400, year: 2003,  group: "red", x: 8192},
    { country: "Croatia", y: 15100, year: 2004,  group: "red", x: 9723},
    { country: "Croatia", y: 14800, year: 2005,  group: "red", x: 10446},
    { country: "Croatia", y: 14400, year: 2006,  group: "red", x: 11505},
    { country: "Croatia", y: 14300, year: 2007,  group: "red", x: 13762},
    { country: "Croatia", y: 13600, year: 2008,  group: "red", x: 15898},
    { country: "Croatia", y: 12900, year: 2009,  group: "red", x: 14421},
    { country: "Croatia", y: 12400, year: 2010,  group: "red", x: 13693},
    { country: "Croatia", y: 11900, year: 2011,  group: "red", x: 14655},
    { country: "Croatia", y: 11500, year: 2012,  group: "red", x: 13439},
    { country: "Croatia", y: 11200, year: 2013,  group: "red", x: 13979},
    { country: "Croatia", y: 10400, year: 2014,  group: "red", x: 14001},
    { country: "Croatia", y: 9900, year: 2015,  group: "red", x: 12098},
    { country: "Croatia", y: 9600, year: 2016,  group: "red", x: 12579},
    { country: "Croatia", y: 9300, year: 2017,  group: "red", x: 13592},
    { country: "Croatia", y: 8600, year: 2018,  group: "red", x: 15040},
    { country: "Croatia", y: 8100, year: 2019,  group: "red", x: 15120},
    { country: "Croatia", y: 7600, year: 2020,  group: "red", x: 14269},
    // Montenegro
    { country: "Montenegro", y: 21100, year: 2000, group: "red", x: 1627},
    { country: "Montenegro", y: 20100, year: 2001, group: "red", x: 1909},
    { country: "Montenegro", y: 18000, year: 2002, group: "red", x: 2106},
    { country: "Montenegro", y: 17200, year: 2003, group: "red", x: 2789},
    { country: "Montenegro", y: 17300, year: 2004, group: "red", x: 3380},
    { country: "Montenegro", y: 17400, year: 2005, group: "red", x: 3674},
    { country: "Montenegro", y: 17500, year: 2006, group: "red", x: 4425},
    { country: "Montenegro", y: 17600, year: 2007, group: "red", x: 5976},
    { country: "Montenegro", y: 17400, year: 2008, group: "red", x: 7367},
    { country: "Montenegro", y: 17000, year: 2009, group: "red", x: 6727},
    { country: "Montenegro", y: 16800, year: 2010, group: "red", x: 6688},
    { country: "Montenegro", y: 14300, year: 2011, group: "red", x: 7328},
    { country: "Montenegro", y: 13300, year: 2012, group: "red", x: 6586},
    { country: "Montenegro", y: 13000, year: 2013, group: "red", x: 7188},
    { country: "Montenegro", y: 12400, year: 2014, group: "red", x: 7387},
    { country: "Montenegro", y: 11000, year: 2015, group: "red", x: 6517},
    { country: "Montenegro", y: 10400, year: 2016, group: "red", x: 7033},
    { country: "Montenegro", y: 10100, year: 2017, group: "red", x: 7803},
    { country: "Montenegro", y: 9700, year: 2018, group: "red", x: 8850},
    { country: "Montenegro", y: 11400, year: 2019, group: "red", x: 8909},
    { country: "Montenegro", y: 9500, year: 2020, group: "red", x: 7677},
    //North Macedonia
    { country: "North Macedonia", y: 26000, year: 2000,  group: "red", x: 1861},
    { country: "North Macedonia", y: 25800, year: 2001,  group: "red", x: 1823},
    { country: "North Macedonia", y: 25500, year: 2002,  group: "red", x: 1989},
    { country: "North Macedonia", y: 25400, year: 2003,  group: "red", x: 2440},
    { country: "North Macedonia", y: 25100, year: 2004,  group: "red", x: 2795},
    { country: "North Macedonia", y: 23800, year: 2005,  group: "red", x: 3072},
    { country: "North Macedonia", y: 21900, year: 2006,  group: "red", x: 3363},
    { country: "North Macedonia", y: 20500, year: 2007,  group: "red", x: 4079},
    { country: "North Macedonia", y: 19800, year: 2008,  group: "red", x: 4841},
    { country: "North Macedonia", y: 19900, year: 2009,  group: "red", x: 4584},
    { country: "North Macedonia", y: 19600, year: 2010,  group: "red", x: 4577},
    { country: "North Macedonia", y: 18100, year: 2011,  group: "red", x: 5098},
    { country: "North Macedonia", y: 17500, year: 2012,  group: "red", x: 4728},
    { country: "North Macedonia", y: 17100, year: 2013,  group: "red", x: 5241},
    { country: "North Macedonia", y: 16800, year: 2014,  group: "red", x: 5495},
    { country: "North Macedonia", y: 16400, year: 2015,  group: "red", x: 4861},
    { country: "North Macedonia", y: 16000, year: 2016,  group: "red", x: 5149},
    { country: "North Macedonia", y: 15800, year: 2017,  group: "red", x: 5450},
    { country: "North Macedonia", y: 15500, year: 2018,  group: "red", x: 6108},
    { country: "North Macedonia", y: 15600, year: 2019,  group: "red", x: 6070},
    { country: "North Macedonia", y: 16200, year: 2020,  group: "red", x: 5965},
    //Slovenia
    {country: "Slovenia", y: 6900, year: 2000,  group: "red", x: 10201},
    {country: "Slovenia", y: 6700, year: 2001,  group: "red", x: 10479},
    {country: "Slovenia", y: 6600, year: 2002,  group: "red", x: 11777},
    {country: "Slovenia", y: 6300, year: 2003,  group: "red", x: 14849},
    {country: "Slovenia", y: 6000, year: 2004,  group: "red", x: 17233},
    {country: "Slovenia", y: 5800, year: 2005,  group: "red", x: 18098},
    {country: "Slovenia", y: 5500, year: 2006,  group: "red", x: 19673},
    {country: "Slovenia", y: 5100, year: 2007,  group: "red", x: 23817},
    {country: "Slovenia", y: 5100, year: 2008,  group: "red", x: 27595},
    {country: "Slovenia", y: 5000, year: 2009,  group: "red", x: 24792},
    {country: "Slovenia", y: 4900, year: 2010,  group: "red", x: 23532},
    {country: "Slovenia", y: 4870, year: 2011,  group: "red", x: 25128},
    {country: "Slovenia", y: 4780, year: 2012,  group: "red", x: 22641},
    {country: "Slovenia", y: 4700, year: 2013,  group: "red", x: 23503},
    {country: "Slovenia", y: 4600, year: 2014,  group: "red", x: 24247},
    {country: "Slovenia", y: 4500, year: 2015,  group: "red", x: 20890},
    {country: "Slovenia", y: 4520, year: 2016,  group: "red", x: 21678},
    {country: "Slovenia", y: 4550, year: 2017,  group: "red", x: 23514},
    {country: "Slovenia", y: 4570, year: 2018,  group: "red", x: 26123},
    {country: "Slovenia", y: 4600, year: 2019,  group: "red", x: 26042},
    {country: "Slovenia", y: 4200, year: 2020,  group: "red", x: 25558},
    //Sweden 
    {country: "Sweden", y: 4350, year: 2000,  group: "blue", x: 29624},
    {country: "Sweden", y: 3690, year: 2001,  group: "blue", x: 27247},
    {country: "Sweden", y: 6023, year: 2002,  group: "blue", x: 29899},
    {country: "Sweden", y: 6029, year: 2003,  group: "blue", x: 37321},
    {country: "Sweden", y: 3761, year: 2004,  group: "blue", x: 42821},
    {country: "Sweden", y: 4672, year: 2005,  group: "blue", x: 43437},
    {country: "Sweden", y: 5397, year: 2006,  group: "blue", x: 46593},
    {country: "Sweden", y: 4882, year: 2007,  group: "blue", x: 53700},
    {country: "Sweden", y: 3741, year: 2008,  group: "blue", x: 56152},
    {country: "Sweden", y: 3082, year: 2009,  group: "blue", x: 46947},
    {country: "Sweden", y: 6332, year: 2010,  group: "blue", x: 52869},
    {country: "Sweden", y: 4259, year: 2011,  group: "blue", x: 60755},
    {country: "Sweden", y: 6660, year: 2012,  group: "blue", x: 58037},
    {country: "Sweden", y: 3577, year: 2013,  group: "blue", x: 61126},
    {country: "Sweden", y: 3577, year: 2014,  group: "blue", x: 60020},
    {country: "Sweden", y: 4392, year: 2015,  group: "blue", x: 51545},
    {country: "Sweden", y: 5837, year: 2016,  group: "blue", x: 51965},
    {country: "Sweden", y: 5938, year: 2017,  group: "blue", x: 53791},
    {country: "Sweden", y: 6051, year: 2018,  group: "blue", x: 54589},
    {country: "Sweden", y: 6876, year: 2019,  group: "blue", x: 51939},
    {country: "Sweden", y: 4714, year: 2020,  group: "blue", x: 52837},
    //Denmark
    {country: "Denmark", y: 5794, year: 2000,  group: "blue", x: 30743},
    {country: "Denmark", y: 2014, year: 2001,  group: "blue", x: 30751},
    {country: "Denmark", y: 2427, year: 2002,  group: "blue", x: 33228},
    {country: "Denmark", y: 7607, year: 2003,  group: "blue", x: 40458},
    {country: "Denmark", y: 5301, year: 2004,  group: "blue", x: 46511},
    {country: "Denmark", y: 4586, year: 2005,  group: "blue", x: 48799},
    {country: "Denmark", y: 2168, year: 2006,  group: "blue", x: 52027},
    {country: "Denmark", y: 5419, year: 2007,  group: "blue", x: 58487},
    {country: "Denmark", y: 4441, year: 2008,  group: "blue", x: 64322},
    {country: "Denmark", y: 6001, year: 2009,  group: "blue", x: 58163},
    {country: "Denmark", y: 4852, year: 2010,  group: "blue", x: 58041},
    {country: "Denmark", y: 3869, year: 2011,  group: "blue", x: 61753},
    {country: "Denmark", y: 2649, year: 2012,  group: "blue", x: 58507},
    {country: "Denmark", y: 7477, year: 2013,  group: "blue", x: 61191},
    {country: "Denmark", y: 4766, year: 2014,  group: "blue", x: 62549},
    {country: "Denmark", y: 3707, year: 2015,  group: "blue", x: 53254},
    {country: "Denmark", y: 3291, year: 2016,  group: "blue", x: 54664},
    {country: "Denmark", y: 5899, year: 2017,  group: "blue", x: 57610},
    {country: "Denmark", y: 7920, year: 2018,  group: "blue", x: 61591},
    {country: "Denmark", y: 7099, year: 2019,  group: "blue", x: 59593},
    {country: "Denmark", y: 5380, year: 2020,  group: "blue", x: 60836},
    //Norway
    {country: "Norway", y: 3694, year: 2000,  group: "blue", x: 38178},
    {country: "Norway", y: 8230, year: 2001,  group: "blue", x: 38601},
    {country: "Norway", y: 8515, year: 2002,  group: "blue", x: 43170},
    {country: "Norway", y: 4967, year: 2003,  group: "blue", x: 50250},
    {country: "Norway", y: 4661, year: 2004,  group: "blue", x: 57768},
    {country: "Norway", y: 2978, year: 2005,  group: "blue", x: 67047},
    {country: "Norway", y: 7575, year: 2006,  group: "blue", x: 74434},
    {country: "Norway", y: 10862, year: 2007,  group: "blue", x: 85502},
    {country: "Norway", y: 2745, year: 2008,  group: "blue", x: 97503},
    {country: "Norway", y: 2354, year: 2009,  group: "blue", x: 80347},
    {country: "Norway", y: 2795, year: 2010,  group: "blue", x: 88163},
    {country: "Norway", y: 3468, year: 2011,  group: "blue", x: 101221},
    {country: "Norway", y: 7678, year: 2012,  group: "blue", x: 102175},
    {country: "Norway", y: 11913, year: 2013,  group: "blue", x: 103553},
    {country: "Norway", y: 6471, year: 2014,  group: "blue", x: 97666},
    {country: "Norway", y: 4512, year: 2015,  group: "blue", x: 74810},
    {country: "Norway", y: 2106, year: 2016,  group: "blue", x: 70867},
    {country: "Norway", y: 4294, year: 2017,  group: "blue", x: 76131},
    {country: "Norway", y: 3239, year: 2018,  group: "blue", x: 82792},
    {country: "Norway", y: 6931, year: 2019,  group: "blue", x: 76430},
    {country: "Norway", y: 5597, year: 2020,  group: "blue", x: 68340},
    //Singapore
    {country: "Singapore", y: 5569, year: 2000,  group: "yellow", x: 23852},
    {country: "Singapore", y: 5517, year: 2001,  group: "yellow", x: 21699},
    {country: "Singapore", y: 7315, year: 2002,  group: "yellow", x: 22159},
    {country: "Singapore", y: 5955, year: 2003,  group: "yellow", x: 23730},
    {country: "Singapore", y: 8256, year: 2004,  group: "yellow", x: 27608},
    {country: "Singapore", y: 3671, year: 2005,  group: "yellow", x: 29961},
    {country: "Singapore", y: 4712, year: 2006,  group: "yellow", x: 33768},
    {country: "Singapore", y: 4755, year: 2007, group: "yellow", x: 39432},
    {country: "Singapore", y: 3445, year: 2008, group: "yellow", x: 40008},
    {country: "Singapore", y: 5944, year: 2009, group: "yellow", x: 38926},
    {country: "Singapore", y: 4518, year: 2010, group: "yellow", x: 47236},
    {country: "Singapore", y: 7114, year: 2011, group: "yellow", x: 53891},
    {country: "Singapore", y: 5371, year: 2012, group: "yellow", x: 55547},
    {country: "Singapore", y: 8210, year: 2013, group: "yellow", x: 56967},
    {country: "Singapore", y: 5159, year: 2014, group: "yellow", x: 57564},
    {country: "Singapore", y: 5477, year: 2015, group: "yellow", x: 55645},
    {country: "Singapore", y: 3736, year: 2016, group: "yellow", x: 56895},
    {country: "Singapore", y: 4880, year: 2017, group: "yellow", x: 61164},
    {country: "Singapore", y: 6996, year: 2018, group: "yellow", x: 66836},
    {country: "Singapore", y: 3321, year: 2019, group: "yellow", x: 66070},
    {country: "Singapore", y: 6626, year: 2020, group: "yellow", x: 61274},
    //Syria
    {country: "Syria", y: 49310, year: 2000, group: "yellow", x: 4941},
    {country: "Syria", y: 44754, year: 2001, group: "yellow", x: 5187},
    {country: "Syria", y: 52120, year: 2002, group: "yellow", x: 5276},
    {country: "Syria", y: 40597, year: 2003, group: "yellow", x: 5433},
    {country: "Syria", y: 48478, year: 2004, group: "yellow", x: 6241},
    {country: "Syria", y: 46171, year: 2005, group: "yellow", x: 7221},
    {country: "Syria", y: 42299, year: 2006, group: "yellow", x: 7914},
    {country: "Syria", y: 50182, year: 2007, group: "yellow", x: 8695},
    {country: "Syria", y: 55239, year: 2008, group: "yellow", x: 10156},
    {country: "Syria", y: 42922, year: 2009, group: "yellow", x: 10288},
    {country: "Syria", y: 39439, year: 2010, group: "yellow", x: 11304},
    {country: "Syria", y: 47910, year: 2011, group: "yellow", x: 2971},
    {country: "Syria", y: 55923, year: 2012, group: "yellow", x: 1910},
    {country: "Syria", y: 52477, year: 2013, group: "yellow", x: 993},
    {country: "Syria", y: 52556, year: 2014, group: "yellow", x: 1071},
    {country: "Syria", y: 47353, year: 2015, group: "yellow", x: 857},
    {country: "Syria", y: 55850, year: 2016, group: "yellow", x: 664},
    {country: "Syria", y: 51781, year: 2017, group: "yellow", x: 862},
    {country: "Syria", y: 43792, year: 2018, group: "yellow", x: 1111},
    {country: "Syria", y: 54342, year: 2019, group: "yellow", x: 1124},
    {country: "Syria", y: 50881, year: 2020, group: "yellow", x: 537},
    //South Korea
    {country: "South Korea", y: 2657, year: 2000, group: "yellow", x: 12257},
    {country: "South Korea", y: 2707, year: 2001, group: "yellow", x: 11561},
    {country: "South Korea", y: 2957, year: 2002, group: "yellow", x: 13165},
    {country: "South Korea", y: 2570, year: 2003, group: "yellow", x: 14672},
    {country: "South Korea", y: 2452, year: 2004, group: "yellow", x: 16496},
    {country: "South Korea", y: 2074, year: 2005, group: "yellow", x: 19402},
    {country: "South Korea", y: 2182, year: 2006, group: "yellow", x: 21743},
    {country: "South Korea", y: 2791, year: 2007, group: "yellow", x: 24086},
    {country: "South Korea", y: 2749, year: 2008, group: "yellow", x: 21350},
    {country: "South Korea", y: 2685, year: 2009, group: "yellow", x: 19143},
    {country: "South Korea", y: 2420, year: 2010, group: "yellow", x: 23079},
    {country: "South Korea", y: 2971, year: 2011, group: "yellow", x: 25097},
    {country: "South Korea", y: 2741, year: 2012, group: "yellow", x: 25459},
    {country: "South Korea", y: 2652, year: 2013, group: "yellow", x: 27179},
    {country: "South Korea", y: 2159, year: 2014, group: "yellow", x: 29252},
    {country: "South Korea", y: 2583, year: 2015, group: "yellow", x: 28737},
    {country: "South Korea", y: 2289, year: 2016, group: "yellow", x: 29280},
    {country: "South Korea", y: 2791, year: 2017, group: "yellow", x: 31600},
    {country: "South Korea", y: 2711, year: 2018, group: "yellow", x: 33447},
    {country: "South Korea", y: 2733, year: 2019, group: "yellow", x: 31902},
    {country: "South Korea", y: 2091, year: 2020, group: "yellow", x: 31721},
]
    
    

// var dataGroupToColorNewData = new DataGroupToColor(data2)

// var createNewMapping = dataGroupToColorNewData.creategroupToColorMap()

// //Test> What is createNewMapping?
// console.log("CreateNewMapping is ", createNewMapping)
// //Test> What is createNewMapping?