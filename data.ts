
import { Medication, Protocol, Procedure, ItemType, SearchableItem, Dosage } from './types';

export const medications: Medication[] = [
  {
    id: 'med-adenosine',
    name: 'אדנוזין (Adenosine)',
    indication: 'טכיקרדיה סופרה-ונטריקולרית (SVT) יציבה',
    type: ItemType.Medication,
    concentration: 3, // 6mg/2ml
    notes: 'בעלת זמן מחצית חיים קצר מאוד. יש להזריק בדחיפה מהירה ולאחריה שטיפת סליין מהירה. עלולה לגרום לאסיסטולה חולפת, לחץ בחזה וקוצר נשימה.',
    contraindications: ['רגישות ידועה', 'בלוק הולכה מדרגה 2 או 3', 'Sick Sinus Syndrome', 'אסתמה (התווית נגד יחסית).'],
    category: 'אנטי-אריתמיה',
    mechanismOfAction: 'מאט את ההולכה דרך צומת ה-AV על ידי הפעלת קולטני אדנוזין A1. גורם לחסימה זמנית של ההולכה וניתוק מעגל ריאנטרי ב-SVT.',
    pharmacokinetics: 'זמן מחצית חיים קצר מאוד (פחות מ-10 שניות). מטבוליזם מיידי על ידי אריתרוציטים ואנדותל כלי הדם. תחילת פעולה: מיידית. משך פעולה: שניות בודדות.',
    sideEffects: 'אסיסטולה חולפת, לחץ בחזה, קוצר נשימה, סומק בפנים, כאב ראש, בחילה. רוב התופעות חולפות תוך שניות.',
    administrationForms: 'אמפולה 6mg/2ml. יש למתן בדחיפה מהירה ככל האפשר עם שטיפת סליין מיידית.',
    pregnancySafety: 'קטגוריה C. זמן מחצית חיים קצר מאוד ממזער את החשיפה העוברית. ניתן לשימוש בהריון כאשר יש התוויה ברורה.',
    relatedProtocols: [
      { id: 'pro_tachycardia', name: 'טכיקרדיה' }
    ],
    dosages: [
      { indication: 'SVT (מבוגר) - מנה 1', fixedDose: 6, route: 'IV', administrationNotes: 'בדחיפה מהירה ככל האפשר.' },
      { indication: 'SVT (מבוגר) - מנה 2', fixedDose: 12, route: 'IV', administrationNotes: 'אם אין תגובה לאחר 1-2 דקות, ניתן לתת מנה שנייה של 12 מ"ג.' },
      { indication: 'SVT (ילדים) - מנה 1', dosePerKg: 0.1, maxDose: 6, route: 'IV/IO', administrationNotes: 'בדחיפה מהירה.' },
      { indication: 'SVT (ילדים) - מנה 2', dosePerKg: 0.2, maxDose: 12, route: 'IV/IO', administrationNotes: 'אם אין תגובה, ניתן לתת מנה שנייה.' },
    ],
  },
  {
    id: 'med1',
    name: 'אדרנלין (Epinephrine)',
    indication: 'דום לב, אנאפילקסיס, אסתמה, סטרידור, ברדיקרדיה',
    type: ItemType.Medication,
    concentration: 1, // 1mg/1ml
    notes: 'תרופת הבחירה באנאפילקסיס. מיקום הזרקה מועדף ב-IM – שריר הירך.',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'אמפולה של 1 מ"ג / 1 מ"ל.',
    storage: 'טמפרטורת החדר, מוגן מאור.',
    contraindications: ['אין התוויות נגד מוחלטות בדום לב או אנאפילקסיס.'],
    category: 'קטכולמינים / אמינים סימפטומימטיים',
    mechanismOfAction: 'אגוניסט לקולטנים אלפא ובטא אדרנרגיים. גורם להיצרות כלי דם פריפריים (אלפא-1), הרחבת סמפונות והגברת קצב הלב וכוח ההתכווצות (בטא-1, בטא-2).',
    pharmacokinetics: 'תחילת פעולה: IV מיידי, IM 5-10 דקות, SC 5-15 דקות. משך פעולה: 5-10 דקות. מטבוליזם בכבד על ידי COMT ו-MAO.',
    sideEffects: 'טכיקרדיה, יתר לחץ דם, הפרעות קצב, חרדה, רעד, כאב ראש, בחילה. במינון גבוה: איסכמיה לבבית.',
    administrationForms: 'אמפולה 1mg/1ml (1:1000), מזרק מוכן 0.3mg או 0.5mg (EpiPen), תמיסה לאינהלציה.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יש להשתמש רק כאשר התועלת עולה על הסיכון. בהנקה: עובר לחלב אך בכמות זניחה.',
    relatedProtocols: [
      { id: 'pro_anaphylaxis', name: 'אנאפילקסיס' },
      { id: 'pro_vf_pvt', name: 'VF / Pulseless VT' },
      { id: 'pro_asystole_pea', name: 'אסיסטולה / PEA' },
      { id: 'pro_asthma', name: 'אסתמה' }
    ],
    dosages: [
        // מבוגרים
        { indication: 'דום לב (מבוגר)', fixedDose: 1, route: 'IV/IO', administrationNotes: 'יש לחזור על המנה כל 3-5 דקות. מתן ב-E.T: 3 מ"ג מהולים ב-3-5 מ"ל סליין.' },
        { indication: 'ברדיקרדיה / ירידה בפרפוזיה / ROSC (מבוגר)', fixedDose: 0, route: 'IV', administrationNotes: '2-10 mcg/min ב-DRIP או 10-20 mcg ב-PUSH במנות חוזרות.' },
        { indication: 'אסתמה (מבוגר)', fixedDose: 0.3, route: 'SC', administrationNotes: '0.3 מ"ג ב-S.C או 0.5 מ"ג ב-I.M.' },
        { indication: 'אנפילקסיס - תגובה קשה (מבוגר)', fixedDose: 0.5, route: 'IM', administrationNotes: '0.3-0.5 מ"ג ב-I.M. אפשר לחזור על המנה עד 3 פעמים בהפרש של 10 דקות בין המנות. מיקום הזרקה מועדף – שריר הירך.' },
        { indication: 'דום לב באנפילקסיס (מבוגר)', fixedDose: 1, route: 'IV', administrationNotes: 'מתן ב-I.V כל 2 דקות.' },
        // ילדים
        { indication: 'דום לב / ברדיקרדיה (ילדים)', dosePerKg: 0.01, maxDose: 1, route: 'IV/IO', administrationNotes: 'יש לחזור על המנה כל 3-5 דקות בהחייאה. מתן ב-E.T: 0.1 מ"ג/ק"ג מהולים ב-3-5 מ"ל סליין.' },
        { indication: 'החייאת יילוד', dosePerKg: 0.02, route: 'IV/IO', administrationNotes: 'מינון 0.01-0.03 מ"ג/ק"ג.' },
        { indication: 'אנפילקסיס - תגובה קשה (ילדים)', dosePerKg: 0.01, maxDose: 0.5, route: 'IM', administrationNotes: 'מיקום הזרקה מועדף – שריר הירך.' },
        { indication: 'דום לב באנפילקסיס (ילדים)', dosePerKg: 0.01, maxDose: 1, route: 'IV', administrationNotes: 'מתן כל 2 דקות.' },
        { indication: 'אסתמה (ילדים)', dosePerKg: 0.01, maxDose: 0.4, route: 'SC/IM', administrationNotes: 'מתן ב-S.C או I.M.' },
        { indication: 'סטרידור (ילדים)', dosePerKg: 0.5, maxDose: 5, route: 'Inhalation', administrationNotes: 'מינון 0.25-0.5 מ"ג/ק"ג. מקסימום 5 מ"ג בנפח 5 מ"ל. מתן באינהלציה.' }
    ]
  },
  {
    id: 'med-dipyrone',
    name: 'אופטלגין (Dipyrone)',
    indication: 'כאב חזק, הורדת חום',
    type: ItemType.Medication,
    concentration: 500, // 1g/2ml
    notes: 'יש להזריק באיטיות במתן IV כדי למנוע תת-לחץ דם. עלול לגרום לתגובות אלרגיות.',
    contraindications: ['רגישות ידועה לתרופה', 'חסר באנזים G6PD', 'היסטוריה של אגרנולוציטוזיס.'],
    category: 'משככי כאבים / נוגדי חום',
    mechanismOfAction: 'מעכב סינתזה של פרוסטגלנדינים במערכת העצבים המרכזית. משפיע על מרכז הויסות התרמי בהיפותלמוס להורדת חום.',
    pharmacokinetics: 'תחילת פעולה: IV 15-30 דקות, IM 30-60 דקות. משך פעולה: 4-6 שעות. מטבוליזם בכבד, הפרשה בשתן.',
    sideEffects: 'תת-לחץ דם (במתן IV מהיר), תגובות אלרגיות, אגרנולוציטוזיס (נדיר אך חמור), בחילות.',
    administrationForms: 'אמפולה 1g/2ml למתן IV/IM. טבליות וסירופ למתן פומי.',
    pregnancySafety: 'אסור בשליש השלישי. יש להימנע בהריון. בהנקה: עובר לחלב בכמות קטנה.',
    relatedProtocols: [],
    dosages: [
      { indication: 'כאב/חום (מבוגר)', fixedDose: 1000, route: 'IV/IM', administrationNotes: 'בהזרקה איטית (מעל 2-3 דקות) ב-IV.' },
      { indication: 'כאב/חום (ילדים)', dosePerKg: 10, maxDose: 1000, route: 'IV/IM', administrationNotes: '10-15 מ"ג/ק"ג.' },
    ],
  },
  {
    id: 'med-etomidate',
    name: 'אטומידאט (Etomidate)',
    indication: 'סדציה לאינטובציה (RSI)',
    type: ItemType.Medication,
    concentration: 2, // 20mg/10ml
    notes: 'סם הרדמה בעל פרופיל המודינמי יציב (אינו גורם לרוב לירידת לחץ דם). עלול לגרום לתנועות מיוקלוניות ודיכוי של בלוטת יותרת הכליה.',
    contraindications: ['רגישות ידועה לתרופה.'],
    category: 'סמי הרדמה',
    mechanismOfAction: 'מגביר את פעילות GABA על ידי קישור לתת-יחידת אלפא של קולטן GABA-A. גורם להרדמה מהירה עם יציבות המודינמית.',
    pharmacokinetics: 'תחילת פעולה: IV 15-45 שניות. משך פעולה: 3-5 דקות. זמן מחצית חיים: 2-5 שעות. מטבוליזם בכבד.',
    sideEffects: 'תנועות מיוקלוניות, כאב במקום ההזרקה, בחילות והקאות, דיכוי בלוטת יותרת הכליה (לא מומלץ לשימוש ממושך באלח דם).',
    administrationForms: 'אמפולה 20mg/10ml למתן IV.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. ניתן לשימוש ב-RSI בהריון כאשר יש צורך ביציבות המודינמית.',
    relatedProtocols: [],
    dosages: [
      { indication: 'סדציה (RSI)', dosePerKg: 0.3, route: 'IV', administrationNotes: 'טווח מינון 0.2-0.4 מ"ג/ק"ג.' },
    ],
  },
  {
    id: 'med5',
    name: 'אטרופין (Atropine)',
    indication: 'ברדיקרדיה סימפטומטית, הרעלת זרחנים אורגניים',
    type: ItemType.Medication,
    concentration: 1, // 1mg/1ml
    notes: 'מנה מקסימלית כוללת במבוגר 3 מ"ג בברדיקרדיה. פחות יעיל בחסמי הולכה נמוכים (Mobitz II, דרגה 3). בהרעלת זרחנים אורגניים אין הגבלת מינון - יש לטטר לפי התייבשות הפרשות.',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'מזרק מוכן (1 מ"ג/10 מ"ל) או אמפולה (1 מ"ג/1 מ"ל).',
    storage: 'טמפרטורת החדר.',
    contraindications: ['טכיקרדיה', 'גלאוקומה זווית-צרה', 'פחות יעיל בחסמי הולכה נמוכים (Mobitz II, דרגה 3).'],
    category: 'אנטי-כולינרגי / פאראסימפטוליטי',
    mechanismOfAction: 'חוסם קולטנים מוסקריניים של אצטילכולין. מעלה את קצב הלב על ידי הפחתת השפעה וגאלית. גורם להרפיית שרירים חלקים ולהפחתת הפרשות.',
    pharmacokinetics: 'תחילת פעולה: IV 1-2 דקות, IM 5-40 דקות. משך פעולה: 4-6 שעות. זמן מחצית חיים: 2-3 שעות. מטבוליזם בכבד, הפרשה בשתן.',
    sideEffects: 'יובש בפה, טשטוש ראייה, עצירות, עכבת שתן, טכיקרדיה, בלבול (בעיקר בקשישים), הזעה מופחתת.',
    administrationForms: 'אמפולה 1mg/1ml או מזרק מוכן 1mg/10ml למתן IV/IM.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. ניתן לשימוש בהריון כאשר יש התוויה ברורה. בהנקה: עובר לחלב בכמות קטנה.',
    relatedProtocols: [
      { id: 'pro_bradycardia', name: 'ברדיקרדיה' }
    ],
    dosages: [
        { indication: 'ברדיקרדיה (מבוגרים)', fixedDose: 1, maxDose: 3, route: 'IV', administrationNotes: 'בדחיפה מהירה. ניתן לחזור כל 3-5 דקות. אין צורך במהילה.' },
        { indication: 'ברדיקרדיה (ילדים)', dosePerKg: 0.02, route: 'IV/IO', administrationNotes: 'מנה מינימלית 0.1 מ"ג. מנה מקסימלית למנה בודדת 0.5 מ"ג.' },
        { indication: 'הרעלת זרחנים אורגניים (מבוגר)', fixedDose: 2, route: 'IV/IM', administrationNotes: 'מנה התחלתית 2-4 מ"ג. יש לחזור כל 5-10 דקות עד להתייבשות הפרשות. אין הגבלת מינון מקסימלי.' },
        { indication: 'הרעלת זרחנים אורגניים (ילדים)', dosePerKg: 0.05, route: 'IV/IM', administrationNotes: 'יש לחזור כל 5-10 דקות עד להתייבשות הפרשות.' },
    ]
  },
   {
    id: 'med-verapamil',
    name: 'איקקור (Verapamil)',
    indication: 'SVT, שליטה על קצב בפרפור/רפרוף עליות',
    type: ItemType.Medication,
    concentration: 2.5, // 5mg/2ml
    notes: 'חוסם תעלות סידן. עלול לגרום לתת-לחץ דם וברדיקרדיה. יש לתת באיטיות.',
    contraindications: ['תת-לחץ דם או הלם קרדיוגני', 'בלוק הולכה מדרגה 2 או 3', 'תסמונת WPW עם פרפור/רפרוף עליות', 'שימוש קודם בחוסמי בטא IV.'],
    category: 'חוסמי תעלות סידן',
    mechanismOfAction: 'חוסם תעלות סידן מסוג L בשריר הלב וצומת ה-AV. מאט את ההולכה דרך צומת ה-AV, מפחית כוח התכווצות ומרחיב כלי דם.',
    pharmacokinetics: 'תחילת פעולה: IV 1-5 דקות. משך פעולה: 10-20 דקות (IV). זמן מחצית חיים: 2-8 שעות. מטבוליזם נרחב בכבד.',
    sideEffects: 'תת-לחץ דם, ברדיקרדיה, עצירות, בחילות, סחרחורת. במתן IV: החמרת אי-ספיקת לב.',
    administrationForms: 'אמפולה 5mg/2ml למתן IV.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. ניתן לשימוש בהריון לטיפול ב-SVT כאשר יש צורך. בהנקה: עובר לחלב.',
    relatedProtocols: [
      { id: 'pro_tachycardia', name: 'טכיקרדיה' }
    ],
    dosages: [
        { indication: 'טכיקרדיה (מבוגר)', fixedDose: 2.5, route: 'IV', administrationNotes: '2.5-5 מ"ג בהזרקה איטית על פני 2 דקות. ניתן לחזור על המנה לאחר 15-30 דקות.' },
    ],
  },
   {
    id: 'med-ipratropium',
    name: 'אירובנט (Ipratropium Bromide)',
    indication: 'התקף אסתמה, ברונכוספאזם, COPD, הרעלת זרחנים אורגניים',
    type: ItemType.Medication,
    concentration: 0.25, // 0.5mg/2ml
    notes: 'תרופה אנטי-כולינרגית הגורמת להרחבת סימפונות. ניתנת לרוב בשילוב עם ונטולין (סלבוטמול). בהרעלת זרחנים אורגניים משמשת כחלק מהטיפול הנשימתי.',
    contraindications: ['רגישות ידועה לאטרופין או נגזרותיו', 'גלאוקומה זווית-צרה.'],
    category: 'אנטי-כולינרגי / מרחיבי סימפונות',
    mechanismOfAction: 'חוסם קולטני מוסקריניים (אצטילכולין) בשרירים חלקים של הסימפונות. גורם להרחבת דרכי האוויר על ידי עיכוב כיווץ הסימפונות.',
    pharmacokinetics: 'תחילת פעולה: 15-30 דקות. משך פעולה: 4-6 שעות. ספיגה סיסטמית מינימלית באינהלציה. מטבוליזם בכבד.',
    sideEffects: 'יובש בפה, שיעול, כאב ראש, בחילות. בשימוש לא זהיר סמוך לעיניים: עליה בלחץ תוך-עיני, טשטוש ראייה.',
    administrationForms: 'תמיסה לנבולייזר 0.5mg/2ml. משאף (MDI) 20mcg/puff.',
    pregnancySafety: 'קטגוריה B. ספיגה סיסטמית מינימלית. נחשב בטוח יחסית בהריון.',
    relatedProtocols: [
      { id: 'pro_asthma', name: 'אסתמה' }
    ],
    dosages: [
        { indication: 'ברונכוספאזם (מבוגרים)', fixedDose: 0.5, route: 'Inhalation', administrationNotes: 'הוסף 0.5 מ"ג למכשיר אינהלציה עם ונטולין וסליין.' },
        { indication: 'ברונכוספאזם (ילדים)', fixedDose: 0.25, route: 'Inhalation', administrationNotes: 'בילדים מעל 20 ק"ג, ניתן לתת 0.5 מ"ג.' },
        { indication: 'הרעלת זרחנים אורגניים', fixedDose: 0.5, route: 'Inhalation', administrationNotes: 'יש לתת עם ונטולין וסליין. ניתן לחזור כל 20 דקות לפי הצורך.' },
    ],
  },
  {
    id: 'med2',
    name: 'אמיודרון (Amiodarone)',
    indication: 'דום לב (VF/pVT), ROSC, הפרעות קצב חדריות או עלייתיות',
    type: ItemType.Medication,
    concentration: 50, // 150mg/3ml -> 50mg/ml
    notes: 'ב-CPR, ניתן לאחר מכת חשמל שלישית. השפעה מהירה - ריכוז התרופה בסרום יורד ל-10% בתוך 30-45 דקות. גורם להארכת משך פוטנציאל הפעולה והתקופה הרפרקטורית. עלול לגרום לוזודילטציה וירידה בלחץ הדם.',
    appearance: 'תמיסה שקופה, עלולה להיות צהבהבה.',
    packaging: 'אמפולה של 150 מ"ג / 3 מ"ל.',
    storage: 'טמפרטורת החדר, מוגן מאור.',
    contraindications: ['רגישות ליוד', 'הלם קרדיוגני', 'ברדיקרדיה', 'בלוק הולכה מדרגה 2 או 3', 'פרפור פרוזדורים בחולה עם WPW'],
    category: 'אנטי-אריתמיה Class III',
    mechanismOfAction: 'חוסם תעלות אשלגן, נתרן וסידן. מאריך את פוטנציאל הפעולה ואת התקופה הרפרקטורית בשריר הלב. בעל גם פעילות אנטי-אדרנרגית.',
    pharmacokinetics: 'תחילת פעולה: דקות עד שעות. זמן מחצית חיים ארוך מאוד (40-55 ימים). מצטבר ברקמות. מטבוליזם בכבד.',
    sideEffects: 'תת-לחץ דם, ברדיקרדיה, הארכת QT, פלביטיס במתן IV. שימוש ממושך: רעילות לריאות, בלוטת התריס, כבד, עיניים ועור.',
    administrationForms: 'אמפולה 150mg/3ml למתן IV. טבליות לשימוש ממושך.',
    pregnancySafety: 'קטגוריה D. עובר את השליה וגורם לפגיעה בבלוטת התריס של העובר. יש להימנע בהריון אלא אם אין חלופה.',
    relatedProtocols: [
      { id: 'pro_vf_pvt', name: 'VF / Pulseless VT' },
      { id: 'pro_rosc', name: 'חזרה לדופק ספונטני (ROSC)' }
    ],
    dosages: [
        { indication: 'דום לב VF/pVT (מבוגר) - מנה 1', fixedDose: 300, route: 'IV/IO', administrationNotes: 'יש למהול ב-20 מ"ל סליין ולתת בדחיפה.' },
        { indication: 'דום לב VF/pVT (מבוגר) - מנה 2', fixedDose: 150, route: 'IV/IO', administrationNotes: 'יש למהול ב-20 מ"ל סליין ולתת בדחיפה.' },
        { indication: 'ROSC / טכיאריתמיה - מנת העמסה', fixedDose: 150, route: 'IV', administrationNotes: 'מהול ב-100 מ"ל סליין, בהזלפה במשך 10 דקות. אין לתת לחולים אסימפטומטים עם פרפור שגילו מעל 48 שעות.' },
        { indication: 'ROSC / טכיאריתמיה - מנת אחזקה', fixedDose: 1, route: 'IV Infusion', administrationNotes: '1 מ"ג/דקה בהזלפה רציפה.' },
        { indication: 'דום לב VF/pVT (ילדים)', dosePerKg: 5, route: 'IV/IO', administrationNotes: 'ניתן לחזור פעמיים.' },
    ]
  },
  {
    id: 'med4',
    name: 'אספירין (Aspirin)',
    indication: 'כאבים בחזה ממקור לבבי, תסמונת כלילית חריפה (ACS), שיכוך כאב, הורדת חום',
    type: ItemType.Medication,
    notes: 'חיוני בחשד לתסמונת כלילית חריפה. מעכב פעילות טסיות לצמיתות ומונע היווצרות קריש. תחילת השפעה בתוך 5-30 דקות. יש לנקוט זהירות בחולי אסתמה עם היסטוריה של החמרה לאחר נטילת NSAIDs. בילדים עד גיל 12 נאסר השימוש בשל סיכון לתסמונת ריי.',
    appearance: 'טבליה לבנה.',
    packaging: 'בקבוקון או אריזת בליסטר.',
    storage: 'טמפרטורת החדר, מקום יבש.',
    contraindications: ['רגישות ידועה לתרופה', 'כיב פפטי פעיל', 'דימום מדרכי העיכול', 'הפרעות קרישה'],
    category: 'נוגד טסיות / NSAID',
    mechanismOfAction: 'מעכב באופן בלתי הפיך את אנזים ציקלואוקסיגנאז (COX-1), ובכך מונע ייצור תרומבוקסאן A2 וצבירת טסיות. כמו כן מפחית דלקת וכאב.',
    pharmacokinetics: 'תחילת פעולה: 15-30 דקות (בלעיסה מהירה יותר). זמן מחצית חיים: 15-20 דקות לאספירין עצמו, אך השפעה נוגדת טסיות נמשכת 7-10 ימים. ספיגה במערכת העיכול.',
    sideEffects: 'בחילה, כאבי בטן, דימום במערכת העיכול, טינטון (במינון גבוה), רגישות יתר, החמרת אסתמה בחולים רגישים.',
    administrationForms: 'טבליות 100mg, 300mg, 325mg למתן פומי. ללעוס במקרי ACS לספיגה מהירה.',
    pregnancySafety: 'קטגוריה D בשליש השלישי. יכול לגרום לסגירה מוקדמת של הדוקטוס ארטריוזוס ולהאריך הריון. יש להימנע בשבועות האחרונים להריון.',
    relatedProtocols: [
      { id: 'pro_acs', name: 'תסמונת כלילית חריפה' }
    ],
    dosages: [
        { indication: 'ACS / כאב חזה לבבי', fixedDose: 325, route: 'PO', administrationNotes: '160-325 מ"ג בלעיסה.' },
    ]
  },
  {
    id: 'med13',
    name: 'אקמול (Paracetamol/Acetaminophen)',
    indication: 'כאב קל-בינוני, חום',
    type: ItemType.Medication,
    notes: 'מינון מקסימלי ליממה 4 גרם למבוגר. יש לשים לב למרווח של 4-6 שעות בין מנות.',
    appearance: 'טבליות, סירופ, נרות, או תמיסה שקופה לעירוי.',
    packaging: 'בליסטר, בקבוק, או שקית עירוי.',
    storage: 'טמפרטורת החדר.',
    contraindications: ['מחלת כבד קשה', 'רגישות ידועה.'],
    category: 'משככי כאבים / נוגדי חום',
    mechanismOfAction: 'מעכב סינתזה של פרוסטגלנדינים במערכת העצבים המרכזית. מנגנון הפעולה המדויק לא ברור לחלוטין. משפיע על מרכז הויסות התרמי בהיפותלמוס.',
    pharmacokinetics: 'תחילת פעולה: PO 30-60 דקות, IV 5-10 דקות. משך פעולה: 4-6 שעות. זמן מחצית חיים: 2-3 שעות. מטבוליזם בכבד.',
    sideEffects: 'נסבלת היטב במינון טיפולי. במנת יתר: הפטוטוקסיות קשה (נזק לכבד), אי-ספיקת כליות.',
    administrationForms: 'טבליות, סירופ, נרות רקטליים, תמיסה לעירוי IV.',
    pregnancySafety: 'קטגוריה B. נחשב לבחירה הראשונה לשיכוך כאב והורדת חום בהריון. בטוח בהנקה.',
    relatedProtocols: [],
    dosages: [
        { indication: 'מתן פומי (PO)', dosePerKg: 10, maxDose: 1000, concentration: 100, route: 'PO', administrationNotes: '10-15 מ"ג/ק"ג. השתמש בסירופ או כדור.' },
        { indication: 'מתן רקטלי (PR)', dosePerKg: 15, maxDose: 1000, route: 'PR', administrationNotes: '15-20 מ"ג/ק"ג.' },
        { indication: 'מתן תוך-ורידי (IV)', dosePerKg: 15, maxDose: 1000, route: 'IV', administrationNotes: '' },
    ]
  },
  {
    id: 'med3',
    name: 'גלוקוז (Glucose)',
    indication: 'היפוגליקמיה',
    type: ItemType.Medication,
    notes: "יש לבדוק רמת סוכר לפני ואחרי מתן הטיפול. חובה לוודא שהוריד תקין לפני הזרקת גלוקוז בריכוז גבוה (סיכון לאקסטרווזציה). בחולים עם חשד ללחץ תוך-גולגולתי מוגבר יש לשקול תועלת מול סיכון - עליית סוכר בדם עלולה להחמיר נזק מוחי.",
    appearance: 'תמיסה צמיגית ושקופה (IV) או ג\'ל (PO).',
    packaging: 'מזרק מוכן (IV) או שפופרת (PO).',
    storage: 'טמפרטורת החדר.',
    contraindications: ['היפרגליקמיה ידועה', 'דימום תוך-גולגולתי', 'לחץ תוך-גולגולתי מוגבר (התווית נגד יחסית).'],
    category: 'סוכרים / תזונה',
    mechanismOfAction: 'מספק מקור אנרגיה מיידי לתאי הגוף. מעלה במהירות את רמת הסוכר בדם ומאפשר תפקוד תקין של המוח ואיברים אחרים.',
    pharmacokinetics: 'תחילת פעולה: IV מיידית, PO 10-20 דקות. הגלוקוז נספג ומתחלק לכל רקמות הגוף. מטבוליזם תאי לייצור אנרגיה (ATP).',
    sideEffects: 'היפרגליקמיה במתן יתר, אקסטרווזציה וגרימת נמק רקמות (במתן IV של ריכוז גבוה), פלביטיס.',
    administrationForms: 'D50W (50% גלוקוז), D25W (25% גלוקוז), D10W (10% גלוקוז). ג\'ל גלוקוז למתן פומי.',
    pregnancySafety: 'בטוח לשימוש בהריון ובהנקה. הגלוקוז הוא מרכיב טבעי בגוף.',
    relatedProtocols: [],
    dosages: [
        { indication: 'מבוגר מחוסר הכרה (D50W)', fixedDose: 25000, concentration: 500, route: 'IV', administrationNotes: '25 גרם גלוקוז IV (50 מ"ל של D50W).' },
        { indication: 'מבוגר מחוסר הכרה (D25W)', fixedDose: 25000, concentration: 250, route: 'IV', administrationNotes: '25 גרם גלוקוז IV (100 מ"ל של D25W).' },
        { indication: 'מבוגר בהכרה', fixedDose: 15000, route: 'PO', administrationNotes: 'ג\'ל גלוקוז 15 גרם.' },
        { indication: 'ילדים (D25W)', dosePerKg: 200, dosePerKgMax: 500, maxDose: 12500, concentration: 250, route: 'IV/IO', administrationNotes: '0.2-0.5 גרם/ק"ג (מקס 12.5 גרם). D25W = 0.25 גרם/מ"ל. חשב: מינ\' 0.8 מ"ל/ק"ג, מקס\' 2 מ"ל/ק"ג.' },
        { indication: 'תינוקות (D10W)', dosePerKg: 200, dosePerKgMax: 500, maxDose: 12500, concentration: 100, route: 'IV/IO', administrationNotes: '0.2-0.5 גרם/ק"ג (מקס 12.5 גרם). D10W = 0.1 גרם/מ"ל. חשב: מינ\' 2 מ"ל/ק"ג, מקס\' 5 מ"ל/ק"ג.' },
    ]
  },
  {
    id: 'med-dopamine',
    name: 'דופמין (Dopamine)',
    indication: 'לחץ דם נמוך עם סימני היפופרפוזיה שאינו מגיב לעירוי נוזלים, הלם קרדיוגני, ברדיקרדיה סימפטומטית',
    type: ItemType.Medication,
    concentration: 40, // 200mg/5ml
    notes: 'קטכולמין סימפטומימטי עם אפקטים תלויי-מינון. במינון נמוך (2-5 מק"ג/ק"ג/דקה) משפר פרפוזיה לכליות ומעיים. במינון בינוני (5-10 מק"ג/ק"ג/דקה) מעלה כוח התכווצות הלב ודופק. במינון גבוה (10-20 מק"ג/ק"ג/דקה) גורם להיצרות כלי דם ועליית לחץ דם. דורש מהילה ומתן במשאבת עירוי. יש לנטר לחץ דם ודופק באופן רציף.',
    contraindications: ['פאוכרומוציטומה', 'הפרעות קצב מהירות (טכיאריתמיות)', 'לחץ דם גבוה (סיסטולי מעל 140)'],
    category: 'קטכולמינים / אמינים סימפטומימטיים',
    mechanismOfAction: 'אגוניסט לקולטני דופמין, בטא-1 ואלפא-1 אדרנרגיים באופן תלוי-מינון. במינון נמוך - פעילות דופמינרגית (הרחבת כלי דם כליתיים). במינון בינוני - פעילות בטא-1 (הגברת תפוקת לב). במינון גבוה - פעילות אלפא-1 (היצרות כלי דם).',
    pharmacokinetics: 'תחילת פעולה: 2-4 דקות. משך פעולה: פחות מ-10 דקות לאחר הפסקת העירוי. זמן מחצית חיים: כ-2 דקות. מטבוליזם בכליות, כבד ופלזמה על ידי MAO ו-COMT.',
    sideEffects: 'טכיקרדיה, הפרעות קצב, יתר לחץ דם, בחילה, כאב ראש. במינון גבוה: איסכמיה פריפרית.',
    administrationForms: 'אמפולה 200mg/5ml. דורש מהילה ומתן במשאבת עירוי.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יש להשתמש רק כאשר התועלת עולה על הסיכון.',
    relatedProtocols: [
      { id: 'pro_rosc', name: 'חזרה לדופק ספונטני (ROSC)' },
      { id: 'pro_bradycardia', name: 'ברדיקרדיה' }
    ],
    dosages: [
      { indication: 'הלם/ברדיקרדיה (מבוגר)', dosePerKg: 0.005, route: 'IV Infusion', administrationNotes: 'טווח מינון 5-20 מק"ג/ק"ג/דקה. יש לטטר לפי תגובה.' },
    ],
  },
  {
    id: 'med7',
    name: 'דורמיקום (Midazolam)',
    indication: 'פרכוסים, סדציה, הרגעת חולה אלים',
    type: ItemType.Medication,
    concentration: 5, // 5mg/ml
    notes: "תרופה עם פוטנציאל לדיכוי נשימתי ותת-לחץ דם. יש לנטר נשימה, סטורציה ולחץ דם. במתן IV יש להזריק לאט.",
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'אמפולה של 5 מ"ג / 1 מ"ל.',
    storage: 'טמפרטורת החדר, מוגן מאור.',
    contraindications: ['תת-לחץ דם', 'דיכוי נשימתי', 'גלאוקומה זווית-צרה', 'רגישות ידועה לבנזודיאזפינים', 'תרדמת.'],
    category: 'בנזודיאזפינים',
    mechanismOfAction: 'מגביר את פעילות GABA במערכת העצבים המרכזית על ידי קישור לקולטן GABA-A. גורם לסדציה, הרפיית שרירים ופעילות נוגדת פרכוסים.',
    pharmacokinetics: 'תחילת פעולה: IV 1-3 דקות, IM 5-15 דקות, IN 5-10 דקות. משך פעולה: 1-2 שעות. זמן מחצית חיים: 1.5-2.5 שעות. מטבוליזם בכבד.',
    sideEffects: 'דיכוי נשימתי, תת-לחץ דם, סדציה יתר, בלבול, אמנזיה. במתן מהיר IV: דום נשימה.',
    administrationForms: 'אמפולה 5mg/1ml או 15mg/3ml למתן IV/IM/IN. סירופ לשימוש פומי.',
    pregnancySafety: 'קטגוריה D. עובר את השליה. שימוש בשליש השלישי או בלידה עלול לגרום לדיכוי נשימתי ביילוד. בהנקה: עובר לחלב.',
    relatedProtocols: [
      { id: 'pro_post_seizure', name: 'סטאטוס פוסט פרכוס' },
      { id: 'pro_ped_seizure', name: 'פרכוסים בילדים' }
    ],
    dosages: [
        { indication: 'פרכוסים (מבוגר)', fixedDose: 10, route: 'IM/IN', administrationNotes: '' },
        { indication: 'פרכוסים (מבוגר)', fixedDose: 5, route: 'IV', administrationNotes: 'יש להזריק לאט.' },
        { indication: 'פרכוסים (ילדים)', dosePerKg: 0.2, maxDose: 10, route: 'IM/IN', administrationNotes: '' },
        { indication: 'פרכוסים (ילדים)', dosePerKg: 0.1, maxDose: 10, route: 'IV/IO', administrationNotes: 'יש להזריק לאט.' },
        { indication: 'סדציה (מבוגר)', fixedDose: 2.5, route: 'IV', administrationNotes: 'ניתן לתת עד 5 מ"ג.' },
        { indication: 'סדציה (ילדים, RSI)', dosePerKg: 0.1, route: 'IV', administrationNotes: 'ניתן לתת עד 0.2 מ"ג/ק"ג.' },
        { indication: 'חולה אלים (מבוגר)', fixedDose: 5, route: 'IM', administrationNotes: 'ניתן לתת 5-10 מ"ג IM. ניתן לחזור לאחר 10-15 דקות אם אין תגובה.' },
    ]
  },
  {
    id: 'med-heparin',
    name: 'הפרין (Heparin)',
    indication: 'תסמונת כלילית חריפה, תסחיף ריאתי',
    type: ItemType.Medication,
    concentration: 5000, // 5000 units/ml
    notes: 'נוגד קרישה. יש להשתמש בזהירות במטופלים בסיכון לדימום.',
    contraindications: ['דימום פעיל', 'טרומבוציטופניה חמורה', 'ניתוח גדול לאחרונה (במיוחד מוח, עמ"ש, עיניים)', 'טראומה משמעותית ב-24 שעות האחרונות', 'חוסר הכרה עם סימני חבלת ראש.'],
    category: 'נוגדי קרישה',
    mechanismOfAction: 'מגביר את פעילות אנטיתרומבין III, ובכך מעכב תרומבין ופקטורי קרישה אחרים (Xa, IXa, XIa, XIIa). מונע היווצרות קרישי דם חדשים.',
    pharmacokinetics: 'תחילת פעולה: IV מיידית, SC 20-60 דקות. זמן מחצית חיים: 1-2 שעות (תלוי מינון). אינו עובר את השליה.',
    sideEffects: 'דימום, טרומבוציטופניה (HIT), אוסטאופורוזיס (בשימוש ממושך), תגובות אלרגיות.',
    administrationForms: 'בקבוקון 5000 IU/ml למתן IV/SC.',
    pregnancySafety: 'קטגוריה C. אינו עובר את השליה ולכן בטוח יחסית לעובר. התרופה המועדפת לטיפול נוגד קרישה בהריון.',
    relatedProtocols: [
      { id: 'pro_acs', name: 'תסמונת כלילית חריפה' }
    ],
    dosages: [
      { indication: 'ACS/PE (מבוגר)', fixedDose: 5000, route: 'IV', administrationNotes: 'מנה חד פעמית (Bolus) של 5000 יחידות.' },
    ],
  },
  {
    id: 'med6',
    name: 'ונטולין (Salbutamol)',
    indication: 'התקף אסתמה, ברונכוספאזם, אנאפילקסיס, COPD, היפרקלמיה',
    type: ItemType.Medication,
    concentration: 5, // 5mg/ml solution for nebulizer
    notes: 'ניתן לחזור על המנה כל 20 דקות. יש לנטר דופק, עלול לגרום לטכיקרדיה. בהיפרקלמיה מסייע להכנסת אשלגן לתאים (עם גלוקוז ואינסולין).',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'בקבוק פלסטיק קטן (סטרי-נב) או בקבוקון זכוכית.',
    storage: 'טמפרטורת החדר, מוגן מאור.',
    contraindications: ['רגישות ידועה', 'יש להיזהר במטופלים עם טכיאריטמיות.'],
    category: 'אגוניסט בטא-2 / מרחיבי סימפונות',
    mechanismOfAction: 'אגוניסט סלקטיבי לקולטני בטא-2 אדרנרגיים. גורם להרפיית שרירים חלקים בסימפונות ובכלי הדם. מעודד הכנסת אשלגן לתאים.',
    pharmacokinetics: 'תחילת פעולה: אינהלציה 5-15 דקות. משך פעולה: 4-6 שעות. מטבוליזם בכבד, הפרשה בשתן.',
    sideEffects: 'טכיקרדיה, רעד, עצבנות, כאב ראש, היפוקלמיה (בעיקר במתן חוזר), הפרעות קצב (נדיר).',
    administrationForms: 'תמיסה לנבולייזר 5mg/ml, משאף אירוסול (MDI).',
    pregnancySafety: 'קטגוריה C. עובר את השליה. בשימוש נרחב בהריון ונחשב בטוח יחסית. עלול לעכב צירים במינון גבוה.',
    relatedProtocols: [
      { id: 'pro_asthma', name: 'אסתמה' },
      { id: 'pro_anaphylaxis', name: 'אנאפילקסיס' }
    ],
    dosages: [
        { indication: 'אסתמה/ברונכוספאזם (מבוגרים)', fixedDose: 2.5, route: 'Inhalation', administrationNotes: 'הוסף 2.5-5 מ"ג (0.5-1 מ"ל) למכשיר אינהלציה עם 2.5 מ"ל סליין.' },
        { indication: 'אסתמה/ברונכוספאזם (ילדים)', dosePerKg: 0.15, maxDose: 5, route: 'Inhalation', administrationNotes: 'הוסף למכשיר אינהלציה עם 2.5 מ"ל סליין.' },
        { indication: 'היפרקלמיה (מבוגרים)', fixedDose: 10, route: 'Inhalation', administrationNotes: '10-20 מ"ג באינהלציה. משמש כטיפול משלים לצד גלוקוז ואינסולין.' },
    ]
  },
  {
    id: 'med-tramadol',
    name: 'טרמדקס (Tramadol)',
    indication: 'כאב בינוני עד חזק',
    type: ItemType.Medication,
    concentration: 50, // 100mg/2ml
    notes: 'משכך כאבים אופיואידי. עלול לגרום לבחילות, סחרחורת ולהוריד את סף הפרכוס.',
    contraindications: ['דיכוי נשימתי', 'היסטוריה של פרכוסים', 'שימוש במעכבי MAO.'],
    category: 'אופיואידים / משככי כאבים',
    mechanismOfAction: 'אגוניסט חלש לקולטני מיו אופיואידים. מעכב ספיגה מחדש של נוראדרנלין וסרוטונין. אפקט אנלגטי משולב.',
    pharmacokinetics: 'תחילת פעולה: IV 5-10 דקות, PO שעה. משך פעולה: 4-6 שעות. זמן מחצית חיים: 5-7 שעות. מטבוליזם בכבד.',
    sideEffects: 'בחילות והקאות, סחרחורת, כאב ראש, עצירות, הורדת סף פרכוס. תסמונת סרוטונין (עם תרופות סרוטונרגיות).',
    administrationForms: 'אמפולה 100mg/2ml למתן IV/IM. טבליות וכמוסות למתן פומי.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. שימוש ממושך או סמוך ללידה עלול לגרום לתסמיני גמילה ביילוד.',
    relatedProtocols: [],
    dosages: [
      { indication: 'כאב (מבוגר)', fixedDose: 50, route: 'IV/IM', administrationNotes: '50-100 מ"ג בהזרקה איטית ב-IV.' },
    ],
  },
  {
    id: 'med12',
    name: 'מגנזיום סולפט',
    indication: 'אקלמפסיה, Torsades de Pointes, אסתמה קשה',
    type: ItemType.Medication,
    concentration: 100, // 1g in 10ml -> 100mg/ml
    notes: 'יש להזליף לאט כדי למנוע תת-לחץ דם, אדמומיות ודיכוי נשימתי.',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'בקבוקון זכוכית (Vial) או שקית מוכנה לעירוי.',
    storage: 'טמפרטורת החדר.',
    contraindications: ['חסם הולכה לבבי', 'אי-ספיקת כליות חמורה.'],
    category: 'אלקטרוליטים / נוגדי פרכוס',
    mechanismOfAction: 'מייצב קרומי תאים, מעכב שחרור אצטילכולין בצומת הנוירו-שרירי, מרפה שרירים חלקים. בלב מייצב את הממברנה ומפחית הפרעות קצב.',
    pharmacokinetics: 'תחילת פעולה: IV מיידית. משך פעולה: 30 דקות עד שעה. הפרשה בכליות. יש לנטר רמות מגנזיום ותפקוד כלייתי.',
    sideEffects: 'תת-לחץ דם, סומק, בחילה, חולשת שרירים, דיכוי נשימתי, ברדיקרדיה. במינון גבוה: היעלמות רפלקסים, שיתוק.',
    administrationForms: 'בקבוקון 50% (500mg/ml) או 10% (100mg/ml). שקית מוכנה לעירוי.',
    pregnancySafety: 'קטגוריה D. עובר את השליה. שימוש ממושך עלול לגרום להיפומגנזמיה ולבעיות עצם ביילוד. יש לנטר את היילוד לאחר לידה.',
    relatedProtocols: [
      { id: 'pro_eclampsia', name: 'אקלמפסיה' },
      { id: 'pro_vf_pvt', name: 'VF / Pulseless VT' },
      { id: 'pro_asthma', name: 'אסתמה' }
    ],
    dosages: [
        { indication: 'אקלמפסיה', fixedDose: 4000, route: 'IV', administrationNotes: '4-6 גרם בהזלפה איטית במשך 15-20 דקות.' },
        { indication: 'אסתמה קשה (מבוגר)', fixedDose: 2000, route: 'IV', administrationNotes: 'בהזלפה איטית במשך 20 דקות.' },
        { indication: 'אסתמה קשה (ילדים)', dosePerKg: 25, maxDose: 2000, route: 'IV', administrationNotes: '25-50 מ"ג/ק"ג בהזלפה איטית במשך 20 דקות.' },
        { indication: 'Torsades de Pointes', fixedDose: 1000, route: 'IV', administrationNotes: '1-2 גרם בדחיפה איטית.' },
    ]
  },
  {
    id: 'med-morphine',
    name: 'מורפין (Morphine)',
    indication: 'כאב חזק',
    type: ItemType.Medication,
    concentration: 10, // 10mg/ml
    notes: 'משכך כאבים נרקוטי. עלול לגרום לדיכוי נשימתי, תת-לחץ דם ובחילות. יש לתת במנות קטנות ומטוטררות.',
    contraindications: ['דיכוי נשימתי', 'תת-לחץ דם', 'חבלת ראש עם לחץ תוך-גולגולתי מוגבר.'],
    category: 'אופיואידים / משככי כאבים נרקוטיים',
    mechanismOfAction: 'אגוניסט לקולטני אופיואידים מיו (μ) במערכת העצבים המרכזית. מפחית תפיסת כאב, גורם לאופוריה, סדציה ודיכוי מרכז הנשימה.',
    pharmacokinetics: 'תחילת פעולה: IV 5-10 דקות, IM 15-30 דקות, SC 20-60 דקות. משך פעולה: 3-6 שעות. זמן מחצית חיים: 2-4 שעות. מטבוליזם בכבד.',
    sideEffects: 'דיכוי נשימתי, תת-לחץ דם, בחילות והקאות, עצירות, עכבת שתן, גרד, מיוזיס.',
    administrationForms: 'אמפולה 10mg/ml למתן IV/IM/SC.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. שימוש סמוך ללידה עלול לגרום לדיכוי נשימתי ביילוד. בהנקה: עובר לחלב.',
    relatedProtocols: [],
    dosages: [
      { indication: 'כאב (מבוגר)', fixedDose: 2, route: 'IV', administrationNotes: '2-4 מ"ג בהזרקה איטית. ניתן לחזור על המנה כל 5-15 דקות.' },
      { indication: 'כאב (ילדים)', dosePerKg: 0.1, maxDose: 10, route: 'IV/IM/SC', administrationNotes: '0.05-0.1 מ"ג/ק"ג.' },
    ],
  },
  {
    id: 'med-nitroglycerin',
    name: 'ניטרולינגואל (Glyceryl Trinitrate)',
    indication: 'תסמונת כלילית חריפה (ACS), בצקת ריאות',
    type: ItemType.Medication,
    notes: 'מרחיב כלי דם. התווית נגד במקרה של תת-לחץ דם (סיסטולי < 90), אוטם תחתון/ימני, ושימוש בתרופות לשיפור האון ב-24-48 שעות האחרונות.',
    contraindications: ['תת-לחץ דם (סיסטולי < 90 ממ"כ)', 'חשד לאוטם תחתון/ימני', 'שימוש בתרופות לשיפור האון ב-24-48 שעות האחרונות (ויאגרה, סיאליס).'],
    category: 'ניטראטים / מרחיבי כלי דם',
    mechanismOfAction: 'משחרר תחמוצת חנקן (NO), הגורמת להרפיית שרירים חלקים בכלי דם. מרחיב ורידים (מפחית עומס קדם) וכלי דם כליליים.',
    pharmacokinetics: 'תחילת פעולה: SL 1-3 דקות, ספריי מיידי. משך פעולה: 20-30 דקות. זמן מחצית חיים: 1-4 דקות. מטבוליזם בכבד.',
    sideEffects: 'כאב ראש, סחרחורת, תת-לחץ דם, טכיקרדיה רפלקטורית, סומק בפנים.',
    administrationForms: 'ספריי תת-לשוני 0.4mg/puff, טבליות תת-לשוניות.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יש להשתמש בזהירות בהריון. עלול לגרום לירידת לחץ דם אימהי וזרימת דם לשליה.',
    relatedProtocols: [
      { id: 'pro_acs', name: 'תסמונת כלילית חריפה' },
      { id: 'pro_pulmonary_edema', name: 'בצקת ריאות' }
    ],
    dosages: [
      { indication: 'ACS / בצקת ריאות', fixedDose: 0.4, route: 'SL', administrationNotes: 'ספריי/טבליה תת-לשונית. ניתן לחזור כל 3-5 דקות.' },
    ],
  },
  {
    id: 'med-isosorbide',
    name: 'איזוקט (Isosorbide Dinitrate)',
    indication: 'תסמונת כלילית חריפה (ACS), בצקת ריאות',
    type: ItemType.Medication,
    notes: 'מרחיב כלי דם מקבוצת הניטראטים. חלופה לניטרולינגואל. התווית נגד במקרה של תת-לחץ דם (סיסטולי < 90), אוטם תחתון/ימני, ושימוש בתרופות לשיפור האון ב-24-48 שעות האחרונות.',
    contraindications: ['תת-לחץ דם (סיסטולי < 90 ממ"כ)', 'חשד לאוטם תחתון/ימני', 'שימוש בתרופות לשיפור האון ב-24-48 שעות האחרונות (ויאגרה, סיאליס).'],
    category: 'ניטראטים / מרחיבי כלי דם',
    mechanismOfAction: 'משחרר תחמוצת חנקן (NO), הגורמת להרפיית שרירים חלקים בכלי דם. מרחיב ורידים ועורקים קליליים.',
    pharmacokinetics: 'תחילת פעולה: SL 2-5 דקות. משך פעולה: 1-2 שעות. זמן מחצית חיים: 1-4 שעות. מטבוליזם בכבד.',
    sideEffects: 'כאב ראש, סחרחורת, תת-לחץ דם, טכיקרדיה, סומק, בחילות.',
    administrationForms: 'טבליות תת-לשוניות 5mg.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יש להשתמש בזהירות בהריון.',
    relatedProtocols: [
      { id: 'pro_acs', name: 'תסמונת כלילית חריפה' },
      { id: 'pro_pulmonary_edema', name: 'בצקת ריאות' }
    ],
    dosages: [
      { indication: 'ACS / בצקת ריאות', fixedDose: 5, route: 'SL', administrationNotes: 'טבליה תת-לשונית 5 מ"ג. ניתן לחזור כל 5-10 דקות.' },
    ],
  },
  {
    id: 'med8',
    name: 'נרקאן (Naloxone)',
    indication: 'מנת יתר של אופיאטים',
    type: ItemType.Medication,
    concentration: 0.4, // 0.4mg/ml
    notes: 'מטרת הטיפול היא שיפור הנשימה, לאו דווקא חזרה להכרה מלאה. זמן מחצית חיים קצר יחסית, ייתכן וידרשו מנות חוזרות.',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'אמפולה (0.4 מ"ג / 1 מ"ל), מזרק מוכן או תרסיס לאף.',
    storage: 'טמפרטורת החדר.',
    contraindications: ['אין התוויות נגד מוחלטות במצב חירום של מנת יתר.'],
    category: 'אנטגוניסט לאופיואידים',
    mechanismOfAction: 'אנטגוניסט תחרותי לקולטני אופיואידים (מיו, קאפא, דלתא). מבטל את השפעת האופיואידים כולל דיכוי נשימתי, סדציה ואנלגזיה.',
    pharmacokinetics: 'תחילת פעולה: IV 1-2 דקות, IM/SC 2-5 דקות, IN 3-5 דקות. משך פעולה: 30-90 דקות (קצר יותר מאופיואידים רבים). זמן מחצית חיים: 30-90 דקות.',
    sideEffects: 'תסמיני גמילה באופן חד (בחילה, הקאות, הזעה, טכיקרדיה, התרגשות, כאב). בצקת ריאות (נדיר). הפרעות קצב (נדיר).',
    administrationForms: 'אמפולה 0.4mg/1ml, תרסיס לאף (Narcan Nasal Spray) 4mg.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יכול לגרום לתסמיני גמילה בעובר של אם תלויה באופיואידים. יש להשתמש בזהירות.',
    relatedProtocols: [],
    dosages: [
        { indication: 'מבוגרים', fixedDose: 0.4, route: 'IV/IM/IN', administrationNotes: 'ניתן לתת עד 2 מ"ג במנה. ניתן לחזור על המנה לפי הצורך.' },
        { indication: 'ילדים', dosePerKg: 0.1, maxDose: 2, route: 'IV/IM/IN', administrationNotes: 'ניתן לחזור על המנה לפי הצורך.' },
    ]
  },
  {
    id: 'med-sodium-bicarbonate',
    name: 'סודיום ביקרבונט (Sodium Bicarbonate)',
    indication: 'היפרקלמיה, הרעלת טריציקלים, חמצת מטבולית קשה',
    type: ItemType.Medication,
    concentration: 1, // 1 mEq/ml
    notes: 'יש להשתמש רק בהתוויות ברורות. עלול לגרום להחמרת חמצת תאית והיפוקלמיה.',
    contraindications: ['בססת מטבולית או נשימתית', 'היפוקלצמיה.'],
    category: 'אלקטרוליטים / בסיסים',
    mechanismOfAction: 'בסיס המנטרל חומצה. מעלה את ה-pH בדם וברקמות. בהיפרקלמיה מסייע להכנסת אשלגן לתאים.',
    pharmacokinetics: 'תחילת פעולה: IV מיידית. מתפרק במהירות. הפרשה על ידי הכליות כביקרבונט או CO2 על ידי הריאות.',
    sideEffects: 'היפרנתרמיה, היפוקלמיה, בססת מטבולית, היפוקלצמיה, עומס נפחי. אקסטרווזציה גורמת לנזק רקמות.',
    administrationForms: 'אמפולה 8.4% (1 mEq/ml) למתן IV.',
    pregnancySafety: 'קטגוריה C. ניתן לשימוש בהריון כאשר יש התוויה ברורה.',
    relatedProtocols: [
      { id: 'pro_vf_pvt', name: 'VF / Pulseless VT' },
      { id: 'pro_asystole_pea', name: 'אסיסטולה / PEA' }
    ],
    dosages: [
      { indication: 'התוויות שונות', fixedDose: 50, route: 'IV', administrationNotes: 'מינון של 1 מא"ק/ק"ג. (בד"כ 50-100 מא"ק למבוגר).' },
    ],
  },
  {
    id: 'med11',
    name: 'סולומדרול (Methylprednisolone)',
    indication: 'התקף אסתמה, אנאפילקסיס, COPD',
    type: ItemType.Medication,
    notes: 'סטרואיד סיסטמי להפחתת דלקת בדרכי האוויר. תחילת ההשפעה אינה מיידית.',
    appearance: 'אבקה לבנה שיש למהול.',
    packaging: 'בקבוקון זכוכית (Vial) עם בקבוקון ממס נפרד.',
    storage: 'טמפרטורת החדר לפני המהילה.',
    contraindications: ['זיהום פטרייתי סיסטמי', 'רגישות ידועה.'],
    category: 'סטרואידים / גלוקוקורטיקואידים',
    mechanismOfAction: 'מעכב שחרור מתווכים דלקתיים. מפחית דלקת וחדירות כלי דם. מדכא תגובה אימונית וחיסונית.',
    pharmacokinetics: 'תחילת פעולה: 1-2 שעות (השפעה אנטי-דלקתית). זמן מחצית חיים: 18-36 שעות. מטבוליזם בכבד.',
    sideEffects: 'היפרגליקמיה, עכבת מערכת החיסון, עליית לחץ דם, אי-שקט. בשימוש ממושך: אוסטאופורוזיס, דיכוי בלוטת יותרת הכליה.',
    administrationForms: 'בקבוקון 125mg לאחר מהילה למתן IV.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. שימוש קצר מועד בחירום נחשב בטוח יחסית.',
    relatedProtocols: [
      { id: 'pro_asthma', name: 'אסתמה' },
      { id: 'pro_anaphylaxis', name: 'אנאפילקסיס' }
    ],
    dosages: [
        { indication: 'מבוגרים', fixedDose: 125, concentration: 125, route: 'IV', administrationNotes: 'יש למהול בקבוקון של 125 מ"ג עם הממס המצורף.' },
        { indication: 'ילדים', dosePerKg: 2, maxDose: 125, concentration: 125, route: 'IV', administrationNotes: 'יש למהול בקבוקון של 125 מ"ג עם הממס המצורף.' },
    ]
  },
  {
    id: 'med10',
    name: 'פנטניל (Fentanyl)',
    indication: 'כאב חזק',
    type: ItemType.Medication,
    concentration: 0.05, // 50 mcg/ml
    notes: 'פוטנטי מאוד. יש לתת בזהירות ולנטר נשימה.',
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'אמפולה של 100 מק"ג / 2 מ"ל.',
    storage: 'אחסון תרופות נרקוטיות, טמפרטורת החדר.',
    contraindications: ['דיכוי נשימתי חמור', 'תת-לחץ דם.'],
    category: 'אופיואידים / משככי כאבים נרקוטיים',
    mechanismOfAction: 'אגוניסט חזק לקולטני אופיואידים מיו (μ). פוטנטי פי 80-100 ממורפין. מפחית תפיסת כאב וגורם לסדציה.',
    pharmacokinetics: 'תחילת פעולה: IV 1-2 דקות, IM 7-15 דקות. משך פעולה: 30-60 דקות (IV). זמן מחצית חיים: 2-4 שעות. מטבוליזם בכבד.',
    sideEffects: 'דיכוי נשימתי, קשיחות שרירים (במתן מהיר), ברדיקרדיה, בחילות, מיוזיס, תת-לחץ דם.',
    administrationForms: 'אמפולה 100mcg/2ml למתן IV/IM.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. שימוש סמוך ללידה עלול לגרום לדיכוי נשימתי ביילוד. בהנקה: עובר לחלב.',
    relatedProtocols: [],
    dosages: [
        { indication: 'מבוגר', dosePerKg: 0.001, maxDose: 0.1, route: 'IV', administrationNotes: 'מינון של 1 מק"ג/ק"ג. יש להזריק באיטיות.' },
    ]
  },
  {
    id: 'med-furosemide',
    name: 'פוסיד (Furosemide)',
    indication: 'בצקת ריאות, אי ספיקת לב',
    type: ItemType.Medication,
    concentration: 10, // 20mg/2ml
    notes: 'משתן לולאה. גורם להפרשת שתן מוגברת. יש לתת באיטיות כדי למנוע ירידת לחץ דם.',
    contraindications: ['אי-ספיקת כליות עם העדר תפוקת שתן (אנוריה)', 'תת-לחץ דם', 'היפוולמיה.'],
    category: 'משתנים / משתני לולאה',
    mechanismOfAction: 'מעכב ספיגה מחדש של נתרן ואשלגן בלולאת הנלה בכליות. גורם לעלייה משמעותית בהפרשת שתן ולירידה בעומס נפחי.',
    pharmacokinetics: 'תחילת פעולה: IV 5 דקות, PO 30-60 דקות. משך פעולה: IV 2 שעות, PO 6-8 שעות. זמן מחצית חיים: 0.5-2 שעות.',
    sideEffects: 'תת-לחץ דם, היפוקלמיה, היפומגנזמיה, היפונתרמיה, התייבשות, עליה בקריאטינין. רעילות לאוזן במינון גבוה.',
    administrationForms: 'אמפולה 20mg/2ml למתן IV/IM.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. יש להשתמש בזהירות בהריון רק כאשר יש צורך ברור.',
    relatedProtocols: [
      { id: 'pro_pulmonary_edema', name: 'בצקת ריאות' }
    ],
    dosages: [
      { indication: 'בצקת ריאות (מבוגר)', fixedDose: 40, route: 'IV', administrationNotes: 'מינון של 0.5-1 מ"ג/ק"ג בהזרקה איטית.' },
      { indication: 'בצקת ריאות (ילדים)', dosePerKg: 1, route: 'IV', administrationNotes: 'בהזרקה איטית.' },
    ],
  },
  {
    id: 'med-metoclopramide',
    name: 'פראמין (Metoclopramide)',
    indication: 'בחילות והקאות',
    type: ItemType.Medication,
    concentration: 5, // 10mg/2ml
    notes: 'נוגד בחילה. יש לתת באיטיות כדי למנוע תופעות אקסטרה-פירמידליות (דיסטוניה).',
    contraindications: ['חסימה, פרפורציה או דימום במערכת העיכול', 'היסטוריה של פרכוסים.'],
    category: 'נוגדי הקאה / פרוקינטיים',
    mechanismOfAction: 'אנטגוניסט לקולטני דופמין D2. מזרז ריקון קיבה ומעכב את מרכז ההקאה. מעלה טונוס של סוגר הוושט התחתון.',
    pharmacokinetics: 'תחילת פעולה: IV 1-3 דקות, IM 10-15 דקות. משך פעולה: 1-2 שעות. זמן מחצית חיים: 4-6 שעות. מטבוליזם בכבד.',
    sideEffects: 'תופעות אקסטרה-פירמידליות (דיסטוניה, עוויתות שרירים), עייפות, חרדה, שלשול. דיסקינזיה מאוחרת (בשימוש ממושך).',
    administrationForms: 'אמפולה 10mg/2ml למתן IV/IM.',
    pregnancySafety: 'קטגוריה B. בטוח יחסית בהריון. בהנקה: עובר לחלב אך בכמות קטנה.',
    relatedProtocols: [],
    dosages: [
      { indication: 'בחילות/הקאות (מבוגר)', fixedDose: 10, route: 'IV/IM', administrationNotes: 'בהזרקה איטית על פני 1-2 דקות.' },
    ],
  },
  {
    id: 'med-calcium-gluconate',
    name: 'קלציום גלוקונאט (Calcium Gluconate)',
    indication: 'היפרקלמיה, הרעלת חוסמי תעלות סידן/חוסמי בטא, היפוקלצמיה, חשיפה לחומצה הידרופלורית (HF)',
    type: ItemType.Medication,
    concentration: 100, // 10% solution, 1g/10ml
    notes: 'מייצב את ממברנת תא הלב. יש לתת באיטיות (מעל 5-10 דקות) כדי למנוע ברדיקרדיה או אסיסטולה. וודא שהווריד תקין. בחשיפה לחומצה הידרופלורית יש למרוח ג\'ל קלציום גלוקונאט על האזור הנגוע.',
    contraindications: ['היפרקלצמיה', 'הרעלת דיגוקסין (התווית נגד יחסית)', 'פיברילציה חדרית (אלא אם היפוקלצמיה).'],
    category: 'אלקטרוליטים / תוספי סידן',
    mechanismOfAction: 'מספק סידן חיצוני. מייצב את ממברנת תא הלב בהיפרקלמיה על ידי העלאת פוטנציאל הסף לדפולריזציה. תחליף סידן בהיפוקלצמיה.',
    pharmacokinetics: 'תחילת פעולה: IV מיידית. הסידן מתפזר לרקמות ונכנס לעצמות. הפרשה בשתן.',
    sideEffects: 'ברדיקרדיה (במתן מהיר), אסיסטולה, תחושת חום, היפרקלצמיה. אקסטרווזציה גורמת לנזק רקמות.',
    administrationForms: 'אמפולה 10% (1g/10ml) למתן IV. ג\'ל לשימוש מקומי בחשיפה ל-HF.',
    pregnancySafety: 'קטגוריה C. עובר את השליה. ניתן לשימוש בהריון כאשר יש התוויה ברורה.',
    relatedProtocols: [],
    dosages: [
      { indication: 'היפרקלמיה (מבוגר)', fixedDose: 1000, route: 'IV', administrationNotes: '1-2 גרם בהזרקה איטית (5-10 דקות).' },
      { indication: 'הרעלת חוסמי סידן/בטא (מבוגר)', fixedDose: 3000, route: 'IV', administrationNotes: '3 גרם בהזרקה איטית. ניתן לחזור לפי צורך קליני.' },
    ],
  },
  {
    id: 'med9',
    name: 'קטמין (Ketamine)',
    indication: 'סדציה, אנלגזיה, חולה אלים, DSI',
    type: ItemType.Medication,
    concentration: 50, // 50mg/ml
    notes: "שומר על רפלקסים של דרכי אוויר ולחץ דם. עלול לגרום להזיות ולהעלאת לחץ דם ודופק. יש לתת באיטיות במתן IV. יעיל במיוחד בחולים אלימים או באינטובציה בחולה לא משתף פעולה (DSI).",
    appearance: 'תמיסה שקופה וחסרת צבע.',
    packaging: 'בקבוקון זכוכית (Vial).',
    storage: 'טמפרטורת החדר, מוגן מאור.',
    contraindications: ['מצבים בהם עליה בלחץ הדם מסוכנת (יתר לחץ דם חמור, דיסקציה של האאורטה)', 'יתר-לחץ דם משמעותי (סיסטולי מעל 180)', 'פסיכוזה פעילה (התווית נגד יחסית).'],
    category: 'סם הרדמה דיסוציאטיבי',
    mechanismOfAction: 'אנטגוניסט לקולטני NMDA. גורם להרדמה דיסוציאטיבית עם אנלגזיה, אמנזיה ושמירה על רפלקסים. בעל פעילות סימפטומימטית.',
    pharmacokinetics: 'תחילת פעולה: IV 30-60 שניות, IM 3-4 דקות. משך פעולה: IV 5-10 דקות, IM 12-25 דקות. זמן מחצית חיים: 2-3 שעות. מטבוליזם בכבד.',
    sideEffects: 'עליית לחץ דם ודופק, הזיות, סיוטים (emergence reactions), ייצור יתר רוק, ניסטגמוס, לעיתים laryngospasm.',
    administrationForms: 'בקבוקון 50mg/ml או 100mg/ml למתן IV/IM.',
    pregnancySafety: 'קטגוריה B. עובר את השליה. נחשב בטוח יחסית לשימוש קצר. במתן סמוך ללידה עלול לגרום לדיכוי נשימתי ביילוד.',
    relatedProtocols: [
      { id: 'pro_rosc', name: 'חזרה לדופק ספונטני (ROSC)' }
    ],
    dosages: [
        { indication: 'סדציה (RSI)', dosePerKg: 1, route: 'IV', administrationNotes: 'טווח מינון 1-2 מ"ג/ק"ג.' },
        { indication: 'סדציה (RSI)', dosePerKg: 2, route: 'IM', administrationNotes: 'טווח מינון 2-4 מ"ג/ק"ג.' },
        { indication: 'אנלגזיה (שיכוך כאב)', dosePerKg: 0.2, route: 'IV', administrationNotes: 'טווח מינון 0.2-0.3 מ"ג/ק"ג.' },
        { indication: 'DSI (סדציה לאינטובציה)', dosePerKg: 1, route: 'IV', administrationNotes: 'סדציה מופחתת לחולה לא משתף פעולה לפני RSI. יש לחכות 2-3 דקות לפני המשך.' },
        { indication: 'חולה אלים (מבוגר)', fixedDose: 200, route: 'IM', administrationNotes: '200-400 מ"ג IM. ניתן לחזור לאחר 10-15 דקות אם אין תגובה.' },
        { indication: 'חולה אלים (מבוגר)', dosePerKg: 1, route: 'IV', administrationNotes: '1-2 מ"ג/ק"ג IV לאט.' },
    ]
  },
  {
    id: 'med-tranexamic-acid',
    name: 'הקסאקפרון (Tranexamic Acid)',
    indication: 'דימום טראומתי משמעותי עם הלם היפוולמי',
    type: ItemType.Medication,
    concentration: 100, // 1g/10ml
    notes: 'יש לתת תוך 3 שעות מהפציעה (עדיף תוך שעה). מונע פירוק קרישים קיימים. יש לתת באיטיות (10 דקות) למניעת תת-לחץ דם. תרופה משלימה - לא מחליפה שליטה בדימום. יש לתעד זמן מתן להמשך טיפול בבית החולים.',
    contraindications: ['רגישות ידועה לתרופה', 'מעל 3 שעות מהפציעה', 'מחלה תרומבואמבולית פעילה (DVT, PE, MI, CVA)', 'דימום תוך-גולגולתי לא טראומטי', 'דימום תת-עכבישי לא טראומטי.'],
    category: 'אנטי-פיברינוליטיים / עוצרי דימום',
    mechanismOfAction: 'אנטגוניסט לפלסמינוגן. נקשר לקולטני ליזין של פלסמינוגן ומעכב את פעילות הפלסמין. מונע פירוק של קרישי דם קיימים ומפחית דימום.',
    pharmacokinetics: 'תחילת פעולה: IV מהירה. זמן מחצית חיים: 2-3 שעות. הפרשה בעיקר בשתן ללא שינוי. חוצה את מחסום הדם-מוח בריכוז נמוך.',
    sideEffects: 'תת-לחץ דם (במתן מהיר), בחילות, הקאות, שלשולים, סחרחורת. במינון גבוה או מתן מהיר: פרכוסים (נדיר).',
    administrationForms: 'אמפולה 1g/10ml למתן IV. יש למהול ב-100 מ"ל סליין או דקסטרוז 5%.',
    pregnancySafety: 'קטגוריה B. עובר את השליה. בטוח יחסית בהריון לטיפול בדימום טראומטי. בהנקה: עובר לחלב בכמות קטנה.',
    relatedProtocols: [],
    dosages: [
      { indication: 'דימום טראומטי (מבוגר)', fixedDose: 1000, route: 'IV', administrationNotes: '1 גרם מהול ב-100 מ"ל סליין בהזלפה על פני 10 דקות. תוך 3 שעות מהפציעה (עדיף תוך שעה). בבית החולים: מנה נוספת של 1 גרם על פני 8 שעות.' },
      { indication: 'דימום טראומטי (פרוטוקול צבאי)', fixedDose: 2000, route: 'IV', administrationNotes: '2 גרם בדחיפה איטית על פני 10 דקות. ללא צורך במנה נוספת.' },
      { indication: 'דימום טראומטי (ילדים)', dosePerKg: 15, maxDose: 1000, route: 'IV', administrationNotes: 'מהול ב-100 מ"ל סליין על פני 10 דקות.' },
    ],
  },
].sort((a, b) => a.name.localeCompare(b.name, 'he'));

export const protocols: Protocol[] = [
  {
    id: 'pro_cpr_adult',
    name: 'דום לב במבוגר',
    category: 'החייאה',
    summary: 'אלגוריתם ודגשים כלליים לטיפול בדום לב במבוגרים.',
    type: ItemType.Protocol,
    content: [
        { title: 'דגשים כלליים', points: ['נשימה לא תקינה או אפילפטית = דום לב.', 'הרחק את המטופל על גבו ועל מצע קשיח.', 'אין לבזבז זמן על בדיקת דופק.', 'הערך את הקצב במוניטור בהקדם.', 'קצב עיסויים 100-120 לדקה, רצוי להשתמש במטרונום.', 'עומק העיסויים 5-6 ס״מ.', 'אפשר חילוף מעסה כל 2 דקות.', 'בצע החייאה ברצף והמנע מהפסקות במהלך ההחייאה.', 'החייאה באישה בהריון: משבוע 24 יש לבצע הטיה ידנית של הרחם שמאלה.'] }
    ]
  },
  {
    id: 'pro_vf_pvt',
    name: 'VF / Pulseless VT',
    category: 'החייאה',
    summary: 'פרוטוקול טיפול בפרפור חדרים או טכיקרדיה חדרית ללא דופק.',
    type: ItemType.Protocol,
    content: [
      { title: 'אלגוריתם טיפול', points: ['דום לב ונשימה במוניטור -> Puv/VF.', 'תן שוק חשמלי (200 ג׳אול ביפאזי).', 'בצע 2 דקות החייאה.', 'הערכת קצב. אם עדיין VF/VT -> תן שוק.', 'בצע 2 דקות החייאה. תן אדרנלין כל 3-5 דקות. שקול נתיב אוויר מתקדם.', 'הערכת קצב. אם עדיין VF/VT -> תן שוק.', 'בצע 2 דקות החייאה. תן אמיודרון או לידוקאין. טפל בגורמים הפיכים.', 'אם יש ROSC, עבור לפרוטוקול ROSC.'] },
      { title: 'תרופות', points: ['אדרנלין: 1 מ״ג IV/IO כל 3-5 דקות.', 'אמיודרון: מנה ראשונה 300 מ״ג. מנה שנייה 150 מ״ג.', 'לידוקאין: 1-1.5 מ״ג/ק״ג. מנה שנייה 0.5-0.75 מ״ג/ק״ג.', 'מגנזיום: 1-2 גרם בחשד ל-TDP.', 'סודיום ביקרבונט: 1 מא״ק/ק״ג במקרים של היפרקלמיה, הרעלת טריציקלים.'] },
      { title: 'גורמים הפיכים - H&T', points: ['היפוקסיה', 'היפוולמיה', 'היפותרמיה', 'היפו/היפרקלמיה', 'חמצת', 'טמפונדה', 'חזה אוויר בלחץ (Tension Pneumothorax)', 'טרומבוזיס ריאתי (PE)', 'טרומבוזיס כלילי (MI)', 'טוקסינים (רעלים)'] }
    ]
  },
  {
    id: 'pro_asystole_pea',
    name: 'אסיסטולה / PEA',
    category: 'החייאה',
    summary: 'פרוטוקול טיפול באסיסטולה או פעילות חשמלית ללא דופק.',
    type: ItemType.Protocol,
    content: [
      { title: 'אלגוריתם טיפול', points: ['דום לב ונשימה במוניטור -> PEA/Asystole.', 'תן אדרנלין בהקדם האפשרי.', 'בצע החייאה במשך 2 דקות.', 'הערכת קצב. אם עדיין PEA/Asystole?', 'המשך החייאה, מתן אדרנלין כל 3-5 דקות, שקול נתיב אוויר מתקדם.', 'חפש וטפל בגורמים הפיכים (H&T).', 'אם יש ROSC, עבור לפרוטוקול ROSC.'] },
      { title: 'תרופות', points: ['אדרנלין: 1 מ״ג IV/IO כל 3-5 דקות.', 'סודיום ביקרבונט: 1 מא״ק/ק"ג במקרים מסוימים.', 'נרקאן: 0.4 מ״ג ב-1 מ״ל. מינון IV - 0.4 מ״ג.'] }
    ]
  },
  {
    id: 'pro_rosc',
    name: 'חזרה לדופק ספונטני (ROSC)',
    category: 'החייאה',
    summary: 'טיפול וניהול מטופל לאחר חזרה לדופק ספונטני.',
    type: ItemType.Protocol,
    content: [
      { title: 'דגשים והנחיות', points: ['שמור על סטורציה מעל 94%.', 'שמור על נתיב אוויר מתקדם. הנשם בקצב של 10-12 לדקה.', 'שמור על ערכי ETCO2 של 30-40 מ״מ כספית.', 'טפל בלחץ דם נמוך (סיסטולי < 90 ממ״כ) באמצעות נוזלים או אדרנלין/דופמין.', 'בצע אק״ג 12 לידים. בחשד ל-STEMI פנה לחדר צנתורים.'] },
      { title: 'תרופות', points: ['אדרנלין: 2-10 מק״ג/דקה.', 'דופמין: 5-20 מק״ג/ק״ג/דקה.', 'אמיודרון: 1 מ״ג/דקה.', 'דורמיקום: 2.5-5 מ״ג.', 'קטאמין: 500 מ״ג ב-10 מ״ל. מינון 1-2 מ״ג/ק"ג.', 'נרקאן: 0.4 מ״ג.'] }
    ]
  },
  {
    id: 'pro_dnr',
    name: 'אי ביצוע או הפסקת החייאה',
    category: 'החייאה',
    summary: 'קריטריונים לאי-ביצוע או להפסקת מאמצי החייאה.',
    type: ItemType.Protocol,
    content: [
      { title: 'אי התחלת החייאה', points: ['סימני מוות וודאי (ריקבון, צפידת מוות, כתמי מוות).', 'כאשר החייאה מסכנת את הצוות.', 'במקרה של טראומה קשה עם פגיעות שאינן מאפשרות חיים.', 'הוראה רפואית חתומה על ידי המטופל (DNR).'] },
      { title: 'הפסקת החייאה', points: ['לאחר 20 דקות של החייאת ALS מלאה ללא שינוי בקצב (PEA/Asystole).', 'ערכי ETCO2 נמוכים מ-10 מ״מ כספית.', 'היוועצות עם מוקד רפואי.', 'במקרים של פטירה בבית יש לערב משטרה, במיוחד במקרה של קטינים.'] }
    ]
  },
  {
    id: 'pro_ped_general_approach',
    name: 'הגישה הכללית לילדים',
    category: 'ילדים',
    summary: 'הערכה ראשונית, נוסחאות וסימנים חיוניים בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'משולש הערכה ראשונית',
        points: [
          'מראה כללי: טונוס, אינטראקציה, נחמה, מבט, בכי/דיבור.',
          'עבודת נשימה: קולות נשימה חריגים, תנוחת גוף, רטרקציות, נשימת אף.',
          'צבע עור (סירקולציה): חיוורון, כתמים, כיחלון.',
        ],
      },
      {
        title: 'נוסחאות שימושיות לילדים',
        points: [
          'משקל (ק"ג) = (גיל בשנים X 2) + 8',
          'לחץ דם סיסטולי (מינימלי) = (גיל בשנים X 2) + 70',
          'גודל טובוס (ללא בלון) = (גיל בשנים / 4) + 4',
          'גודל טובוס (עם בלון) = (גיל בשנים / 4) + 3.5',
          'עומק טובוס = (גיל בשנים / 2) + 12',
        ],
      },
      {
        title: 'סימנים חיוניים תקינים לפי גיל',
        points: [
          'יילוד (0-28 יום): דופק 90-200, נשימה 35-60, ל"ד סיסטולי 67-84',
          'תינוק (1-12 חודשים): דופק 90-180, נשימה 30-53, ל"ד סיסטולי 72-104',
          'ילד (1-2 שנים): דופק 80-140, נשימה 22-37, ל"ד סיסטולי 86-106',
          'ילד (3-5 שנים): דופק 80-120, נשימה 20-28, ל"ד סיסטולי 89-112',
          'ילד (6-9 שנים): דופק 60-118, נשימה 18-25, ל"ד סיסטולי 97-115',
          'ילד (10 שנים ומעלה): דופק 60-100, נשימה 12-20, ל"ד סיסטולי 100-120',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_cpr',
    name: 'דום לב בילדים',
    category: 'ילדים',
    summary: 'אלגוריתם ודגשים לטיפול בדום לב בילדים ותינוקות.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'דגשים להחייאת ילדים',
        points: [
          'התחל C-A-B.',
          'קצב עיסויים: 100-120 לדקה.',
          'עומק עיסויים: שליש מקוטר בית החזה (כ-4 ס"מ בתינוקות, כ-5 ס"מ בילדים).',
          'יחס עיסויים/הנשמות: 30:2 למציל יחיד. 15:2 לשני מצילים.',
          'לאחר אבטחת נתיב אוויר מתקדם (טובוס/LMA): הנשם כל 2-3 שניות (20-30 בדקה) ללא הפסקת עיסויים.',
          'חבר דפיברילטור/מוניטור בהקדם האפשרי.',
        ],
      },
      {
        title: 'תרופות וטיפולים',
        points: [
          'אדרנלין: 0.01 מ"ג/ק"ג IV/IO (מנה ראשונה ושנייה).',
          'אמיודרון: 5 מ"ג/ק"ג IV/IO, ניתן לחזור עד 2 פעמים.',
          'לידוקאין: 1 מ"ג/ק"ג IV/IO.',
          'שוק חשמלי: התחל ב-2 ג\'אול/ק"ג. שוק שני: 4 ג\'אול/ק"ג. שוקים נוספים: הגדל אנרגיה עד למקסימום 10 ג\'אול/ק"ג או מנת מבוגר.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_vf_pvt',
    name: 'VF / pVT בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול טיפול בפרפור חדרים או טכיקרדיה חדרית ללא דופק בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'אלגוריתם טיפול',
        points: [
          'זיהוי קצב VF/pVT.',
          'תן שוק חשמלי: 2 ג\'אול/ק"ג.',
          'המשך החייאה מיידית למשך 2 דקות.',
          'בדיקת קצב. אם עדיין VF/pVT, תן שוק: 4 ג\'אול/ק"ג.',
          'המשך החייאה למשך 2 דקות. תן אדרנלין 0.01 מ"ג/ק"ג.',
          'בדיקת קצב. אם עדיין VF/pVT, תן שוק: הגדל אנרגיה (עד 10 ג\'אול/ק"ג).',
          'המשך החייאה למשך 2 דקות. תן אמיודרון 5 מ"ג/ק"ג.',
          'חזור על הסבב: החייאה, אדרנלין כל 3-5 דקות, שוק, אמיודרון.',
          'חפש וטפל בגורמים הפיכים (H&T).',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_asystole_pea',
    name: 'אסיסטולה / PEA בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול טיפול באסיסטולה או PEA בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'אלגוריתם טיפול',
        points: [
          'זיהוי קצב אסיסטולה/PEA.',
          'התחל/המשך החייאה מיידית.',
          'תן אדרנלין 0.01 מ"ג/ק"ג IV/IO בהקדם האפשרי.',
          'המשך החייאה למשך 2 דקות.',
          'בדיקת קצב. אם עדיין אסיסטולה/PEA, המשך החייאה.',
          'חזור על מתן אדרנלין כל 3-5 דקות.',
          'אין אינדיקציה למתן שוק חשמלי.',
          'חפש וטפל בגורמים הפיכים (H&T).',
        ],
      },
    ],
  },
  {
    id: 'pro_choking',
    name: 'חנק מגוף זר',
    category: 'נתיב אוויר',
    summary: 'פרוטוקול טיפול בחנק מגוף זר במבוגר.',
    type: ItemType.Protocol,
    content: [
      { title: 'הערכת מצב', points: ['הערך את חומרת החנק. האם המטופל יכול לדבר או להשתעל?'] },
      { title: 'חסימה קלה', points: ['עודד שיעול. המשך להעריך את המצב.'] },
      { title: 'חסימה חמורה - מטופל בהכרה', points: ['בצע 5 לחיצות ברום הבטן (היימליך).', 'אם המטופל מאבד הכרה, התחל החייאה.'] },
      { title: 'חסימה חמורה - מטופל מחוסר הכרה', points: ['התחל עיסויי חזה (30 עיסויים).', 'לפני ביצוע הנשמות, פתח את הפה וחפש את הגוף הזר. אם נראה, הוצא אותו.', 'אם הגוף הזר לא נראה, נסה להנשים. אם בית החזה לא מתרומם, שנה את תנוחת הראש ונסה שוב.', 'המשך בסבבי החייאה.'] }
    ]
  },
  {
    id: 'pro_pulmonary_edema',
    name: 'בצקת ריאות',
    category: 'נשימתי',
    summary: 'פרוטוקול טיפול בבצקת ריאות חריפה.',
    type: ItemType.Protocol,
    content: [
      { title: 'טיפול ראשוני', points: ['הערכה ראשונית (ABC).', 'הושב את המטופל.', 'מתן חמצן לשמירה על סטורציה >94%.', 'חיבור למוניטור ואק"ג 12 לידים.', 'פתיחת וריד.'] },
      { title: 'טיפול תרופתי', points: ['ניטרטים (S.L): ניטרולינגואל 0.4 מ״ג כל 3-5 דקות, אם ל"ד סיסטולי > 100.', 'פוסיד: 1 מ״ג/ק״ג, מנה מקסימלית 120 מ״ג.', 'דופמין: 5-20 מק״ג/ק״ג/דקה במקרה של הלם קרדיוגני.'] },
      { title: 'טיפול מתקדם', points: ['שקול שימוש ב-CPAP אם המטופל במצוקה נשימתית קשה.', 'במצב של הפסקת נשימה מאיימת, עבור לפרוטוקול המתאים.'] }
    ]
  },
  {
    id: 'pro_asthma',
    name: 'התקף אסתמה',
    category: 'נשימתי',
    summary: 'פרוטוקול טיפול בהתקף אסתמה חריף.',
    type: ItemType.Protocol,
    content: [
      { title: 'הערכה וטיפול ראשוני', points: ['הערכה היסטורית ופיזיקלית.', 'מתן חמצן לשמירה על סטורציה >94%.', 'חיבור למוניטור.'] },
      { title: 'טיפול תרופתי', points: ['ונטולין (אינהלציה): 2.5-5 מ״ג, ניתן לחזור כל 20 דקות.', 'אירובנט (אינהלציה): 0.5 מ״ג.', 'סולומדרול (IV): 125 מ״ג.', 'אדרנלין (SC): 0.3-0.5 מ״ג במקרה של התקף קשה.', 'מגנזיום (IV): 2 גרם בהתקף מסכן חיים במשך 20 דקות.'] }
    ]
  },
  {
    id: 'pro_copd',
    name: 'התקף COPD',
    category: 'נשימתי',
    summary: 'פרוטוקול טיפול בהתקף חריף של מחלת ריאות חסימתית כרונית.',
    type: ItemType.Protocol,
    content: [
        { title: 'הערכה ראשונית', points: ['התרשם ממצב הנשימה, צבע העור, דיבור, תנוחת המטופל (תלת רגל).', 'מדוד סימנים חיוניים: סטורציה, קצב נשימה, לחץ דם, דופק.'] },
        { title: 'טיפול ראשוני בחמצן', points: ['המטרה: סטורציה בין 88-92%.', 'במטופל עם סטורציה נמוכה, התחל בחמצן במשקפי אף (2-4 LPM).', 'הימנע ממתן חמצן בריכוז גבוה מדי שעלול לדכא את הדחף הנשימתי.'] },
        { title: 'שימוש ב-CPAP', points: ['שקול CPAP במצוקה נשימתית קשה, סטורציה מתחת 90% למרות מתן חמצן, או סימני עייפות שרירי נשימה.'] },
        { title: 'טיפול תרופתי', points: ['ונטולין (אינהלציה): 2.5 מ"ג.', 'אירובנט (אינהלציה): 0.5 מ"ג.', 'סולומדרול (IV): 125 מ"ג.'] },
        { title: 'הידרדרות', points: ['במקרה של הידרדרות (ישנוניות, הפסקת נשימה), שקול הנשמה באמצעות מפוח ועבור לפרוטוקול הפסקת נשימה מאיימת.'] }
    ]
  },
  {
    id: 'pro_cpap',
    name: 'שימוש ב-CPAP',
    category: 'נשימתי',
    summary: 'פרוטוקול לשימוש במכשיר CPAP במצבי מצוקה נשימתית.',
    type: ItemType.Protocol,
    content: [
        { title: 'התוויות ל-CPAP', points: ['בצקת ריאות (עם ל"ד סיסטולי > 100).', 'COPD / אסתמה במצוקה נשימתית קשה.', 'דלקת ריאות עם היפוקסיה.', 'קצב נשימות > 25 בדקה.', 'שימוש בשרירי עזר.'] },
        { title: 'התוויות נגד', points: ['דום נשימה או החייאה.', 'חוסר הכרה או חוסר יכולת לשתף פעולה.', 'טראומת פנים או חזה משמעותית.', 'לחץ דם סיסטולי < 100 ממ"כ.', 'הקאות או סיכון גבוה לאספירציה.', 'חזה אוויר בלחץ.'] },
        { title: 'אופן השימוש', points: ['הסבר למטופל על התהליך.', 'בחר מסכה בגודל מתאים והצמד היטב לפנים.', 'התחל בלחץ של 5 ס"מ מים (PEEP).', 'העלה את הלחץ בהדרגה כל 5-10 דקות לפי תגובת המטופל (עד 10-15 ס"מ מים).', 'עקוב באופן רציף אחר מדדי הנשימה, סטורציה ולחץ דם.'] },
        { title: 'סיבוכים אפשריים', points: ['תת-לחץ דם.', 'חרדה ואי-נוחות של המטופל.', 'חזה אוויר (פנאומותורקס).'] }
    ]
  },
  {
    id: 'pro_respiratory_arrest',
    name: 'הפסקת נשימה מאיימת',
    category: 'נתיב אוויר',
    summary: 'ניהול נתיב אוויר מתקדם במצב של הפסקת נשימה.',
    type: ItemType.Protocol,
    content: [
        { title: 'זיהוי והערכה', points: ['הערך את מצב הנשימה: קצב (ברדיפנאה/אפנאה), עומק, מאמץ נשימתי.', 'סימנים מחשידים: כיחלון, ירידה בסטורציה, שינוי במצב הכרה, ברדיקרדיה.'] },
        { title: 'ניהול נתיב אוויר בסיסי', points: ['הנשמה יעילה באמצעות מפוח עם מסכה (BVM) וחמצן בריכוז גבוה היא הפעולה החשובה ביותר.', 'השתמש במנתב אוויר פלסטי (AW) בגודל מתאים.'] },
        { title: 'שקילת נתיב אוויר מתקדם (אינטובציה / LMA)', points: ['הכנה: בדוק ציוד, שאיבת הפרשות, תרופות.', 'שקול מתן תרופות (RSI) לפי המצב הקליני.'] },
        { title: 'תרופות (דוגמאות)', points: ['אטומידאט: 0.2-0.3 מ"ג/ק"ג.', 'דורמיקום: 0.1-0.2 מ"ג/ק"ג.', 'קטאמין: 1-2 מ"ג/ק"ג IV או 2-4 מ"ג/ק"ג IM.'] },
        { title: 'בדיקת מיקום טובוס - DOPE', points: ['D - Dislodgement/Displacement (יציאת הטובוס מהמקום)', 'O - Obstruction (חסימה של הטובוס)', 'P - Pneumothorax (חזה אוויר)', 'E - Equipment failure (כשל בציוד)'] }
    ]
  },
  {
    id: 'pro_general_approach',
    name: 'הגישה הכללית למטופל',
    category: 'כללי',
    summary: 'סדר פעולות ודגשים בגישה ראשונית למטופל.',
    type: ItemType.Protocol,
    content: [
      { title: 'סכמת טיפול', points: ['1. בטיחות: כפפות, אפוד מזהה.', '2. הזעקת עזרה: מד״א, כוננים נוספים.', '3. הערכת הכרה: AVPU.', '4. הערך מצב איירווי (A).', '5. הערך מצב נשימה (B).', '6. הערך מצב סירקולציה (C).', '7. דופק ולחץ דם.', '8. אנמנזה.'] },
      { title: 'התרשמות ממצב החולה', points: ['בהכרה/לא בהכרה.', 'תנוחת החולה.', 'קולות נשימה.', 'צבע עור: חיוורון? הזעה? חם/קר? לח/יבש?'] }
    ]
  },
  {
    id: 'pro_anaphylaxis',
    name: 'טיפול באנאפילקסיס',
    category: 'אלרגיה',
    summary: 'זיהוי וטיפול בתגובה אנאפילקטית חריפה ומעודכנת.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וזיהוי',
        points: [
          'סימנים בעור: אורטיקריה (פריחה מגרדת), אנגיואדמה (בצקת בפנים, שפתיים, לשון).',
          'סימנים נשימתיים: קוצר נשימה, צפצופים, סטרידור, שיעול, צרידות.',
          'סימנים קרדיו-וסקולריים: תת-לחץ דם, דופק מהיר, חולשה, סחרחורת, התעלפות.',
          'סימנים גסטרואינטסטינליים: בחילות, הקאות, כאבי בטן, שלשולים.',
        ],
      },
      {
        title: 'טיפול מיידי ומכריע',
        points: [
          'אדרנלין IM בירך הצידית-קדמית. זוהי התערבות החשובה ביותר.',
          'מינון מבוגרים: 0.5 מ"ג (1:1000).',
          'מינון ילדים: 0.01 מ"ג/ק"ג (1:1000), עד למנה מירבית של 0.5 מ"ג.',
          'ניתן לחזור על המנה כל 5-10 דקות לפי הצורך.',
        ],
      },
      {
        title: 'טיפול תומך',
        points: [
          'השכב את המטופל. אם יש קוצר נשימה, אפשר ישיבה. אם יש הלם, הרם רגליים.',
          'מתן חמצן בריכוז גבוה במסכה לשמירה על סטורציה > 94%.',
          'פתיחת וריד ומתן נוזלים (סליין 0.9%). מבוגר: 1-2 ליטר. ילד: 20 מ"ל/ק"ג.',
          'ונטולין באינהלציה במקרה של צפצופים.',
          'סטרואידים (סולומדרול 125 מ"ג IV).',
        ],
      },
    ],
  },
  {
    id: 'pro_post_seizure',
    name: 'פרכוסים / לאחר פרכוס',
    category: 'נוירולוגי',
    summary: 'פרוטוקול טיפול במטופל המפרכס או לאחר פרכוס.',
    type: ItemType.Protocol,
    content: [
      { title: 'הערכת המטופל', points: ['הערכה ראשונית (ABC), שמירה על נתיב אוויר, מתן חמצן.', 'אנמנזה: היסטוריה של פרכוסים, מחלות רקע, שימוש בסמים/אלכוהול.', 'בדיקת סוכר.', 'בדיקת חום.'] },
      { title: 'טיפול בפרכוס פעיל (מעל 5 דקות)', points: ['דורמיקום: 5-10 מ״ג IM/IN או 2.5-5 מ״ג IV.', 'בחשד לאקלמפסיה: מגנזיום 4-6 גרם IV במשך 15-20 דקות.'] },
      { title: 'טיפול לאחר פרכוס', points: ['שמירה על נתיב אוויר פתוח, הנשמה בסיוע אם צריך.', 'ניטור סימנים חיוניים.', 'בחשד להיפוגליקמיה, מתן גלוקוז.', 'פינוי דחוף לבית חולים.'] }
    ]
  },
  {
    id: 'pro_altered_consciousness',
    name: 'שינויים במצב ההכרה',
    category: 'נוירולוגי',
    summary: 'פרוטוקול לבירור וטיפול בשינויים במצב ההכרה.',
    type: ItemType.Protocol,
    content: [
      { title: 'הערכה ראשונית וייצוב', points: ['הערכת מצב הכרה (AVPU).', 'הערכת ABC, אבטחת נתיב אוויר ומתן חמצן.', 'אנמנזה מכוונת: סכרת, אירוע מוחי קודם, חבלת ראש, שימוש בתרופות/סמים.', 'חיבור למוניטור.'] },
      { title: 'אבחנה מבדלת וטיפול', points: ['בדיקת רמת סוכר בדם: אם נמוך מ-60, טפל בהיפוגליקמיה.', 'חשד לשימוש באופיאטים (אישונים קטנים, דיכוי נשימתי): מתן נרקאן 0.4 מ״ג IV/IN.', 'בדיקת F.A.S.T לחשד לאירוע מוחי. אם חיובי, דווח למוקד ופנה למרכז שבץ ייעודי.', 'בחשד לחבלת ראש, קבע קיבוע מלא של עמוד שדרה צווארי.', 'שקול גורמים נוספים: היפותרמיה, זיהום, הרעלה.'] },
      { title: 'תרופות', points: ['גלוקוז: מתן 15 גרם PO לחולה בהכרה. מתן 20-25 גרם (D25%/D50%) IV לחולה מחוסר הכרה.', 'נרקאן (נלוקסון): 0.4 מ״ג IV/IM/IN. ניתן לחזור על המנה כל 5-10 דקות.'] }
    ]
  },
  {
    id: 'pro_tachycardia',
    name: 'טכיקרדיה',
    category: 'קרדיולוגיה',
    summary: 'פרוטוקול טיפול בטכיקרדיה יציבה ולא יציבה.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וסיווג',
        points: [
          'טכיקרדיה: קצב לב מעל 100 פעימות לדקה.',
          'טכיקרדיה סימפטומטית: בדרך כלל קצב לב מעל 150 פעימות לדקה.',
          'הערכה ראשונית: ABC, מתן חמצן, פתיחת וריד, חיבור למוניטור ואק״ג 12 לידים.',
          'זיהוי סימני אי יציבות: לחץ דם נמוך, שינוי במצב הכרה, סימני הלם, כאב בחזה איסכמי, אי ספיקת לב חריפה.',
        ],
      },
      {
        title: 'טיפול בטכיקרדיה לא יציבה',
        points: [
          'הטיפול המיידי הוא היפוך חשמלי מסונכרן.',
          'שקול מתן סדציה לפני ההיפוך במידת האפשר.',
          'מינוני היפוך: קומפלקס צר וסדיר 50-100 ג׳אול; קומפלקס צר ולא סדיר 120-200 ג׳אול; קומפלקס רחב וסדיר 100 ג׳אול; קומפלקס רחב ולא סדיר - דפיברילציה (לא מסונכרן).',
        ],
      },
      {
        title: 'טיפול בטכיקרדיה יציבה - QRS צר',
        points: [
          'בצע מנוברות וגאליות.',
          'אדנוזין 6 מ״ג בדחיפה מהירה ב-IV. אם אין תגובה, ניתן לתת מנה שנייה של 12 מ״ג.',
          'במידה ואין תגובה לאדנוזין, שקול חוסמי תעלות סידן או חוסמי בטא.',
        ],
      },
      {
        title: 'טיפול בטכיקרדיה יציבה - QRS רחב',
        points: [
          'שקול אמיודרון 150 מ״ג IV במשך 10 דקות.',
          'ניתן לשקול פרוקאינאמיד 20-50 מ״ג/דקה, או סוטלול 100 מ"ג במשך 5 דקות.',
          'יש להתייעץ עם מוקד רפואי.',
        ],
      },
    ],
  },
  {
    id: 'pro_hypertensive_crisis',
    name: 'יתר לחץ דם ממאיר',
    category: 'קרדיולוגיה',
    summary: 'פרוטוקול טיפול במשבר יתר לחץ דם עם פגיעה באיברי מטרה.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הגדרה והערכה',
        points: [
          'משבר יתר לחץ דם: עלייה חדה בלחץ הדם (בדרך כלל סיסטולי > 180 או דיאסטולי > 120) עם עדות לפגיעה חריפה באיברי מטרה.',
          'הערך סימני פגיעה באיברי מטרה: מערכת העצבים (כאב ראש, בלבול, פרכוסים), לב (כאב חזה, קוצר נשימה), כליות (ירידה בתפוקת שתן).',
        ],
      },
      {
        title: 'טיפול',
        points: [
          'המטרה היא הורדה מבוקרת של לחץ הדם, לא הורדה מהירה מדי.',
          'טיפול תרופתי יינתן רק לחולים סימפטומטיים עם פגיעה כרונית בלבד.',
          'קפטופריל (Captopril): 12.5 מ״ג SL (מתחת ללשון).',
          'מטרת הטיפול היא להוריד את לחץ הדם הממוצע ב-25% במהלך 30-60 הדקות הראשונות.',
        ],
      },
    ],
  },
  {
    id: 'pro_bradycardia',
    name: 'ברדיקרדיה',
    category: 'קרדיולוגיה',
    summary: 'פרוטוקול טיפול בברדיקרדיה יציבה ולא יציבה.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וסיווג',
        points: [
          'ברדיקרדיה: קצב לב מתחת ל-60 פעימות לדקה.',
          'הערכה ראשונית: ABC, חמצן, וריד, מוניטור, אק״ג 12 לידים.',
          'זיהוי סימני אי יציבות: לחץ דם נמוך, שינוי במצב הכרה, סימני הלם, כאב חזה, אי ספיקת לב.',
        ],
      },
      {
        title: 'טיפול בברדיקרדיה לא יציבה',
        points: [
          'אטרופין 1 מ״ג IV. ניתן לחזור כל 3-5 דקות עד למנה מירבית של 3 מ״ג.',
          'אם אטרופין לא יעיל, התחל בקיצוב חיצוני (Transcutaneous Pacing).',
          'שקול עירוי דופמין (5-20 מק״ג/ק"ג/דקה) או אדרנלין (2-10 מק״ג/דקה) בזמן ההכנה לקיצוב או אם הקיצוב לא יעיל.',
        ],
      },
      {
        title: 'טיפול בברדיקרדיה יציבה',
        points: [
          'במידה והמטופל יציב, יש לנטר אותו, לבצע אק״ג 12 לידים ולהתייעץ עם מוקד רפואי.',
          'יש לזהות ולטפל בגורמים הפיכים.',
        ],
      },
      {
        title: 'זיהוי חסמי הולכה (AV Blocks)',
        points: [
          'דרגה 1: מרווח PR קבוע ומוארך (מעל 0.2 שניות).',
          'דרגה 2 סוג 1 (וונקבך): מרווח PR מתארך בהדרגה עד לחסרונה של פעימת QRS.',
          'דרגה 2 סוג 2: מרווח PR קבוע, אך ישנן פעימות P שלא מועברות (חסרון של QRS).',
          'דרגה 3 (חסם מלא): אין קשר בין גלי P לקומפלקסי QRS. קצב העליות מהיר מקצב החדרים.',
        ],
      },
    ],
  },
  {
    id: 'pro_acs',
    name: 'תסמונת כלילית חריפה (ACS)',
    category: 'קרדיולוגיה',
    summary: 'פרוטוקול טיפול בתסמונת כלילית חריפה.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וטיפול ראשוני',
        points: [
          'הערכת ABC, מתן חמצן אם סטורציה מתחת ל-94%.',
          'אספירין 325 מ״ג ללעיסה (אם אין התוויות נגד).',
          'ביצוע והערכת אק״ג 12 לידים תוך 10 דקות מהמגע הראשוני.',
          'ניטרטים (ניטרולינגואל) 0.4 מ״ג SL כל 5 דקות, אם ל"ד סיסטולי > 90 ואין חשד לאוטם תחתון/ימני.',
          'פתיחת וריד.',
        ],
      },
      {
        title: 'טיפול בכאב שאינו מגיב לניטרטים',
        points: [
          'מורפין 2-4 מ״ג IV במנות חוזרות כל 5-15 דקות עד להקלה בכאב או הופעת תופעות לוואי (תת-לחץ דם, דיכוי נשימתי).',
        ],
      },
      {
        title: 'זיהוי STEMI וטיפול',
        points: [
          'זיהוי עליות ST משמעותיות בשני לידים סמוכים או יותר.',
          'הודעה מיידית לבית החולים המיועד על הגעת מטופל STEMI (הפעלת "צנתור מהיר").',
          'שקול מתן הפרין לפי פרוטוקול מקומי.',
          'יש להימנע ממתן ניטרטים ומורפין במטופלים עם אוטם תחתון וחשד למעורבות חדר ימין.',
        ],
      },
    ],
  },
  {
    id: 'pro_eclampsia',
    name: 'אקלמפסיה / פרה-אקלמפסיה',
    category: 'מיילדות',
    summary: 'פרוטוקול טיפול באקלמפסיה ופרה-אקלמפסיה.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הגדרות',
        points: [
          'פרה-אקלמפסיה: יתר לחץ דם (מעל 140/90) לאחר שבוע 20 להריון.',
          'אקלמפסיה: הופעת פרכוסים על רקע של פרה-אקלמפסיה.',
          'גורמי סיכון: הריון ראשון, גיל מעל 40, סכרת, יתר לחץ דם כרוני.',
        ],
      },
      {
        title: 'סימנים וטיפול',
        points: [
          'בדיקת סוכר לשלילת היפוגליקמיה כגורם לפרכוס.',
          'מגנזיום סולפט: 4-6 גרם IV במשך 15-20 דקות. זוהי תרופת הבחירה לטיפול ומניעת פרכוסים.',
          'במידה והפרכוסים נמשכים, ניתן לשקול מתן דורמיקום 2.5-5 מ"ג IV/IM/IN.',
          'השכבת המטופלת על צד שמאל.',
          'מתן חמצן.',
          'פינוי דחוף לבית חולים.',
        ],
      },
    ],
  },
  {
    id: 'pro_childbirth',
    name: 'קבלת לידה',
    category: 'מיילדות',
    summary: 'פרוטוקול לניהול לידת חירום בשטח.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הכנה ללידה',
        points: [
          'הכן ציוד: ערכת לידה, שמיכות, ציוד שאיבה.',
          'וודא סביבה חמה ונקייה.',
          'הנח את היולדת במצב נוח (בדרך כלל שכיבה על הגב עם ברכיים מכופפות).',
          'שמור על פרטיות ככל האפשר.',
        ],
      },
      {
        title: 'ניהול לידה תקינה',
        points: [
          'עודד את היולדת ללחוץ עם הצירים.',
          'עם יציאת ראש התינוק, תמוך בו ואפשר לו להסתובב באופן טבעי.',
          'לאחר יציאת התינוק, יבש אותו, עטוף אותו וחמם אותו. הנח אותו על בטן האם.',
          'חתוך את חבל הטבור רק לאחר שהוא מפסיק לפעום.',
          'המתן ליציאת השליה (בדרך כלל תוך 20 דקות). שמור את השליה.',
          'בצע עיסוי של הרחם לאחר יציאת השליה כדי למנוע דימום.',
        ],
      },
      {
        title: 'הערכת הילוד - APGAR',
        points: [
          'הערך בדקה 1 ו-5 לאחר הלידה.',
          'Appearance (צבע עור): ורוד (2), גוף ורוד וגפיים כחולות (1), כחול/חיוור (0).',
          'Pulse (דופק): מעל 100 (2), מתחת ל-100 (1), אין דופק (0).',
          'Grimace (תגובה לגירוי): בוכה/משתעל (2), עושה פרצוף (1), אין תגובה (0).',
          'Activity (טונוס שרירים): תנועה פעילה (2), כיפוף מסוים (1), רפה (0).',
          'Respiration (נשימה): בכי חזק (2), נשימה איטית/לא סדירה (1), אפנאה (0).',
        ],
      },
      {
        title: 'טיפול ראשוני בילוד',
        points: [
          'יבש את התינוק היטב והחלף את המגבת הרטובה.',
          'שמור על חום גוף - עטוף את התינוק ואת הראש.',
          'שמור על נתיב אוויר פתוח.',
          'אם התינוק לא נושם - בצע גירוי עדין (טפיחות על כפות הרגליים).',
          'אם אין תגובה - התחל בהחייאת יילוד.',
        ],
      },
    ],
  },
  {
    id: 'pro_childbirth_complications',
    name: 'סיבוכי לידה',
    category: 'מיילדות',
    summary: 'טיפול בסיבוכי לידה בשטח.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'צניחת חבל הטבור (Prolapsed Cord)',
        points: [
          'מצב חירום מיידי! קרא לגיבוי.',
          'הנח את היולדת בתנוחת ברכיים-חזה (Knee-Chest) או טרנדלנברג.',
          'הכנס יד לנרתיק ודחוף בעדינות את חלק התינוק המציג כדי להסיר לחץ מחבל הטבור.',
          'אל תנסה להכניס את החבל בחזרה.',
          'כסה את חבל הטבור במגבת לחה.',
          'פנה מיידית לבי"ח - לידה בניתוח קיסרי חירום.',
        ],
      },
      {
        title: 'חבל טבור כרוך סביב הצוואר (Nuchal Cord)',
        points: [
          'נסה להחליק בעדינות את החבל מעל ראש התינוק.',
          'אם לא ניתן להחליק - חסום את החבל בשני מקומות וגזור ביניהם.',
          'המשך בלידה כרגיל לאחר שחרור החבל.',
        ],
      },
      {
        title: 'מצג עכוז (Breech Presentation)',
        points: [
          'אפשר לרגליים ולגוף לצאת באופן ספונטני - אל תמשוך!',
          'תמוך בגוף התינוק מתחת, אל תרים אותו.',
          'אם הראש נתקע - בצע מנוורת Mauriceau: אצבעות על עצמות הלחי, הפעל לחץ עדין כלפי מטה.',
          'שקול אפיזיוטומיה אם יש צורך.',
        ],
      },
      {
        title: 'דימום לאחר לידה (PPH)',
        points: [
          'דימום של מעל 500 מ"ל לאחר לידה וגינלית הוא חריג.',
          'בצע עיסוי רחם אגרסיבי - יד אחת על הבטן, השנייה תומכת מאחור.',
          'עודד הנקה או גירוי פטמות - משחרר אוקסיטוצין.',
          'אם השליה לא יצאה - אל תמשוך בחבל הטבור!',
          'תן נוזלים IV.',
          'פנה לבי"ח בדחיפות.',
        ],
      },
      {
        title: 'כתף תקועה (Shoulder Dystocia)',
        points: [
          'מנוורת McRoberts: כופף את ירכי האם כלפי הבטן.',
          'לחץ על-גבי (Suprapubic Pressure) - לחץ כלפי מטה ולצד מעל עצם הערווה.',
          'אל תלחץ על הפונדוס!',
          'נסה סיבוב עדין של הכתף האחורית.',
        ],
      },
    ],
  },
   {
    id: 'pro_ped_rosc',
    name: 'ROSC בילדים',
    category: 'ילדים',
    summary: 'טיפול וניהול מטופל ילד לאחר חזרה לדופק ספונטני.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'דגשים והנחיות לאחר ROSC',
        points: [
          'המשך ניטור רציף: חמצן, ETCO2, לחץ דם.',
          'שמור על סטורציה בין 94-99%.',
          'שמור על ערכי ETCO2 תקינים (30-40 ממ"כ).',
          'טפל בתת-לחץ דם בנוזלים (בולוס 10-20 מ"ל/ק"ג) ו/או תרופות וזופרסוריות.',
          'בצע אק"ג 12 לידים.',
        ],
      },
      {
        title: 'טיפול בגורמים הפיכים (H&T)',
        points: [
          'היפוקסיה, היפוולמיה, היפותרמיה, היפו/היפרקלמיה, חמצת.',
          'טמפונדה, חזה אוויר בלחץ, טרומבוזיס, טוקסינים.',
        ],
      },
      {
        title: 'תרופות לאחר ROSC',
        points: [
          'אדרנלין (עירוי): 0.1-1 מק"ג/ק"ג/דקה.',
          'דופמין (עירוי): 5-20 מק"ג/ק"ג/דקה.',
          'אמיודרון (עירוי): 5 מ"ג/ק"ג במשך 20-60 דקות.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_respiratory_arrest',
    name: 'הפסקת נשימה מאיימת בילדים',
    category: 'ילדים',
    summary: 'ניהול נתיב אוויר מתקדם במצב של הפסקת נשימה בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'זיהוי והערכה',
        points: [
          'קצב נשימות תקין לפי גיל: 0-1 (30-53), 1-3 (22-37), 3-6 (20-28), 6-12 (18-25), >12 (12-20).',
          'סימנים להפסקת נשימה מאיימת: ברדיפנאה, נשימות שטחיות (Gasping), אפנאה.',
        ],
      },
      {
        title: 'ניהול מתקדם של נתיב אוויר',
        points: [
          'שקול אינטובציה או LMA במידה ולא ניתן להנשים ביעילות עם מפוח.',
          'בדיקת מיקום טובוס - DOPE (Displacement, Obstruction, Pneumothorax, Equipment).',
        ],
      },
      {
        title: 'תרופות RSI בילדים (דוגמאות)',
        points: [
          'אטומידאט: 0.2-0.3 מ"ג/ק"ג.',
          'קטאמין: 1.5-2 מ"ג/ק"ג IV/IO או 4-5 מ"ג/ק"ג IM.',
          'שקול מתן אטרופין (0.02 מ"ג/ק"ג) למניעת ברדיקרדיה.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_stridor',
    name: 'סטרידור בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול לטיפול בסטרידור (חסימת דרכי אוויר עליונות) בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה ואבחנה מבדלת',
        points: [
          'הערכה ראשונית של חומרת המצוקה הנשימתית.',
          'אבחנה מבדלת: קרופ (Croup), אפיגלוטיטיס, גוף זר, תגובה אלרגית.',
          'סימני מצוקה נשימתית קשה: סטרידור במנוחה, רטרקציות, כיחלון, ירידה במצב הכרה.',
        ],
      },
      {
        title: 'טיפול',
        points: [
          'מתן חמצן לח.',
          'אדרנלין באינהלציה: 0.5 מ"ג/ק"ג (מתוך אמפולת 1 מ"ג/מ"ל), מקסימום 5 מ"ג.',
          'סטרואידים: דקסמתזון.',
          'במקרה של שיפור, יש להמשיך בניטור. במקרה של חוסר שיפור או החמרה, יש להתכונן לניהול נתיב אוויר מתקדם.',
        ],
      },
    ],
  },
  {
    id: 'pro_newborn_resuscitation',
    name: 'החייאת יילוד',
    category: 'יילודים',
    summary: 'פרוטוקול החייאת יילוד (NRP).',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה ראשונית (תוך 30 שניות)',
        points: [
          'האם התינוק נולד במועד? בוכה/נושם? טונוס טוב?',
          'אם כן: הנח על האם, יבש, חמם, נקה נתיב אוויר אם צריך, המשך להעריך.',
          'אם לא: חמם, נקה נתיב אוויר, יבש, גרה (Stimulate).',
        ],
      },
      {
        title: 'הערכת דופק ונשימה',
        points: [
          'אם יש אפנאה או דופק < 100: התחל הנשמה בלחץ חיובי (PPV) עם חמצן בחדר אוויר. קצב: 40-60 נשימות בדקה.',
          'אם הדופק עדיין < 100 לאחר 30 שניות של PPV יעיל: בדוק תנועות בית חזה ונשום מחדש.',
          'אם הדופק < 60: התחל עיסויי חזה. יחס 3:1 (90 עיסויים ו-30 הנשמות בדקה).',
        ],
      },
      {
        title: 'תרופות',
        points: [
          'אדרנלין: אם הדופק נשאר < 60 למרות 30 שניות של עיסויים והנשמה יעילים, תן אדרנלין.',
          'מינון IV/IO: 0.01-0.03 מ"ג/ק"ג.',
          'מינון ET: 0.05-0.1 מ"ג/ק"ג.',
          'שקול מתן נוזלים (10 מ"ל/ק"ג) במקרה של חשד להיפוולמיה.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_asthma',
    name: 'אסתמה בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול טיפול בהתקף אסתמה חריף בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכת חומרת ההתקף',
        points: [
          'התקף קל/בינוני: מדבר במשפטים, SpO2 91-95%, ללא שימוש ניכר בשרירי עזר.',
          'התקף קשה: מדבר במילים, SpO2 < 90%, שימוש ניכר בשרירי עזר, טכיקרדיה.',
          'הפסקת נשימה מאיימת: ישנוניות, בלבול, כניסת אוויר ירודה או שקטה.',
        ],
      },
      {
        title: 'טיפול תרופתי',
        points: [
          'ונטולין (אינהלציה): 0.15 מ"ג/ק"ג, מקסימום 5 מ"ג, כל 20 דקות.',
          'אירובנט (אינהלציה): 0.25 מ"ג (בילדים < 20 ק"ג) או 0.5 מ"ג (בילדים > 20 ק"ג).',
          'סולומדרול: 2 מ"ג/ק"ג IV, מקסימום 125 מ"ג.',
          'אדרנלין: 0.01 מ"ג/ק"ג SC/IM (מנה מקסימלית 0.5 מ"ג) להתקף קשה.',
          'מגנזיום: 25-50 מ"ג/ק"ג IV (מקסימום 2 גרם) במשך 20 דקות להתקף מסכן חיים.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_anaphylaxis',
    name: 'אנאפילקסיס בילדים',
    category: 'ילדים',
    summary: 'זיהוי וטיפול באנאפילקסיס בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'טיפול מיידי',
        points: [
          'אדרנלין IM: 0.01 מ"ג/ק"ג (1:1000), מנה מקסימלית 0.5 מ"ג. זוהי תרופת הבחירה.',
          'ניתן לחזור על המנה כל 5-10 דקות.',
        ],
      },
      {
        title: 'טיפול תומך',
        points: [
          'השכב את המטופל והרם רגליים.',
          'מתן חמצן בריכוז גבוה.',
          'נוזלים: בולוס סליין 0.9% במינון 20 מ"ל/ק"ג. ניתן לחזור לפי הצורך.',
          'ונטולין באינהלציה לצפצופים.',
          'סטרואידים (סולומדרול 2 מ"ג/ק"ג IV).',
          'במקרה של תת-לחץ דם עמיד, שקול עירוי אדרנלין: 0.1-1 מק"ג/ק"ג/דקה.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_seizure',
    name: 'פרכוסים בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול טיפול בפרכוסים בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'טיפול ראשוני',
        points: [
          'שמירה על נתיב אוויר, מתן חמצן, ניטור סטורציה.',
          'בדיקת רמת סוכר בדם. אם < 60, טפל בהיפוגליקמיה.',
          'בדיקת חום.',
        ],
      },
      {
        title: 'טיפול תרופתי (לפרכוס מעל 5 דקות)',
        points: [
          'דורמיקום (מידאזולם): 0.1-0.2 מ"ג/ק"ג IV/IO/IM/IN, מנה מקסימלית 10 מ"ג.',
        ],
      },
      {
        title: 'טיפול בהיפוגליקמיה',
        points: [
          'גלוקוז ליילודים: 5 מ"ל/ק"ג של D10W.',
          'גלוקוז לתינוקות וילדים: 2-4 מ"ל/ק"ג של D25W.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_altered_consciousness',
    name: 'שינויים במצב הכרה בילדים',
    category: 'ילדים',
    summary: 'בירור וטיפול בשינויים במצב ההכרה בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וייצוב',
        points: [
          'הערכת ABC, מתן חמצן, ניטור סימנים חיוניים.',
          'בדיקת רמת סוכר.',
        ],
      },
      {
        title: 'אבחנה מבדלת וטיפול',
        points: [
          'היפוגליקמיה: מתן גלוקוז לפי פרוטוקול פרכוסים.',
          'הרעלת אופיאטים: מתן נרקאן 0.1 מ"ג/ק"ג (עד 2 מ"ג).',
          'חבלת ראש: קיבוע עמוד שדרה צווארי, הערכה נוירולוגית.',
          'זיהום/ספסיס: הערכת חום, לחץ דם, מתן נוזלים.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_tachycardia',
    name: 'טכיקרדיה בילדים',
    category: 'ילדים',
    summary: 'טיפול בטכיקרדיה יציבה ולא יציבה בילדים.',
    type: ItemType.Protocol,
    content: [
      {
        title: 'הערכה וסיווג',
        points: [
          'קצב סינוס תקין: בתינוקות עד 220, בילדים עד 180.',
          'זיהוי סימני אי יציבות: תת-לחץ דם, שינוי במצב הכרה, סימני הלם.',
          'סיווג לפי רוחב QRS: צר (< 0.09 שניות) או רחב (> 0.09 שניות).',
        ],
      },
      {
        title: 'טכיקרדיה לא יציבה',
        points: [
          'היפוך חשמלי מסונכרן: 0.5-1 ג\'אול/ק"ג. אם אין שיפור, הגדל ל-2 ג\'אול/ק"ג.',
          'שקול סדציה לפני ההיפוך.',
        ],
      },
      {
        title: 'SVT יציב (QRS צר)',
        points: [
          'נסה מנוברות וגאליות (קרח על הפנים בתינוקות).',
          'אדנוזין: 0.1 מ"ג/ק"ג (מקסימום 6 מ"ג) בדחיפה מהירה. מנה שנייה: 0.2 מ"ג/ק"ג (מקסימום 12 מ"ג).',
        ],
      },
      {
        title: 'VT יציב (QRS רחב)',
        points: [
          'התייעץ עם מומחה.',
          'אמיודרון: 5 מ"ג/ק"ג IV במשך 20-60 דקות.',
          'פרוקאינאמיד: 15 מ"ג/ק"ג IV במשך 30-60 דקות.',
        ],
      },
    ],
  },
  {
    id: 'pro_ped_bradycardia',
    name: 'ברדיקרדיה בילדים',
    category: 'ילדים',
    summary: 'פרוטוקול טיפול בברדיקרדיה יציבה ולא יציבה בילדים.',
    type: ItemType.Protocol,
    content: [
        { title: 'הערכה וזיהוי', points: ['הערכה ראשונית (ABC).', 'זיהוי סימני אי יציבות: תת-לחץ דם, שינוי במצב הכרה, סימני הלם.', 'הגורם השכיח ביותר לברדיקרדיה בילדים הוא היפוקסיה. יש לטפל בחמצן והנשמה תחילה.'] },
        { title: 'טיפול', points: ['אם הדופק < 60 עם סימני אי יציבות למרות חמצון והנשמה יעילים, התחל עיסויי חזה.', 'אדרנלין 0.01 מ"ג/ק"ג IV/IO. ניתן לחזור כל 3-5 דקות.', 'אם הברדיקרדיה נמשכת, שקול אטרופין 0.02 מ"ג/ק"ג (בחשד לטונוס וגאלי מוגבר).', 'שקול קיצוב חיצוני (Pacing).'] },
        { title: 'תרופות', points: ['אדרנלין: מינון IV/IO - 0.01 מ"ג/ק"ג. מינון ET - 0.1 מ"ג/ק"ג.', 'אטרופין: מינון IV/IO - 0.02 מ"ג/ק"ג. מנה מינימלית 0.1 מ"ג, מנה מקסימלית בילד 0.5 מ"ג.'] },
        { title: 'סיווג חסמי הולכה (AV Blocks)', points: ['דרגה 1: הארכת מרווח PR.', 'דרגה 2 סוג 1 (וונקבך): התארכות הדרגתית של PR עד להחסרת פעימה.', 'דרגה 2 סוג 2: מרווח PR קבוע עם החסרת פעימות.', 'דרגה 3: חוסר קשר מוחלט בין עליות לחדרים.'] }
    ]
  },
  {
      id: 'pro_ped_pain_management',
      name: 'טיפול בכאב בילדים',
      category: 'ילדים',
      summary: 'פרוטוקול להערכת וטיפול בכאב בילדים.',
      type: ItemType.Protocol,
      content: [
          { title: 'הערכת כאב', points: ['השתמש בסולם כאב מתאים לגיל (למשל, סולם פנים).', 'כאב קל: VAS 1-3.', 'כאב בינוני: VAS 4-6.', 'כאב קשה: VAS 7-10.'] },
          { title: 'טיפול לא תרופתי', points: ['קיבוע של האיבר הפגוע.', 'קירור מקומי.', 'הסחת דעת והרגעה.'] },
          { title: 'טיפול תרופתי', points: [
            'כאב קל: אקמול (PO) 10-15 מ"ג/ק"ג.',
            'כאב בינוני: אופטלגין (IV) 10 מ"ג/ק"ג.',
            'כאב קשה: מורפין (IV) 0.05-0.1 מ"ג/ק"ג, או קטאמין (IV) 0.2 מ"ג/ק"ג.',
            'שקול מתן פראמין כטיפול מונע בחילות והקאות עם מתן אופיאטים.'
          ]}
      ]
  },
  // ===== TRAUMA PROTOCOLS =====
  {
    id: 'pro_trauma_general',
    name: 'הגישה הכללית לנפגע טראומה',
    category: 'טראומה',
    summary: 'פרוטוקול כללי לטיפול בנפגעי טראומה כולל ABCDE, משולש קושינג, GCS, והערכת הלם.',
    type: ItemType.Protocol,
    content: [
      { title: 'הגעה ובטיחות', points: ['דיווח הגעה למוקד.', 'בטיחות - כפפות, אפוד מזוהה, בטיחות זירה, בטיחות של הצוות.', 'הזמנת סיוע - כוננים נוספים, ALS, משטרה, כב"ה.'] },
      { title: 'P.H.T.L.S', points: ['עצירת שטפי דם פורצים.', 'שקול הנחת צווארון לנפגע עם חשד לפגיעה בעמוד שדרה צווארי.'] },
      { title: 'A - נתיב אוויר', points: ['הסתכל על פניו של הנפגע ועל שפתיו.', 'הערך את רמת ההכרה (AVPU).', 'הערך חסימות בדרכי אוויר, הערך טראומה לדרכי אוויר.', 'פעל במינימום טלטול לנפגע. במידת הצורך עבור לפרוטוקול מתאים.'] },
      { title: 'B - נשימה', points: ['חשוף בית חזה - הערך חור כניסה / יציאה, בדוק בית שחי וגב, בדוק סימטריות, בצע האזנה, הערך פגיעות חזה (פתוח/סגור).', 'שקול אשרמן, בחשד לטנשן בצע NA.', 'נשימות - טאכיפניאה/ברדיפניאה, נשימה שטחית/עמוקה.', 'חבר מד סטורציה. הערך מצוקה נשימתית צורך בהנשמות ומעבר לפרוטוקול הפסקת נשימה מאיימת.'] },
      { title: 'C - מחזור הדם', points: ['חפש אחר דימומים, בדוק גם בין הירכיים בעכוז ובגב.', 'עצור ע"י לחץ ישיר שטפי דם הנראים לעין. האם הדימום נשלט?', 'הערך דפיקות פריפריות (נוכחות, קצב, סדירות). הערך לחץ דם, חפש סימני הלם, התרשם ממצב העור (צבע, טמפרטורה, לחות).'] },
      { title: 'D - נוירולוגיה', points: ['בצע הערכה נוירולוגית מחודשת ל-GCS, בדוק תנועתיות ותחושות בגפיים.', 'בדוק אישונים, היה ערני לאי שקט - היפוקסיה. בנפצע דחוף בצע הערכה מחודשת כל 5 דקות.'] },
      { title: 'E - חשיפה', points: ['הפשטה וחיפוש אחר פגיעות נוספות. דאג לכסות נפגע למניעת היפותרמיה.'] },
      { title: 'סקר שניוני', points: ['בדוק סימנים חיוניים, בצע חבישות וקיבועים, בצע הערכות חוזרות.'] },
      { title: 'נפגע לא יציב', points: ['ירידה במצב ההכרה, חסימה של דרכי האוויר או איום עליהן.', 'נשימות מעל 30 או מתחת ל-8.', 'דופק מעל 120, לחץ דם נמוך, דימום בלתי נשלט.', 'סימני הלם אופייניים, הידרדרות במדד GCS, כישלון בביצוע פרוצדורות חיוניות.'] },
      { title: 'משולש קושינג', points: ['לחץ דם סיסטולי עולה.', 'קצב לב יורד.', 'קצב נשימות יורד או נשימות לא סדירות.', 'מהווה סימן לעליית לחץ תוך-גולגולתי.'] },
      { title: 'סימנים לפגיעת ראש חמורה', points: ['שינויים במצב הכרה.', 'דופק איטי.', 'לחץ דם במגמת עלייה.', 'בחילות והקאות.', 'אישונים לא שווים.', 'אי שקט = היפוקסיה.', 'שינויים בדפוסי נשימה.'] },
      { title: 'מדד GCS', points: ['פקיחת עיניים: ספונטנית (4), להוראה (3), לכאב (2), אין (1).', 'דיבור: מתמצא (5), מבולבל (4), משמיע מילים (3), משמיע קולות (2), אין (1).', 'תנועה: ממלא פקודות (6), ממקם כאב (5), נסוג מכאב (4), מכופף לכאב (3), מיישר לכאב (2), אין (1).'] },
      { title: 'פגיעת חזה סגור', points: ['שבר בצלעות - ייתכנו שינויים בדפוסי נשימה (טאכיפניאה שטחית), ייתכן דיכוי נשימתי בגלל הכאב.', 'שבר בסטרנום - חבר את הנפגע למוניטור.'] },
      { title: 'חזה מרפרף (Flail Chest)', points: ['סימנים - כאבים באזור החזה, סימני פגיעה בחזה, שינוי צורה וכיחלון, נשימה פרדוקסלית.'] },
      { title: 'פגיעת חזה פתוח', points: ['סימנים - חפש אחר חור כניסה ויציאה.', 'פצע מבעבע, יונק או שואב.', 'שקול שימוש באשרמן.'] },
      { title: 'חזה אוויר בלחץ (Tension Pneumothorax)', points: ['סימנים - העדר קולות נשימה בצד הפגוע, גודש ורידי צוואר, עלייה לא סימטרית של בית החזה, ירידה בלחץ דם, סימני הלם.', 'שקול שימוש באשרמן (חור כניסה/יציאה).', 'N.A – Needle Application.', 'מיקום - בין צלע 3-2 בקו מיד קלוויקולרי.'] },
      { title: 'הערכת נפגע הלם', points: ['בנפגע הלם יש לחפש את מקור הדימום (פגיעת בטן, פגיעת חזה, פגיעת ירכיים/שברים).', 'התרשם ממנגנון החבלה, אם ישנו כוח.', 'בדוק את הגורם להלם.', 'טפל לפי סבב טיפול - ראשוני ומשלים.'] },
      { title: 'חומרת ההלם', points: ['הלם מפוצה: דופק מוגבר קצב לב מהיר, עור חיוור קר לח, לחץ דם תקין, ללא שינוי ברמת ההכרה.', 'הלם בלתי מפוצה: דופק מוגבר מאוד טכיקרדיה, עור חיוור קר גוון "שעווה", לחץ דם נמוך, משתנה מבולבל עד חסר הכרה.', 'הלם בלתי הפיך: דופק איטי, עור חיוור קר גוון "שעווה", לחץ דם נמוך מאוד, חוסר הכרה.'] },
      { title: 'הערכת דימום פנימי', points: ['איבוד דם פנימי כתוצאה משברים:', 'צלע: 125 סמ"ק.', 'רדיוס / אולנה: 250-500 סמ"ק.', 'הומרוס: 500-750 סמ"ק.', 'טיביה / פיבולה: 500-1000 סמ"ק.', 'פמור: 1000-2000 סמ"ק.', 'אגן: 1000 עד מסיבי.'] },
      { title: 'הקסקפרון (Tranexamic Acid)', points: ['צורת הופעה - אמפולה 500 מ"ג, 10 מ"ל.', 'מינון IV - מבוגר 1 גרם, פדיאטרי 15 מ"ג לק"ג, מינון מקסימלי 1 גרם.', 'אופן הכנה - שאב 2 אמפולות (בפדיאטרי 1 מ"ל לכל 3 ק"ג) לתוך 100 מ"ל סליין.', 'אופן הכנה - תן בטפטוף במשך 10 דקות.', 'התוויות נגד - רגישות ידועה, חבלת ראש קשה ומבודדת.', 'מיועד למטופלים עם דימום בלתי נשלט.', 'אין לעכב פינוי לצורך מתן התרופה.', 'רצוי לתת עד 3 שעות מתחילת הדימום.'] },
      { title: 'נוזלים', points: ['אין לתת באופן רוטיני לנפגעים הסובלים מדימום.', 'נוזל הבחירה במצבי הלם היפו-וולמי (נתת נפחי) הנו רינגר-לקטט (תמיסת הרטמן).', 'יש לתת בולוסים של 250 מ"ל עד קבלת לחץ דם סיסטולי של 90 ממ"כ.'] },
      { title: 'טיפול בכאב', points: ['יש לעבור לפרוטוקול טיפול בכאב.'] },
      { title: 'כללי', points: ['שים לב - סימני הלם גובירם על סימני פגיעת ראש.'] }
    ]
  },
  {
    id: 'pro_trauma_cardiac_arrest',
    name: 'דום לב ונשימה כתוצאה מטראומה',
    category: 'טראומה',
    summary: 'פרוטוקול טיפול בדום לב ונשימה כתוצאה מטראומה (TCPA) - החייאה בשטח וסוגיות פינוי.',
    type: ItemType.Protocol,
    content: [
      { title: 'הערכה ראשונית', points: ['דיווח הגעה למוקד.', 'הערך הכרה נשימה ודופק.', 'זהה דום לב ונשימה.'] },
      { title: 'פגיעה קהה', points: ['בבדיקה ראשונית ללא דופק ללא נשימה, במוניטור נראה אסיסטולה או PEA מתחת ל-40.'] },
      { title: 'מוות ודאי', points: ['אובדן צלם אנוש, ניתוק הראש, צפידת מוות, כתמי מוות מפושטים.'] },
      { title: 'סימני את"פ', points: ['אישונים - תגובה לאור.', 'תנועות ספונטניות.', 'פעילות חשמלית במוניטור.'] },
      { title: 'פעולות דחופות - מצילות חיים', points: ['עיסויים, הנשמות, דפיברילציה (VF/VT).', 'אינטובציה (במידה ולא מעכבת פינוי), NA.', 'נתיב וורידי / שלדיי (IV / IO) ומתן נוזלים (במהלך הפינוי).'] },
      { title: 'טראומה חודרת', points: ['במידה ויש את"פ - אישונים - תגובה לאור או תנועות ספונטניות או פעילות חשמלית במוניטור.'] },
      { title: 'טראומה קהה', points: ['יש להימנע מביצוע פעולות החייאה בנפגע טראומה קהה אשר בבדיקה ראשונית בשטח נמצאו ללא דופק וללא נשימה, ובמוניטור נצפתה אסיסטולה או PEA מתחת ל-40.'] },
      { title: 'כללי', points: ['הפרוטוקול מתייחס לרמת נפגע בודד ולא במצב שבו נמצאים בשטח נפגעים נוספים שאינם מטופלים.', 'תעדוף ביצוע פעולות מצילות חיים בנפגעים אחרים (פתיחת נתיב אוויר, סיוע נשימתי, עצירת דימום חיצוני).', 'איש צוות ALS לא יתחיל פעולות החייאה בשטח בכל מקרה של טראומה בו קיימים סימנים של מוות ודאי (צפידת מוות, איבוד צלם אנוש, ריקבון, כתמי מוות).'] },
      { title: 'פתיחת נתיב אוויר', points: ['פתיחת נתיב אוויר על ידי דחיקת לסת.', 'בהעדר קורלציה בין הטראומה לבין דום הלב יש לפעול לפי פרוטוקול דום לב.'] },
      { title: 'אינדיקציות לביצוע החייאה', points: ['טראומה חודרת – במידה ויש את"פ - אישונים - תגובה לאור או תנועות ספונטניות או פעילות חשמלית במוניטור.', 'טראומה קהה - יש להימנע מביצוע פעולות החייאה בנפגע טראומה קהה אשר בבדיקה ראשונית בשטח נמצאו ללא דופק וללא נשימה, ובמוניטור נצפתה אסיסטולה או PEA מתחת ל-40.'] },
      { title: 'פעולות החייאה בטראומה', points: ['עיסויים, הנשמות, דפיברילציה (VF/VT).', 'אינטובציה (במידה ולא מעכבת פינוי), NA, נוזלים IV/IO.'] },
      { title: 'אין להפסיק פעולות החייאה במקרים הבאים ולשקול פינוי תוך כדי החייאה לבי"ח', points: ['תינוקות וילדים קטנים.', 'היפותרמיה קשה (חום גוף מתחת ל-32°C).'] },
      { title: 'סוגיות פינוי', points: ['משך פינוי נמוך מ-15 דקות: בצע בשטח טיפולים דחופים הכרחיים בלבד, פנה תוך כדי החייאה.', 'משך פינוי גדול מ-15 דקות: יש לבצע פעולות החייאה בשטח (טרם הפינוי).', 'במידה ואין תגובה לאחר 10 דקות צור קשר עם המוקד הרפואי לאישור הפסקת פעולות החייאה.'] }
    ]
  },
  {
    id: 'pro_trauma_immobilization',
    name: 'קיבוע נפגע טראומה',
    category: 'טראומה',
    summary: 'פרוטוקול לקיבוע נפגעי טראומה עם התייחסות לפגיעות עמוד שדרה ומנגנון חשוד.',
    type: ItemType.Protocol,
    content: [
      { title: 'כללי', points: ['אין להוריד נפגע מלוח גב שהונח ע"י צוות BLS.', 'הסר אמצעי קיבוע לצורך בדיקות וטיפולים בלבד.', 'אין צורך לקבע נפגעי פציעה חודרת אלא אם יש נוק נוירולוגי ודאי מהפגיעה.', 'בכל ספק יש לבצע קיבוע.', 'יכולת של נפגע טראומה לעמוד או ללכת לא שוללת פגיעה משמעותית בעמוד השדרה.'] },
      { title: 'בדיקה גופנית', points: ['כאב / רגישות, דפורמציה.'] },
      { title: 'גורם מסיח', points: ['חבלה מסיחה, אלכוהול / סמים, קשיי תקשורת.'] },
      { title: 'חבלה קהה', points: ['מצבים המחייבים קיבוע בנפגע חבלה קהה:', 'ירידה ברמת הכרה.', 'חבלת ראש משמעותית.', 'מצב קוגנטיבי בסיסי פגוע (דמנציה, פיגור שכלי, הפרעות פסיכיאטריות).', 'השפעה של תרופה / אלכוהול / סמים.', 'חבלה קשה מסיחה (שבר, כוויות וכו\').', 'חוסר יכולת לתקשר בצורה מהימנה עם המטופל בשל בעיות שפה וכו\'.', 'רגישות במישוש לאורך עמוד השדרה או רגישות בעת ביצוע תנועות של עמוד השדרה.', 'חסר נוירולוגי ממוקד (שיתוק / חולשת גפה, ירידה בתחושה, נימול, הלם נוירוגני).'] },
      { title: 'קיבוע ידני של עמ"ש צווארי', points: ['יש להימנע מקיבוע במנח ניטרלי במצבים הבאים:', 'תנגודת שרירים לא רצונית להנעת הראש.', 'עיוות / כיווץ של שרירי הצוואר.', 'כאב המוחמר בעקבות ניסיונות הקיבוע.', 'חסר נוירולוגי המוחמר בעקבות ניסיונות הקיבוע.', 'הפרעה לנתיב האוויר או לנשימה.'] },
      { title: 'פגיעת עמוד שדרה', points: ['סימנים אופייניים לפגיעת עמוד השדרה:', 'כאב עם או בלי תנועה של הצוואר או הגב, כאב במישוש לאורך עמוד השדרה.', 'פריאפיזם (זקפה ממושכת).', 'דפורמציה בעמוד השדרה.', 'התכווצויות חוזרות בשרירים (פרכוסים).'] },
      { title: 'מנגנון מחשיד', points: ['קינמטיקה קשה - הרוג ברכב, סימני קורי עכביש על השמשה.', 'מכניזם עם פגיעה קשה בגב.', 'מכניזם תאוצה / האטה פתאומי בעוצמה חזקה.', 'נפילה / קפיצה מגובה (פי 3 מגובה המטופל).', 'הופעה של חסר נוירולוגי - נימול / חוסר תחושה בגפיים.', 'הופעה של פריאפיזם.'] }
    ]
  },
  {
    id: 'pro_trauma_pain',
    name: 'טיפול בכאב',
    category: 'טראומה',
    summary: 'פרוטוקול להערכה וטיפול בכאב בנפגעי טראומה עם סולם כאב ותרופות.',
    type: ItemType.Protocol,
    content: [
      { title: 'טיפול ראשוני להפחתת כאב', points: ['קיבוע חיצוני וקירור מקומי.'] },
      { title: 'הערכת עוצמת הכאב', points: ['על פי סרגל מספרי או ציורי.', 'אם הפצוע מעורפל או אינו משתף פעולה - יש לבצע הערכה סובייקטיבית:', 'כאב קל - עוצמה 1-3.', 'כאב בינוני - עוצמה 4-6.', 'כאב חזק - עוצמה 7-10.', 'יש לשלול רגישות לפני מתן תרופות.', 'ללא שיפור - ניתן לתת תרופה נוספת באותה רמת כאב, בקנה הבא.'] },
      { title: 'סולם פרצופים', points: ['0 - אין כאב בכלל.', '1-3 - כאב מועט (כאב קל).', '4-6 - כאב בינוני.', '7-9 - כאב חזק.', '10 - כאב בלתי נסבל.', 'סרגל פרצופים לגילאים 3-4.', 'סרגל מילולי לגילאים 5-6.', 'סרגל מספרים לגילאים 7-8.'] },
      { title: 'תרופות', points: ['יש לשלול רגישות לפני מתן תרופה.', 'בעת טיפול בכאבים שאינם ממקור טראומה יש להעדיף טיפול בסדר הבא:', 'כאבי בטן - אופטלגין או טרמדקס.', 'כאבי ראש - אופטלגין או אקמול.', 'כאבי גב - כל התרופות בפרוטוקול.', 'אין לספק טיפול פומי בטראומה או מצב חירום בטני שעשוי להוביל לטיפול ניתוחי.'] },
      { title: 'אקמול (Paracetamol)', points: ['צורת הופעה - אמפולה 1 גרם ב-100 מ"ל או כדור 500 מ"ג.', 'מינון PO - 500-1000 מ"ג.', 'מינון ורידי - 1000-500 מ"ג.', 'אופן הכנה IV - לחבר את האמפולה לסט עירוי. מתן במשך 10 דקות.', 'התוויות נגד – רגישות ידועה, פגיעה בתפקודי כבד.'] },
      { title: 'אופטלגין (Dipyrone)', points: ['צורת הופעה - אמפולה 1 גרם, 2 מ"ל או כדור 500 מ"ג.', 'מינון IV - 1000 מ"ג.', 'מינון PO - 500-1000 מ"ג.', 'אופן הכנה IV - יש לשאוב את המינון הנדרש ולמהול ב-100 מ"ל סליין 0.9%.', 'צורת מתן - הזלפה לוריד במשך 5-10 דקות.', 'התוויות נגד - רגישות ידועה, הנקה, מושתלי מח עצם, הריון.'] },
      { title: 'טרמדקס (Tramadol)', points: ['צורת הופעה - אמפולה 100 מ"ג, 2 מ"ל.', 'מינון IV - 50-100 מ"ג.', 'בקשישים מעל גיל 70 יש להפחית מינון בחצי (25-50 מ"ג).', 'אופן הכנה - יש למהול אמפולה בשקית 100 סליין 0.9% / D5W. מתן במשך 2-3 דקות.', 'בכאב חזק ניתן לתת 100 מ"ג ולהוסיף 50-100 מ"ג בכל 10-20 דקות עד למקסימום של 250 מ"ג.', 'התוויות נגד - רגישות ידועה, אס"ק כליות, הריון, מטופלים אשר סובלים מהרעלת תרופות היפנוטיות, נוטלי תרופות המשפיעות על ה-CNS, נוטלי אופיאטים, אלכוהול או תרופות פסיכיאטריות.', 'אין לתת מתחת לגיל 12.'] },
      { title: 'מורפיום (Morphine)', points: ['צורת הופעה - אמפולה 10 מ"ג, 1 מ"ל.', 'מינון IV - 0.05-0.1 מ"ג/ק"ג.', 'אופן הכנה - יש למהול במזרק של 10 מ"ל עם סליין ולתת את המינון המבוקש במשך 1-2 דקות.', 'ניתן לחזור על המנה פעם אחת לאחר 5-10 דקות.', 'יש להפחית מינון במבוגרים מעל גיל 75 ומטופלים הסובלים מ-COPD (2/3 מהמינון המקובל).', 'התרופה עלולה לגרום לתחושת בחילה וטשטוש, ועלולה לגרום לירידת ל"ד.', 'התוויות נגד - אין לתת למטופלים לאחר פרכוס, על סף אס"ק נשימתי, בדליריום.'] },
      { title: 'קטמין (Ketamine)', points: ['צורת הופעה - אמפולה 500 מ"ג, 10 מ"ל.', 'מינון IV - 0.2 מ"ג/ק"ג.', 'לתרופה פעילות מצטברת (סינרגיסטי) בשילוב אופיאטים.', 'במינונים המקובלים לטיפול אנלגטי - הופעת תופעות לוואי נמוכה.', 'התרופה עלולה לגרום לעלייה בלחץ הדם.', 'התוויות נגד - לאחר פרכוס, לחץ דם מעל 180 סיסטולי, התקף פסיכוטי.', 'שקול מתן דורמיקום למטופלים שקיבלו קטמין.'] },
      { title: 'פראמין (Metoclopramide)', points: ['צורת הופעה - אמפולה 10 מ"ג, 2 מ"ל.', 'מינון IV - 10 מ"ג.', 'אופן הכנה - יש למהול במזרק של 10 מ"ל עם סליין ולהזליף במשך 3 דקות.', 'התוויות נגד - ילדים מתחת לגיל 6, חולים אפילפטיים.'] },
      { title: 'דורמיקום (Midazolam)', points: ['צורת הופעה - אמפולה 5 מ"ג, 1 מ"ל.', 'מינון IV - 1-2.5 מ"ג.', 'התוויות נגד - לחץ דם נמוך וסימני היפופרפוזיה.', 'יש למדוד לחץ דם לאחר המתן.'] }
    ]
  },
  {
    id: 'pro_trauma_venomous',
    name: 'פגיעת בע"ח ארסיים',
    category: 'טראומה',
    summary: 'פרוטוקול לטיפול בפגיעות מבעלי חיים ארסיים כולל נחשים ועקרבים.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['וודא כי בעל החיים אינו בסביבה ואינך בסכנה.', 'אין לנסות ללכוד את בע"ח הפוגע.'] },
      { title: 'הערכת מצב', points: ['ברר מה משך הזמן שחלף מרגע הפגיעה.', 'שקול מתן חמצן במידה ומופיעים סימני מצוקה נשימתית או סטורציה מתחת ל-94% או סימני פרפוזיה מרוכה.'] },
      { title: 'גישה ורידית', points: ['יש להשיג גישה ורידית בגפה הבריאה.', 'בסימנים לירידה בפרפוזיה - שקול מתן נוזלים IV.'] },
      { title: 'ניקוי וסימון', points: ['שטוף את המקום במים וסבון.', 'סמן את אזור ההכשה/עקיצה במידת האפשר.'] },
      { title: 'אנמנזה', points: ['ברר מה הפעולות שנעשו עד להגעתך.', 'נסה לדלות מידע לגבי בע"ח הפוגע.', 'חפש תופעות מקומיות - הופעת סימנים מקומיים/מערכתיים וזמן ההופעות/ההחמרתם מרגע האירוע.'] },
      { title: 'סימנים מקומיים', points: ['נפיחות, דימום, חורי הכשה, בצקות, שינוי צבע עור.'] },
      { title: 'סימנים מערכתיים', points: ['נוירוטוקסי - אישונים מורחבים, הזעת יתר, שיתוקים.', 'קרדיוטוקסי - הפרעות קצב.', 'המוטוקסי - בצקות, שינוי צבע לאדום / שחור באזור הפגיעה.', 'כללי - פריאפיזם (עקרב), בחילות, הקאות, שלשולים, מצוקה נשימתית, קישיון שרירים.', 'בדיקת דופק רדיאלי בגפה הפגועה - העדר דופק יכול להצביע על התפתחות תסמונת מדור.'] },
      { title: 'תרופות - נוזלים', points: ['מינון מבוגרים IV - 250 מ"ל.', 'מינון ילדים IV - 20 מ"ל / ק"ג.', 'יש לבצע ניטור בזמן המתן.'] },
      { title: 'אטרופין', points: ['סימנים לגירוי פרא-סימפטטי מוגבר - ריור יתר, הזעה, דמעות, שלשולים, הקאות.', 'צורת הופעה - 1 מ"ג, 1 מ"ל באמפולה.', 'מינון IV - 0.5 מ"ג.', 'אופן הכנה - יש לשאוב למזרק של 1 מ"ל, ולתת 0.5 מ"ל.', 'מינון מקסימלי - 3 מ"ג.'] },
      { title: 'דורמיקום', points: ['בהופעת פרכוסים יש לשקול דורמיקום.', 'צורת הופעה - אמפולה 5 מ"ג, 1 מ"ל.', 'מינון IV - 2.5-5 מ"ג.', 'התוויות נגד - לחץ דם נמוך וסימני היפופרפוזיה.', 'יש למדוד לחץ דם לאחר המתן.'] },
      { title: 'סימני אנאפילקסיס', points: ['בהופעת סימני אנאפילקסיס עבור לפרוטוקול אנאפילקסיס.'] },
      { title: 'פינוי', points: ['פנה לבי"ח תוך המשך ניטור וטיפול.', 'הערך מדדים כל 5-10 דק\'.', 'שקול דיווח למלר"ד.'] }
    ]
  },
  {
    id: 'pro_trauma_burns',
    name: 'טיפול בכוויות ושאיפת עשן',
    category: 'טראומה',
    summary: 'פרוטוקול לטיפול בכוויות ושאיפת עשן כולל חישוב שטח ודרגת הכוויה.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['כפפות ואפוד מזוהה, בטיחות זירה, בטיחות של הצוות - הרחק מאזור הסכנה.', 'המנע מחשיפה נוספת.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'סיפור מקרה - ABCDE', points: ['שאיפת עשן, גזים רעילים, שריפה, קיטור.', 'A - הערך חסימות בדרכי אוויר, הערך צרידות, סימני חריכה, שיעול, סימני פיח על הפנים.', 'הערך טראומה לדרכי אוויר, שקול ביצוע אינטובציה / סיוע במפוח בצפי לבצקת השמה.', 'שקול אינטובציה פרופילקטית.', 'B - חשוף בית חזה של הנפגע, במידה ובגד נדבק גזור מסביב.', 'התרשם ממצב נשימה, חבר מד סטורציה.', 'הערך מצוקה נשימתית צורך בהנשמות ומעבר לפרוטוקול הפסקת נשימה.', 'שימות - עמוק, קצב, סימטריה.', 'קולות נשימה חריגים. תן חמצן לכל נפגע במצוקה נשימתית / סטורציה מתחת ל-94% / חשד להרעלת CO.', 'C - הפשט גפיים וחפש דימומים בדוק דופק רדיאלי, הערך סימני הלם, חפש דימומים.', 'בצע הערכה לכוויות - דרגה, מיקום עומק.', 'D - בנפצע דחוף בצע הערכה מחודשת כל 5 ד\'.', 'E - דאג לכסות נפגע למניעת היפותרמיה.', 'שטוף את אזור הכווייה בסליין, כסה את הכווייה במידות רטובות.', 'בצע הערכת כאב, הסר טבעות או תכשיטים לותחים.'] },
      { title: 'עירוי נוזלים', points: ['תן עירוי נוזלים בכוויות דרגה ב\' ומעלה בכוויות של מעל 10%.', 'מינון IV - 20 מ"ל/ק"ג.'] },
      { title: 'ברונכוספאזם', points: ['מטופל עם סימני ברונכוספאזם - שקול ביצוע אינהלציה ונטולין.'] },
      { title: 'טיפול ראשוני', points: ['בטיחות - התמגן במסכת אף פה במתאר עם עשן.', 'הפשט מטופל מבגדיו - הזהר מחשיפה משנית לחומרים.'] },
      { title: 'אנמנזה', points: ['תשאל וחפש גורם לכוויות (חום, כימי, חשמל וכו\').', 'בדוק האם הנפגע שאף עשן (שערות אף חרוכות, לייחה שחורה, שיעול, צרידות, צפצופים בנשימה).', 'היה ערני להחמרה במצב נשימתי.', 'זכור - פצוע עם כוויות בהלם - חפש אחר גורמים נוספים להלם!'] },
      { title: 'כוייה חמורה', points: ['כוויה בפנים וצוואר ו/או עם סיבוך נשימתי.', 'כוויה בדרגה ב\' ששטח הפנים שלה מעל 20% משטח הגוף.', 'כוויה בדרגה ג\' ששטח הפנים שלה מעל 10% משטח הגוף.', 'כוויה כימית וכוויות חשמל.', 'כוויות שמלוות מחלות או פציעות נוספות.', 'כוויות בילדים או קשישים.', 'כוויות באזורים רגישים - פנים, כפות ידיים ואיברי מין.', 'כוויות היקפיות.'] },
      { title: 'הרעלת ציאניד', points: ['סימנים המחשידים להרעלת ציאניד (אחד לפחות):', 'ירידה במצב הכרה כתוצאה מחבלת ראש.', 'פרכוסים.', 'סימנים לירידה בפרפוזיה ו/או ל"ד סיסטולי נמוך מ-90, שאינו משני לדימום.'] },
      { title: 'טיפול בכוויות', points: ['תן חמצן לכל נפגע הסובל משאיפת עשן (אין להסתמך על מד סטורציה שעלול להראות מדידה שגויה).', 'שקול ביצוע אינטובציה מוקדם ככל האפשר אם לנפגע יש בעיה בנתיב אוויר או חשד להתפתחות בהמשך.', 'שקול סיוע נשימתי בסטורציה מתחת ל-90% או בהופעת סימני מצוקה נשימתית.', 'שקול מתן נוזלים, ושקול טיפול בכאב.', 'כוויות בעיניים - יש לבצע שטיפה באמצעות כמויות גדולות של סליין.', 'כוויות על רקע התחשמלות - יש לחבר למוניטור בהקדם.'] },
      { title: 'פינוי', points: ['ככלל העדיפות הינה לפנות פצוע כוויות יציבים (ללא איום על ABC) לבי"ח שמהווה מרכז ארצי לכוויות (תה"ש, רמב"ם) בתנאי שזמן הפינוי לא עולה על 30 דקות.', 'במידה ולא ניתן לפנות את הפצוע למרכז ארצי לכוויות ישנה עדיפות לפינות לבי"ח שמהווה מרכז על (רמב"ם, איכילוב, בלינסון, תה"ש, עין כרם, סורוקה).', 'ניתן להיוועץ במוקד הרפואי בכל הקשור לסוגיות הפינוי.'] },
      { title: 'חישוב שטח ודרגת הכוויה', points: ['ראש: 9%.', 'כל יד: 9%.', 'חזה: 9%.', 'בטן: 9%.', 'גב עליון: 9%.', 'גב תחתון: 9%.', 'כל רגל: 9% (קדמי) + 9% (אחורי).', 'איבר מין: 1%.'] },
      { title: 'דרגות כוויה', points: ['דרגה I - פגיעה בשכבת האפידרמיס. עור אדום, כאב/רגישות במגע, בדרך כלל אינו מצריך טיפול וחולף לאחר מספר שעות.', 'דרגה II - פגיעה בשכבת האפידרמיס והדרמיס. עור אדום שלפוחיות/שלמות/קרועות, כאבים עזים, מילוי קפילרי - קיים.', 'דרגה III - פגיעה בשכבת האפידרמיס, דרמיס וסאבקוטן. עור חרוך ונוקשה, כאבים עזים באזורים מסוימים, חוסר תחושה באזורים אחרים, מילוי קפילרי - אין.'] }
    ]
  },
  {
    id: 'pro_trauma_poisoning',
    name: 'הרעלות כולל זרחנים אורגניים',
    category: 'טראומה',
    summary: 'פרוטוקול לטיפול בהרעלות כולל הרעלת זרחנים אורגניים עם אטרופין ודורמיקום.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['כפפות ואפוד מזוהה, בטיחות זירה, בטיחות של הצוות - הרחק מאזור הסכנה.', 'המנע מחשיפה נוספת.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'טיפול ראשוני', points: ['כפפות ואפוד מזוהה, בטיחות זירה, בטיחות של הצוות.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'דרגות פגיעה', points: ['קל - אישונים צרים, נזלת.', 'בינוני - טשטוש בראייה, הזעה מוגברת, ריור, קוצר נשימה קל (צפצופים), שינויים באק"ג (הארכת QT), ברדיקרדיה, הקאות, כאבי בטן, התכווצויות שרירים.', 'קשה - שינויים במצב הכרה, קוצר נשימה חריף, הפרעות קצב, ירידת לחץ דם, חולשה עד שיתוק בשרירים, אי שליטה על סוגרים, התכווצויות.'] },
      { title: 'אנמנזה', points: ['התסמינים יתפתחו בין דקות לשעות (לעיתים לאחר 12-24 שעות) ותלויים בין השאר בסוג החומר, צורת חשיפה, כמות וכו\'.'] },
      { title: 'סיבות מוות עיקריות', points: ['אי ספיקה נשימתית והפרעות קצב חדריות.', 'הארכת מקטע QT עלול להוביל ל-WCT מסוג TDP.'] },
      { title: 'תרופות - אטרופין', points: ['צורת הופעה - 1 מ"ג, 1 מ"ל באמפולה.', 'מינון IV/IM/IO במבוגרים - חומרה בינונית - 1-2 מ"ג, חומרה קשה - 2-4 מ"ג.', 'מינון IV/IM/IO בילדים - 0.02-0.05 מ"ג/ק"ג.', 'בהרעלת זרחנים אורגניים בלבד אין מינון מקסימלי.', 'אופן הכנה - יש לשאוב למזרק של 2.5 מ"ל לפי המינון.', 'אין מינון מקסימלי בהרעלת זרחנים אורגנים.', 'יש להמשיך לתת מנות חוזרות עד השגת אטרופיניזציה (בדגש על הפסקת ריור/הפרשות ברונכיאליות).'] },
      { title: 'תרופות - דורמיקום', points: ['צורת הופעה - אמפולה 5 מ"ג, 1 מ"ל.', 'מינון IV - מבוגרים - 2.5 מ"ג, ילדים - 0.1-0.2 מ"ג/ק"ג.', 'מינון IM - 5 מ"ג.', 'מינון נזאלי - עם התקן - 10 מ"ג, IN/IM ילדים - 0.2 מ"ג ק"ג.', 'התוויות נגד - לחץ דם נמוך וסימני היפופרפוזיה.', 'יש למדוד לחץ דם לאחר המתן.', 'במידה ויש ירידה בלחץ דם יש לתת נוזלים.'] },
      { title: 'הפשטה', points: ['לאחר הפשטת הנפגע יש להכניס בגדים מזוהמים לשקית סגורה למניעת זיהום הגידות בורחנים אורגניים.'] },
      { title: 'פינוי', points: ['פנה לבי"ח תוך המשך ניטור וטיפול.', 'הערך מדדים כל 5-10 דק\'.', 'שקול דיווח למלר"ד.'] }
    ]
  },
  {
    id: 'pro_crush_syndrome',
    name: 'תסמונת מעיכה',
    category: 'טראומה',
    summary: 'פרוטוקול לטיפול בתסמונת מעיכה (Crush Syndrome) כולל מתן נוזלים וטיפול בסיבוכים.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['כפפות אפוד מזוהה, קסדה במידת הצורך, בטיחות זירה, בטיחות של הצוות.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'אבחנה', points: ['מדידת חום רקטלי עם מדחום היפותרמי.', 'זוהי את חומרת ההיפותרמיה.', 'היפותרמיה קלה - 32°C-35°C.', 'היפותרמיה בינונית - 28°C-32°C.', 'היפותרמיה קשה - מתחת ל-28°C.'] },
      { title: 'הסר בגדים רטובים', points: ['דאג לכסות בשמיכות חמות, חמם את הסביבה - מכונית לפי הניתן.'] },
      { title: 'קצב לב', points: ['יש לחבר מוניטור ולבצע אק"ג מוקדם ככל האפשר.'] },
      { title: 'נוזלים', points: ['שעתיים ראשונות - מתן סליין IV: מבוגר - ליטר/שעה, ילד - 20 סמ"ק/ק"ג/שעה.', 'לאחר שעתיים - מתן סליין IV: מבוגר - 500 סמ"ק/שעה, ילד - 10 סמ"ק/ק"ג/שעה.', 'יש לשאוף למתן נוזלים טרם שחרור האיבר הלכוד/חילוץ נפגע.', 'נוזל הבחירה סליין או D5W.', 'אין לתת הרטמן.'] },
      { title: 'חילוץ ארוך', points: ['מעל שעתיים.'] },
      { title: 'פגיעת מעיכה', points: ['לחץ ממושך מעל 40 ד\' על פלג גוף תחתון או לחץ על גפ/גפה עליונה רחבה.', 'ממצאים מחשידים ל"תסמונת מדור" - נפיחות, כאב, כחלון, נימול, שתן כהה.'] },
      { title: 'סיבוכים', points: ['היפוולמיה - בשל הצטברות נוזלים ב-3rd space.', 'היפרקלמיה - בשל נזק לרקמות (בעיקר שרירים), עלולה לגרום להפרעות קצב.', 'תסמונת המדור הסגור - שתוביל לנמק בגפה.', 'אס"ק כליות - בשל היפוולמיה ושקיעת מיוגלובין.'] },
      { title: 'אבחון', points: ['היפרקלמיה - גלי T מחודדים, הארכת מקטע PR, צניחות ST, הרחבת QRS.', 'תסמונת המדור הסגור - היעדר דופק, ירידה בתחושה, חיוורון, כאב.'] },
      { title: 'תרופות - החזר נוזלים', points: ['שעתיים ראשונות: מבוגר - ליטר/שעה, ילד - 20 סמ"ק/ק"ג/שעה.', 'לאחר שעתיים: מבוגר - 500 סמ"ק/שעה, ילד - 10 סמ"ק/ק"ג/שעה.'] }
    ]
  },
  {
    id: 'pro_hypothermia',
    name: 'טיפול בהיפותרמיה',
    category: 'סביבתי',
    summary: 'פרוטוקול לטיפול בהיפותרמיה כולל חימום, מתן נוזלים ודופמין.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['כפפות אפוד מזוהה, קסדה במידת הצורך, בטיחות זירה, בטיחות של הצוות.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'אבחנה', points: ['מדידת חום רקטלי עם מדחום היפותרמי.', 'זוהי את חומרת ההיפותרמיה.', 'היפותרמיה קלה - 32°C-35°C.', 'היפותרמיה בינונית - 28°C-32°C.', 'היפותרמיה קשה - מתחת ל-28°C.'] },
      { title: 'הסר בגדים רטובים', points: ['דאג לכסות בשמיכות חמות, חמם את הסביבה.', 'מוקדם ככל הניתן.'] },
      { title: 'מתן חמצן', points: ['שקול מתן חמצן במידה וסימני מצוקה נשימתית או סטורציה מתחת ל-94% או סימני טריפוזיה נמוכה.'] },
      { title: 'מוניטור ואק"ג', points: ['חיבור במידת האפשר.', 'השג גישה IV.', 'תן נוזלים IV.'] },
      { title: 'נוזלים', points: ['עירויי נוזלים מחוממים.'] },
      { title: 'דופמין', points: ['לאחר כישלון בטיפול בנוזלים.', 'מינון IV - 5-20 מק"ג/ק"ג/דקה.'] },
      { title: 'גורמי סיכון', points: ['תינוקות.', 'קשישים.', 'סביבה - טמפרטורה נמוכה, הזנחה, אלכוהול/סמים.', 'מחלות רקע.'] },
      { title: 'ממצאים בבדיקה פיזיקלית', points: ['היפותרמיה קלה - טאכיפנאה, היפרוונטילציה, טאכיקרדיה, אטקסיה, דיסארטריה, בלבול / שיקול דעת מוטה.', 'היפותרמיה בינונית - צפה לברדיקרדיה. הופעת טאכיקרדיה יכולה להצביע על היפוגליקמיה, היפוולמיה, כמון יתר. צפי לדיכוי של מערכת עצבים מרכזית (שינוי בדפוסי נשימה, האטת דופק, שינוי מצב הכרה).', 'היפותרמיה קשה - ירידה בלחץ דם, כשל לבבי, חוסר תגובה לכאב עד אובדן הכרה.'] },
      { title: 'השפעות מערכתיות', points: ['ריבוי הפרשות, ברונכוספאזם.', 'הפרעות קצב ושינויים באק"ג (גל אוסבורן).'] },
      { title: 'מצבים מיוחדים', points: ['דום לב כתוצאה מהיפותרמיה - הפסקת פעולות החייאה תתכן רק לאחר חימום לטמפ\' מעל 35 מעלות.', 'דפיברילציה - לרוב לא יעילה בחום גוף מתחת ל-30 מעלות.'] },
      { title: 'תרופות - דופמין', points: ['צורת הופעה - 200 מ"ג, 5 מ"ל באמפולה.', 'מינון IV - 5-20 מק"ג/ק"ג/דקה.', 'לאחר כישלון בטיפול בנוזלים.', 'אופן הכנה - שאב 2 אמפולות (סה"כ 400 מ"ג) והכנס לשקית 500 מ"ל, לקבלת 800 מק"ג / מ"ל.'] }
    ]
  },
  {
    id: 'pro_heat_injuries',
    name: 'פגיעות חום',
    category: 'סביבתי',
    summary: 'פרוטוקול לטיפול בפגיעות חום כולל התייבשות, תשישות חום ומכת חום.',
    type: ItemType.Protocol,
    content: [
      { title: 'בטיחות', points: ['כפפות אפוד מזוהה, בטיחות זירה, בטיחות של הצוות.'] },
      { title: 'הזמנת סיוע', points: ['כוננים נוספים, ALS, משטרה, כב"ה, מוקד 1221.'] },
      { title: 'בצע אנמנזה ובדוק היסטוריה רפואית', points: ['העבר את המטופל לסביבה קרה ומוצלת, שקול הפשטה ואוורור.'] },
      { title: 'סימנים חיצוניים', points: ['סביבה חמה, עור חם ויבש או אדום ולח, שינוי בהתנהגות, התכווצויות, לחץ דם נמוך.'] },
      { title: 'מדידת חום רקטלי', points: ['בכל מטופל עם שינוי במצב הכרה או חשד למכת חום.'] },
      { title: 'תשישות חום והתייבשות', points: ['חום רקטלי מתחת ל-40 מעלות, אובדן נוזלים מעל 5% ממשקל גוף. הדרדרות מצב הכרה, הפרעות בראייה ושמיעה, התכווצויות.', 'טיפול - שמירה על נתיב אוויר וסימנים חיוניים, עירוי נוזלים (מטופל לא מסוגל לשתות), קירור, מתן חמצן במידת הצורך, פינוי מהיר.'] },
      { title: 'בצע אנמנזה', points: ['חפש סימנים חיצוניים.'] },
      { title: 'שקול בדיקת חום רקטלי', points: ['בכל מטופל עם שינוי במצב הכרה או חשד למכת חום.'] },
      { title: 'התכווצויות שרירים', points: ['מניעה - הימנעות מביצוע פעולות מאומצות בעומס חום כבד.', 'יש להקפיד על הפסקות תכופות בעת ביצוע המאמץ, עדיפות לפעילות במקום קריר ומוצל.', 'טיפול - ביצוע מתיחות + עיסוי מקומי - להקלה על כאבים.', 'יש להקפיד על שתייה מרובה, פניו לבית חולים במידה וההתכווצויות נמשכות ולא מגיבות לטיפול.'] },
      { title: 'התייבשות', points: ['קלה / בינונית - אובדן נוזלים עד 10% ממשקל גוף, תחושת צמא, טכיקרדיה, כאב ראש, יובש בפה, חולשה, בחילות, שתן כהה ומועט.', 'טיפול - העברה למקום מוצל וקריר, מתן שתייה/עירוי נוזלים.', 'קשה - אובדן נוזלים מעל 10% ממשקל גוף. הדרדרות מצב הכרה, הפרעות בראייה ושמיעה, התכווצויות, ללא מתן שתן, סימני הלם היפוולמי.', 'טיפול - שמירה על נתיב אוויר וסימנים חיוניים, עירוי נוזלים (מטופל לא מסוגל לשתות), קירור, מתן חמצן במידת הצורך, פינוי מהיר.'] },
      { title: 'תשישות חום', points: ['סימנים - חום רקטלי 37-40, חולשה, סחרחורת, טכיקרדיה.', 'טיפול - קירור + החזר נוזלים.'] },
      { title: 'מכת חום', points: ['סימנים - חום רקטלי מעל 40 מעלות, שינויים במצב הכרה, הפרעות נוירולוגיות (כאב ראש, בעיה בדיבור, בעיה בראייה וכו\'), טכיקרדיה, סימני הלם היפוולמי (כאשר קיימת גם התייבשות).', 'טיפול - שמירה על נתיב אוויר, מתן חמצן במידת הצורך, קירור בכל אמצעי שיש בשטח - מים, שקיות קרח/שקיות קירור, קרח ברכב.', 'לאחר קירור הגוף יש לשקול מתן נוזלים (רצוי מקוררים).', 'יש לוודא שהטמפרטורה ירדה מתחת ל-40 לפני הפינוי.'] },
      { title: 'אוכלוסיות בסיכון', points: ['ילדים וקשישים.'] },
      { title: 'קירור', points: ['הפשט את הנפגע, קרר את הנפגע עם מים (רצוי קרים), מיזוג אוויר.', 'השג גישה ורידית, תן נוזלים.', 'שקול דורמיקום.'] },
      { title: 'פינוי', points: ['פנה בדחיפות לבי"ח תוך המשך ניטור וטיפול.', 'הערך מדדים כל 5-10 דק\'.', 'שקול דיווח למלר"ד.'] }
    ]
  }
];

export const procedures: Procedure[] = [
    {
        id: 'proc_intubation',
        name: 'אינטובציה',
        summary: 'מתן פתרון דפיניטיבי לבעיית נתיב אוויר (A-W), המאפשר סיוע נשימתי חודרני.',
        type: ItemType.Procedure,
        indications: [
            'מטופל עם חסימה מלאה, חלקית או "מאיימת" של דרכי הנשימה העליונות.',
            'מטופל המצוי באי־ספיקה נשימתית וזקוק לסיוע נשימתי חודרני.',
            'מטופל הזקוק ל"היפרוונטילציה טיפולית".'
        ],
        contraindications: [
            'עיוות אנטומי (כתוצאה מחבלה, ניתוח, דימום וכדומה) של חלל האורופרינקס או הלרינקס אשר אינו מאפשר ביצוע הפרוצדורה.'
        ],
        complications: [
            'היפוקסיה.',
            'גירוי להקאה ואספירציה משנית.',
            'טראומה (שבירת שיניים, קרעים בלשון, דימום מהפרינקס, פרפורציה של הטרכיאה או הוושט וכדומה).',
            'תופעות לוואי מתרופות הסדציה (טריזמוס, ירידה בלחץ הדם, ריור יתר וכדומה).',
            'צנרור הוושט.',
            'לרינגוספזם משני.'
        ],
        guidelines: [
            'יש לשקול היטב את הצורך בביצוע הפרוצדורה ולהעריך את סיכויי ההצלחה.',
            'יש לוודא הימצאות ולהכין את כל הציוד הדרוש טרם תחילת ביצוע הפרוצדורה.',
            'יש לבצע לכל היותר 3 ניסיונות למעט מקרים שבהם לא קיימת אלטרנטיבה.',
            'יש לנטר ולהקפיד על שמירת סטורציה מעל 90% במהלך הפרוצדורה כולה.',
            'שימוש בקתטר בוז\'י ייעשה בכל מקרה של כישלון בניסיון הראשון, או בצפי לאינטובציה קשה.',
            'יש לשקול שימוש בווידאו לרינגוסקופ במקרה של כישלון או צפי לאינטובציה קשה.',
            'יש למדוד ולנטר ערכי ETCO2 מייד בתום הפרוצדורה ובמהלך הפינוי.',
            'יש להתמגן כראוי (מסכת פה־אף ומשקפי מגן).'
        ],
        preparation: [
            'מוניטור (דופק, לחץ דם, סטורציה, ETCO2)',
            'מקור חמצן, מסכת חמצן, משקפי חמצן',
            'מפוח הנשמה, מסכה, מסנן ויראלי',
            'מכשיר סקשן וקתטרים',
            'מלקחי מג\'יל',
            'מנשם נייד',
            'סטטוסקופ',
            'ציוד מיגון',
            'מנתב אוויר אורופרינגיאלי',
            'תיק תרופות (החייאה, סדציה, משתקי שרירים)',
            'ערכת קריקוטומיה',
            'LMA בגודל מתאים',
            'ערכת לרינגוסקופ / וידאו לרינגוסקופ',
            'קתטר בוז\'י',
            'טובוסים בגדלים מתאימים',
            'מזרק לניפוח הבלונית',
            'אמצעי לקיבוע הטובוס'
        ],
        steps: [
            'הכן ופרוס את הציוד הדרוש (כולל החדרת מכוון, בדיקת בלונים).',
            'חבר את המטופל למוניטור.',
            'הערך קיומם של "מכשולים" העשויים לנבא קושי בביצוע הפרוצדורה.',
            'בצע פרה-אוקסיגנציה פסיבית או אקטיבית. במטופל בהכרה, שקול ביצוע DSI.',
            'תן תרופות לסדציה (במידת הצורך).',
            'השכב את המטופל ומקם את הראש במנח מתאים (sniffing position).',
            'חבר את המטופל למשקפי חמצן ותן חמצן בקצב 15 ליטר/דקה.',
            'פתח את פי המטופל ובצע סקירה של הלוע (הסר תותבות, שקול סקשן).',
            'בצע בעדינות לרינגוסקופיה. במידת הצורך בצע מניפולציה לרינגיאלית (BURP).',
            'שקול שימוש בקתטר בוז\'י אם אין ויזואליזציה טובה של מיתרי הקול.',
            'החדר או החלק את הטובוס על גבי הבוז\'י עד שהבלונית עוברת את מיתרי הקול.',
            'הוצא את המכוון או את קתטר הבוז\'י.',
            'נפח את בלונית האוויר של הטובוס בכ-10 מ"ל אוויר (בילדים 2-3 מ"ל).',
            'ודא עומק הטובוס בהתאם לקווי המנשך.',
            'חבר מסנן ויראלי.',
            'חבר מתאם קפנוגרף.',
            'חבר את מפוח ההנשמה והנשם את המטופל (צפה בעלייה סימטרית של בית החזה).',
            'בצע האזנה לכניסת אוויר באמצעות הסטטוסקופ (קיבה, ריאה ימין, ריאה שמאל).',
            'ודא קיום גל קפנוגרף במוניטור וערך של ETCO2 > 5 mmHg.',
            'החדר מנתב אוויר אורופרינגיאלי בסמוך לטובוס.',
            'קבע את הטובוס, חבר את המטופל למנשם.',
            'המשך ניטור רציף של מדדים.',
            'שקול מתן טיפול תרופתי המשכי.'
        ]
    },
    {
        id: 'proc_lma',
        name: 'נתיב אוויר סופראגלוטי (LMA)',
        summary: 'מתן פתרון לבעיית נתיב אוויר (A-W), במקרה של כישלון או חוסר אפשרות לבצע אינטובציה.',
        type: ItemType.Procedure,
        indications: [
            'צפי לקושי בביצוע אינטובציה על רקע פתולוגיה אנטומית.',
            'צורך בניהול מתקדם של נתיב האוויר, לאחר כישלון בביצוע אינטובציה.',
            'פגיעה קשה בעמוד שדרה צווארי.',
            'גישה מוגבלת אל המטופל (לדוגמה פצוע לכוד).',
            'זמן פינוי קצר.'
        ],
        contraindications: [
            'פגיעות קשות בחלל הפה והלוע (לדוגמה דימום משמעותי, כוויות נרחבות).',
            'היצרות סובגלוטית קשה או "מאיימת" (לדוגמה בצקת לרינגיאלית).'
        ],
        complications: [
            'גירוי להקאה ואספירציה.',
            'טראומה (קרעים בלשון, פגיעה בדופן האחורי של הלוע).',
            'קרע או פרפורציה של הטרכיאה.',
            'לרינגוספזם משני.'
        ],
        guidelines: [
            'פרוצדורה פשוטה יותר לביצוע מאינטובציה, בעלת אחוזי הצלחה גבוהים.',
            'אינו מגן באופן מלא מפני אספירציה.',
            'יעיל יותר בהפחתת ניפוח הקיבה לעומת מפוח ומנתב אוויר רגיל.',
            'LMA במידה 5 מתאים לרוב הגברים. מידה 4 מתאימה לרוב הנשים.',
            'יש להימנע משאיבת הפרשות (סקשן) דרך ה-LMA.',
            'לאחר החדרת ה-LMA תיתכן הופעת נפיחות קלה בצוואר.'
        ],
        preparation: [
            'מוניטור (דופק, לחץ דם, סטורציה, ETCO2)',
            'מקור חמצן ומסכה',
            'מפוח הנשמה, מסכה, מסנן ויראלי',
            'מכשיר סקשן',
            'LMA בגודל מתאים',
            'מזרק 50 מ"ל לניפוח הבלונית',
            'אמצעי לקיבוע ה-LMA',
            'ציוד נלווה: תיק תרופות, ערכת קריקו, לרינגוסקופ, טובוסים'
        ],
        steps: [
            'הכן את הציוד, בצע פראוקסיגנציה, תן סדציה, והשכב את המטופל בתנוחה מתאימה.',
            'חבר את המזרק ורוקן את האוויר מבלונית המסכה.',
            'אחוז ב-LMA באחיזה נכונה והחדר אותו לפיו של המטופל בצמוד לחך העליון עד לעצירתו.',
            'נפח את הבלונית בכמות האוויר הדרושה (לפי הטבלה).',
            'ודא כי קו שיני המטופל נמצא בין שנתות המנשך שעל ה-LMA.',
            'חבר מסנן ויראלי.',
            'חבר קפנוגרף.',
            'חבר מפוח להנשמה והנשם את המטופל.',
            'ודא מיקום תקין (הסתכלות, האזנה, קפנוגרף).',
            'קבע את ה-LMA באמצעות שרוך ייעודי.',
            'חבר את המטופל למנשם.',
            'המשך ניטור רציף של מדדים.',
            'שקול מתן טיפול תרופתי המשכי.'
        ]
    },
    {
        id: 'proc_cricothyrotomy',
        name: 'קריקוטומיה',
        summary: 'מתן פתרון דפיניטיבי לבעיית נתיב אוויר (A-W) במקרה של כישלון או חוסר אפשרות לבצע פרוצדורות קודמות (אינטובציה, LMA).',
        type: ItemType.Procedure,
        indications: [
            'מטופל עם חסימה מלאה, חלקית או "מאיימת" של דרכי הנשימה העליונות, או מטופל באי ספיקה נשימתית, וכשלו הניסיונות להשגת נתיב אוויר באמצעים אחרים.',
            'פתולוגיה שאינה מאפשרת פתיחת נתיב אוויר באמצעים קונבנציונליים (לדוגמה חבלת פנים קשה, בצקת קשה של הלרינקס).'
        ],
        contraindications: [
            'עיוות אנטומי (כתוצאה מחבלה, ניתוח קודם, דימום) של הצוואר ואזור הלרינקס אשר אינו מאפשר ביצוע הפרוצדורה.'
        ],
        complications: [
            'דימום משמעותי כתוצאה מפגיעה בכלי דם באזור.',
            'החדרת צינור ההנשמה אל התת־עור.',
            'קרע או פרפורציה של הטרכיאה.',
            'היפוקסיה משנית להימשכות או כישלון בביצוע הפרוצדורה.',
            'תופעות לוואי מתרופות הסדציה (בעיקר ירידה בלחץ הדם).'
        ],
        guidelines: [
            'תבוצע אך ורק במקרים שבהם מוצו כלל האמצעים עד תום, ואין דרך אחרת להנשים את המטופל.',
            'יש לבצע חתך אורכי בעור באמצעות סקלפל טרם החדרת מחט הקוניוטום.',
            'במטופלים השוקלים מעל 60 ק"ג ייתכן קושי בהנשמה או באוורור בשל קוטרו הדק של צינור ההנשמה.',
            'יש למדוד ולנטר ערכי סטורציה ו-ETCO2 מייד בתום הפרוצדורה, במהלך הפינוי ובהגעה למלר"ד.'
        ],
        preparation: [
            'מוניטור (דופק, ל"ד, סטורציה, ETCO2)',
            'מקור חמצן',
            'מפוח הנשמה, מסכה, מסנן ויראלי, שסתום PEEP',
            'סקשן',
            'מנשם נייד',
            'סטטוסקופ',
            'תיק תרופות',
            'סקלפל',
            'פדי אלכוהול לחיטוי',
            'פדי גזה',
            'ערכת קריקוטומיה (2 גדלים)',
            'מזרק לניפוח הבלונית',
            'אמצעי לקיבוע הצינור'
        ],
        steps: [
            'הכן את הציוד, בצע פראוקסיגנציה, תן סדציה והנח את המטופל בתנוחה מתאימה.',
            'מתח את העור וקבע את צידי הלרינקס באמצעות שתי אצבעות.',
            'זהה את הממברנה הקריקו־תירואידלית.',
            'חטא את העור באזור ההחדרה.',
            'בצע חתך אורכי של כ-2 ס"מ עם סקלפל בעור מעל הממברנה.',
            'דקור עם הסקלפל את הממברנה בזווית 90°.',
            'החדר את מחט ה-QT בזווית 90° תוך כדי פעולת שאיבה עם המזרק (שאיבת אוויר מעידה על חדירה לקנה).',
            'לאחר החדירה לקנה, הטה את זווית החדירה ל-45° לכיוון בית החזה.',
            'החדר את הערכה בזווית זו עד שמעצור הבטיחות האדום נוגע בצוואר.',
            'שלוף את מעצור הבטיחות והמשך להחדיר את הקוניוטום בלבד, ללא המחט.',
            'הוצא את המחט והשלך אותה לפח ייעודי.',
            'קבע את הקוניוטום באמצעות סרט הקיבוע.',
            'חבר את הצינור המאריך, ואליו חבר מסנן ויראלי ומתאם קפנוגרף.',
            'חבר את מפוח ההנשמה, והנשם את המטופל.',
            'ודא עליית בית חזה ובצע האזנה (קיבה, ריאות).',
            'בדוק קיום גרף קפנומטריה וערך ETCO2 > 5 mmHg.',
            'חבר את המטופל למנשם.',
            'המשך ניטור רציף.',
            'שקול מתן טיפול תרופתי המשכי.'
        ]
    },
    {
        id: 'proc_cpap_connect',
        name: 'חיבור מטופל ל-CPAP',
        summary: 'סיוע נשימתי לא חודרני למטופל באי-ספיקה נשימתית היפוקסמית (סטורציה נמוכה מ-90% למרות חמצן).',
        type: ItemType.Procedure,
        indications: [
            'אי-ספיקה נשימתית על רקע פתולוגיה ריאתית או לבבית: בצקת ריאות, דלקת ריאות/ARDS, התקף אסתמה קשה, החמרה ב-COPD, שאיפת עשן.'
        ],
        contraindications: [
            'אפניאה או ברדיפניאה.',
            'חוסר שיתוף פעולה מצד המטופל.',
            'מבנה או עיוות אנטומי שאינו מאפשר אטימה מלאה של המסכה.',
            'הקאות חוזרות ו/או ריבוי הפרשות מהלוע.',
            'לחץ דם סיסטולי נמוך מ-100 mmHg שאינו מגיב לטיפול.',
            'חשד לפניאומוטורקס ספונטני.'
        ],
        complications: [
            'בארוטראומה ריאתית (פניאומוטורקס או פניאומומדיאסטינום).',
            'ירידת לחץ דם.',
            'הקאות (יש לנתק את המסכה מייד עקב סכנת אספירציה).',
            'חסימת דרכי נשימה עליונות מהצטברות הפרשות (יש לנתק את המסכה מייד).',
            'אפניאה או ברדיפניאה אצל מטופל עם נטיה לצבירה כרונית של CO2.'
        ],
        guidelines: [
            'המטופל חייב להיות בהכרה מלאה ומשתף פעולה.',
            'אפקט ה-CPAP יושג רק אם תהיה אטימה מלאה בין המסכה לפניו של המטופל.',
            'יש "לתרגל" את המטופל באמצעות הצמדת המסכה לפניו טרם חיבור רצועות הגומי.',
            'אם לא נצפה שיפור, יש להתקדם לסיוע נשימתי חודרני.',
            'במידת הצורך ניתן לבצע אינהלציה ללא ניתוק המסכה.'
        ],
        preparation: [
            'מוניטור (דופק, ל"ד, סטורציה, ETCO2)',
            'מקור חמצן עם וסת מתאים',
            'מסכת CPAP בגודל M/L',
            'ניתן להשתמש גם במנשם Sparrow Ventway.'
        ],
        steps: [
            'הושב את המטופל כשהוא מחובר לחמצן ב-FLOW מקסימלי.',
            'הכן את הציוד הדרוש.',
            'חבר את הצינור לווסת החמצן.',
            'חבר את הצינור השרשורי למסכת ה-CPAP.',
            'כוון את שסתום ה-PEEP לערך הרצוי.',
            'הסבר למטופל על המסכה והרגש אותו.',
            'הצמד את המסכה לפניו של המטופל.',
            'כוון את מחבר המצח לגובה המתאים.',
            'העבר את הרצועות מאחורי ראשו וחבר אותן למסכה.',
            'מתח בעדינות את הרצועות עד להשגת אטימה מלאה.',
            'ודא שאין דליפת אוויר משמעותית (תיתכן דליפה קטנה באזור העיניים).',
            'המשך ניטור רציף של מדדים.',
            'התאם את ערך ה-PEEP בהתאם למדדים ולמצבו הקליני של המטופל.'
        ]
    },
    {
        id: 'proc_needle_thoracotomy',
        name: 'ניקור חזה (Needle Thoracotomy)',
        summary: 'ניקוז אוויר מהחלל הפלאוראלי במצב של "חזה אוויר בלחץ" הגורם לירידה בפרפוזיה.',
        type: ItemType.Procedure,
        indications: [
            'חזה אוויר בלחץ הגורם לירידה בפרפוזיה.',
            'דום לב כתוצאה מטראומה (TCPA).'
        ],
        complications: [
            'טראומה לאיברים פנימיים (לב, ריאות, כבד).',
            'המוטורקס כתוצאה מפגיעה בכלי דם גדול.',
            'פניאומוטורקס שלא היה קיים קודם לכן.'
        ],
        guidelines: [
            'ניתן להחדיר את המחט במרווח בין צלעי שני בקו מיד-קלויקולארי או במרווח בין צלעי 4-5 בקו אקסילרי קדמי.',
            'בהיעדר מחט ייעודית ניתן להשתמש בצנתר ורידי G14.',
            'ערכת TPAK מיועדת לילדים מעל גיל 14. בילדים צעירים יותר יש להשתמש בצנתר G14 או G18. בתינוקות – G24.'
        ],
        preparation: [
            'מוניטור (דופק, ל"ד, סטורציה, ETCO2)',
            'מחט TPAK ייעודית או וונפלון בגודל מתאים',
            'ספוגית אלכוהול לחיטוי',
            'לויקופלאסט לקיבוע'
        ],
        steps: [
            'השכב את המטופל על גבו (במידת האפשר).',
            'ודא שהמטופל מחובר לחמצן במסכה ב-flow מקסימלי.',
            'חטא את עור דופן בית החזה באזור המיועד לדקירה.',
            'זהה אנטומית את נקודת הדקירה וסמן באצבע.',
            'החדר את המחט בזווית של 90° עד סופה, ושלוף את המוליך.',
            'קבע את הצינורית.',
            'המשך ניטור רציף של מדדים.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_lucas',
        name: 'עיסויי חזה עם LUCAS',
        summary: 'ביצוע עיסוי לב חיצוני איכותי במהלך החייאה, במצבים שבהם עיסוי ידני אינו אופטימלי.',
        type: ItemType.Procedure,
        indications: [
            'דום לב – פינוי מטופל תוך כדי המשך ביצוע פעולות החייאה.',
            'דום לב – מיעוט מטפלים בזירת האירוע.',
            'החייאה ממושכת.'
        ],
        contraindications: [
            'מטופל בעל ממדים שאינם מאפשרים פעילות תקינה של המכשיר.',
            'דום לב כתוצאה מטראומה (TCPA) כאשר מנגנון החבלה כולל חבלת חזה משמעותית.'
        ],
        complications: [
            'פגיעות יאטרוגניות (כוויות, שברים בצלעות ובסטרנום, המוטורקס, פניאומוטורקס, קונטוזיות).',
            'פגיעה ברצף העיסויים ובאיכות ההחייאה (עקב חיבורים וניתוקים חוזרים).'
        ],
        guidelines: [
            'השימוש במכשיר אינו משפר את סיכויי ההישרדות. יש להקפיד על שימוש רק במצבים המתוארים.',
            'יש לבצע את החיבור במהירות האפשרית ותוך מינימום פגיעה ברצף פעולות ההחייאה.',
            'בעת חיבור מנשם אוטומטי יש להפעיל את המעסה במצב של 30:2, ולתזמן את ההנשמות להפסקה בעיסויים.'
        ],
        preparation: [
            'מוניטור או דפיברילטור',
            'מפוח הנשמה ידני + מסכת פה-אף',
            'מכשיר LUCAS'
        ],
        steps: [
            'מקם את קרש העיסוי של הלוקאס תחת שכמות המטופל.',
            'חבר את בוכנת הלוקאס לקרש העיסוי. ודא שהבוכנה ממוקמת במרכז בית החזה.',
            'לחץ על כפתור ההפעלה של המכשיר.',
            'הורד את הבוכנה עד לחזהו של המטופל. ודא מיקום נכון.',
            'לחץ "הפעל ללא הפסקות" או "הפעל 30:2".',
            'חבר את רצועות הקיבוע (ידיים וצוואר).',
            'המשך בביצוע פעולות החייאה בהתאם לפרוטוקול המתאים.'
        ]
    },
    {
        id: 'proc_io',
        name: 'עירוי תוך-גרמי (BIG/NIO)',
        summary: 'השגת גישה ורידית למתן תרופות ונוזלים כשאין אפשרות לעירוי תוך-ורידי.',
        type: ItemType.Procedure,
        indications: [
            'צורך במתן תרופות תוך-ורידית.',
            'צורך בעירוי נוזלים ו/או מוצרי דם.'
        ],
        contraindications: [],
        complications: [
            'חדירת המחט לרקמה התת-עורית במקום לעצם.',
            'אוסטיאומיאליטיס (סיבוך מאוחר).',
            'פגיעה במשטח הגדילה של העצמות הארוכות בילדים.'
        ],
        guidelines: [
            'מתן תרופות ב-I.O זהה למתן ב-I.V.',
            'בזמן בדיקת המיקום, אין חובה לשאוב מח עצם למזרק.',
            'לאחר השאיבה יש להזריק כ-20 מ"ל סליין ולוודא שאין התנפחות של הרקמה הסמוכה.',
            'יש לחבר עירוי בזרימה קבועה למניעת סתימה של המחט.'
        ],
        preparation: [
            'מכשיר BIG או NIO מותאם לגיל וגודל המטופל',
            'מזרק 20 מ"ל',
            'אמצעי חיטוי',
            'אמצעים לקיבוע המחט',
            'סט לעירוי נוזלים',
            'סליין 0.9% לשטיפה',
            'תמיסה לעירוי המשכי (סליין / פלזמה / הרטמן)',
            'פח מחטים'
        ],
        steps: [
            'הכן את הציוד.',
            'אתר את מקום ההחדרה הרצוי (טיביה/הומרוס).',
            'חטא את מקום ההחדרה.',
            'בצע את טכניקת ההחדרה לפי סוג המכשיר (BIG/NIO).',
            'קבע את הקתטר לגפה באמצעות הנצרה הייעודית.',
            'הדבק את הנצרה לגפה באמצעות לויקופלאסט.',
            'חבר מזרק ובצע שאיבה.',
            'בצע שטיפה עם 20 מ"ל סליין.',
            'חבר עירוי עם סט נוזלים. שטוף והזרם בקביעות.'
        ]
    },
    {
        id: 'proc_pacing',
        name: 'קיצוב חיצוני',
        summary: 'שיפור הפרפוזיה במצב הלם הנגרם כתוצאה מברדיקרדיה קשה.',
        type: ItemType.Procedure,
        indications: [
            'ברדיקרדיה סימפטומטית המלווה בירידה בפרפוזיה.'
        ],
        complications: [
            'כאב או אי-נוחות למטופל.',
            'היעדר תגובה (בשל אי-השגת capture מכני).'
        ],
        guidelines: [
            'יש לקבוע את שיטת הקיצוב (Demand/FIX) בהתאם למצב המטופל.',
            'לאחר השגת capture חשמלי (נראה במוניטור) יש לוודא השגת capture מכני באמצעות מישוש דפקים, שיפור קליני ושיפור במדדים.'
        ],
        preparation: [
            'מוניטור קורפולס טעון',
            'מדבקות קיצוב מותאמות לגיל המטופל',
            'סכין גילוח חד-פעמי',
            'תרופות לסדציה או אנלגזיה'
        ],
        steps: [
            'הדלק את מכשיר הקורפולס.',
            'נקה, יבש, ובמידת הצורך גלח את העור באזור ההדבקה.',
            'הדבק את מדבקות הקיצוב (ציר קדמי-אחורי).',
            'הדלק את מודולת הקיצוב (Pacer).',
            'בחר את קצב הלב הרצוי (לרוב 80 פעימות בדקה).',
            'העלה בהדרגה את עוצמת הזרם עד השגת capture חשמלי (לרוב סביב 120-130 mAh).',
            'ודא השגת capture מכני.',
            'הגבר את עוצמת הזרם ב-10% מעל הערך שבו הושג ה-capture.',
            'תן טיפול אנלגטי או סדטיבי למטופל בהכרה.',
            'המשך ניטור רציף.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_fdp',
        name: 'עירוי פלזמה קפואה מיובשת (FDP)',
        summary: 'שיפור הפרפוזיה במצבי הלם המוראגי וסיוע במניעת קואגלופתיה משנית לטראומה.',
        type: ItemType.Procedure,
        indications: [
            'נפגע טראומה עם סימני הלם וזמן פינוי משוער העולה על 20 דקות.'
        ],
        complications: [
            'תגובות אלרגיות הקשורות לקבלת מוצרי דם (חום, צמרמורות, אורטיקריה, ירידת לחץ דם, קוצר נשימה).'
        ],
        guidelines: [
            'התכשיר מיועד רק למטופלים עם דימום חמור (או חשד לכך) המציגים לפחות שניים מהסימנים הקליניים המפורטים.',
            'אין לעכב מטופל בשטח לצורך מתן התכשיר.',
            'המטרה היא השגת ל"ד סיסטולי מעל 90 mmHg. בחבלת ראש, המטרה היא מעל 100 mmHg.',
            'יש לוודא שכל מטופל מתאים מקבל גם הקסקפרון (TXA).',
            'מינון מקסימלי: 2 מנות. יש לנטר מדדים לפני מתן מנה שנייה.',
            'במקרה של תגובה אלרגית יש לעצור את העירוי מיידית ולטפל לפי פרוטוקול אנפילקסיס.'
        ],
        preparation: [
            'בקבוקון אבקת פלזמה',
            'אמפולה או שקית מים מזוקקים לעירוי (200 מ"ל)',
            'מעביר דו-כיווני',
            'סט עירוי ייעודי עם מסנן'
        ],
        steps: [
            'הכן את הציוד.',
            'חבר את המחבר הדו-כיווני לשקית המים.',
            'חטא את פקק בקבוקון הפלזמה והחדר את צידו החד של המחבר.',
            'הזרם את המים אל תוך בקבוקון הזכוכית.',
            'נער בתנועות סיבוביות עדינות להמסת האבקה.',
            'ניתן להחזיר את התמיסה המומסת לשקית העירוי להקלה במתן.',
            'חבר את סט העירוי הייעודי, שטוף אותו ותן את העירוי תוך ניטור רציף.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_flow_selector',
        name: 'שימוש בבורר זרימה מכני',
        summary: 'מתן מינון מדויק של תרופה בעירוי מתמשך (continuous).',
        type: ItemType.Procedure,
        indications: [
            'עירוי רציף של תרופה לאורך זמן.'
        ],
        complications: [
            'מתן מינון שגוי של תרופה.'
        ],
        guidelines: [
            'יחידות המידה על המכשיר הן במ"ל לשעה (ml/hr). יש להמיר את המינונים בפרוטוקולים ממ"ל לדקה (ml/min).'
        ],
        preparation: [
            'בורר זרימה מכני',
            'סט לעירוי',
            'שקית עירוי'
        ],
        steps: [
            'חבר את סט העירוי לשקית הנוזלים המהולה.',
            'חבר את קצה סט העירוי לבורר הזרימה.',
            'כוון את בורר הזרימה למצב פתוח (OPEN).',
            'שטוף את סט העירוי ואת בורר הזרימה.',
            'סגור את הברז של סט העירוי.',
            'חבר את הקצה השני של בורר הזרימה למטופל.',
            'כוון את מהירות הזרימה הרצויה.',
            'פתח את ברז סט הנוזלים.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_hydroxocobalamin',
        name: 'עירוי הידרוקסיקובלמין (ציאנוקיט)',
        summary: 'מתן מוקדם של אנטידוט ספציפי להרעלת ציאניד.',
        type: ItemType.Procedure,
        indications: [
            'נפגע משאיפת עשן בחלל סגור, עם חשד קליני להרעלת ציאניד קשה, המתבטא באחד מהבאים: דום לב, ירידה במצב הכרה, סימני הלם.'
        ],
        contraindications: [],
        complications: [
            'עלייה בלחץ הדם.',
            'טכיקרדיה, פעימות מוקדמות.',
            'תגובה אלרגית (נדיר).',
            'דיסקולורציה של השתן והריריות (חולפת תוך 48 שעות).'
        ],
        guidelines: [
            'אין להזליף באותו עירוי ביחד עם תיאוסולפט ו/או דופמין.',
            'יש להקפיד על עירוי התמיסה במשך 15 דקות לפחות.',
            'יש להתחיל את הטיפול מוקדם ככל האפשר (רצוי טרם תחילת פינוי).'
        ],
        preparation: [
            'ערכת ציאנוקיט',
            'מעביר דו-כיווני',
            'בקבוקון או שקית עירוי סליין 200 מ"ל'
        ],
        steps: [
            'הכן את הציוד.',
            'חבר את המחבר הדו-כיווני לסליין.',
            'החדר את צידו השני של המחבר לבקבוקון התרופה.',
            'הזרם את הסליין (200 מ"ל) אל תוך הבקבוקון.',
            'נער את הבקבוקון בתנועות סיבוביות עדינות במשך 60 שניות.',
            'חבר את סט העירוי הייעודי ושטוף אותו.',
            'חבר למטופל והזלף את התמיסה במשך 15 דקות.',
            'המשך לנטר את המטופל.'
        ]
    },
    {
        id: 'proc_epipen',
        name: 'שימוש באפיפן',
        summary: 'טיפול מוקדם בחשד לתגובה אנפילקטית.',
        type: ItemType.Procedure,
        indications: [
            'חשד לתגובה אנפילקטית - תגובה אלרגית מהירה המערבת לפחות שתי מערכות שונות.'
        ],
        complications: [
            'טכיקרדיה, פעימות מוקדמות.',
            'עלייה בלחץ הדם.',
            'אירוע כלילי חריף.'
        ],
        guidelines: [
            'ניתן לבצע את ההזרקה גם דרך בגדיו של המטופל.',
            'במידת הצורך (היעדר שיפור או החמרה), ניתן לתת עד 3 מנות בהפרש של 10 דקות בין מנה למנה.'
        ],
        preparation: [
            'מזרק אפיפן ירוק (0.15 מ"ג) לילדים',
            'מזרק אפיפן צהוב (0.3 מ"ג) למבוגרים'
        ],
        steps: [
            'פתח את אריזת הפלסטיק והוצא את המזרק.',
            'ודא שהנוזל שקוף וצלול בחלונית הביקורת.',
            'אחוז את המזרק במרכז והסר את הנצרה הכחולה.',
            'הצמד בחוזקה את המזרק (כשצידו הכתום לפנים) בזווית של 90° לצד החיצוני של ירך המטופל.',
            'המשך להצמיד בחוזקה את המזרק אל הירך במשך 10 שניות לפחות.',
            'הסר את המזרק ועסה את מקום ההזרקה במשך 10 שניות לפחות.',
            'השלך את המזרק המשומש למכל ייעודי לפסולת חדה.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_hemostatic',
        name: 'חבישה המוסטטית (Packing)',
        summary: 'עצירת דימום בפציעה חודרת.',
        type: ItemType.Procedure,
        indications: [
            'עצירת דימום פורץ מפצע חודר.'
        ],
        contraindications: [
            'ב-packing: חבלה חודרת בחזה מחשש להתפתחות חזה אוויר בלחץ.'
        ],
        guidelines: [
            'במידת הצורך ניתן להשתמש ביותר מתחבושת אחת לאותו הפצע.',
            'ניתן לבצע packing גם באמצעות תחבושת רגילה.'
        ],
        preparation: [
            'תחבושת המוסטטית מסוג Celox/Quikclot',
            'תחבושת אישית או תחבושת אלסטית'
        ],
        steps: [
            'פתח את האריזה הסטרילית.',
            'דחוס את התחבושת לנקב המדמם והפעל לחץ ישיר במשך 3-5 דקות.',
            'אין להסיר את החבישה. באיבר גלילי, עטוף את החבישה באמצעות תחבושת נוספת בלחץ.',
            'Packing: החדר את אמצעי עצירת הדימום אל חלל הפצע, ישירות על מקור הדימום, בלחץ חזק למשך 3-5 דקות. בסיום, בצע חבישה נוספת מעל האזור.'
        ]
    },
    {
        id: 'proc_pelvic_binder',
        name: 'מקבע אגן',
        summary: 'האטת/עצירת דימום כתוצאה משבר באגן.',
        type: ItemType.Procedure,
        indications: [
            'מנגנון חבלה קהה עם קינמטיקה קשה (תאונת דרכים, נפילה מגובה, דריסה).',
            'חבלה חודרת לאגן המלווה בסימנים קליניים של שוק.',
            'כחלק מפעולות החייאה במצב של דום לב מטראומה (TCPA).'
        ],
        complications: [
            'הסתרה של דימומים חיצוניים.'
        ],
        guidelines: [
            'אין לנסות לאבחן קלינית שבר לא יציב באגן. ההחלטה על קיבוע תתבסס על מנגנון החבלה.'
        ],
        preparation: [
            'מקבע אגן'
        ],
        steps: [
            'קפל לשתיים את הרצועה כאשר החלק הצהוב פונה כלפי חוץ. הנח לצד המטופל.',
            'קפל את החצי העליון כלפי מטה.',
            'גלגל את המטופל על צידו והעבר את הרצועה מתחתיו.',
            'גלגל אותו לצידו השני והוצא את הרצועה.',
            'ודא שמרכז הרצועה מיושר עם הטרוכנטרים הגדולים.',
            'כרוך קצה אחד של הרצועה סביב המטופל.',
            'חבר את העוגן המשולש הכחול.',
            'ודא שמרכז בסיס המשולש נמצא ישירות מעל הטרוכנטר הגדול.',
            'קפל את עודפי הרצועה פנימה.',
            'חזור על הפעולה בצד השני.',
            'ודא שהאבזם ממורכז ומתח את שתי הרצועות הכחולות.',
            'הצמד את החגורות. תעד את זמן הנחת המקבע.'
        ],
        // FIX: Add missing required 'contraindications' property.
        contraindications: []
    },
    {
        id: 'proc_tourniquet',
        name: 'חסם עורקים מתקדם',
        summary: 'עצירת דימום פורץ בגפיים.',
        type: ItemType.Procedure,
        indications: [
            'עצירת דימום פורץ / עורקי בגפיים.',
            'קטיעת גפה.',
            'דימום שאינו נעצר באמצעות לחץ ישיר.',
            'עצירת דימום במתאר מאוים/תחת אש/חשוך.',
            'המרת חסם עורקי שהונח בקצה גפה לחסם עורקי דיסטלי.'
        ],
        complications: [
            'נזק איסכמי משמעותי לגפה עד לכדי קטיעה.',
            'נזק נוירולוגי משני לגפה.',
            'המשך של הדימום.'
        ],
        guidelines: [
            'יש לשקול המרת חסם עורקים לחבישה לוחצת, חבישת Packing, או חסם עורקים אחר קרוב יותר למקור הדימום – בהתאם לאינדיקציות.'
        ],
        preparation: [
            'חסם עורקים מתקדם (CAT, TMT, וכו\')'
        ],
        steps: [
            'פתח והוצא את חסם העורקים מאריזתו.',
            'שחרר את רצועת ההידוק.',
            'השחל את הגפה אל תוך הרצועה, כ-10 ס"מ מעל למקור הדימום.',
            'כאשר לא ניתן לזהות את מקור הדימום, השחל את הרצועה עד לראש הגפה.',
            'הדק את הרצועה בחוזקה.',
            'סובב את מוט ההידוק בחוזקה עד לעצירה מוחלטת של הדימום.',
            'קבע את מוט ההידוק במקום הייעודי.',
            'קבע את שארית הרצועה.',
            'וודא עצירת הדימום.',
            'וודא העדר דופק בקצה הגפה.',
            'רשום שעה על התווית הייעודית.',
            'שקול מתן טיפול תרופתי כנגד כאב.'
        ],
        // FIX: Add missing required 'contraindications' property that caused the error.
        contraindications: []
    }
];

export const allData: SearchableItem[] = [...medications, ...protocols, ...procedures];
