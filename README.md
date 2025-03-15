# Chain Drill Math Game | משחק שרשרת חשבונית

משחק מתמטי אינטראקטיבי שבו כל תשובה הופכת למספר ההתחלתי של התרגיל הבא, במטרה להגיע למספר יעד.

A mathematical chain drill game where each answer becomes the start of the next equation, building towards a target number.

## סקירה כללית | Overview

Chain Drill הוא משחק חינוכי מתמטי המיועד לתרגול מיומנויות חשבון בדרך מהנה ומאתגרת. השחקן פותר סדרה של תרגילים מתמטיים כאשר התוצאה של כל תרגיל הופכת למספר ההתחלתי של התרגיל הבא. המטרה היא להגיע למספר יעד מוגדר מראש בסוף השרשרת.

Chain Drill is an educational math game designed to improve mental math skills through a series of interconnected exercises. Players solve 15 consecutive math problems where the answer to each problem becomes the starting number for the next problem. The goal is to reach a specific target number by the end of the chain.

## תכונות עיקריות | Features

- שלוש רמות קושי: קל, בינוני וקשה
- מעקב ויזואלי אחר התקדמות עם מפת דרכים אינטואיטיבית
- מערכת ניקוד עם בונוסים על הגעה למספר היעד
- עיצוב רספונסיבי למובייל ולדסקטופ
- תמיכה במספרים שלמים ועשרוניים
- ממשק בעברית

## דרישות מערכת | Prerequisites

- Node.js (גרסה 14 ומעלה)
- npm או yarn

## התקנה | Installation

```bash
# שיבוט המאגר
git clone https://github.com/danielma-tic/chain-drill-math-game.git

# מעבר לספריית הפרויקט
cd chain-drill-math-game

# התקנת תלויות
npm install

# הפעלת שרת הפיתוח
npm start
```

האפליקציה תהיה זמינה בכתובת http://localhost:3000

## רמות קושי | Difficulty Levels

### קל | Easy
- פעולות: חיבור (+), חיסור (-), כפל (×)
- מספרים שלמים בלבד עד 100
- 10 תרגילים בשרשרת

### בינוני | Medium
- פעולות: חיבור (+), חיסור (-), כפל (×), חילוק (÷)
- מספרים שלמים עד 150
- 15 תרגילים בשרשרת

### קשה | Hard
- פעולות: חיבור (+), חיסור (-), כפל (×), חילוק (÷), בריבוע (²)
- מספרים שלמים וחצאי מספרים עד 200
- 15 תרגילים בשרשרת

## איך משחקים | How to Play

1. בחר רמת קושי במסך הפתיחה
2. פתור כל תרגיל בשרשרת
3. השתמש במקלדת המספרית להזנת תשובות
4. עקוב אחר התקדמותך במפת הדרכים
5. נסה להגיע למספר היעד בסוף השרשרת
6. צפה בניקוד ובסטטיסטיקות שלך במסך הסיום

## מידע טכני | Technical Details

פרויקט זה נבנה באמצעות:
- React.js
- TailwindCSS
- React Hooks וContext API

## רישיון | License

פרויקט זה מורשה תחת רישיון MIT - ראה את קובץ LICENSE לפרטים.
